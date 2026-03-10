/* ==========================================================
   PHẦN 1: LÕI HỆ THỐNG
========================================================== */
const desktopNav = document.getElementById('desktop-nav');
const mobileNav = document.getElementById('mobile-nav');
const appContainer = document.getElementById('app-container');
const mobileMenu = document.getElementById('mobile-menu');

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
    const memoryTab = localStorage.getItem('my_active_tab');
    const defaultTab = appContainer.dataset.defaultTab;
    const targetTabId = urlHash || memoryTab || defaultTab;

    if (targetTabId && document.getElementById(targetTabId)) {
        switchTab(targetTabId);
    } else if (defaultTab) {
        switchTab(defaultTab);
    }
});

/* ==========================================================
   PHẦN 2: CÁC CÔNG CỤ
========================================================== */

// --- 1. Tool Trang Chủ ---
registerTool({
    id: 'tab-home',
    name: 'Trang Chủ',
    icon: '🏠',
    isDefault: true,
    html: `
        <div class="glass-card p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 border-t-4 border-t-orange-400 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            
            <div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-100 border-4 border-white shadow-xl overflow-hidden shrink-0 flex items-center justify-center text-5xl z-10">
                👨‍💻
            </div>
            
            <div class="text-center md:text-left flex-1 z-10">
                <div class="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">Creator / Developer</div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Xin chào, tôi là <span class="text-orange-500">Nothing (N.Phụng)</span></h1>
                <p class="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                    <strong class="text-orange-600">NOTHING BUT SOMETHING</strong> • Chào mừng mọi người đến với không gian nhỏ của tôi. Nơi đây tôi lưu trữ các công cụ tiện ích do mình tự code và chia sẻ những bài hướng dẫn, thủ thuật hay ho mà tôi sưu tầm hoặc tự nghĩ ra. Cứ thoải mái vọc vạch nhé!
                </p>
                <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-50 transition">#TipsMacOs</span>
                    <span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-50 transition">#Automation</span>
                    <span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-50 transition">#Nothing</span>
                </div>
            </div>
        </div>

        <div class="mb-6 flex items-center gap-3 px-2">
            <span class="text-2xl">📚</span>
            <h2 class="text-2xl font-bold text-gray-800">Thủ thuật & Hướng dẫn</h2>
        </div>
        
        <div id="guide-list" class="space-y-4"></div>
    `,
    logic: function() {
        const guides = [
           {
                title: "ℹ️ Contact me",
                date: "Nothing",
                content: `
- Telegram: [@nothing3272](https://t.me/nothing3272)
- Facebook: [Nguyễn Ngọc Phụng](https://www.facebook.com/share/1Ayyxg5kjH/?mibextid=wwXIfr) `
            },
            {
                title: "🤖 Tạo Bot Telegram quản lý tài chính với Google Sheet",
                date: "Nothing",
                content: `
# Quản lý thu chi tự động qua tin nhắn
Bot Telegram kết hợp Google Sheet là một cách tuyệt vời để bạn ghi chép thu chi mọi lúc mọi nơi mà không cần mở các app rườm rà.

🔗 **[Xem mã nguồn và Hướng dẫn chi tiết tại GitHub của tôi](https://github.com/nguyenngocphung2000/BOTTelegram-QLCT)**
                `
            },
            {
                title: "📅 Cài Lịch Âm trên macOS (LunarV)",
                date: "Thủ thuật Mac",
                content: `
# Xem Lịch Âm trên thanh menu
Thay vì cài các app nặng nề, LunarV giúp bạn xem lịch âm trực tiếp trên menu bar của Mac cực kỳ tiện lợi và gọn nhẹ.

🔗 **[Tải LunarV tại GitHub](https://github.com/PhamHungTien/LunarV)**
                `
            },
            {
                title: "⌨️ Bộ gõ tiếng Việt trên Mac",
                date: "Thủ thuật Mac",
                content: `
# Tạm biệt lỗi gạch chân khó chịu
Nếu bạn đang mệt mỏi với bộ gõ mặc định của macOS hay bị nhảy chữ, mất chữ, hãy thử ngay các bộ gõ mã nguồn mở cực kỳ nhẹ và ổn định này:

- ⌨️ **[PHTV - Tải về tại đây](https://github.com/PhamHungTien/PHTV)**
- ⌨️ **[Xkey - Tải về tại đây](https://github.com/xmannv/xkey)**
                `
            }
        ];

        const guideList = document.getElementById('guide-list');

        guides.forEach((guide, index) => {
            const item = document.createElement('div');
            item.className = 'glass-card rounded-[1.5rem] overflow-hidden border border-orange-50 shadow-sm transition hover:shadow-md';
            
            item.innerHTML = `
                <button class="w-full text-left p-5 md:px-6 flex items-center justify-between focus:outline-none group" onclick="toggleGuide(${index})">
                    <div>
                        <h3 class="font-bold text-gray-800 group-hover:text-orange-500 transition text-lg pr-4">${guide.title}</h3>
                        <p class="inline-block mt-2 bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">${guide.date}</p>
                    </div>
                    <div id="icon-${index}" class="text-gray-400 transform transition-transform duration-300 w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-orange-100 group-hover:text-orange-500 shrink-0">
                        ▼
                    </div>
                </button>
                <div id="content-${index}" class="hidden border-t border-orange-50 bg-white/60">
                    <div class="prose-custom p-6 md:p-8" id="md-render-${index}"></div>
                </div>
            `;
            guideList.appendChild(item);
        });

        window.toggleGuide = function(index) {
            const contentDiv = document.getElementById('content-' + index);
            const iconDiv = document.getElementById('icon-' + index);
            const renderDiv = document.getElementById('md-render-' + index);

            if (contentDiv.classList.contains('hidden')) {
                guides.forEach((_, i) => {
                    if (i !== index) {
                        document.getElementById('content-' + i).classList.add('hidden');
                        document.getElementById('icon-' + i).style.transform = 'rotate(0deg)';
                    }
                });

                contentDiv.classList.remove('hidden');
                iconDiv.style.transform = 'rotate(180deg)';
                
                if (renderDiv.innerHTML.trim() === '') {
                    if (window.marked) {
                        let text = guides[index].content;
                        text = text.replace(/^@time\[(.*?)\] (.*)$/gm, '<div class="md-timeline-node"><span class="md-time-badge">$1</span><div class="md-time-text">$2</div></div>');
                        renderDiv.innerHTML = marked.parse(text);

                        renderDiv.querySelectorAll('a').forEach(link => {
                            link.setAttribute('target', '_blank');
                            link.className = 'text-orange-500 font-bold hover:underline';
                        });
                    } else {
                        renderDiv.innerHTML = "<p class='text-red-500'>Lỗi: Không tải được thư viện Markdown.</p>";
                    }
                }
            } else {
                contentDiv.classList.add('hidden');
                iconDiv.style.transform = 'rotate(0deg)';
            }
        };
    }
});

