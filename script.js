/* ==========================================================
   PHẦN 1: LÕI HỆ THỐNG (KHÔNG CẦN CHỈNH SỬA)
========================================================== */
const desktopNav = document.getElementById('desktop-nav');
const mobileNav = document.getElementById('mobile-nav');
const appContainer = document.getElementById('app-container');
const mobileMenu = document.getElementById('mobile-menu');

// Bật/tắt menu mobile
document.getElementById('mobile-menu-btn').addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// Hàm chuyển Tab
function switchTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(b => b.classList.remove('active'));
    
    const targetPanel = document.getElementById(tabId);
    if(targetPanel) targetPanel.classList.add('active');
    
    document.querySelectorAll(`[data-target="${tabId}"]`).forEach(b => b.classList.add('active'));
    mobileMenu.classList.add('hidden'); // Tự đóng menu điện thoại
}

// Hàm Đăng ký Công cụ Mới siêu cấp
function registerTool(config) {
    // 1. Tạo nút trên PC
    const dBtn = document.createElement('button');
    dBtn.className = 'nav-btn px-4 py-2 transition hover:text-orange-500';
    dBtn.setAttribute('data-target', config.id);
    dBtn.innerHTML = `${config.icon} ${config.name}`;
    dBtn.onclick = () => switchTab(config.id);
    desktopNav.appendChild(dBtn);

    // 2. Tạo nút trên Mobile
    const mBtn = document.createElement('button');
    mBtn.className = 'mobile-nav-btn text-left px-6 py-3 text-gray-600 hover:bg-orange-50 w-full';
    mBtn.setAttribute('data-target', config.id);
    mBtn.innerHTML = `${config.icon} ${config.name}`;
    mBtn.onclick = () => switchTab(config.id);
    mobileNav.appendChild(mBtn);

    // 3. Tạo Giao diện nội dung (HTML)
    const panel = document.createElement('div');
    panel.id = config.id;
    panel.className = 'tab-panel';
    panel.innerHTML = config.html;
    appContainer.appendChild(panel);

    // 4. Chạy logic JS của tool đó (nếu có)
    if (typeof config.logic === 'function') {
        config.logic();
    }

    // 5. Nếu là tab mặc định thì mở luôn
    if (config.isDefault) {
        switchTab(config.id);
    }
}


/* ==========================================================
   PHẦN 2: CÁC CÔNG CỤ CỦA BẠN (THÊM THOẢI MÁI Ở ĐÂY)
========================================================== */

// --- 1. Tool Trang Chủ ---
registerTool({
    id: 'tab-home',
    name: 'Trang Chủ',
    icon: '🏠',
    isDefault: true,
    html: `
        <div class="text-center py-20">
            <h1 class="text-3xl font-bold">Khu Vực Dành Cho Anh Em</h1>
            <p class="text-gray-500 mt-2">Mọi thứ đã sẵn sàng. Chạm vào menu để bắt đầu.</p>
        </div>
    `
});

// --- 2. Tool Tính Phần Trăm ---
registerTool({
    id: 'tab-calc',
    name: 'Tính Toán',
    icon: '🧮',
    html: `
        <div class="text-center mb-6">
            <h2 class="text-3xl font-bold mt-2">Tính <span class="text-red-500">Phần Trăm</span></h2>
        </div>
        <div class="glass-card p-6 md:p-8 rounded-[2rem]">
            <div class="grid grid-cols-1 md:grid-cols-5 items-center gap-4">
                <div class="md:col-span-2">
                    <label class="text-[10px] uppercase font-bold text-gray-400">Phần trăm (%)</label>
                    <input type="number" id="input-p" placeholder="30" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200">
                </div>
                <div class="text-center font-bold text-gray-300 mt-4">của</div>
                <div class="md:col-span-2">
                    <label class="text-[10px] uppercase font-bold text-gray-400">Giá trị</label>
                    <input type="number" id="input-v" placeholder="250000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200">
                </div>
            </div>
            <div class="mt-8 p-4 bg-red-50 rounded-2xl text-center">
                <div id="calc-result" class="text-3xl font-bold text-red-600">0</div>
            </div>
        </div>
    `,
    logic: function() {
        // Logic JS của tab này viết gọn trong đây
        const inP = document.getElementById('input-p');
        const inV = document.getElementById('input-v');
        const resBox = document.getElementById('calc-result');

        const doCalc = () => {
            const result = (parseFloat(inP.value || 0) / 100) * parseFloat(inV.value || 0);
            resBox.innerText = result.toLocaleString('vi-VN');
        };
        inP.oninput = doCalc;
        inV.oninput = doCalc;
    }
});

// --- 3. Tool Markdown ---
registerTool({
    id: 'tab-md',
    name: 'Đọc MD',
    icon: '📝',
    html: `
        <div class="text-center mb-6">
            <h2 class="text-3xl font-bold mt-2">Trình đọc <span class="text-orange-500">Markdown</span></h2>
        </div>
        <div class="glass-card p-6 md:p-8 rounded-[2rem]">
            <textarea id="md-input" class="w-full h-32 bg-gray-50 rounded-xl p-4 font-mono text-sm border border-gray-200" placeholder="# Gõ Markdown vào đây..."></textarea>
            <div id="md-preview" class="prose-custom mt-4 p-6 bg-white rounded-xl shadow-inner min-h-[100px] border border-gray-100"></div>
        </div>
    `,
    logic: function() {
        const mdIn = document.getElementById('md-input');
        const mdPre = document.getElementById('md-preview');
        mdIn.addEventListener('input', () => {
            if(window.marked) mdPre.innerHTML = marked.parse(mdIn.value);
        });
    }
});

