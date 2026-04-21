# NOTHING YET EVERYTHING

> *"Code không chỉ là công cụ, code là cách chúng ta rung động với thế giới kỹ thuật số."*

Góc lưu trữ cá nhân — tập hợp các công cụ tiện ích và bài viết được xây dựng theo phong cách **Vibe Coding**.

🔗 **Live:** [nguyenngocphung2000.github.io](https://nguyenngocphung2000.github.io)

---

## Kiến trúc dự án

Website chạy theo mô hình **Modular SPA** (Single Page Application) — không dùng framework, chỉ dùng Vanilla JS + HTML + TailwindCSS.

```
nguyenngocphung2000.github.io/
├── index.html              # Root layout: header, nav, <main id="app-container">
├── css/
│   ├── input.css           # Tailwind source
│   ├── tailwind.css        # Tailwind build output (đừng sửa tay)
│   └── style.css           # Custom CSS toàn cục (glassmorphism, animations...)
├── js/
│   └── core.js             # Bộ não điều hướng SPA: menuConfig, toolMap, switchTab()
├── project/                # Mỗi tool/trang là 1 thư mục con
│   ├── 00-home/            # Trang chủ
│   ├── 01-calc/            # Máy tính
│   ├── 02-finance/         # Lãi suất
│   ├── 03-calendar/        # Lịch vạn niên
│   ├── 04-time-calc/       # Tính thời gian
│   ├── 05-baby-name/       # Đặt tên con
│   ├── 06-xiangqi/         # Cờ tướng
│   ├── 07-wheel/           # Quay ngẫu nhiên
│   ├── 08-html-runner/     # Chạy thử HTML
│   ├── 09-image-to-svg/    # Tạo ảnh SVG
│   ├── 10-contact/         # Thông tin liên hệ
│   └── 11-about/           # Giới thiệu bản thân
├── posts/                  # Bài viết Markdown hiển thị ở trang chủ
│   ├── contact.md
│   ├── about.md
│   └── ...
└── img/                    # Ảnh tĩnh (favicon, banner...)
```

---

## Cách thêm Project/Tool mới

### Bước 1 — Tạo thư mục tool

Đặt tên theo quy ước `NN-ten-cong-cu` trong thư mục `project/`:

```
project/
└── 12-ten-cong-cu/
    ├── index.html   ← HTML nội dung của tool (KHÔNG có <html>/<body>)
    ├── style.css    ← CSS riêng của tool (có thể để trống)
    └── script.js    ← Logic JS, PHẢI export hàm init()
```

### Bước 2 — Viết `index.html`

Chỉ cần HTML fragment (không có `<html>`, `<head>`, `<body>`):

```html
<div class="w-full max-w-4xl mx-auto px-4 py-6">
  <h2 class="text-2xl font-bold text-slate-200 mb-4">Tên Công Cụ</h2>
  <!-- nội dung tool -->
</div>
```

### Bước 3 — Viết `script.js`

**Bắt buộc** phải export hàm `init()`. Hàm này được gọi sau khi HTML được inject vào DOM:

```js
export function init() {
  // querySelector hoạt động bình thường vì HTML đã có trong DOM
  const btn = document.getElementById('my-button');
  btn.addEventListener('click', () => { /* ... */ });
}
```

### Bước 4 — Đăng ký vào `js/core.js`

Mở `js/core.js` và thêm 2 chỗ:

```js
// 1. Thêm vào menuConfig để hiện trong dropdown Projects
const menuConfig = [
  // ...
  { id: 'tab-ten-cong-cu', name: 'Tên Công Cụ' }, // ← thêm ở đây
];

// 2. Thêm vào toolMap để map id → thư mục
const toolMap = {
  // ...
  'tab-ten-cong-cu': 'project/12-ten-cong-cu', // ← thêm ở đây
};
```

### Bước 5 — Build Tailwind CSS

Nếu bạn dùng class Tailwind mới trong tool, cần rebuild:

```bash
npm run build:css
```

---

## Cách thêm bài viết (Posts)

Bài viết là file **Markdown** hiển thị dạng accordion ở trang chủ.

### Bước 1 — Tạo file `.md` trong `posts/`

```
posts/
└── ten-bai-viet.md
```

Viết nội dung Markdown bình thường. Hỗ trợ custom timeline với cú pháp:
```
@time[2024-01] Mô tả sự kiện
```

### Bước 2 — Đăng ký vào manifest trong `project/00-home/script.js`

Tìm mảng `manifest` và thêm entry:

```js
const manifest = [
  // ...
  {
    title: 'Tiêu đề bài viết hiển thị trên trang chủ',
    date: 'Danh mục',           // ví dụ: 'Tips', 'About', 'Contact'
    path: 'posts/ten-bai-viet.md',
  },
];
```

---

## Phát triển cục bộ

```bash
# Cài dependencies
npm install

# Watch & rebuild Tailwind khi thay đổi CSS
npm run watch:css

# Hoặc build 1 lần
npm run build:css

# Chạy local server (cần server vì dùng ES modules + fetch)
npx serve .
# Hoặc dùng Live Server extension trong VS Code
```

> ⚠️ **Không mở `index.html` trực tiếp bằng file://** — `fetch()` và `import()` sẽ bị chặn bởi CORS. Phải dùng local server.

---

## Liên hệ

| Kênh | Link |
|------|------|
| GitHub | [nguyenngocphung2000](https://github.com/nguyenngocphung2000) |
| Telegram | [@nothing3272](https://t.me/nothing3272) |
| Facebook | [Nguyễn Ngọc Phụng](https://www.facebook.com/share/1Ayyxg5kjH/) |
| Email Form | [Google Form](https://forms.gle/5brLdS34QMQ3ei157) |