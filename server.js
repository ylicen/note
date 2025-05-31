const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { QuillDeltaToHtmlConverter } = require('quill-delta-to-html'); // For converting to HTML for display
const quillToMarkdown = require('quill-delta-to-markdown'); // For converting to Markdown for saving
console.log('quillToMarkdown module:', quillToMarkdown); // Add this line for debugging
const cors = require('cors');

const app = express();
const PORT = 9876;
const NOTES_DIR = path.join(__dirname, 'file');

// Ensure the notes directory exists
if (!fs.existsSync(NOTES_DIR)) {
    try {
        fs.mkdirSync(NOTES_DIR);
        console.log(`Notes directory created: ${NOTES_DIR}`);
    } catch (err) {
        console.error(`Failed to create notes directory ${NOTES_DIR}:`, err);
        // Exit or handle error appropriately if directory creation is critical
    }
} else {
    console.log(`Notes directory already exists: ${NOTES_DIR}`);
}

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.')));

// Helper to sanitize filenames
function sanitizeFilename(filename) {
    return filename.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase();
}

// Save or update a note
app.post('/save-note', (req, res) => {
    const { id, title, content } = req.body; // 'id' is for existing notes, 'title' and 'content' are always present

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    const sanitizedTitle = sanitizeFilename(title);
    const baseFilename = id ? id.replace(/\.md$/, '') : `${Date.now()}_${sanitizedTitle}`;
    const markdownFilePath = path.join(NOTES_DIR, `${baseFilename}.md`);
    const deltaFilePath = path.join(NOTES_DIR, `${baseFilename}.json`);

    try {
        // Convert Quill Delta to Markdown
        const markdownContent = quillToMarkdown.deltaToMarkdown(content);
        fs.writeFileSync(markdownFilePath, `# ${title}\n\n${markdownContent}`);
        fs.writeFileSync(deltaFilePath, JSON.stringify(content)); // Save original Quill Delta

        res.status(200).json({ message: 'Note saved successfully!', id: baseFilename });
    } catch (error) {
        console.error('Error saving note:', error);
        console.error('Error stack:', error.stack); // Add error stack for more details
        res.status(500).json({ message: 'Failed to save note.', error: error.message });
    }
});

// Get all notes
app.get('/notes', (req, res) => {
    try {
        const files = fs.readdirSync(NOTES_DIR);
        const notes = files.filter(file => file.endsWith('.md')).map(file => {
            const filePath = path.join(NOTES_DIR, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const lines = fileContent.split('\n');
            const title = lines[0].startsWith('# ') ? lines[0].substring(2).trim() : file.replace('.md', '');
            const contentPreview = lines.slice(2).join('\n').substring(0, 100); // Skip title line and empty line
            const timestampMatch = file.match(/^(\d+)_/);
            const timestamp = timestampMatch ? new Date(parseInt(timestampMatch[1])).toISOString() : new Date().toISOString();

            return {
                id: file.replace('.md', ''), // Use base filename as ID
                title: title,
                content: contentPreview, // Return preview for index page
                timestamp: timestamp
            };
        });

        // Sort notes by timestamp descending
        notes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        res.status(200).json(notes);
    } catch (error) {
        console.error('Error reading notes:', error);
        res.status(500).json({ message: 'Failed to retrieve notes.', error: error.message });
    }
});

// Get a single note by ID (filename)
app.get('/note/:id', (req, res) => {
    const noteId = req.params.id;
    const markdownFilePath = path.join(NOTES_DIR, `${noteId}.md`);
    const deltaFilePath = path.join(NOTES_DIR, `${noteId}.json`);

    try {
        if (fs.existsSync(markdownFilePath) && fs.existsSync(deltaFilePath)) {
            const fileContent = fs.readFileSync(markdownFilePath, 'utf8');
            const deltaContent = JSON.parse(fs.readFileSync(deltaFilePath, 'utf8'));

            // Extract title from markdown
            const lines = fileContent.split('\n');
            const title = lines[0].startsWith('# ') ? lines[0].substring(2).trim() : noteId;

            res.status(200).json({
                id: noteId,
                title: title,
                content: deltaContent // Return original Quill Delta
            });
        } else {
            res.status(404).json({ message: 'Note not found.' });
        }
    } catch (error) {
        console.error('Error retrieving note:', error);
        res.status(500).json({ message: 'Failed to retrieve note.', error: error.message });
    }
});

// Delete a note
app.delete('/delete-note/:id', (req, res) => {
    const noteId = req.params.id;
    const markdownFilePath = path.join(NOTES_DIR, `${noteId}.md`);
    const deltaFilePath = path.join(NOTES_DIR, `${noteId}.json`);

    try {
        let deletedCount = 0;
        if (fs.existsSync(markdownFilePath)) {
            fs.unlinkSync(markdownFilePath);
            deletedCount++;
        }
        if (fs.existsSync(deltaFilePath)) {
            fs.unlinkSync(deltaFilePath);
            deletedCount++;
        }

        if (deletedCount > 0) {
            res.status(200).json({ message: 'Note deleted successfully!' });
        } else {
            res.status(404).json({ message: 'Note not found.' });
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Failed to delete note.', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
