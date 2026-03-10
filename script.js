// 1. Chuyển đổi Tab
function switchTab(tabId, element) {
    // Ẩn tất cả nội dung tab
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.add('hidden'));

    // Hiện tab được chọn
    document.getElementById('tab-' + tabId).classList.remove('hidden');

    // Cập nhật trạng thái nút điều hướng
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('tab-active'));
    element.classList.add('tab-active');
}

// 2. Logic tính toán (X% của Y)
const inputPercent = document.getElementById('percent-x');
const inputValue = document.getElementById('value-y');
const inputResult = document.getElementById('result-1');

function calculate() {
    const p = parseFloat(inputPercent.value);
    const v = parseFloat(inputValue.value);
    
    if (!isNaN(p) && !isNaN(v)) {
        const res = (p / 100) * v;
        inputResult.value = res.toLocaleString('vi-VN'); // Định dạng số kiểu VN
    } else {
        inputResult.value = "?";
    }
}

// Lắng nghe sự kiện gõ phím để tính ngay lập tức
inputPercent.addEventListener('input', calculate);
inputValue.addEventListener('input', calculate);
const mdInput = document.getElementById('md-input');
const mdRender = document.getElementById('md-render');
const mdFileInput = document.getElementById('md-file-input');

// Hàm Render chung
function updatePreview(content) {
    if (typeof marked !== 'undefined') {
        mdRender.innerHTML = marked.parse(content);
    }
}

// 1. Xử lý gõ tay
if (mdInput) {
    mdInput.addEventListener('input', () => {
        updatePreview(mdInput.value);
    });
}

// 2. Xử lý đọc file .md
if (mdFileInput) {
    mdFileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            mdInput.value = content; // Đổ nội dung vào textarea
            updatePreview(content);  // Render ra bên dưới
        };
        reader.readAsText(file);
    });
}

// Nội dung mẫu ban đầu
window.onload = () => {
    const demo = "# 📝 Hướng dẫn\n1. Bạn có thể **gõ trực tiếp** vào ô trên.\n2. Hoặc bấm nút **Mở file .md** để tải file từ máy tính.\n\n> Nội dung sẽ được hiển thị ngay lập tức ở dưới này!";
    if(mdInput) mdInput.value = demo;
    updatePreview(demo);
};


