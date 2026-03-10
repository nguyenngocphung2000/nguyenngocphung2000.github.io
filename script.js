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

// --- 2. Tool Tính Phần Trăm (Đủ 4 chức năng chuẩn ảnh) ---
registerTool({
    id: 'tab-calc',
    name: 'Tính Toán',
    icon: '🧮',
    html: `
        <div class="text-center mb-8">
            <span class="bg-yellow-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase text-yellow-900">Công cụ tính toán</span>
            <h2 class="text-4xl font-bold mt-3 text-gray-800">Tính <span class="text-red-500">Phần Trăm</span> 🧮</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Tính nhanh % giảm giá, tiết kiệm bao nhiêu, hay so sánh giá trị <br class="hidden md:block"> — không cần máy tính.</p>
        </div>

        <div class="space-y-6">
            
            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">%</div>
                    <div>
                        <h3 class="font-bold text-gray-800">X phần trăm của Y là bao nhiêu?</h3>
                        <p class="text-[11px] text-gray-400 mt-1">Ví dụ: giảm 30% của 250.000đ thì tiết kiệm được bao nhiêu?</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-4">
                    <div class="flex-1 min-w-[100px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phần trăm</label>
                        <input type="number" id="c1-p" placeholder="30" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">% của</div>
                    <div class="flex-1 min-w-[120px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị</label>
                        <input type="number" id="c1-v" placeholder="250000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                    <div class="flex-1 min-w-[120px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2 opacity-0">KQ</label>
                        <input type="text" id="c1-res" readonly placeholder="?" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 text-red-500 font-bold text-center outline-none">
                    </div>
                </div>
                <div class="text-right mt-3"><button id="c1-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá</button></div>
            </div>

            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">÷</div>
                    <div>
                        <h3 class="font-bold text-gray-800">X là bao nhiêu phần trăm của Y?</h3>
                        <p class="text-[11px] text-gray-400 mt-1">Ví dụ: 45.000đ là bao nhiêu % của 180.000đ?</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-4">
                    <div class="flex-1 min-w-[100px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị X</label>
                        <input type="number" id="c2-x" placeholder="45000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-xs text-center">là bao nhiêu % của</div>
                    <div class="flex-1 min-w-[100px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị Y</label>
                        <input type="number" id="c2-y" placeholder="180000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                    <div class="flex-[0.8] min-w-[80px] flex items-end">
                        <input type="text" id="c2-res" readonly placeholder="?" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 text-red-500 font-bold text-center outline-none">
                        <span class="ml-2 pb-3 font-bold text-gray-800">%</span>
                    </div>
                </div>
                <div class="text-right mt-3"><button id="c2-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá</button></div>
            </div>

            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">↕</div>
                    <div>
                        <h3 class="font-bold text-gray-800">Thay đổi phần trăm giữa hai giá trị</h3>
                        <p class="text-[11px] text-gray-400 mt-1">Ví dụ: giá cũ 200.000đ, giá mới 150.000đ — giảm bao nhiêu %?</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-4">
                    <div class="flex-1 min-w-[110px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá cũ / gốc</label>
                        <input type="number" id="c3-old" placeholder="200000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">→</div>
                    <div class="flex-1 min-w-[110px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá mới</label>
                        <input type="number" id="c3-new" placeholder="150000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                    <div class="flex-[0.8] min-w-[80px] flex items-end">
                        <input type="text" id="c3-res" readonly placeholder="?" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 text-red-500 font-bold text-center outline-none">
                        <span class="ml-2 pb-3 font-bold text-gray-800">%</span>
                    </div>
                </div>
                <div class="text-right mt-3"><button id="c3-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá</button></div>
            </div>

            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">🏷️</div>
                    <div>
                        <h3 class="font-bold text-gray-800">Giá sau khi giảm / tăng phần trăm</h3>
                        <p class="text-[11px] text-gray-400 mt-1">Ví dụ: giá 320.000đ giảm 15% — trả bao nhiêu?</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-3">
                    <div class="flex-[1.5] min-w-[120px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá gốc</label>
                        <input type="number" id="c4-v" placeholder="320000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                    </div>
                    <div class="min-w-[80px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2 opacity-0">Loại</label>
                        <select id="c4-type" class="w-full bg-white border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-bold text-gray-600 appearance-none text-center cursor-pointer">
                            <option value="giam">giảm</option>
                            <option value="tang">tăng</option>
                        </select>
                    </div>
                    <div class="flex-1 min-w-[80px] flex items-end">
                        <div class="w-full">
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phần trăm</label>
                            <input type="number" id="c4-p" placeholder="15" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold">
                        </div>
                        <span class="ml-2 pb-3 font-bold text-gray-800">%</span>
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                    <div class="flex-[1.5] min-w-[120px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2 opacity-0">KQ</label>
                        <input type="text" id="c4-res" readonly placeholder="?" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 text-red-500 font-bold text-center outline-none">
                    </div>
                </div>
                <div class="text-right mt-3"><button id="c4-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá</button></div>
            </div>

        </div>
    `,
    logic: function() {
        // Hàm format số cho đẹp (1.000.000)
        const fmt = (num) => Number.isInteger(num) ? num.toLocaleString('vi-VN') : Number(num.toFixed(2)).toLocaleString('vi-VN');

        // Logic Card 1: X % của Y
        const c1P = document.getElementById('c1-p'), c1V = document.getElementById('c1-v'), c1Res = document.getElementById('c1-res');
        const calc1 = () => {
            if(c1P.value && c1V.value) c1Res.value = fmt((parseFloat(c1P.value) / 100) * parseFloat(c1V.value));
            else c1Res.value = "";
        };
        c1P.oninput = calc1; c1V.oninput = calc1;
        document.getElementById('c1-clear').onclick = () => { c1P.value = c1V.value = c1Res.value = ""; };

        // Logic Card 2: X là bao nhiêu % của Y
        const c2X = document.getElementById('c2-x'), c2Y = document.getElementById('c2-y'), c2Res = document.getElementById('c2-res');
        const calc2 = () => {
            if(c2X.value && c2Y.value && parseFloat(c2Y.value) !== 0) c2Res.value = fmt((parseFloat(c2X.value) / parseFloat(c2Y.value)) * 100);
            else c2Res.value = "";
        };
        c2X.oninput = calc2; c2Y.oninput = calc2;
        document.getElementById('c2-clear').onclick = () => { c2X.value = c2Y.value = c2Res.value = ""; };

        // Logic Card 3: Thay đổi phần trăm
        const c3Old = document.getElementById('c3-old'), c3New = document.getElementById('c3-new'), c3Res = document.getElementById('c3-res');
        const calc3 = () => {
            if(c3Old.value && c3New.value && parseFloat(c3Old.value) !== 0) {
                const oldV = parseFloat(c3Old.value), newV = parseFloat(c3New.value);
                let diff = ((newV - oldV) / oldV) * 100;
                c3Res.value = (diff > 0 ? "+" : "") + fmt(diff);
            } else c3Res.value = "";
        };
        c3Old.oninput = calc3; c3New.oninput = calc3;
        document.getElementById('c3-clear').onclick = () => { c3Old.value = c3New.value = c3Res.value = ""; };

        // Logic Card 4: Giá sau tăng/giảm
        const c4V = document.getElementById('c4-v'), c4Type = document.getElementById('c4-type'), c4P = document.getElementById('c4-p'), c4Res = document.getElementById('c4-res');
        const calc4 = () => {
            if(c4V.value && c4P.value) {
                const v = parseFloat(c4V.value), p = parseFloat(c4P.value);
                c4Res.value = fmt(c4Type.value === 'giam' ? v * (1 - p/100) : v * (1 + p/100));
            } else c4Res.value = "";
        };
        c4V.oninput = calc4; c4P.oninput = calc4; c4Type.onchange = calc4;
        document.getElementById('c4-clear').onclick = () => { c4V.value = c4P.value = c4Res.value = ""; c4Type.value = "giam"; };
    }
});


