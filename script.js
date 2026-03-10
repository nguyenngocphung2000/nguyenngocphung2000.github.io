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

    localStorage.setItem('hupvoi_active_tab', tabId);
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
    const memoryTab = localStorage.getItem('hupvoi_active_tab');
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
        const STORAGE_KEY = 'hupvoi_calc_history'; 

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