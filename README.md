# Personal Notes Showcase Website

## Description
This is a simple, aesthetically pleasing static website designed to display personal notes. It features a clean white and brown theme, aiming for a warm and comfortable reading experience, much like a physical notebook.

## Features
- **Themed Interface:** Uses a consistent white and brown color palette for a calm and elegant look.
- **Responsive Design:** Adapts to different screen sizes, ensuring readability on desktops, tablets, and mobile devices.
- **Dynamic Note Loading:** Notes are stored in a JavaScript array and dynamically rendered on the page.
- **Interactive Sidebar:** Allows users to easily switch between different notes.
- **Favicon:** Includes a custom favicon for better browser tab identification.
- **Rich Content Display:** Supports basic HTML formatting within notes for better structure and readability (e.g., paragraphs, lists, bold text, headings).

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## How to Use
1. Clone or download the project files.
2. Navigate to the project directory.
3. Open the `index.html` file in your preferred web browser.

## Folder Structure
```
/
├── css/
│   └── style.css                    # 网站样式
├── images/
│   ├── decorative_flourish.png      # 装饰性花纹
│   ├── favicon.png                  # 网站图标
│   ├── leaf-1.png                   # 树叶装饰1
│   ├── leaf-2.png                   # 树叶装饰2
│   ├── nav_background.png           # 导航栏背景
│   ├── nav_dot.png                  # 导航分隔点
│   ├── new_welcome_illustration.png # 欢迎页插图（新）
│   ├── paper_texture.png            # 纸张纹理背景
│   └── welcome_illustration.png     # 欢迎页插图（备用）
├── js/
│   └── script.js                    # 笔记加载和交互的JavaScript
├── index.html                       # 主HTML文件
└── README.md                        # 本文件
```


## Customization

### Modifying Notes
To add, remove, or edit notes:
1. Open the `js/script.js` file.
2. Locate the `notes` array near the beginning of the file.
3. Each note is an object with `id` (unique number), `title` (string), and `content` (string, can contain HTML).
   ```javascript
   {
       id: 1,
       title: 'Your Note Title',
       content: '<p>Your note content here. You can use <strong>HTML</strong> tags.</p><ul><li>Like</li><li>Lists</li></ul>'
   }
   ```
4. Modify this array as needed and save the file. The changes will be reflected when you reload `index.html` in your browser.

### Changing Theme Colors
Theme colors are primarily defined in `css/style.css`. You can modify the CSS variables or specific class styles to change the appearance.
