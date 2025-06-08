const express = require('express');
const { kv } = require('@vercel/kv');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Helper to sanitize titles for use in IDs
function sanitizeTitleForId(title) {
    return title.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase().substring(0, 50);
}

// Save or update a note
app.post('/save-note', async (req, res) => {
    const { id, title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required.' });
    }

    try {
        const noteId = id || `${Date.now()}_${sanitizeTitleForId(title)}`;
        
        // The note object to be stored
        const noteData = {
            id: noteId,
            title: title,
            content: content, // The Quill Delta
            updated_at: new Date().toISOString(),
        };

        // The metadata for the index list
        const noteMetadata = {
            id: noteId,
            title: title,
            updated_at: noteData.updated_at,
        };

        // Atomically save the note and update the index
        const pipeline = kv.pipeline();
        pipeline.set(`note:${noteId}`, noteData);
        
        let notesIndex = (await kv.get('notes_index')) || [];
        
        // If it's an existing note, update the metadata in the index
        const existingIndex = notesIndex.findIndex(n => n.id === noteId);
        if (existingIndex > -1) {
            notesIndex[existingIndex] = noteMetadata;
        } else {
            notesIndex.unshift(noteMetadata); // Add new notes to the beginning
        }
        
        pipeline.set('notes_index', notesIndex);
        await pipeline.exec();

        res.status(200).json({ message: 'Note saved successfully!', id: noteId });
    } catch (error) {
        console.error('Error saving note:', error);
        res.status(500).json({ message: 'Failed to save note.', error: error.message });
    }
});

// Get all notes (metadata only for preview)
app.get('/notes', async (req, res) => {
    try {
        let notesIndex = (await kv.get('notes_index')) || [];
        
        // Sort by date just in case, though it should be roughly sorted
        notesIndex.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Format for the client
        const formattedNotes = notesIndex.map(note => ({
            id: note.id,
            title: note.title,
            content: '...', // Sending a placeholder preview
            timestamp: note.updated_at,
        }));

        res.status(200).json(formattedNotes);
    } catch (error) {
        console.error('Error reading notes:', error);
        res.status(500).json({ message: 'Failed to retrieve notes.', error: error.message });
    }
});

// Get a single note by ID (full content)
app.get('/note/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        const note = await kv.get(`note:${noteId}`);

        if (note) {
            // The client expects 'content', which we have stored in the note object
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: 'Note not found.' });
        }
    } catch (error) {
        console.error('Error retrieving note:', error);
        res.status(500).json({ message: 'Failed to retrieve note.', error: error.message });
    }
});

// Delete a note
app.delete('/delete-note/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        // Start a pipeline for atomic operations
        const pipeline = kv.pipeline();
        
        // Remove the note itself
        pipeline.del(`note:${noteId}`);

        // Remove the note from the index
        let notesIndex = (await kv.get('notes_index')) || [];
        const updatedIndex = notesIndex.filter(n => n.id !== noteId);
        
        // If the length changed, it means we found and removed it
        if (notesIndex.length !== updatedIndex.length) {
            pipeline.set('notes_index', updatedIndex);
            await pipeline.exec();
            res.status(200).json({ message: 'Note deleted successfully!' });
        } else {
             // If the note existed but wasn't in the index, just delete the note
            await pipeline.exec();
            res.status(404).json({ message: 'Note not found in index but deleted if it existed.' });
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Failed to delete note.', error: error.message });
    }
});

// Serve static files from the public directory
// Note: In vercel.json, we route these directly, so this is for local dev
app.use(express.static(path.join(__dirname, '../../public')));


// Export the app for Vercel
module.exports = app; 