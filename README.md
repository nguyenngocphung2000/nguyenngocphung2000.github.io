# Hi there 👋, I'm Nothing 

### 🌟 NOTHING BUT SOMETHING 🌟

> *Hello there! Welcome to my little corner.* 🏕️

This is a small stash containing some little toys that I personally... **asked AI to code for me** 😂, along with a basket of cool tricks and tips I picked up or came up with myself. 

Initially, these things were created just to "save" my own life, but out of the goodness of my overflowing heart 🧘‍♂️, I decided to bring them all out here to share with everyone. 

Make yourself at home, feel free to tinker around. If there are any bugs... let me know so I can ask AI to fix them! 🛠️🤖

---

### 🛠️ Tech Stack & Libraries
This project is built on the core foundation of pure **HTML5, CSS3, and Vanilla JavaScript**, utilizing modern **ES Modules** (Lazy Load) to ensure lightning-fast page loads. The UI is completely styled with **Tailwind CSS** (via CDN) for that sleek glassmorphism look and seamless Dark Mode. 

Additionally, a few super-lightweight JS libraries are integrated to power specific tools: 
* `marked.min.js`: Parses Markdown directly into HTML.
* `html2pdf.js`: Exports crisp PDF files.
* `lunar-javascript`: Handles complex Lunar calendar calculations.

---

### 🚀 Expansion Guide (Adding Tools & Posts)

**1. How to add a new Markdown post (Tips & Tricks):**
* Create a `.md` file (e.g., `install-windows.md`) and drop it into the `posts/` folder.
* Open `js/tools/01-home.js`, locate the `const manifest = [...]` array, and add your new file like this:

```javascript
const manifest = [
    // ... previous posts ...
    { title: "How to install Windows", date: "IT Tips", path: "posts/install-windows.md" }
];
```

**2. How to integrate a new Tool (e.g., Tool #14):**
* Create a new JS file in the `js/tools/` folder (e.g., `14-note.js`). All the HTML and Logic for this tool MUST be wrapped inside this exported function: `export function setupTool() { ... }`.
* Open `js/core.js` and do these 2 simple configurations:
   * **Add a navigation button** to the `menuConfig` array:
     ```javascript
     const menuConfig = [
         // ... existing 13 tools ...
         { id: 'tab-note', name: 'Notepad', icon: '📝' }
     ];
     ```
   * **Add the file path** to the `toolMap` list:
     ```javascript
     const toolMap = {
         // ... existing 13 paths ...
         'tab-note': './tools/14-note.js'
     };
     ```

---

### 📫 Get in touch
Don't hesitate to ping me if you need help, want to report bugs, or simply want to team up for something cool:

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/nothing3272)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/share/1Ayyxg5kjH/?mibextid=wwXIfr)