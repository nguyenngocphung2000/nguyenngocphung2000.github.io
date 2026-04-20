// Core Configuration
const menuConfig = [
  { id: "tab-calc", name: "Tính Toán" },
  { id: "tab-finance", name: "Lãi Suất" },
  { id: "tab-calendar", name: "Lịch Vạn Niên" },
  { id: "tab-time-calc", name: "Thời Gian" },
  { id: "tab-baby-name", name: "Đặt Tên Con" },
  { id: "tab-xiangqi", name: "Cờ Tướng" },
  { id: "tab-wheel", name: "Quay ngẫu nhiên" },
  { id: "tab-html-runner", name: "HTML Runner" },
  { id: "tab-image-to-svg", name: "Tạo ảnh SVG" },
];

const toolMap = {
  "tab-home": "./tools/01-home.js",
  "tab-contact": "./tools/11-contact.js",
  "tab-about": "./tools/12-about.js",
  "tab-calc": "./tools/02-calc.js",
  "tab-finance": "./tools/03-finance.js",
  "tab-calendar": "./tools/04-calendar.js",
  "tab-time-calc": "./tools/05-time-calc.js",
  "tab-baby-name": "./tools/06-baby-name.js",
  "tab-xiangqi": "./tools/07-xiangqi.js",
  "tab-wheel": "./tools/08-wheel.js",
  "tab-html-runner": "./tools/09-html-runner.js",
  "tab-image-to-svg": "./tools/10-image-to-svg.js",
};

// UI Elements
// UI Elements
const desktopProjectsMenu = document.getElementById("desktop-projects-menu");
const mobileNav = document.getElementById("mobile-nav");
const mobileMenu = document.getElementById("mobile-menu");
const mainHeader = document.getElementById("main-header");

if (mobileMenu) {
  mobileMenu.classList.add("max-h-[70vh]", "overflow-y-auto", "custom-scrollbar");
}

// Generate Menu
if (desktopProjectsMenu && mobileNav) {
  desktopProjectsMenu.innerHTML = "";
  mobileNav.innerHTML = "";
  menuConfig.forEach((tool) => {
    desktopProjectsMenu.innerHTML += `
      <button data-action="${tool.id}" data-target="${tool.id}" 
          class="nav-btn w-full text-left px-4 py-2 hover:bg-orange-500/10 text-gray-400 hover:text-orange-500 transition text-[12px] font-bold uppercase tracking-wider border-l-2 border-transparent hover:border-orange-500">
          ${tool.name}
      </button>`;

    mobileNav.innerHTML += `
      <button data-action="${tool.id}" data-target="${tool.id}" 
          class="mobile-nav-btn block w-full px-4 py-2 text-left text-gray-300 hover:bg-orange-500/10 transition border-l-2 border-transparent hover:border-orange-500 text-[11px] font-bold uppercase tracking-widest rounded-r-xl">
          ${tool.name}
      </button>`;
  });
}

// Routing & Tab Switching
export async function switchTab(tabId) {
  document.querySelectorAll(".tab-panel").forEach((p) => {
    p.classList.remove("active");
    p.style.display = "none";
  });
  document.querySelectorAll(".nav-btn, .mobile-nav-btn").forEach((b) => b.classList.remove("active"));
  if (mobileMenu) mobileMenu.classList.add("hidden");

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
    document.querySelectorAll(".tab-panel").forEach((p) => {
      p.classList.remove("active");
      p.style.display = "none";
    });
    targetPanel.classList.add("active");
    targetPanel.style.display = "block";
    document.querySelectorAll(`[data-target="${tabId}"]`).forEach((b) => b.classList.add("active"));

    const newUrl = new URL(window.location);
    if (tabId !== "tab-home") newUrl.searchParams.delete("post");
    newUrl.hash = tabId;
    window.history.replaceState(null, null, newUrl);
  }
}

window.exportSwitchTab = switchTab; // Allow external modules to use it securely if needed.

// Events
document.addEventListener("click", (e) => {
  const tabAction = e.target.closest("[data-action]");
  if (tabAction) {
    switchTab(tabAction.getAttribute("data-action"));
    return;
  }
});

if (mainHeader) {
  window.addEventListener("scroll", () => {
    mainHeader.classList.toggle("header-scrolled", window.scrollY > 50);
  });
}

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
  document.addEventListener("click", (e) => {
    if (!mobileMenu.classList.contains("hidden") && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });
}

// Gesture Prevents iOS
document.addEventListener("touchmove", (e) => {
  if (e.scale !== 1 && e.scale !== undefined) e.preventDefault();
}, { passive: false });
document.addEventListener("gesturestart", (e) => e.preventDefault());

// Init Tab
let initialTab = "tab-home";
if (window.location.hash) {
  const hashTab = window.location.hash.substring(1);
  if (toolMap[hashTab]) initialTab = hashTab;
}
switchTab(initialTab);

// Ambient Star Background
(() => {
  if (document.getElementById("global-star-bg") && document.getElementById("global-star-bg").children.length > 0) return;
  
  let starContainer = document.getElementById("global-star-bg");
  if (!starContainer) {
      starContainer = document.createElement("div");
      starContainer.id = "global-star-bg";
      document.body.appendChild(starContainer);
  }
  
  for (let i = 0; i < 35; i++) {
    let star = document.createElement("div");
    star.className = "global-star";
    let size = Math.random() * 1.5 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.animationDuration = Math.random() * 4 + 3 + "s";
    starContainer.appendChild(star);
  }
})();
