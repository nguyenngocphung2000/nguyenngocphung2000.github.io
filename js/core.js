/* ==========================================================
   LÕI HỆ THỐNG (CORE.JS) - BẢN FIX TRIỆT ĐỂ (CHẠY TRỰC TIẾP)
========================================================== */

// --- 1. BẢN ĐỒ MENU (13 TOOLS) ---
const menuConfig = [
    { id: 'tab-home', name: 'Trang Chủ', icon: '🏠' },
    { id: 'tab-calc', name: 'Tính Toán', icon: '🧮' },
    { id: 'tab-md', name: 'Markdown', icon: '📝' },
    { id: 'tab-text-stat', name: 'Đếm Chữ', icon: '📊' },
    { id: 'tab-special-chars', name: 'Kí Tự Đặc Biệt', icon: '✨' },
    { id: 'tab-finance', name: 'Lãi Suất', icon: '💰' },
    { id: 'tab-family-pro', name: 'Gia Phả', icon: '🌳' },
    { id: 'tab-typing', name: 'Gõ Phím', icon: '⌨️' },
    { id: 'tab-calendar', name: 'Lịch Vạn Niên', icon: '📅' },
    { id: 'tab-time-calc', name: 'Thời Gian', icon: '⏳' },
    { id: 'tab-workspace', name: 'Workspace', icon: '💻' },
    { id: 'tab-baby-name', name: 'Đặt Tên Con', icon: '👶' },
    { id: 'tab-xiangqi', name: 'Cờ Tướng', icon: '⚔️' },
    { id: 'tab-wheel', name: 'Quay ngẫu nhiên', icon: '🎲' },
    { id: 'tab-sleep', name: 'Tính Giấc Ngủ' ,icon: '🌙' },
    { id: 'tab-html-runner', icon: '💻', name: 'HTML Runner' },
    { id: 'tab-ascii-tree', icon: '📂', name: 'ASCII Tree' }


]
   ;

// --- 2. BỘ ĐỊNH TUYẾN (LAZY LOAD MAP) ---
const toolMap = {
    'tab-home': './tools/01-home.js',
    'tab-calc': './tools/02-calc.js',
    'tab-md': './tools/03-md.js',
    'tab-text-stat': './tools/04-text-stat.js',
    'tab-special-chars': './tools/05-special.js',
    'tab-finance': './tools/06-finance.js',
    'tab-family-pro': './tools/07-family.js',
    'tab-typing': './tools/08-typing.js',
    'tab-calendar': './tools/09-calendar.js',
    'tab-time-calc': './tools/10-time-calc.js',
    'tab-workspace': './tools/11-workspace.js',
    'tab-baby-name': './tools/12-baby-name.js',
    'tab-xiangqi': './tools/13-xiangqi.js',
    'tab-wheel' : './tools/14-wheel.js',
    'tab-sleep': './tools/15-sleep.js',
    'tab-html-runner': './tools/16-html-runner.js',
    'tab-ascii-tree': './tools/17-ascii-tree.js'


};

// --- 3. KHAI BÁO CÁC PHẦN TỬ GIAO DIỆN ---
const desktopNav = document.getElementById('desktop-nav');
const mobileNav = document.getElementById('mobile-nav');
const mobileMenu = document.getElementById('mobile-menu');
const mainHeader = document.getElementById('main-header');

// Thêm thanh cuộn cho Menu Mobile
if (mobileMenu) {
    mobileMenu.classList.add('max-h-[70vh]', 'overflow-y-auto', 'custom-scrollbar');
}

// --- 4. HÀM TẠO MENU ---
if (desktopNav && mobileNav) {
    desktopNav.innerHTML = '';
    mobileNav.innerHTML = '';
    menuConfig.forEach(tool => {
        desktopNav.innerHTML += `
            <button onclick="switchTab('${tool.id}')" data-target="${tool.id}" 
                class="nav-btn flex items-center space-x-2 px-3 py-2 text-gray-500 hover:text-orange-500 transition rounded-xl hover:bg-orange-50/50">
                <span class="text-xl">${tool.icon}</span>
                <span class="text-sm font-semibold">${tool.name}</span>
            </button>`;
        mobileNav.innerHTML += `
            <button onclick="switchTab('${tool.id}')" data-target="${tool.id}" 
                class="mobile-nav-btn flex items-center space-x-3 w-full px-4 py-3 text-left text-gray-600 hover:bg-orange-50 transition border-l-4 border-transparent hover:border-orange-500">
                <span class="text-xl">${tool.icon}</span>
                <span class="font-semibold">${tool.name}</span>
            </button>`;
    });
}

