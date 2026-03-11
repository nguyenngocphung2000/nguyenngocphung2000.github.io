/* ==========================================================
   PHẦN 1: LÕI HỆ THỐNG
========================================================== */
const desktopNav = document.getElementById('desktop-nav');
const mobileNav = document.getElementById('mobile-nav');
const appContainer = document.getElementById('app-container');
const mobileMenu = document.getElementById('mobile-menu');

// --- CẢM BIẾN HIỆU ỨNG CUỘN TRANG ---
const mainHeader = document.getElementById('main-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        mainHeader.classList.add('header-scrolled');
    } else {
        mainHeader.classList.remove('header-scrolled');
    }
});
document.getElementById('mobile-menu-btn').addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

function switchTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => b.classList.remove('active'));
    
    const targetPanel = document.getElementById(tabId);
    if(targetPanel) targetPanel.classList.add('active');
    
    document.querySelectorAll(`[data-target="${tabId}"]`).forEach(b => b.classList.add('active'));
    mobileMenu.classList.add('hidden');

    localStorage.setItem('my_active_tab', tabId);
    window.history.replaceState(null, null, '#' + tabId);
}

function registerTool(config) {
    const dBtn = document.createElement('button');
    dBtn.className = 'nav-btn px-4 py-2 transition hover:text-orange-500';
    dBtn.setAttribute('data-target', config.id);
    dBtn.innerHTML = `${config.icon} ${config.name}`;
    dBtn.onclick = () => switchTab(config.id);
    desktopNav.appendChild(dBtn);

    const mBtn = document.createElement('button');
    mBtn.className = 'mobile-nav-btn text-left px-6 py-3 text-gray-600 hover:bg-orange-50 w-full';
    mBtn.setAttribute('data-target', config.id);
    mBtn.innerHTML = `${config.icon} ${config.name}`;
    mBtn.onclick = () => switchTab(config.id);
    mobileNav.appendChild(mBtn);

    const panel = document.createElement('div');
    panel.id = config.id;
    panel.className = 'tab-panel';
    panel.innerHTML = config.html;
    appContainer.appendChild(panel);

    if (typeof config.logic === 'function') {
        config.logic();
    }

    if (config.isDefault) {
        appContainer.dataset.defaultTab = config.id;
    }
}

window.addEventListener('DOMContentLoaded', () => {

    const urlHash = window.location.hash.replace('#', '');
    const targetTabId = urlHash || 'tab-home';
    if (targetTabId && document.getElementById(targetTabId)) {
        switchTab(targetTabId);
    } else {
        switchTab('tab-home');
    }
});

// --- 1. CHỐNG ZOOM MÀN HÌNH BẰNG 2 NGÓN TAY TRÊN IOS ---
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1 && event.scale !== undefined) {
        event.preventDefault();
    }
}, { passive: false });
document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
});

// --- KÍCH HOẠT DARK MODE ---
const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('nothing_dark_mode', isDark);
    
    const iconSun = document.getElementById('icon-sun');
    const iconMoon = document.getElementById('icon-moon');
    if (iconSun && iconMoon) {
        if (isDark) { iconSun.classList.remove('hidden'); iconMoon.classList.add('hidden'); } 
        else { iconSun.classList.add('hidden'); iconMoon.classList.remove('hidden'); }
    }
};

if(localStorage.getItem('nothing_dark_mode') === 'true') {
    document.body.classList.add('dark-mode');
    document.addEventListener("DOMContentLoaded", () => {
        const iconSun = document.getElementById('icon-sun');
        const iconMoon = document.getElementById('icon-moon');
        if (iconSun && iconMoon) {
            iconSun.classList.remove('hidden');
            iconMoon.classList.add('hidden');
        }
    });
}