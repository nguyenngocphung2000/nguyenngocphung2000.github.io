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

// --- 3. Tool Markdown (Nâng cấp File & Timeline) ---
registerTool({
    id: 'tab-md',
    name: 'Đọc MD',
    icon: '📝',
    html: `
        <style>
            .md-timeline-node { border-left: 2px dashed #fb923c; padding-left: 24px; position: relative; padding-bottom: 24px; margin-left: 10px; margin-top: 10px; }
            .md-timeline-node:last-child { border-left-color: transparent; padding-bottom: 0; }
            .md-timeline-node::before { content: ''; position: absolute; left: -8px; top: 4px; width: 14px; height: 14px; background: #fff; border: 3px solid #f97316; border-radius: 50%; box-shadow: 0 0 0 4px #fff4e6; }
            .md-time-badge { background: #fff4e6; color: #ea580c; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; display: inline-block; margin-bottom: 8px; box-shadow: 0 2px 5px rgba(234, 88, 12, 0.05); }
            .md-time-text { font-size: 0.95rem; color: #4b5563; line-height: 1.6; }
        </style>

        <div class="text-center mb-6">
            <span class="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Cải Tiến</span>
            <h2 class="text-3xl font-bold mt-2">Trình đọc <span class="text-orange-500">Markdown</span></h2>
        </div>
        
        <div class="glass-card p-6 md:p-8 rounded-[2rem]">
            
            <div class="flex flex-wrap justify-between items-center mb-4 gap-2">
                <p class="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Soạn thảo & Timeline</p>
                <label class="cursor-pointer bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-200 transition shadow-sm flex items-center gap-2">
                    <span>📁 Mở File .md</span>
                    <input type="file" id="md-file" accept=".md" class="hidden">
                </label>
            </div>

            <textarea id="md-input" class="w-full h-48 bg-gray-50 rounded-2xl p-4 font-mono text-sm border border-gray-100 focus:outline-none focus:ring-2 ring-orange-200 shadow-inner" placeholder="Bắt đầu gõ hoặc mở file..."></textarea>
            
            <div class="mt-6">
                <p class="text-[10px] uppercase font-bold text-gray-300 mb-3 text-center">--- Văn bản hiển thị ---</p>
                <div id="md-preview" class="prose-custom p-6 bg-white rounded-2xl shadow-sm border border-orange-50 min-h-[150px]"></div>
            </div>
        </div>
    `,
    logic: function() {
        const mdIn = document.getElementById('md-input');
        const mdPre = document.getElementById('md-preview');
        const mdFile = document.getElementById('md-file');

        // Hàm render nội dung
        const renderMD = () => {
            let text = mdIn.value;
            
            // MAGIC: Tiền xử lý cú pháp Timeline trước khi đưa cho Markdown parse
            // Cú pháp: @time[Thời gian] Nội dung
            text = text.replace(/^@time\[(.*?)\] (.*)$/gm, '<div class="md-timeline-node"><span class="md-time-badge">$1</span><div class="md-time-text">$2</div></div>');

            if(window.marked) {
                mdPre.innerHTML = marked.parse(text);
            }
        };

        // 1. Cập nhật hiển thị ngay khi gõ
        mdIn.addEventListener('input', renderMD);

        // 2. Chức năng đọc File
        mdFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                mdIn.value = e.target.result; // Đổ chữ vào ô nhập
                renderMD();                   // Tự động render ra ô dưới
            };
            reader.readAsText(file);
        });

        // 3. Đoạn chữ mẫu để bạn test ngay lập tức
        mdIn.value = `# Hướng dẫn tạo Timeline
Để tạo một Timeline tuyệt đẹp, hãy dùng cú pháp \`@time[Thời gian] Nội dung\`:

@time[Tháng 1/2024] Lên ý tưởng giao diện cho cộng đồng.
@time[Tháng 2/2024] Tách code thành cấu trúc Plugin siêu gọn nhẹ.
@time[Hôm nay] Tích hợp thành công Timeline và đọc File .md! 🎉

> Bạn hãy thử tải một file \`.md\` từ máy lên hoặc sửa nội dung ở trên xem nhé!`;
        
        renderMD(); // Gọi render lần đầu tiên
    }
});