// --- 5. HÀM CHUYỂN TAB ---
window.switchTab = async function(tabId) {
    document.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
    });
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => b.classList.remove('active'));
    
    if (mobileMenu) mobileMenu.classList.add('hidden');
    
    let targetPanel = document.getElementById(tabId);
    
    if (!targetPanel) {
        const toolUrl = toolMap[tabId];
        if (toolUrl) {
            try {
                const module = await import(toolUrl);
                module.setupTool();
                targetPanel = document.getElementById(tabId);
            } catch (error) {
                console.error("Lỗi tải tool:", error);
                return;
            }
        }
    }
    
    if (targetPanel) {
        document.querySelectorAll('.tab-panel').forEach(p => {
            p.classList.remove('active');
            p.style.display = 'none';
        });
        targetPanel.classList.add('active');
        targetPanel.style.display = 'block';
        
        document.querySelectorAll(`[data-target="${tabId}"]`).forEach(b => b.classList.add('active'));
        window.history.replaceState(null, null, '#' + tabId);
    }
}

// --- 6. HÀM CHUYỂN ĐỔI DARK MODE ---
window.toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    document.body.classList.toggle('dark-mode');
    
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('nothing_dark_mode', isDark);
    
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');
    if (iconSun && iconMoon) {
        if (isDark) {
            iconSun.classList.remove('hidden');
            iconMoon.classList.add('hidden');
        } else {
            iconSun.classList.add('hidden');
            iconMoon.classList.remove('hidden');
        }
    }
};

// ==========================================================
// GẮN SỰ KIỆN TRỰC TIẾP (KHÔNG CHỜ DOMContentLoaded NỮA)
// ==========================================================

// 1. Gắn sự kiện Logo bay khi cuộn trang
if (mainHeader) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainHeader.classList.add('header-scrolled');
        } else {
            mainHeader.classList.remove('header-scrolled');
        }
    });
}

// 2. Gắn sự kiện mở Menu Mobile và đóng khi nhấp ra ngoài
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn && mobileMenu) {
    // Sự kiện bấm nút để mở/đóng
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Sự kiện theo dõi nhấp chuột trên toàn màn hình
    document.addEventListener('click', function(event) {
        // Kiểm tra xem menu có đang mở hay không
        const isMenuOpen = !mobileMenu.classList.contains('hidden');
        
        if (isMenuOpen) {
            // Nếu click không nằm trong menu VÀ không nằm trên nút mở
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.add('hidden'); // Thu gọn menu
            }
        }
    });
}

// 3. Gắn sự kiện cho nút Dark Mode (Tìm bằng id hoặc class)
const darkModeBtn = document.getElementById('dark-mode-btn') || document.querySelector('[onclick="toggleDarkMode()"]');
if (darkModeBtn) {
    // Ép cứng sự kiện click, tránh lỗi HTML quên khai báo
    darkModeBtn.addEventListener('click', window.toggleDarkMode);
    // Xóa onclick cũ trên HTML nếu có để tránh chạy 2 lần
    darkModeBtn.removeAttribute('onclick');
}

// 4. Khôi phục trạng thái Dark Mode khi load trang
if (localStorage.getItem('nothing_dark_mode') === 'true') {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark-mode');
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');
    if (iconSun && iconMoon) {
        iconSun.classList.remove('hidden');
        iconMoon.classList.add('hidden');
    }
}

// 5. Chống zoom 2 ngón tay trên iOS
document.addEventListener('touchmove', function(event) {
    if (event.scale !== 1 && event.scale !== undefined) event.preventDefault();
}, { passive: false });
document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
});

// 6. Luôn mở Trang chủ khi reload (xóa lịch sử cũ)
localStorage.removeItem('my_active_tab');
let initialTab = 'tab-home';
if (window.location.hash) {
    const hashTab = window.location.hash.substring(1);
    if (toolMap[hashTab]) initialTab = hashTab;
}
switchTab(initialTab);
// =========================================
// HIỆU ỨNG BẦU TRỜI SAO TỰ ĐỘNG
// =========================================
function initGlobalStars() {
    // Tránh tạo trùng lặp nếu hàm bị gọi nhiều lần
    if (document.getElementById('global-star-bg')) return;
    
    // Tạo lớp màng chứa sao
    const starContainer = document.createElement('div');
    starContainer.id = 'global-star-bg';
    
    // Rải khoảng 70 ngôi sao khắp màn hình (Không nên để quá nhiều gây nặng máy)
    const starCount = 70;
    
    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.className = 'global-star';
        
        // Kích thước sao ngẫu nhiên (từ siêu nhỏ 1px đến 2.5px)
        let size = Math.random() * 1.5 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Vị trí rải rác ngẫu nhiên trên toàn bộ view màn hình
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        
        // Nhấp nháy không đồng đều để tạo cảm giác tự nhiên
        star.style.animationDelay = (Math.random() * 5) + 's';
        // Chu kỳ nhấp nháy chậm hơn một chút để làm nền tĩnh lặng, không làm rối mắt
        star.style.animationDuration = (Math.random() * 4 + 3) + 's';
        
        starContainer.appendChild(star);
    }
    
    // Chèn lớp màng vào thẳng thẻ body
    document.body.appendChild(starContainer);
}

// Chạy hàm tạo sao khi trang web vừa load xong
document.addEventListener('DOMContentLoaded', initGlobalStars);