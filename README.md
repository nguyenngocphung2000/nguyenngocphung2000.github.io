# NOTHING YET EVERYTHING - Vibe Coding Masterpiece 🚀

Chào mừng đến với **NOTHING YET EVERYTHING**. 
Đây là một không gian phát triển web cá nhân, được thiết kế hoàn toàn theo tư duy **Neo-Tech** & **Glassmorphism**. Mục tiêu của dự án là hợp nhất tất cả những "tiện ích thu nhỏ" và các bài viết chia sẻ thành một ứng dụng duy nhất (Single Page App) có tốc độ load thần tốc và giao diện Dark Mode đỉnh cao.

## Kiến Trúc Dự Án (Architecture)
Dự án được xây dựng 100% bằng HTML/JS thuần (Vanilla) cực nhẹ nhưng sử dụng CSS nội bộ được biên dịch mạnh mẽ từ **Tailwind CSS**.
Kiến trúc này giúp dự án không phụ thuộc vào bất kỳ FrameWork nặng nề nào, dễ dàng mang đi deploy bất kỳ đâu.

```bash
📦 nguyenngocphung2000.github.io
 ┣ 📂 css/              # Khung giao diện Tailwind và CSS chuẩn Glassmorphism
 ┣ 📂 data/             # Nơi chứa các nội dung Text Markdown dễ dàng chỉnh sửa
 ┃ ┣ 📜 about.md
 ┃ ┣ 📜 contact.md
 ┃ ┗ 📜 ...
 ┣ 📂 img/              # Hình ảnh (Banner)
 ┣ 📂 js/
 ┃ ┣ 📜 core.js         # Bộ não điều phối chung (Router, Event Delegation)
 ┃ ┗ 📂 tools/          # Nơi chứa toàn bộ Module chức năng riêng lẻ
 ┣ 📜 index.html        # Trang chủ duy nhất
 ┣ 📜 package.json      # Dependencies NPM
 ┗ 📜 tailwind.config.js
```

## Chỉnh Sửa Nội Dung (Edit Content)
Bạn không cần thiết phải hiểu sâu hệ thống core để thay đổi nội dung! Tất cả dữ liệu hiển thị đã được quy ước trỏ về thư mục `data/` dạng Markdown.

Hãy mở thư mục `data/` bằng Notepad hoặc bất kỳ Code Editor nào (VS Code).
- Bạn muốn thay đổi trang Liên Hệ? Mở `data/contact.md` 
- Bạn muốn thay đổi trang Giới Thiệu? Mở `data/about.md`

Giao diện sẽ tự động chuyển hóa Markdown sang Layout HTML phát sáng đẳng cấp ngay lập tức!

## Chạy Source Code Locally
Nếu bạn mới clone dự án về máy: 

1. Cài đặt các gói thư viện (Tailwind CSS):
```bash
npm install
```

2. Build CSS mới nếu bạn thay đổi file `css/input.css` hay code DOM trong bộ source:
```bash
npm run build:css
```

3. Dùng Live Server (trong VSCode) chặn lên `index.html` hoặc chạy một server tĩnh nội bộ để ngắm nhìn thành quả.

## GitHub Actions & Tự Động Hóa 
Mỗi lần bạn push (đẩy) code mới lền GitHub theo nhánh `main`, hệ sinh thái của kho lưu trữ này (thông qua `.github/workflows/static.yml`) sẽ tự động giả lập máy ảo, chạy NPM để Build file CSS siêu tốc rồi mới đẩy lên GitHub Pages. Việc của bạn chỉ là viết mã, phần mệt nhất, máy chủ lo!

---

> _Code là nghệ thuật của tư duy trừu tượng, được biên dịch thành cái đẹp hữu hình._