// --- 2. Tool Tính Phần Trăm ---
registerTool({
    id: 'tab-calc',
    name: 'Tính Toán',
    icon: '🧮',
    html: `
        <div class="text-center mb-8">
            <span class="bg-yellow-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase text-yellow-900">Công cụ tính toán</span>
            <h2 class="text-4xl font-bold mt-3 text-gray-800">Tính <span class="text-red-500">Phần Trăm</span> 🧮</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Nhập 2 ô bất kỳ, ô còn lại sẽ tự động tính!</p>
        </div>

        <div class="space-y-6">
            
            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative border-l-4 border-l-orange-400">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">%</div>
                    <div><h3 class="font-bold text-gray-800">X phần trăm của Y là bao nhiêu?</h3></div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-4">
                    <div class="flex-1 min-w-[100px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phần trăm</label>
                        <input type="number" id="c1-p" placeholder="30" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">% của</div>
                    <div class="flex-1 min-w-[120px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị</label>
                        <input type="number" id="c1-v" placeholder="250000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                    <div class="flex-1 min-w-[120px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Kết quả</label>
                        <input type="number" id="c1-res" placeholder="75000" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500">
                    </div>
                </div>
                <div class="text-right mt-4 flex justify-end space-x-4">
                    <button id="c1-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-3 py-1 bg-blue-50 rounded-full">💾 Lưu KQ</button>
                    <button id="c1-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá ô</button>
                </div>
            </div>

            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative border-l-4 border-l-orange-400">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">÷</div>
                    <div><h3 class="font-bold text-gray-800">X là bao nhiêu phần trăm của Y?</h3></div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-4">
                    <div class="flex-1 min-w-[100px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị X</label>
                        <input type="number" id="c2-x" placeholder="45000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-xs text-center">là % của</div>
                    <div class="flex-1 min-w-[100px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị Y</label>
                        <input type="number" id="c2-y" placeholder="180000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                    <div class="flex-[0.8] min-w-[80px] flex items-end">
                        <div class="w-full">
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phần trăm</label>
                            <input type="number" id="c2-res" placeholder="25" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500">
                        </div>
                        <span class="ml-2 pb-3 font-bold text-gray-800">%</span>
                    </div>
                </div>
                <div class="text-right mt-4 flex justify-end space-x-4">
                    <button id="c2-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-3 py-1 bg-blue-50 rounded-full">💾 Lưu KQ</button>
                    <button id="c2-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá ô</button>
                </div>
            </div>

            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative border-l-4 border-l-orange-400">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">↕</div>
                    <div><h3 class="font-bold text-gray-800">Thay đổi phần trăm giữa hai giá trị</h3></div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-4">
                    <div class="flex-1 min-w-[110px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá cũ / gốc</label>
                        <input type="number" id="c3-old" placeholder="200000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">→</div>
                    <div class="flex-1 min-w-[110px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá mới</label>
                        <input type="number" id="c3-new" placeholder="150000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                    <div class="flex-[0.8] min-w-[80px] flex items-end">
                        <div class="w-full">
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Tăng/Giảm</label>
                            <input type="number" id="c3-res" placeholder="-25" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500">
                        </div>
                        <span class="ml-2 pb-3 font-bold text-gray-800">%</span>
                    </div>
                </div>
                <div class="text-right mt-4 flex justify-end space-x-4">
                    <button id="c3-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-3 py-1 bg-blue-50 rounded-full">💾 Lưu KQ</button>
                    <button id="c3-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá ô</button>
                </div>
            </div>
            <div class="glass-card p-6 md:p-8 rounded-[2rem] relative border-l-4 border-l-orange-400 mt-6">
                <div class="flex items-start space-x-3 mb-5">
                    <div class="bg-orange-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">🏛️</div>
                    <div><h3 class="font-bold text-gray-800">Chuyển đổi Số La Mã (1 - 3999)</h3></div>
                </div>
                <div class="flex flex-wrap items-end gap-2 md:gap-4">
                    <div class="flex-1 min-w-[140px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số Thường (Ả Rập)</label>
                        <input type="number" id="ro-arabic" placeholder="2026" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                    </div>
                    <div class="pb-3 font-bold text-gray-400 text-xl text-center flex items-center">↔</div>
                    <div class="flex-1 min-w-[140px]">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số La Mã</label>
                        <input type="text" id="ro-roman" placeholder="MMXXVI" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500 uppercase">
                    </div>
                </div>
                <div class="text-right mt-4 flex justify-end space-x-4">
                    <button id="ro-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-3 py-1 bg-blue-50 rounded-full">💾 Lưu KQ</button>
                    <button id="ro-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition">⟲ Xoá ô</button>
                </div>
            </div>

            <div class="mt-8 bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-orange-100 shadow-xl shadow-orange-100/50">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-bold text-gray-800 flex items-center gap-2"><span>🕒</span> Lịch sử tính toán</h3>
                    <button id="clear-history" class="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full transition">🗑️ Xoá lịch sử</button>
                </div>
                <ul id="history-list" class="space-y-3 text-sm text-gray-600 max-h-60 overflow-y-auto pr-2">
                    </ul>
            </div>
        </div>
    `,
    logic: function() {
        const fmt = (num) => Number.isInteger(num) ? num.toLocaleString('vi-VN') : Number(num.toFixed(2)).toLocaleString('vi-VN');
        const clean = (num) => parseFloat(num.toFixed(2));

        const getTarget = (i1, i2, i3) => {
            const arr = [i1, i2, i3].map(el => ({ el, time: parseInt(el.dataset.last || 0) }));
            arr.sort((a, b) => a.time - b.time);
            return arr[0].el;
        };

        const attachLogic = (inputs, calcFunc) => {
            inputs.forEach(input => {
                input.addEventListener('input', (e) => {
                    e.target.dataset.last = Date.now();
                    calcFunc();
                });
            });
        };

        const c1P = document.getElementById('c1-p'), c1V = document.getElementById('c1-v'), c1Res = document.getElementById('c1-res');
        const calc1 = () => {
            const target = getTarget(c1P, c1V, c1Res);
            const p = parseFloat(c1P.value), v = parseFloat(c1V.value), r = parseFloat(c1Res.value);
            if (target === c1Res && !isNaN(p) && !isNaN(v)) c1Res.value = clean((p * v) / 100);
            else if (target === c1V && !isNaN(p) && !isNaN(r) && p !== 0) c1V.value = clean((r * 100) / p);
            else if (target === c1P && !isNaN(v) && !isNaN(r) && v !== 0) c1P.value = clean((r / v) * 100);
        };
        attachLogic([c1P, c1V, c1Res], calc1);

        const c2X = document.getElementById('c2-x'), c2Y = document.getElementById('c2-y'), c2Res = document.getElementById('c2-res');
        const calc2 = () => {
            const target = getTarget(c2X, c2Y, c2Res);
            const x = parseFloat(c2X.value), y = parseFloat(c2Y.value), r = parseFloat(c2Res.value);
            if (target === c2Res && !isNaN(x) && !isNaN(y) && y !== 0) c2Res.value = clean((x / y) * 100);
            else if (target === c2X && !isNaN(r) && !isNaN(y)) c2X.value = clean((r * y) / 100);
            else if (target === c2Y && !isNaN(x) && !isNaN(r) && r !== 0) c2Y.value = clean((x / r) * 100);
        };
        attachLogic([c2X, c2Y, c2Res], calc2);

        const c3Old = document.getElementById('c3-old'), c3New = document.getElementById('c3-new'), c3Res = document.getElementById('c3-res');
        const calc3 = () => {
            const target = getTarget(c3Old, c3New, c3Res);
            const o = parseFloat(c3Old.value), n = parseFloat(c3New.value), r = parseFloat(c3Res.value);
            if (target === c3Res && !isNaN(o) && !isNaN(n) && o !== 0) c3Res.value = clean(((n - o) / o) * 100);
            else if (target === c3New && !isNaN(o) && !isNaN(r)) c3New.value = clean(o * (1 + r / 100));
            else if (target === c3Old && !isNaN(n) && !isNaN(r) && r !== -100) c3Old.value = clean(n / (1 + r / 100));
        };
        attachLogic([c3Old, c3New, c3Res], calc3);

        const historyList = document.getElementById('history-list');
        const STORAGE_KEY = 'my_calc_history'; 

        const loadHistory = () => {
            const savedData = localStorage.getItem(STORAGE_KEY);
            let historyArr = savedData ? JSON.parse(savedData) : [];
            
            historyList.innerHTML = ''; 
            
            if (historyArr.length > 0) {
                historyArr.forEach(item => {
                    const li = document.createElement('li');
                    li.className = 'bg-white p-3 rounded-xl border border-orange-50 shadow-sm flex items-center before:content-["✓"] before:text-green-500 before:mr-2 before:font-bold text-gray-700 font-medium animate-[fadeIn_0.3s_ease]';
                    li.innerHTML = item;
                    historyList.appendChild(li); 
                });
            } else {
                historyList.innerHTML = '<li class="italic text-gray-400 text-center py-4 empty-msg">Chưa có lịch sử nào. Hãy bấm "Lưu KQ" ở các bảng tính!</li>';
            }
        };

        const addHistory = (textHTML) => {
            const savedData = localStorage.getItem(STORAGE_KEY);
            let historyArr = savedData ? JSON.parse(savedData) : [];
            
            historyArr.unshift(textHTML); 
            
            if (historyArr.length > 20) {
                historyArr.pop(); 
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(historyArr)); 
            loadHistory(); 
        };
        document.getElementById('c1-save').onclick = () => {
            if(c1P.value && c1V.value && c1Res.value) addHistory(`<span class="text-orange-500">${fmt(parseFloat(c1P.value))}%</span> của ${fmt(parseFloat(c1V.value))} = <span class="text-red-500">${fmt(parseFloat(c1Res.value))}</span>`);
        };
        document.getElementById('c2-save').onclick = () => {
            if(c2X.value && c2Y.value && c2Res.value) addHistory(`${fmt(parseFloat(c2X.value))} là <span class="text-orange-500">${fmt(parseFloat(c2Res.value))}%</span> của ${fmt(parseFloat(c2Y.value))}`);
        };
        document.getElementById('c3-save').onclick = () => {
            if(c3Old.value && c3New.value && c3Res.value) {
                const r = parseFloat(c3Res.value);
                const txt = r > 0 ? 'Tăng' : 'Giảm';
                addHistory(`Từ ${fmt(parseFloat(c3Old.value))} → ${fmt(parseFloat(c3New.value))} là <span class="text-${r>0?'green':'red'}-500">${txt} ${fmt(Math.abs(r))}%</span>`);
            }
        };

        document.getElementById('c1-clear').onclick = () => { c1P.value = c1V.value = c1Res.value = ""; c1P.dataset.last = c1V.dataset.last = c1Res.dataset.last = 0; };
        document.getElementById('c2-clear').onclick = () => { c2X.value = c2Y.value = c2Res.value = ""; c2X.dataset.last = c2Y.dataset.last = c2Res.dataset.last = 0; };
        document.getElementById('c3-clear').onclick = () => { c3Old.value = c3New.value = c3Res.value = ""; c3Old.dataset.last = c3New.dataset.last = c3Res.dataset.last = 0; };

        document.getElementById('clear-history').onclick = () => {
            localStorage.removeItem(STORAGE_KEY); 
            loadHistory(); 
        };
        // --- LOGIC TOOL 3: Chuyển đổi Số La Mã ---
        const inArabic = document.getElementById('ro-arabic');
        const inRoman = document.getElementById('ro-roman');

        const romanMap = {M:1000, CM:900, D:500, CD:400, C:100, XC:90, L:50, XL:40, X:10, IX:9, V:5, IV:4, I:1};
        
        const toRoman = (num) => {
            if (num < 1 || num > 3999) return "LỖI";
            let str = '';
            for (let i of Object.keys(romanMap)) {
                let q = Math.floor(num / romanMap[i]);
                num -= q * romanMap[i];
                str += i.repeat(q);
            }
            return str;
        };

        const toArabic = (str) => {
            str = str.toUpperCase();
            let num = 0;
            if (!/^[IVXLCDM]+$/.test(str)) return NaN; 
            for (let i of Object.keys(romanMap)) {
                while (str.indexOf(i) === 0) {
                    num += romanMap[i];
                    str = str.replace(i, '');
                }
            }
            return num;
        };

        inArabic.addEventListener('input', () => {
            const val = parseInt(inArabic.value);
            if (!isNaN(val)) {
                const result = toRoman(val);
                inRoman.value = result === "LỖI" ? "" : result;
            } else {
                inRoman.value = "";
            }
        });

        inRoman.addEventListener('input', () => {
            const val = inRoman.value.trim().toUpperCase();
            if (val) {
                const result = toArabic(val);
                inArabic.value = isNaN(result) ? "" : result;
            } else {
                inArabic.value = "";
            }
        });

        document.getElementById('ro-save').onclick = () => {
            if(inArabic.value && inRoman.value && inRoman.value !== "LỖI") {
                addHistory(`Số <span class="text-orange-500 font-bold">${inArabic.value}</span> = La Mã <span class="text-red-500 font-bold">${inRoman.value}</span>`);
            }
        };
        
        document.getElementById('ro-clear').onclick = () => { inArabic.value = ""; inRoman.value = ""; };

        loadHistory();
    }
});

