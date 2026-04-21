// Core Configuration
const menuConfig = [
  { id: 'tab-calc',         name: 'Tính Toán' },
  { id: 'tab-finance',      name: 'Lãi Suất' },
  { id: 'tab-calendar',     name: 'Lịch Vạn Niên' },
  { id: 'tab-time-calc',    name: 'Thời Gian' },
  { id: 'tab-baby-name',    name: 'Đặt Tên Con' },
  { id: 'tab-xiangqi',      name: 'Cờ Tướng' },
  { id: 'tab-wheel',        name: 'Quay Ngẫu Nhiên' },
  { id: 'tab-html-runner',  name: 'HTML Runner' },
  { id: 'tab-image-to-svg', name: 'Tạo Ảnh SVG' },
];

const toolMap = {
  'tab-home':         'project/00-home',
  'tab-calc':         'project/01-calc',
  'tab-finance':      'project/02-finance',
  'tab-calendar':     'project/03-calendar',
  'tab-time-calc':    'project/04-time-calc',
  'tab-baby-name':    'project/05-baby-name',
  'tab-xiangqi':      'project/06-xiangqi',
  'tab-wheel':        'project/07-wheel',
  'tab-html-runner':  'project/08-html-runner',
  'tab-image-to-svg': 'project/09-image-to-svg',
  'tab-contact':      'project/10-contact',
  'tab-about':        'project/11-about',
};

// UI Elements
const desktopProjectsMenu = document.getElementById('desktop-projects-menu');
const mobileNav           = document.getElementById('mobile-nav');
const mobileMenu          = document.getElementById('mobile-menu');
const mainHeader          = document.getElementById('main-header');

// Generate dropdown + mobile menu
if (desktopProjectsMenu && mobileNav) {
  desktopProjectsMenu.innerHTML = '';
  mobileNav.innerHTML = '';
  menuConfig.forEach((tool) => {
    desktopProjectsMenu.innerHTML +=
      '<button data-action="' + tool.id + '" data-target="' + tool.id + '" ' +
      'class="nav-btn w-full text-left px-4 py-2 hover:bg-orange-500/10 text-gray-400 ' +
      'hover:text-orange-500 transition text-[13px] font-bold tracking-wide border-l-2 ' +
      'border-transparent hover:border-orange-500">' + tool.name + '</button>';

    mobileNav.innerHTML +=
      '<button data-action="' + tool.id + '" data-target="' + tool.id + '" ' +
      'class="mobile-nav-btn block w-full px-4 py-2 text-left text-gray-300 ' +
      'hover:bg-orange-500/10 transition border-l-2 border-transparent ' +
      'hover:border-orange-500 text-[13px] font-bold tracking-wide rounded-r-xl">' +
      tool.name + '</button>';
  });
}

// Tab switching
window.loadHomeTab = async function () { await switchTab('tab-home'); };
window.currentTab  = null;

export async function switchTab(tabId) {
  window.currentTab = tabId;

  document.querySelectorAll('.tab-panel').forEach((p) => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach((b) => b.classList.remove('active'));
  if (mobileMenu) mobileMenu.classList.add('hidden');

  let targetPanel = document.getElementById(tabId);

  if (!targetPanel) {
    const toolDir = toolMap[tabId];
    if (!toolDir) return;
    try {
      // Inject CSS
      if (!document.querySelector('[data-tool="' + tabId + '"]')) {
        const link = document.createElement('link');
        link.rel          = 'stylesheet';
        link.href         = toolDir + '/style.css';
        link.dataset.tool = tabId;
        document.head.appendChild(link);
      }

      // Fetch HTML
      const res = await fetch(toolDir + '/index.html');
      if (!res.ok) throw new Error('Cannot load HTML: ' + toolDir);
      const html = await res.text();

      // Insert panel
      targetPanel = document.createElement('div');
      targetPanel.id        = tabId;
      targetPanel.className = 'tab-panel active';
      targetPanel.innerHTML = html;
      document.getElementById('app-container').appendChild(targetPanel);

      // Import + init JS module
      const mod = await import('../' + toolDir + '/script.js');
      if (mod.init) mod.init();

    } catch (err) {
      console.error('switchTab error:', err);
      return;
    }
  }

  if (targetPanel) {
    document.querySelectorAll('.tab-panel').forEach((p) => {
      p.classList.remove('active');
      p.style.display = 'none';
    });
    targetPanel.classList.add('active');
    targetPanel.style.display = 'block';
    document.querySelectorAll('[data-target="' + tabId + '"]').forEach((b) => b.classList.add('active'));

    const url = new URL(window.location);
    if (tabId !== 'tab-home') url.searchParams.delete('post');
    url.hash = tabId;
    window.history.replaceState(null, null, url);
  }
}

window.exportSwitchTab = switchTab;

// Click delegation
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (btn) switchTab(btn.getAttribute('data-action'));
});

// Header scroll effect
if (mainHeader) {
  window.addEventListener('scroll', () => {
    mainHeader.classList.toggle('header-scrolled', window.scrollY > 50);
  });
}

// Mobile hamburger
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden') &&
        !mobileMenu.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
    }
  });
}

// iOS gestures
document.addEventListener('touchmove', (e) => {
  if (e.scale !== 1 && e.scale !== undefined) e.preventDefault();
}, { passive: false });
document.addEventListener('gesturestart', (e) => e.preventDefault());

// Initial tab from URL hash
let initialTab = 'tab-home';
if (window.location.hash) {
  const h = window.location.hash.substring(1);
  if (toolMap[h]) initialTab = h;
}
switchTab(initialTab);

// Star background
(() => {
  let bg = document.getElementById('global-star-bg');
  if (bg && bg.children.length > 0) return;
  if (!bg) {
    bg = document.createElement('div');
    bg.id = 'global-star-bg';
    document.body.appendChild(bg);
  }
  for (let i = 0; i < 35; i++) {
    const s = document.createElement('div');
    s.className = 'global-star';
    const sz = Math.random() * 1.5 + 1;
    s.style.width             = sz + 'px';
    s.style.height            = sz + 'px';
    s.style.top               = Math.random() * 100 + 'vh';
    s.style.left              = Math.random() * 100 + 'vw';
    s.style.animationDelay    = Math.random() * 5 + 's';
    s.style.animationDuration = (Math.random() * 4 + 3) + 's';
    bg.appendChild(s);
  }
})();