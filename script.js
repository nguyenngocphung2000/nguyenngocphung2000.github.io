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
