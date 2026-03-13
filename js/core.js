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
    { id: 'tab-xiangqi', name: 'Cờ Tướng', icon: '⚔️' }]
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
    'tab-xiangqi': './tools/13-xiangqi.js'
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

// 2. Gắn sự kiện mở Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
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