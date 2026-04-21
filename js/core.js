// Core Configuration
const menuConfig = [
  { id: 'tab-calc', name: 'Tính toán' },
  { id: 'tab-finance', name: 'Lãi suất' },
  { id: 'tab-calendar', name: 'Lịch vạn niên' },
  { id: 'tab-time-calc', name: 'Thời gian' },
  { id: 'tab-baby-name', name: 'Đặt tên con' },
  { id: 'tab-xiangqi', name: 'Cờ tướng' },
  { id: 'tab-wheel', name: 'Quay ngẫu nhiên' },
  { id: 'tab-html-runner', name: 'HTML runner' },
  { id: 'tab-image-to-svg', name: 'Tạo ảnh SVG' },
];

const toolMap = {
  'tab-home': 'project/00-home',
  'tab-calc': 'project/01-calc',
  'tab-finance': 'project/02-finance',
  'tab-calendar': 'project/03-calendar',
  'tab-time-calc': 'project/04-time-calc',
  'tab-baby-name': 'project/05-baby-name',
  'tab-xiangqi': 'project/06-xiangqi',
  'tab-wheel': 'project/07-wheel',
  'tab-html-runner': 'project/08-html-runner',
  'tab-image-to-svg': 'project/09-image-to-svg',
};

// --- Perf: HTML prefetch cache + idempotent CSS injection ---
const _htmlCache = {};
const _cssInjected = new Set();

function _injectCSS(tabId, toolDir) {
  if (_cssInjected.has(tabId)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/' + toolDir + '/style.css';
  link.dataset.tool = tabId;
  document.head.appendChild(link);
  _cssInjected.add(tabId);
}

async function _prefetchTool(tabId) {
  if (_htmlCache[tabId] || document.getElementById(tabId)) return;
  const toolDir = toolMap[tabId];
  if (!toolDir) return;
  try {
    _injectCSS(tabId, toolDir);
    const res = await fetch('/' + toolDir + '/content.html');
    if (res.ok) _htmlCache[tabId] = await res.text();
  } catch (_) { /* silent prefetch fail */ }
}

function _prefetchAll(excludeTabId) {
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 400));
  // Only prefetch the next 2 tools to reduce load
  const toolIds = Object.keys(toolMap).filter(id => id !== excludeTabId);
  const toPrefetch = toolIds.slice(0, 2); // Limit to 2
  toPrefetch.forEach((tabId) => {
    idle(() => _prefetchTool(tabId), { timeout: 10000 });
  });
}
// --- End Perf ---

// UI Elements
const desktopProjectsMenu = document.getElementById('desktop-projects-menu');
const mobileNav = document.getElementById('mobile-nav');
const mobileMenu = document.getElementById('mobile-menu');
const mainHeader = document.getElementById('main-header');

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

// Loading spinner
function _showLoading() {
  const app = document.getElementById('app-container');
  let sk = document.getElementById('_load-sk');
  if (sk) sk.remove();
  sk = document.createElement('div');
  sk.id = '_load-sk';
  sk.style.cssText = 'display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;min-height:300px;padding:48px 24px;';
  sk.innerHTML = '<div style="width:44px;height:44px;border-radius:50%;border:3px solid rgba(249,115,22,.15);border-top-color:#f97316;animation:_ldspin .7s linear infinite"></div>' +
    '<p style="font-size:12px;color:#52525b;font-weight:500;margin:0">Loading project...</p>' +
    '<style>@keyframes _ldspin{to{transform:rotate(360deg)}}</style>';
  app.appendChild(sk);
}

function _hideLoading() {
  const sk = document.getElementById('_load-sk');
  if (sk) sk.remove();
}

// --- Hash Routing ---
// URL dùng hash: /#tab-calc, /#tab-xiangqi, v.v.
// F5 luôn load index.html → JS đọc hash → đúng tab, không cần server routing.

function _getTabFromHash() {
  const hash = window.location.hash.replace('#', '').trim();
  if (hash && toolMap[hash]) return hash;
  return 'tab-home';
}

function _setHash(tabId) {
  const newHash = tabId === 'tab-home' ? '#' : '#' + tabId;
  if (window.location.hash !== newHash) {
    window.location.hash = newHash;
  }
}