// --- 3. Tool Markdown ---
registerTool({
    id: 'tab-md',
    name: 'Đọc Markdown(MD)',
    icon: '📝',
    html: `
        <div class="text-center mb-6">
            <h2 class="text-3xl font-bold mt-2">Trình đọc <span class="text-orange-500">Markdown</span></h2>
        </div>
        <div class="glass-card p-6 md:p-8 rounded-[2rem]">
            
            <div class="flex justify-end mb-4">
                <label class="cursor-pointer bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-200 transition shadow-sm">
                    📁 Chọn File(.md)
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

        const renderMD = () => {
            if(window.marked) mdPre.innerHTML = marked.parse(mdIn.value);
        };

        mdIn.addEventListener('input', renderMD);

        if (mdFile) {
            mdFile.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function(e) {
                    mdIn.value = e.target.result; 
                    renderMD();                   
                };
                reader.readAsText(file);
            });
        }
    }
});
// --- 4. Tool Thống kê văn bản ---
registerTool({
    id: 'tab-text-stat',
    name: 'Thống Kê Chữ',
    icon: '📊',
    html: `
        <div class="text-center mb-6">
            <span class="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Tiện ích chữ</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Thống Kê <span class="text-emerald-500">Văn Bản</span> 📊</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Dán văn bản vào đây để xem chi tiết thông số.</p>
        </div>

        <div class="glass-card p-4 md:p-6 rounded-[2rem] max-w-4xl mx-auto border-t-4 border-t-emerald-400 shadow-xl">
            
            <div class="relative w-full">
                <textarea id="ts-input" class="w-full h-48 bg-emerald-50/30 rounded-2xl p-4 font-sans text-sm border border-emerald-100 focus:outline-none focus:ring-2 ring-emerald-300 resize-y shadow-inner text-gray-700 placeholder-gray-400" placeholder="Hãy gõ hoặc dán nội dung vào đây..."></textarea>
                <button id="ts-clear" class="absolute top-4 right-4 text-xs font-bold text-gray-400 hover:text-red-500 bg-white px-2 py-1 rounded shadow-sm border border-gray-100 transition">Xóa trắng</button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600" id="ts-chars">0</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Ký tự</span>
                </div>
                
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600" id="ts-words">0</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Số từ</span>
                </div>
                
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600" id="ts-lines">0</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Số dòng</span>
                </div>
                
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600 flex justify-center items-end gap-1">
                        <span id="ts-bytes">0</span> 
                        <span class="text-sm pb-1 text-emerald-400">KB</span>
                    </span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dung lượng</span>
                </div>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-500 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <div class="mr-4">Không tính dấu cách: <span id="ts-chars-nospace" class="text-emerald-700 font-bold">0</span></div>
                <div>Thời gian đọc (~200 từ/phút): <span id="ts-read-time" class="text-emerald-700 font-bold">0 giây</span></div>
            </div>
        </div>
    `,
    logic: function() {
        const input = document.getElementById('ts-input');
        const outChars = document.getElementById('ts-chars');
        const outWords = document.getElementById('ts-words');
        const outLines = document.getElementById('ts-lines');
        const outBytes = document.getElementById('ts-bytes');
        const outCharsNoSpace = document.getElementById('ts-chars-nospace');
        const outReadTime = document.getElementById('ts-read-time');
        const btnClear = document.getElementById('ts-clear');

        const calculateStats = () => {
            const text = input.value;
            outChars.innerText = text.length;
            outCharsNoSpace.innerText = text.replace(/\s/g, '').length;

            const words = text.trim().split(/\s+/).filter(w => w.length > 0);
            outWords.innerText = words.length;

            outLines.innerText = text.length === 0 ? 0 : text.split('\n').length;

            // Tính KB làm tròn 2 chữ số thập phân
            const byteSize = new Blob([text]).size;
            outBytes.innerText = (byteSize / 1024).toFixed(2);

            const minutes = words.length / 200;
            if (minutes === 0) {
                outReadTime.innerText = "0 giây";
            } else if (minutes < 1) {
                outReadTime.innerText = Math.ceil(minutes * 60) + " giây";
            } else {
                const m = Math.floor(minutes);
                const s = Math.ceil((minutes - m) * 60);
                outReadTime.innerText = `${m} phút ${s} giây`;
            }
        };

        input.addEventListener('input', calculateStats);

        btnClear.addEventListener('click', () => {
            input.value = '';
            calculateStats();
            input.focus();
        });
    }
});

// --- 5. Tool Kí tự đặc biệt (Bản Siêu Cấp: Chữ Thư Pháp + PNG Photoshop) ---
registerTool({
    id: 'tab-special-chars',
    name: 'Kí Tự Đặc Biệt',
    icon: '✨',
    html: `
        <div class="text-center mb-6">
            <span class="bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Sáng tạo</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Tạo Tên <span class="text-purple-500">Đặc Biệt</span> ✨</h2>
            <p class="text-sm text-gray-500 mt-2 italic">100+ đề xuất ngầu & Studio chữ thư pháp PNG tách nền!</p>
        </div>

        <div class="space-y-6 max-w-4xl mx-auto">
            
            <div class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-indigo-400 shadow-xl">
                <div class="flex flex-col md:flex-row justify-between mb-4 gap-4">
                    <div class="flex items-start space-x-3">
                        <div class="bg-indigo-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">🔤</div>
                        <div>
                            <h3 class="font-bold text-gray-800">Studio Chữ Nghệ Thuật (Tải PNG)</h3>
                            <p class="text-xs text-gray-500">Tải font, viết thư pháp dọc và xuất ảnh trong suốt!</p>
                        </div>
                    </div>
                    <label class="cursor-pointer bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-200 transition shadow-sm whitespace-nowrap text-center h-fit">
                        📂 Chọn Font (.ttf, .otf)
                        <input type="file" id="font-upload" accept=".ttf, .otf, .woff, .woff2" class="hidden">
                    </label>
                </div>

                <div class="flex flex-wrap items-center gap-2 mb-4 bg-indigo-50 p-2 md:p-3 rounded-xl border border-indigo-100 text-sm">
                    <button class="font-btn p-2 rounded-lg hover:bg-indigo-200 bg-indigo-200 shadow-sm font-bold text-indigo-700 transition" data-align="left" title="Căn trái">⬅️ Trái</button>
                    <button class="font-btn p-2 rounded-lg hover:bg-indigo-200 bg-transparent font-bold text-indigo-700 transition" data-align="center" title="Căn giữa">↔️ Giữa</button>
                    <button class="font-btn p-2 rounded-lg hover:bg-indigo-200 bg-transparent font-bold text-indigo-700 transition" data-align="right" title="Căn phải">➡️ Phải</button>

                    <div class="w-px h-6 bg-indigo-300 mx-1 hidden md:block"></div>

                    <button id="btn-vertical" class="p-2 rounded-lg hover:bg-indigo-200 bg-white border border-indigo-100 shadow-sm font-bold text-indigo-700 transition" title="Xếp từ theo chiều dọc">⬇️ Dọc</button>

                    <div class="w-px h-6 bg-indigo-300 mx-1 hidden md:block"></div>

                    <div class="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm border border-indigo-100">
                        <input type="color" id="font-color" value="#4f46e5" class="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent" title="Màu chữ">
                        <input type="range" id="font-size" min="20" max="150" value="40" class="w-20 md:w-24 cursor-pointer accent-indigo-500" title="Cỡ chữ">
                    </div>

                    <div class="w-full md:w-px md:h-6 bg-transparent md:bg-indigo-300 mx-1"></div>

                    <button id="btn-download-png" class="flex-1 md:flex-none bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-md transition ml-auto flex justify-center items-center gap-2">
                        <span>📥</span> TẢI PNG
                    </button>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <textarea id="custom-font-input" class="w-full md:w-1/2 h-48 bg-white border border-indigo-100 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-200 text-gray-700 resize-none font-medium placeholder-gray-400" placeholder="Nhập nội dung chữ của bạn vào đây..."></textarea>

                    <div class="w-full md:w-1/2 min-h-[12rem] bg-gray-100 rounded-2xl border border-indigo-200 overflow-hidden relative flex p-4" style="background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;">
                        <div id="custom-font-preview" class="w-full h-full text-[#4f46e5] break-words" style="text-align: left;">Chữ sẽ hiện ở đây</div>
                    </div>
                </div>
            </div>

            <div class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-purple-400 shadow-xl">
                <div class="flex items-start space-x-3 mb-4">
                    <div class="bg-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">🎲</div>
                    <div>
                        <h3 class="font-bold text-gray-800">Máy Tạo Nickname Tự Động</h3>
                        <p class="text-xs text-gray-500">Nhập tên để xuất xưởng 100 siêu phẩm!</p>
                    </div>
                </div>
                
                <div class="relative w-full mb-6">
                    <input type="text" id="nick-input" class="w-full bg-purple-50/50 border-2 border-purple-100 rounded-2xl p-4 pr-32 outline-none focus:border-purple-400 focus:ring-4 ring-purple-100 font-bold text-lg text-purple-700 placeholder-purple-300 transition" placeholder="Nhập tên vào đây...">
                    <button id="btn-gen-nick" class="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-4 md:px-6 rounded-xl transition shadow-md active:scale-95 whitespace-nowrap">TẠO 100 TÊN</button>
                </div>

                <div class="bg-white/50 rounded-2xl p-4 border border-purple-50">
                    <div class="flex justify-between items-center mb-3">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">100 Đề Xuất (Click để Copy)</p>
                        <span id="copy-toast-nick" class="opacity-0 transition-opacity bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Đã Copy! ✔</span>
                    </div>
                    
                    <div id="nick-results" class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        <div class="text-center p-4 text-sm text-gray-400 italic w-full col-span-full">Vui lòng nhập tên và bấm nút TẠO 100 TÊN!</div>
                    </div>
                </div>
            </div>

            <div class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-pink-400 shadow-xl relative">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-start space-x-3">
                        <div class="bg-pink-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">💎</div>
                        <div>
                            <h3 class="font-bold text-gray-800">Kho Kí Tự Tổng Hợp</h3>
                            <p class="text-xs text-gray-500">Chạm vào kí tự bất kỳ để Copy!</p>
                        </div>
                    </div>
                    <span id="copy-toast-lib" class="opacity-0 transition-opacity bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Đã Copy! ✔</span>
                </div>
                
                <div id="char-library" class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"></div>
            </div>
        </div>
    `,
    logic: function() {
        // ==========================================
        // 1. LOGIC STUDIO CHỮ & PNG (Viết dọc kiểu thư pháp)
        // ==========================================
        const fontUpload = document.getElementById('font-upload');
        const fontPreview = document.getElementById('custom-font-preview');
        const fontInput = document.getElementById('custom-font-input');
        const btnVertical = document.getElementById('btn-vertical');
        const fontColor = document.getElementById('font-color');
        const fontSize = document.getElementById('font-size');
        const alignBtns = document.querySelectorAll('.font-btn');
        const btnDownload = document.getElementById('btn-download-png');

        let currentAlign = 'left';
        let isVertical = false;
        let loadedFontName = '';

        const updatePreview = () => {
            let actualText = fontInput.value;
            if (!actualText.trim()) actualText = "Tết trong nhà\nLộc trên trời";
            
            fontPreview.style.color = fontColor.value;
            fontPreview.style.fontSize = fontSize.value + 'px';
            fontPreview.style.fontFamily = loadedFontName || 'sans-serif';

            if (isVertical) {
                // Tách từng dòng thành cột, tách từng từ xuống hàng
                const lines = actualText.split('\n');
                fontPreview.innerHTML = '';
                fontPreview.style.display = 'flex';
                fontPreview.style.flexDirection = 'row';
                
                if (currentAlign === 'center') fontPreview.style.justifyContent = 'center';
                else if (currentAlign === 'right') fontPreview.style.justifyContent = 'flex-end';
                else fontPreview.style.justifyContent = 'flex-start';
                
                fontPreview.style.gap = '2rem';
                fontPreview.style.writingMode = 'horizontal-tb';
                fontPreview.style.textAlign = 'center'; // Canh giữa các từ trong 1 cột
                
                lines.forEach(line => {
                    const col = document.createElement('div');
                    const words = line.trim().split(/\s+/).filter(w => w.length > 0);
                    col.innerHTML = words.join('<br>');
                    fontPreview.appendChild(col);
                });
            } else {
                fontPreview.style.display = 'block';
                fontPreview.style.writingMode = 'horizontal-tb';
                fontPreview.style.textAlign = currentAlign;
                fontPreview.innerHTML = actualText.replace(/\n/g, '<br>');
            }
        };

        fontInput.addEventListener('input', updatePreview);
        fontColor.addEventListener('input', updatePreview);
        fontSize.addEventListener('input', updatePreview);

        fontUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                const fontDataUrl = evt.target.result;
                loadedFontName = 'CustomFont_' + Date.now();
                const newFont = new FontFace(loadedFontName, `url(${fontDataUrl})`);
                newFont.load().then((loaded) => {
                    document.fonts.add(loaded);
                    fontInput.placeholder = "✅ Font tải thành công! Gõ chữ vào đây...";
                    if(!fontInput.value) {
                        fontInput.value = "Tết trong nhà\nLộc trên trời";
                    }
                    updatePreview();
                }).catch(err => alert("Lỗi tải font. Hãy đảm bảo file bạn chọn là định dạng .ttf hoặc .otf!"));
            };
            reader.readAsDataURL(file);
        });

        alignBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                alignBtns.forEach(b => { 
                    b.classList.remove('bg-indigo-200'); 
                    b.classList.add('bg-transparent'); 
                });
                btn.classList.add('bg-indigo-200');
                btn.classList.remove('bg-transparent');
                
                currentAlign = btn.getAttribute('data-align');
                updatePreview();
            });
        });

        btnVertical.addEventListener('click', () => {
            isVertical = !isVertical;
            if(isVertical) {
                btnVertical.classList.add('bg-indigo-500', 'text-white');
                btnVertical.classList.remove('bg-white');
            } else {
                btnVertical.classList.remove('bg-indigo-500', 'text-white');
                btnVertical.classList.add('bg-white');
            }
            updatePreview();
        });

        // XUẤT ẢNH PNG CỰC NÉT
        btnDownload.addEventListener('click', () => {
            let actualText = fontInput.value;
            if (!actualText.trim()) actualText = "Tết trong nhà\nLộc trên trời";

            const scale = 3; 
            const size = parseInt(fontSize.value) * scale; 
            const color = fontColor.value;
            const fontFamily = loadedFontName || 'sans-serif';

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const lines = actualText.split('\n'); 

            ctx.font = `${size}px "${fontFamily}"`;

            if (isVertical) {
                let colWidths = [];
                let totalWidth = 0;
                let maxTotalHeight = 0;
                const gap = size * 1.5; 
                
                const cols = lines.map(line => line.trim().split(/\s+/).filter(w => w.length > 0));
                
                cols.forEach(words => {
                    let maxW = 0;
                    let totalH = 0;
                    words.forEach(word => {
                        let w = ctx.measureText(word).width;
                        if(w > maxW) maxW = w;
                        totalH += size * 1.3;
                    });
                    colWidths.push(maxW);
                    totalWidth += maxW;
                    if(totalH > maxTotalHeight) maxTotalHeight = totalH;
                });
                
                totalWidth += gap * (Math.max(0, cols.length - 1));
                
                canvas.width = totalWidth + (40 * scale);
                canvas.height = maxTotalHeight + (40 * scale);

                ctx.font = `${size}px "${fontFamily}"`; 
                ctx.fillStyle = color;
                ctx.textBaseline = 'top';
                ctx.textAlign = 'center';

                let startX = 20 * scale; 
                let startY = 20 * scale;

                cols.forEach((words, i) => {
                    let curX = startX + (colWidths[i] / 2);
                    let curY = startY;
                    words.forEach(word => {
                        ctx.fillText(word, curX, curY);
                        curY += size * 1.3;
                    });
                    startX += colWidths[i] + gap;
                });
            } else {
                let maxWidth = 0;
                lines.forEach(line => {
                    let w = ctx.measureText(line).width;
                    if(w > maxWidth) maxWidth = w;
                });
                
                canvas.width = maxWidth + (40 * scale);
                canvas.height = (lines.length * size * 1.3) + (40 * scale);

                ctx.font = `${size}px "${fontFamily}"`; 
                ctx.fillStyle = color;
                ctx.textBaseline = 'top';

                let startY = 20 * scale;
                let startX = 20 * scale;

                if (currentAlign === 'center') {
                    ctx.textAlign = 'center';
                    startX = canvas.width / 2;
                } else if (currentAlign === 'right') {
                    ctx.textAlign = 'right';
                    startX = canvas.width - (20 * scale);
                } else {
                    ctx.textAlign = 'left';
                    startX = 20 * scale;
                }

                lines.forEach(line => {
                    ctx.fillText(line, startX, startY);
                    startY += size * 1.3;
                });
            }

            const a = document.createElement('a');
            a.download = 'Chu_Nghe_Thuat_Tach_Nen.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
        });

        // Initialize preview on first load
        updatePreview();

        // ==========================================
        // 2. LOGIC TẠO 100 ĐỀ XUẤT TÊN
        // ==========================================
        const copyToClipboard = (text, toastId) => {
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.getElementById(toastId);
                toast.classList.remove('opacity-0');
                setTimeout(() => toast.classList.add('opacity-0'), 1500);
            });
        };

        const mapCircled = {'a':'ⓐ','b':'ⓑ','c':'ⓒ','d':'ⓓ','e':'ⓔ','f':'ⓕ','g':'ⓖ','h':'ⓗ','i':'ⓘ','j':'ⓙ','k':'ⓚ','l':'ⓛ','m':'ⓜ','n':'ⓝ','o':'ⓞ','p':'ⓟ','q':'ⓠ','r':'ⓡ','s':'ⓢ','t':'ⓣ','u':'ⓤ','v':'ⓥ','w':'ⓦ','x':'ⓧ','y':'ⓨ','z':'ⓩ','A':'Ⓐ','B':'Ⓑ','C':'Ⓒ','D':'Ⓓ','E':'Ⓔ','F':'Ⓕ','G':'Ⓖ','H':'Ⓗ','I':'Ⓘ','J':'Ⓙ','K':'Ⓚ','L':'Ⓛ','M':'Ⓜ','N':'Ⓝ','O':'Ⓞ','P':'Ⓟ','Q':'Ⓠ','R':'Ⓡ','S':'Ⓢ','T':'Ⓣ','U':'Ⓤ','V':'Ⓥ','W':'Ⓦ','X':'Ⓧ','Y':'Ⓨ','Z':'Ⓩ'};
        const mapSmallCaps = {'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ғ','g':'ɢ','h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ','s':'s','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ'};
        const mapThai = {'a':'ค','b':'๒','c':'८','d':'๔','e':'є','f':'Ŧ','g':'g','h':'ђ','i':'เ','j':'ן','k':'к','l':'ɭ','m':'๓','n':'ภ','o':'๏','p':'ק','q':'ף','r':'г','s':'ร','t':'т','u':'ย','v':'ש','w':'ฬ','x':'א','y':'ץ','z':'z'};
        const mapAsian = {'a':'卂','b':'乃','c':'匚','d':'刀','e':'乇','f':'千','g':'Ꮆ','h':'卄','i':'丨','j':'ﾌ','k':'Ҝ','l':'ㄥ','m':'爪','n':'几','o':'ㄖ','p':'卩','q':'Ɋ','r':'尺','s':'丂','t':'ㄒ','u':'ㄩ','v':'ᐯ','w':'ᗯ','x':'乂','y':'ㄚ','z':'乙'};
        const mapBold = {'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷','k':'𝗸','l':'𝗹','m':'𝗺','n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁','u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇','A':'𝗔','B':'𝗕','C':'𝗖','D':'𝗗','E':'𝗘','F':'𝗙','G':'𝗚','H':'𝗛','I':'𝗜','J':'𝗝','K':'𝗞','L':'𝗟','M':'𝗠','N':'𝗡','O':'𝗢','P':'𝗣','Q':'𝗤','R':'𝗥','S':'𝗦','T':'𝗧','U':'𝗨','V':'𝗩','W':'𝗪','X':'𝗫','Y':'𝗬','Z':'𝗭'};
        const mapItalic = {'a':'𝘢','b':'𝘣','c':'𝘤','d':'𝘥','e':'𝘦','f':'𝘧','g':'𝘨','h':'𝘩','i':'𝘪','j':'𝘫','k':'𝘬','l':'𝘭','m':'𝘮','n':'𝘯','o':'𝘰','p':'𝘱','q':'𝘲','r':'𝘳','s':'𝘴','t':'𝘵','u':'𝘶','v':'𝘷','w':'𝘸','x':'𝘹','y':'𝘺','z':'𝘻','A':'𝘈','B':'𝘉','C':'𝘊','D':'𝘋','E':'𝘌','F':'𝘍','G':'𝘎','H':'𝘏','I':'𝘐','J':'𝘑','K':'𝘒','L':'𝘓','M':'𝘔','N':'𝘕','O':'𝘖','P':'𝘗','Q':'𝘘','R':'𝘙','S':'𝘚','T':'𝘛','U':'𝘜','V':'𝘝','W':'𝘞','X':'𝘟','Y':'𝘠','Z':'𝘡'};
        const mapDoubleStruck = {'a':'𝕒','b':'𝕓','c':'𝕔','d':'𝕕','e':'𝕖','f':'𝕗','g':'𝕘','h':'𝕙','i':'𝕚','j':'𝕛','k':'𝕜','l':'𝕝','m':'𝕞','n':'𝕟','o':'𝕠','p':'𝕡','q':'𝕢','r':'𝕣','s':'𝕤','t':'𝕥','u':'𝕦','v':'𝕧','w':'𝕨','x':'𝕩','y':'𝕪','z':'𝕫','A':'𝔸','B':'𝔹','C':'ℂ','D':'𝔻','E':'𝔼','F':'𝔽','G':'𝔾','H':'ℍ','I':'𝕀','J':'𝕁','K':'𝕂','L':'𝕃','M':'𝕄','N':'ℕ','O':'𝕆','P':'ℙ','Q':'ℚ','R':'ℝ','S':'𝕊','T':'𝕋','U':'𝕌','V':'𝕍','W':'𝕎','X':'𝕏','Y':'𝕐','Z':'ℤ'};
        const mapScript = {'a':'𝒶','b':'𝒷','c':'𝒸','d':'𝒹','e':'ℯ','f':'𝒻','g':'ℊ','h':'𝒽','i':'𝒾','j':'𝒿','k':'𝓀','l':'𝓁','m':'𝓂','n':'𝓃','o':'ℴ','p':'𝓅','q':'𝓆','r':'𝓇','s':'𝓈','t':'𝓉','u':'𝓊','v':'𝓋','w':'𝓌','x':'𝓍','y':'𝓎','z':'𝓏','A':'𝒜','B':'ℬ','C':'𝒞','D':'𝒟','E':'ℰ','F':'ℱ','G':'𝒢','H':'ℋ','I':'ℐ','J':'𝒿','K':'𝒦','L':'ℒ','M':'ℳ','N':'𝒩','O':'𝒪','P':'𝒫','Q':'𝒬','R':'ℛ','S':'𝒮','T':'𝒯','U':'𝒰','V':'𝒱','W':'𝒲','X':'𝒳','Y':'𝒴','Z':'𝒵'};

        const convertMap = (text, mapObj) => text.split('').map(c => mapObj[c] || mapObj[c.toLowerCase()] || c).join('');

        const generate100Names = () => {
            const rawName = document.getElementById('nick-input').value.trim();
            const resultsDiv = document.getElementById('nick-results');
            
            if(!rawName) {
                resultsDiv.innerHTML = '<div class="text-center p-4 text-sm text-red-400 italic w-full col-span-full">Vui lòng nhập tên trước nhé!</div>';
                return;
            }

            let results = [];
            
            results.push({ label: "Giai điệu", val: convertMap(rawName, mapCircled) });
            results.push({ label: "Mẫu 127", val: rawName.split('').join('\u0330') + '\u0330' });
            results.push({ label: "Mẫu 150", val: '꧁ ' + rawName + ' ꧂' });
            results.push({ label: "Âm nhạc", val: convertMap(rawName.toLowerCase(), mapThai) });
            results.push({ label: "Thịnh hành", val: convertMap(rawName.toLowerCase(), mapSmallCaps) });
            results.push({ label: "Khoảng trống", val: rawName.toUpperCase().split('').join(' ') });
            results.push({ label: "Sao + Hoa", val: rawName.split('').join('✿') });
            results.push({ label: "Tia sét", val: rawName.split('').join('ϟ') });
            results.push({ label: "Thánh giá", val: rawName.toUpperCase().split('').join('✞') });
            results.push({ label: "In đậm", val: convertMap(rawName, mapBold) });

            const fonts = [
                {n:"Chuẩn", m:null}, {n:"Nghiêng", m:mapItalic}, {n:"Script", m:mapScript},
                {n:"Double", m:mapDoubleStruck}, {n:"Á Đông", m:mapAsian}
            ];
            const decos = [
                ["༺ ", " ༻"], ["【 ", " 】"], ["⫷ ", " ⫸"], ["-`ღ'- ", " -`ღ'-"],
                ["♡ ", " ♡"], ["★ ", " ★"], ["« ", " »"], ["👑 ", " 👑"], 
                ["🔥 ", " 🔥"], ["❄️ ", " ❄️"], ["♔ ", " ♔"], ["✿ ", " ツ"],
                ["╰‿╯", "╰‿╯"], ["★彡 ", " 彡★"], ["◥꧁ ", " ꧂◤"], ["(¬‿¬) ", " (¬‿¬)"],
                ["『 ", " 』"], ["♜ ", " ♜"], ["♪ ", " ♪"], ["✦ ", " ✦"], 
                ["☠ ", " ☠"], ["☽ ", " ☾"], ["⚡ ", " ⚡"]
            ];

            let count = 11;
            for (let d of decos) {
                for (let f of fonts) {
                    if (results.length >= 100) break;
                    let txt = f.m ? convertMap(rawName, f.m) : rawName;
                    results.push({ label: `Mẫu ${count++}`, val: d[0] + txt + d[1] });
                }
                if (results.length >= 100) break;
            }

            resultsDiv.innerHTML = '';
            results.forEach(item => {
                const div = document.createElement('div');
                div.className = 'flex items-center justify-between bg-white border border-purple-100 p-2 md:p-3 rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer';
                div.onclick = () => copyToClipboard(item.val, 'copy-toast-nick');
                
                div.innerHTML = `
                    <div class="flex items-center gap-3 overflow-hidden flex-1">
                        <span class="text-[10px] md:text-xs text-gray-500 font-medium w-16 md:w-20 shrink-0 truncate">${item.label}</span>
                        <span class="font-bold text-gray-800 text-sm md:text-base group-hover:text-purple-600 transition truncate flex-1">${item.val}</span>
                    </div>
                    <button class="text-[10px] md:text-xs bg-purple-50 text-purple-600 font-bold px-3 py-1.5 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition shrink-0 ml-2">Copy</button>
                `;
                resultsDiv.appendChild(div);
            });
        };

        document.getElementById('btn-gen-nick').addEventListener('click', generate100Names);
        document.getElementById('nick-input').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') generate100Names();
        });

        // ==========================================
        // 3. KHO KÍ TỰ TỔNG HỢP
        // ==========================================
        const symbolsVIP = "࿐ 亗 ツ ✿ -`ღ'- ༉ ༊ Ლ Ღ ౘ ༒ ☻ ☹ ༄ ༆ ༇ ༈ ༊ ҉ 𓅂 ༂ ༃ ⚚ ๖ ؄ ఴ 𐩔 𐩘 𐰒 𐰑 ᚕ ᚖ ᚗ ᚘ ᚙ ፠ ፨ ᴥ ᠁ ꔚ ᪤ ద ⫷ ⫸ ʕ˖͜͡˖ʔ ꧁ ꧂ 𐑧 𐑨 𐑩 𐑪 ‿ ⁀ ⁔ ⁐ ⟅ ⟆ ༼ ༽ ༺ ༻ ઈ ઉ ⟡ ⟢ ⟣ 𐑥 𐑯 ꒰ ꒱ ʚ ɞ ꔻ ꔼ ꕢ ꕣ ꕤ ꕥ ᱦ ᱬ ద ధ ర ಠ ఠ ★ ๛ 𒀱 〠 ֍ ֎ ஜ ෴ 🍾 ✌ ✍ ✎ ♆ ۩ ⬳ 乄 ཉྀ ߹ ꧃ 𐩕 థ • ٭ ⋆ ˖ ﾟ°° ﾟ ⁺ ஃ ༚ ༛ ۵ ༔ ⁒ ‼ ‽ ᚘ ᚕ ᚖ ៚ ٭ ༀ ␥ ␦ ᚌ ᚍ ᚎ ᚏ ఢ 〓 〄 ๑ ⊰ ⊱ ⁋ ⁑ ௵ ᚙ ɷߡ ߥ ߦ ‎ߧ ࿂ ࿃ ࿄ ࿅ ࿆ ࿇ ࿈ ࿉ ࿊ ࿋ ࿌ ᴭ ߷ ཉིཾ ᙛ ᙜ ᙝ ᙞ ༕ ༖ ༗ ణ త Ꙩ ᭄ ఠ ◌ͧ ꙰ ꙲ ༜ ꮸ 𐐝 𐑅 𑁍 🝮 ؄ ㍍ Ƀ ͢Ƀ ㉺ ҂ ✰ 𒅒 ⫷ ⫸ 𒁂 𒈒 𒈞 هز ههههه ஓ ଐ ۝ ۞ ⁂ ⁎ ᱦ ᱬ 𒋨 Ꙭ ꙭ ꙮ ஐ ഋ ൠ ⎛ ⎞ ⎝ ⎠ Ӕ Ǣ Ǽ ℄ ɶ ʣ ʤ ʥ Ԙ Ѥ ǣ ѥ ȸ ȹ ѩ ␡ ␟ ␖ ␙ ␜ ␝ ℠ ℡ ™ ℻ ʬ Ξ 🅏 ᴭ Ԙ 웃 유 ℬ ℰ ℯ ℱ ℊ ℋ ℎ ℐ ℒ ℓ ℳ ℴ ℘ ℛ ℭ ℮ ℌ ℑ ℜ ℨ";
        const hearts = "♥ ❤ ❥ 💖 💕 💞 ❣ 🖤 ღ";
        const bows = "˚˖𓍢ִ໋🌷͙֒✧˚.🎀༘⋆ 🩰˚˖𓍢✨໋🎧✧˚.🎀༘⋆ ♰💗♰N̆ơ♰X̆ĬN̆H̆♰╰(°▽°)╯♰ ☝💗𝙣ơ𝙭𝙞𝙣𝙝╰(°▽°)╯✌ ツ💔╰‿╯иơ╰‿╯⒳ιղн╰‿╯🍻";
        const abcUpper = "Ａ Ｂ Ｃ Ｄ Ｅ Ｆ Ｇ Ｈ Ｉ Ｊ Ｋ Ｌ Ｍ Ｎ Ｏ Ｐ Ｑ Ｒ Ｓ Ｔ Ｕ Ｖ Ｗ Ｘ Ｙ Ｚ";
        const abcLower = "ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ";

        const libraryData = [
            { title: "Kí Tự VIP & Ngầu", data: symbolsVIP.split(' ') },
            { title: "Trái Tim Các Loại", data: hearts.split(' ') },
            { title: "Chiếc Nơ Cute", data: bows.split(' ') },
            { title: "Bảng Chữ To", data: abcUpper.split(' ').concat(abcLower.split(' ')) }
        ];

        const libContainer = document.getElementById('char-library');
        libraryData.forEach(section => {
            const secDiv = document.createElement('div');
            secDiv.className = 'mb-4';
            const title = document.createElement('h4');
            title.className = 'text-sm font-bold text-pink-600 mb-2 border-b border-pink-100 pb-1';
            title.innerText = section.title;
            secDiv.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'flex flex-wrap gap-2';

            section.data.forEach(char => {
                if(!char.trim()) return;
                const span = document.createElement('span');
                span.className = 'bg-white border border-pink-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm cursor-pointer hover:bg-pink-500 hover:text-white hover:-translate-y-0.5 transition active:scale-95 flex items-center justify-center font-medium';
                if(char.length > 5) span.classList.add('text-xs');
                span.innerText = char;
                span.onclick = () => copyToClipboard(char, 'copy-toast-lib');
                grid.appendChild(span);
            });
            secDiv.appendChild(grid);
            libContainer.appendChild(secDiv);
        });
    }
});