// --- 3. Tool Markdown (Đã thêm nút Mở File) ---
registerTool({
    id: 'tab-md',
    name: 'Đọc MD',
    icon: '📝',
    html: `
        <div class="text-center mb-6">
            <h2 class="text-3xl font-bold mt-2">Trình đọc <span class="text-orange-500">Markdown</span></h2>
        </div>
        <div class="glass-card p-6 md:p-8 rounded-[2rem]">
            
            <div class="flex justify-end mb-4">
                <label class="cursor-pointer bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-200 transition shadow-sm">
                    📁 Mở File .md
                    <input type="file" id="md-file" accept=".md" class="hidden">
                </label>
            </div>
            
            <textarea id="md-input" class="w-full h-40 bg-gray-50 rounded-xl p-4 font-mono text-sm border border-gray-100 focus:outline-none focus:ring-2 ring-orange-200" placeholder="# Gõ Markdown vào đây hoặc chọn file..."></textarea>
            
            <div id="md-preview" class="prose-custom mt-6 p-6 bg-white rounded-2xl shadow-inner min-h-[150px] border border-gray-100"></div>
        </div>
    `,
    logic: function() {
        const mdIn = document.getElementById('md-input');
        const mdPre = document.getElementById('md-preview');
        const mdFile = document.getElementById('md-file');

        // Hàm xử lý hiển thị
        const renderMD = () => {
            if(window.marked) mdPre.innerHTML = marked.parse(mdIn.value);
        };

        // 1. Gõ tay đến đâu hiện đến đó
        mdIn.addEventListener('input', renderMD);

        // 2. Logic đọc file từ máy tính
        if (mdFile) {
            mdFile.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function(e) {
                    mdIn.value = e.target.result; // Bơm chữ vào textarea
                    renderMD();                   // Render ra HTML
                };
                reader.readAsText(file);
            });
        }
    }
});
