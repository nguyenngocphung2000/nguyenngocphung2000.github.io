# Hi there 👋, I'm Nothing 

### 🌟 NOTHING BUT SOMETHING 🌟

> *Hello there! Welcome to my little corner.* 🏕️

This is a small stash containing some little toys that I personally... **asked AI to code for me** 😂, along with a basket of cool tricks and tips I picked up or came up with myself. 

Initially, these things were created just to "save" my own life, but out of the goodness of my overflowing heart 🧘‍♂️, I decided to bring them all out here to share with everyone. 

Make yourself at home, feel free to tinker around. If there are any bugs... let me know so I can ask AI to fix them! 🛠️🤖

---

### 🛠️ Công nghệ & Thư viện sử dụng
Dự án được xây dựng trên nền tảng **HTML5, CSS3 và Vanilla JavaScript** thuần túy, áp dụng cấu trúc **ES Modules** (Lazy Load) giúp tối ưu tốc độ tải trang cực nhanh. Giao diện được tạo hình hoàn toàn bằng **Tailwind CSS** (chạy qua CDN). Hệ thống có nhúng thêm 3 thư viện Javascript siêu nhẹ để xử lý các tính năng đặc thù: `marked.min.js` (dịch Markdown sang HTML), `html2pdf.js` (xuất file PDF) và `lunar-javascript` (tính toán âm lịch).

---

### 🚀 Hướng dẫn mở rộng (Thêm Tool & Bài viết)

**1. Cách cấy thêm bài viết thủ thuật (Markdown):**
* Tạo một file `.md` (VD: `cai-win.md`) và lưu vào thư mục `posts/`.
* Mở file `js/tools/01-home.js`, tìm đến mảng `const manifest = [...]` và bổ sung thêm file của bạn vào như ví dụ sau:

```javascript
const manifest = [
    // ... các bài cũ ...
    { title: "Hướng dẫn cài Win dạo", date: "Thủ thuật IT", path: "posts/cai-win.md" }
];
```

**2. Cách lắp ráp thêm Tool mới (Ví dụ Tool số 14):**
* Tạo file JS mới trong thư mục `js/tools/` (VD: `14-note.js`). Toàn bộ giao diện và logic của tool này phải được bọc bên trong hàm: `export function setupTool() { ... }`.
* Mở file `js/core.js` và làm 2 bước khai báo:
   * **Thêm nút bấm** vào mảng `menuConfig`:
     ```javascript
     const menuConfig = [
         // ... 13 tool cũ ...
         { id: 'tab-note', name: 'Ghi Chú', icon: '📝' }
     ];
     ```
   * **Thêm đường dẫn** vào danh sách `toolMap`:
     ```javascript
     const toolMap = {
         // ... 13 đường dẫn cũ ...
         'tab-note': './tools/14-note.js'
     };
     ```

---

### 📫 Get in touch
Don't hesitate to ping me if you need help, want to report bugs, or simply want to team up for something cool:

[![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/nothing3272)
[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/share/1Ayyxg5kjH/?mibextid=wwXIfr)