// Dọn state post khi rời home tab
function _cleanHomeState() {
  // Đóng tất cả các post đang mở trong tab home
  document.querySelectorAll('[id^="content-"]').forEach((el) => {
    if (!el.classList.contains('hidden')) {
      el.classList.add('hidden');
    }
  });
  document.querySelectorAll('[id^="icon-"]').forEach((el) => {
    el.innerText = 'XEM';
    el.classList.remove('bg-orange-100', 'text-orange-500');
    el.classList.add('bg-gray-50', 'text-gray-400');
  });
  // Xóa ?post= query param nếu có
  if (window.location.search) {
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
  }
}

// Tab switching
window.loadHomeTab = async function() { await switchTab('tab-home'); };
window.currentTab = null;

async function switchTab(tabId) {
  // Dọn home state khi rời khỏi home tab
  if (window.currentTab === 'tab-home' && tabId !== 'tab-home') {
    _cleanHomeState();
  }

  window.currentTab = tabId;

  document.querySelectorAll('.tab-panel').forEach((p) => {
    p.classList.remove('active');
    p.style.display = 'none';
  });
  document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach((b) => b.classList.remove('active'));
  if (mobileMenu) mobileMenu.classList.add('hidden');

  let targetPanel = document.getElementById(tabId);

  if (!targetPanel) {
    _showLoading();

    const toolDir = toolMap[tabId];
    if (!toolDir) { _hideLoading(); return; }
    try {
      _injectCSS(tabId, toolDir);

      let html;
      if (_htmlCache[tabId]) {
        html = _htmlCache[tabId];
      } else {
        const res = await fetch('/' + toolDir + '/content.html');
        if (!res.ok) throw new Error('Cannot load HTML: ' + toolDir);
        html = await res.text();
      }

      targetPanel = document.createElement('div');
      targetPanel.id = tabId;
      targetPanel.className = 'tab-panel active';
      targetPanel.innerHTML = html;
      document.getElementById('app-container').appendChild(targetPanel);

      const mod = await import('/' + toolDir + '/script.js');
      if (mod.init) mod.init();

    } catch (err) {
      console.error('switchTab error:', err);
      const sk = document.getElementById('_load-sk');
      if (sk) sk.innerHTML = '<p style="color:#f87171;text-align:center;padding:24px;">Lỗi tải: ' + err.message + '</p>';
      return;
    }

    _hideLoading();
  }

  if (targetPanel) {
    document.querySelectorAll('.tab-panel').forEach((p) => {
      p.classList.remove('active');
      p.style.display = 'none';
    });
    targetPanel.classList.add('active');
    targetPanel.style.display = 'block';
    document.querySelectorAll('[data-target="' + tabId + '"]').forEach((b) => b.classList.add('active'));

    // Cập nhật hash URL (không reload trang)
    _setHash(tabId);
  }
}

// Click delegation
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (btn) switchTab(btn.getAttribute('data-action'));
});

// Lắng nghe hash thay đổi (browser back/forward)
window.addEventListener('hashchange', () => {
  const tabId = _getTabFromHash();
  if (tabId !== window.currentTab) {
    switchTab(tabId);
  }
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

// Khởi động: đọc hash để load đúng tab ngay khi vào link
switchTab(_getTabFromHash()).then(() => _prefetchAll(_getTabFromHash()));

// Star background
(() => {
  let bg = document.getElementById('global-star-bg');
  if (bg && bg.children.length > 0) return;
  if (!bg) {
    bg = document.createElement('div');
    bg.id = 'global-star-bg';
    document.body.appendChild(bg);
  }
  const isMobile = window.innerWidth < 768;
  const starCount = isMobile ? 15 : 35; // Reduce stars on mobile
  for (let i = 0; i < starCount; i++) {
    const s = document.createElement('div');
    s.className = 'global-star';
    const sz = Math.random() * 1.5 + 1;
    s.style.width = sz + 'px';
    s.style.height = sz + 'px';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.animationDelay = Math.random() * 5 + 's';
    s.style.animationDuration = (Math.random() * 4 + 3) + 's';
    bg.appendChild(s);
  }
})();