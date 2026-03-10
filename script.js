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
    // Nếu vuốt xuống quá 50px thì kích hoạt hiệu ứng bay logo
    if (window.scrollY > 50) {
        mainHeader.classList.add('header-scrolled');
    } else {
        // Vuốt lên đỉnh lại thì trả logo về chỗ cũ
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
                <div class="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">Nguyễn Ngọc Phụng</div>
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Xin chào, tôi là <span class="text-orange-500">Nothing (N.Phụng)</span></h1>
                <p class="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                    <strong class="text-orange-600">NOTHING BUT SOMETHING</strong> • Chào mừng mọi người đến với không gian nhỏ của tôi. Nơi đây tôi lưu trữ các công cụ tiện ích do mình tự code(bằng AI😂) và chia sẻ những bài hướng dẫn, thủ thuật hay ho mà tôi sưu tầm hoặc tự nghĩ ra. Cứ thoải mái vọc vạch nhé!
                </p>
                <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-50 transition">#TipsMacOs</span>
                    <span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-50 transition">#Automation</span>
                    <span class="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-50 transition">#Nothing</span>
                </div>
            </div>
        </div>

        <div class="mb-4 flex items-center gap-3 px-2">
            <span class="text-2xl">📚</span>
            <h2 class="text-2xl font-bold text-gray-800">Tìm thử biết đâu có thứ cần</h2>
        </div>

        <div class="relative mb-6">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span class="text-gray-400">🔍</span>
            </div>
            <input type="text" id="guide-search" class="w-full bg-white/80 backdrop-blur-sm border border-orange-100 rounded-2xl py-3 pl-11 pr-4 text-sm text-gray-700 focus:outline-none focus:border-orange-300 focus:ring-4 ring-orange-50 shadow-sm transition placeholder-gray-400 font-medium" placeholder="Tìm kiếm bài viết, thủ thuật...">
        </div>
        
        <div id="guide-list" class="space-y-4"></div>

        <div id="guide-no-result" class="hidden text-center p-8 text-gray-400 italic bg-white/50 rounded-2xl border border-gray-100 mt-4">
            <div class="text-3xl mb-2">🥲</div>
            Không tìm thấy bài viết nào phù hợp...
        </div>
    `,
    logic: function() {
        const guides = [
           { title: "ℹ️ Contact me", date: "Nothing", content: "\n- Telegram: [@nothing3272](https://t.me/nothing3272)\n- Facebook: [Nguyễn Ngọc Phụng](https://www.facebook.com/share/1Ayyxg5kjH/?mibextid=wwXIfr) " },
            { title: "🤖 Tạo Bot Telegram quản lý tài chính với Google Sheet", date: "Nothing", content: "\n# Quản lý thu chi tự động qua tin nhắn\nBot Telegram kết hợp Google Sheet là một cách tuyệt vời để bạn ghi chép thu chi mọi lúc mọi nơi mà không cần mở các app rườm rà.\n\n🔗 **[Xem mã nguồn và Hướng dẫn chi tiết tại GitHub của tôi](https://github.com/nguyenngocphung2000/BOTTelegram-QLCT)**" },
                        { 
                title: "⛑️ Chặn quảng cáo Web, App, Zalo bằng NextDNS", 
                date: "Thủ thuật IOS", 
                content: `
# Hướng dẫn cấu hình nhanh NextDNS để chặn quảng cáo

NextDNS là một dịch vụ DNS thông minh giúp chặn quảng cáo, mã độc và các trang lừa đảo. Dưới đây là hướng dẫn cấu hình nhanh NextDNS để bạn có thể sử dụng dịch vụ này một cách hiệu quả.

## Ưu điểm của NextDNS
- **Có máy chủ ở Việt Nam**: Đảm bảo tốc độ truy cập nhanh chóng.
- **Tích hợp chặn trang mã độc/lừa đảo ở Việt Nam**: Bảo vệ bạn khỏi các trang web độc hại.
- **Mã hoá truy vấn DNS**: Đảm bảo an toàn và bảo mật thông tin.

## Các bước cấu hình

### Bước 1: Tạo tài khoản NextDNS
1. Truy cập [https://nextdns.io](https://nextdns.io).
2. Chọn **my.nextdns.io** ở góc phải phía trên.
3. Ghi nhớ **ID** được tạo.

### Bước 2: Thêm bộ lọc
1. Qua tab **Privacy**.
2. Thêm 2 bộ lọc:
   - **hostsVN**
   - **AdGuard DNS filter**

### Bước 3: Tuỳ chọn nâng cao (không bắt buộc)
- **Cho phép liên kết tiếp thị**: 
  - Bật **Allow Affiliate & Tracking Links** nếu bạn muốn nhấn được vào các đường dẫn quảng cáo trong kết quả tìm kiếm Google hoặc các liên kết tiếp thị như Lazada/Shopee.
  
- **Chặn trang cờ bạc**:
  - Qua tab **Parental Control**.
  - Tại mục **Categories**, thêm **Gambling** nếu bạn muốn chặn các trang có nội dung cờ bạc.

- **Tối ưu tốc độ mạng**:
  - Nếu sử dụng mạng khác bị chậm, vào tab **Setting** và tắt **Anonymized EDNS Client Subnet**.

- **Cài đặt cho phụ huynh**:
  - Qua tab **Parental Control**
  - Tại mục **Categories**,thêm P*rn để chặn nội dung người lớn
  - Bật tính năng **SafeSearch**
  - Phần **Recreation Time** đặt thời gian cho phép sử dụng
### Bước 4: Cài đặt
1. Trở về tab **Setup**.
2. Cài đặt theo hướng dẫn ở **Setup Guide**.
3. Nếu iphone thì nhấn vào [Đây](https://apple.nextdns.io/) để tạo cấu hình cài đặt.

## Thông tin thêm
- **Hướng dẫn đầy đủ**: [https://github.com/bigdargon/hostsVN/wiki/NextDNS](https://github.com/bigdargon/hostsVN/wiki/NextDNS)
- **Tài khoản miễn phí**: 300k truy vấn/tháng, đủ sử dụng cho cá nhân 1-2 thiết bị.

Chúc mọi người thành công! #NextDNS #hostsVN

# Chặn quảng cáo trên Zalo

Để chặn quảng cáo trên Zalo, bạn có thể sử dụng NextDNS để thêm các domain liên quan đến quảng cáo vào danh sách từ chối (denylist). Dưới đây là hướng dẫn chi tiết:

## Các bước thực hiện

### Bước 1: Truy cập NextDNS
1. Vào [my.nextdns.io](https://my.nextdns.io).

### Bước 2: Vào Denylist
1. Chọn tab **Denylist**.

### Bước 3: Thêm các domain vào Denylist
Thêm lần lượt các domain sau vào danh sách từ chối để chặn quảng cáo trên Zalo:

\`\`\`text
social.zalopay.vn
opentracking.zalopay.vn
video.zalo.me
zinst-stc.zdn.vn
graph.zalo.me
miniappstore.api.zalo.me
zagoo.vn
zalo.cloud
zalo.video
discovery.api.zaloapp.com
stc-zmp.zadn.vn
broadcast.api.zaloapp.com
oa.zalo.me
fiza.ai
stc-fin.zdn.vn
stc-sp.zadn.vn
res-zalo.zadn.vn
zagoo.zadn.vn
zmdcdn.me
channel-zinstant.api.zaloapp.com
zsp.zaloapp.com
universal-zinstant.api.zaloapp.com
stc-oa.zdn.vn
\`\`\`

## Lưu ý
- Việc thêm các domain này vào denylist sẽ giúp chặn các quảng cáo xuất hiện trong phần "Khám phá" và "Nhật ký" trên Zalo.
- Đồng thời chặn tính năng chuyển khoản nhanh khá khó chịu, cân nhắc nhé
- Bạn có thể tùy chỉnh thêm các domain khác nếu cần thiết.

Chúc bạn thành công trong việc loại bỏ quảng cáo khỏi Zalo!
` 
            },
            { title: "📅 Cài Lịch Âm trên macOS (LunarV)", date: "Thủ thuật Mac", content: "\n# Xem Lịch Âm trên thanh menu\nThay vì cài các app nặng nề, LunarV giúp bạn xem lịch âm trên menu bar của Mac cực kỳ tiện lợi và gọn nhẹ.\n\n🔗 **[Tải LunarV tại GitHub](https://github.com/PhamHungTien/LunarV)**" },
            { title: "⌨️ Bộ gõ tiếng Việt trên Mac", date: "Thủ thuật Mac", content: "\n# Tạm biệt lỗi gạch chân khó chịu\nNếu bạn đang mệt mỏi với bộ gõ mặc định của macOS hãy thử ngay các bộ gõ mã nguồn mở cực kỳ nhẹ và ổn định này:\n\n- ⌨️ **[PHTV - Tải về tại đây](https://github.com/PhamHungTien/PHTV)**\n- ⌨️ **[Xkey - Tải về tại đây](https://github.com/xmannv/xkey)**" }
        ];

        const guideList = document.getElementById('guide-list');
        const searchInput = document.getElementById('guide-search');
        const noResult = document.getElementById('guide-no-result');

        // Khởi tạo danh sách bài viết
        guides.forEach((guide, index) => {
            const item = document.createElement('div');
            item.className = 'guide-item glass-card rounded-[1.5rem] overflow-hidden border border-orange-50 shadow-sm transition hover:shadow-md';
            
            item.innerHTML = `
                <button class="w-full text-left p-5 md:px-6 flex items-center justify-between focus:outline-none group" onclick="toggleGuide(${index})">
                    <div>
                        <h3 class="font-bold text-gray-800 group-hover:text-orange-500 transition text-lg pr-4">${guide.title}</h3>
                        <p class="inline-block mt-2 bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">${guide.date}</p>
                    </div>
                    <div id="icon-${index}" class="text-gray-400 transform transition-transform duration-300 w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-orange-100 group-hover:text-orange-500 shrink-0">▼</div>
                </button>
                <div id="content-${index}" class="hidden border-t border-orange-50 bg-white/60">
                    <div class="prose-custom p-6 md:p-8" id="md-render-${index}"></div>
                </div>
            `;
            guideList.appendChild(item);
        });

        // BỘ LỌC TÌM KIẾM THÔNG MINH
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            const items = document.querySelectorAll('.guide-item');
            let hasVisible = false;

            guides.forEach((guide, index) => {
                // Quét qua cả Tiêu đề và Nội dung
                const match = guide.title.toLowerCase().includes(term) || guide.content.toLowerCase().includes(term);
                if (match) {
                    items[index].style.display = 'block';
                    hasVisible = true;
                } else {
                    items[index].style.display = 'none';
                }
            });

            // Hiện thông báo nếu không có kết quả
            if (!hasVisible) {
                noResult.classList.remove('hidden');
            } else {
                noResult.classList.add('hidden');
            }
        });

        // Đóng mở bài viết
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
// --- 6. Tool Tính Lãi Suất Ngân Hàng ---
registerTool({
    id: 'tab-finance',
    name: 'Tính Lãi Suất',
    icon: '💰',
    html: `
        <div class="text-center mb-6">
            <span class="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Tài chính</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Tính Lãi <span class="text-cyan-500">Ngân Hàng</span> 💰</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Tính toán chi tiết lãi gửi tiết kiệm và khoản vay.</p>
        </div>

        <div class="space-y-6 max-w-4xl mx-auto">
            
            <div class="flex justify-center mb-6">
                <div class="bg-gray-100 p-1 rounded-2xl inline-flex shadow-inner">
                    <button id="btn-mode-saving" class="px-6 py-2 rounded-xl text-sm font-bold bg-white text-cyan-600 shadow-sm transition">Gửi Tiết Kiệm</button>
                    <button id="btn-mode-loan" class="px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-cyan-600 transition">Vay Vốn</button>
                </div>
            </div>

            <div id="finance-saving-mode" class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-cyan-400 shadow-xl block">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số tiền gửi (VNĐ)</label>
                        <input type="number" id="sav-principal" class="w-full bg-cyan-50/50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold" placeholder="VD: 100000000">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Lãi suất (% / Năm)</label>
                        <input type="number" id="sav-rate" class="w-full bg-cyan-50/50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold" placeholder="VD: 6.5">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Kỳ hạn gửi</label>
                        <div class="flex gap-2">
                            <input type="number" id="sav-time" class="w-2/3 bg-cyan-50/50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold" placeholder="VD: 12">
                            <select id="sav-time-unit" class="w-1/3 bg-cyan-50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold">
                                <option value="12">Tháng</option>
                                <option value="1">Năm</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Hình thức tính lãi</label>
                        <select id="sav-type" class="w-full bg-cyan-50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold">
                            <option value="simple">Lãi đơn (Cuối kỳ)</option>
                            <option value="compound">Lãi kép (Nhập gốc hàng tháng)</option>
                        </select>
                    </div>
                </div>
                
                <button id="btn-calc-sav" class="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition shadow-md active:scale-95">TÍNH TOÁN TIỀN LỜI</button>

                <div id="sav-result" class="mt-6 hidden bg-white p-4 rounded-xl border border-cyan-100 shadow-sm text-center">
                    <div class="text-sm text-gray-500 font-medium">Tổng tiền lãi nhận được</div>
                    <div id="sav-res-interest" class="text-3xl font-black text-green-500 mt-1 mb-2">0 ₫</div>
                    <div class="text-sm text-gray-500 font-medium">Tổng gốc + Lãi</div>
                    <div id="sav-res-total" class="text-xl font-bold text-cyan-700 mt-1">0 ₫</div>
                </div>
            </div>

            <div id="finance-loan-mode" class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-red-400 shadow-xl hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số tiền vay (VNĐ)</label>
                        <input type="number" id="loan-principal" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold" placeholder="VD: 500000000">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Lãi suất (% / Năm)</label>
                        <input type="number" id="loan-rate" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold" placeholder="VD: 10.5">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Thời gian vay (Tháng)</label>
                        <input type="number" id="loan-time" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold" placeholder="VD: 36 (3 năm)">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phương thức tính lãi</label>
                        <select id="loan-type" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold">
                            <option value="declining">Dư nợ giảm dần (Thực tế)</option>
                            <option value="annuity">Trả góp đều (Dư nợ giảm dần cố định)</option>
                            <option value="flat">Dư nợ ban đầu (Flat Rate)</option>
                        </select>
                    </div>
                </div>

                <div id="loan-warning" class="hidden mt-3 text-xs bg-orange-100 text-orange-700 p-3 rounded-xl border border-orange-200 font-medium">
                    ⚠️ <b>Cảnh báo:</b> Lãi suất trên dư nợ ban đầu thực chất tương đương với khoảng <b id="loan-real-rate">...</b>%/năm nếu tính theo dư nợ giảm dần. Đừng để con số biểu kiến đánh lừa bạn!
                </div>
                
                <button id="btn-calc-loan" class="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md active:scale-95">TÍNH TOÁN KHOẢN VAY</button>

                <div id="loan-result" class="mt-6 hidden bg-white p-4 rounded-xl border border-red-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                        <div class="text-xs text-gray-400 font-bold uppercase">Tổng lãi phải trả</div>
                        <div id="loan-res-interest" class="text-xl font-black text-red-500 mt-1">0 ₫</div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-400 font-bold uppercase">Tổng gốc + Lãi</div>
                        <div id="loan-res-total" class="text-xl font-bold text-gray-800 mt-1">0 ₫</div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-400 font-bold uppercase">Tháng cao nhất trả</div>
                        <div id="loan-res-monthly" class="text-xl font-bold text-orange-500 mt-1">0 ₫</div>
                    </div>
                </div>

                <div id="loan-schedule-container" class="mt-6 hidden">
                    <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2"><span>📅</span> Lịch trả nợ chi tiết</h4>
                    <div class="overflow-x-auto max-h-80 custom-scrollbar rounded-xl border border-gray-100 shadow-inner">
                        <table class="w-full text-sm text-left">
                            <thead class="bg-gray-50 text-gray-500 sticky top-0 text-xs uppercase">
                                <tr>
                                    <th class="px-4 py-3 font-bold">Kỳ</th>
                                    <th class="px-4 py-3 font-bold">Tiền Gốc</th>
                                    <th class="px-4 py-3 font-bold">Tiền Lãi</th>
                                    <th class="px-4 py-3 font-bold">Tổng Trả</th>
                                    <th class="px-4 py-3 font-bold">Gốc Còn Lại</th>
                                </tr>
                            </thead>
                            <tbody id="loan-schedule-body" class="bg-white divide-y divide-gray-100">
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100 text-xs text-gray-600 leading-relaxed font-medium">
                <span class="font-bold text-cyan-700">💡 Mẹo Tài Chính:</span> Sự khác biệt lớn nhất khi vay là phương pháp tính lãi. 
                Vay 100 triệu, 10%/năm trong 12 tháng: Nếu tính theo <b class="text-green-600">Dư nợ giảm dần</b>, tiền lãi mỗi tháng sẽ ít dần đi vì gốc đã giảm. Nhưng nếu tính theo <b class="text-red-500">Dư nợ ban đầu (Flat rate)</b>, tháng nào bạn cũng phải đóng nguyên tiền lãi của 100 triệu dù gốc đã trả gần hết.
            </div>

        </div>
    `,
    logic: function() {
        const fmt = (num) => Math.round(num).toLocaleString('vi-VN') + ' ₫';
        
        // --- CHUYỂN TAB ---
        const btnSav = document.getElementById('btn-mode-saving');
        const btnLoan = document.getElementById('btn-mode-loan');
        const modeSav = document.getElementById('finance-saving-mode');
        const modeLoan = document.getElementById('finance-loan-mode');

        btnSav.addEventListener('click', () => {
            btnSav.className = 'px-6 py-2 rounded-xl text-sm font-bold bg-white text-cyan-600 shadow-sm transition';
            btnLoan.className = 'px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-cyan-600 transition';
            modeSav.classList.remove('hidden');
            modeLoan.classList.add('hidden');
        });

        btnLoan.addEventListener('click', () => {
            btnLoan.className = 'px-6 py-2 rounded-xl text-sm font-bold bg-white text-red-600 shadow-sm transition';
            btnSav.className = 'px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-cyan-600 transition';
            modeLoan.classList.remove('hidden');
            modeSav.classList.add('hidden');
        });

        // --- TÍNH TIẾT KIỆM ---
        document.getElementById('btn-calc-sav').addEventListener('click', () => {
            let P = parseFloat(document.getElementById('sav-principal').value);
            let r_annual = parseFloat(document.getElementById('sav-rate').value) / 100;
            let time = parseFloat(document.getElementById('sav-time').value);
            let timeUnit = parseFloat(document.getElementById('sav-time-unit').value);
            let type = document.getElementById('sav-type').value;

            if(!P || !r_annual || !time) { alert("Vui lòng nhập đầy đủ thông tin gửi tiết kiệm!"); return; }

            // Quy đổi thời gian về Năm
            let t_years = time / timeUnit; 
            let A = 0;

            if (type === 'simple') {
                // Lãi đơn: A = P(1 + r*t)
                A = P * (1 + (r_annual * t_years));
            } else {
                // Lãi kép (Giả sử nhập lãi hàng tháng n=12)
                let n = 12;
                A = P * Math.pow(1 + (r_annual / n), n * t_years);
            }

            let interest = A - P;

            document.getElementById('sav-result').classList.remove('hidden');
            document.getElementById('sav-res-interest').innerText = fmt(interest);
            document.getElementById('sav-res-total').innerText = fmt(A);
        });

        // --- TÍNH VAY VỐN ---
        const typeSelect = document.getElementById('loan-type');
        const warningDiv = document.getElementById('loan-warning');
        const realRateSpan = document.getElementById('loan-real-rate');

        typeSelect.addEventListener('change', () => {
            if(typeSelect.value === 'flat') warningDiv.classList.remove('hidden');
            else warningDiv.classList.add('hidden');
        });

        document.getElementById('btn-calc-loan').addEventListener('click', () => {
            let P = parseFloat(document.getElementById('loan-principal').value);
            let r_annual = parseFloat(document.getElementById('loan-rate').value) / 100;
            let months = parseInt(document.getElementById('loan-time').value);
            let type = typeSelect.value;

            if(!P || !r_annual || !months) { alert("Vui lòng nhập đầy đủ thông tin vay vốn!"); return; }

            let totalInterest = 0;
            let maxMonthly = 0;
            let r_monthly = r_annual / 12;
            let scheduleHTML = '';
            let remaining = P;

            // Tính EIR cảnh báo nếu là Flat rate (Công thức gần đúng: FlatRate * 2 * n / (n+1))
            if(type === 'flat') {
                let eir = (r_annual * 100) * 2 * months / (months + 1);
                realRateSpan.innerText = eir.toFixed(1);
                warningDiv.classList.remove('hidden');
            }

            if (type === 'flat') {
                // Dư nợ ban đầu
                let monthlyPrincipal = P / months;
                let monthlyInterest = P * r_monthly;
                totalInterest = monthlyInterest * months;
                maxMonthly = monthlyPrincipal + monthlyInterest;

                for(let i=1; i<=months; i++) {
                    remaining -= monthlyPrincipal;
                    scheduleHTML += `
                        <tr class="hover:bg-red-50 transition">
                            <td class="px-4 py-2 font-bold">${i}</td>
                            <td class="px-4 py-2 text-gray-600">${fmt(monthlyPrincipal)}</td>
                            <td class="px-4 py-2 text-red-500">${fmt(monthlyInterest)}</td>
                            <td class="px-4 py-2 font-bold text-gray-800">${fmt(maxMonthly)}</td>
                            <td class="px-4 py-2 text-gray-500">${fmt(Math.max(0, remaining))}</td>
                        </tr>`;
                }

            } else if (type === 'declining') {
                // Dư nợ giảm dần thực tế
                let monthlyPrincipal = P / months;
                
                for(let i=1; i<=months; i++) {
                    let interest = remaining * r_monthly;
                    totalInterest += interest;
                    let payment = monthlyPrincipal + interest;
                    if(payment > maxMonthly) maxMonthly = payment;
                    remaining -= monthlyPrincipal;

                    scheduleHTML += `
                        <tr class="hover:bg-red-50 transition">
                            <td class="px-4 py-2 font-bold">${i}</td>
                            <td class="px-4 py-2 text-gray-600">${fmt(monthlyPrincipal)}</td>
                            <td class="px-4 py-2 text-red-500">${fmt(interest)}</td>
                            <td class="px-4 py-2 font-bold text-gray-800">${fmt(payment)}</td>
                            <td class="px-4 py-2 text-gray-500">${fmt(Math.max(0, remaining))}</td>
                        </tr>`;
                }

            } else if (type === 'annuity') {
                // Trả góp đều EMI
                let pmt = (P * r_monthly * Math.pow(1 + r_monthly, months)) / (Math.pow(1 + r_monthly, months) - 1);
                maxMonthly = pmt;

                for(let i=1; i<=months; i++) {
                    let interest = remaining * r_monthly;
                    let principal = pmt - interest;
                    totalInterest += interest;
                    remaining -= principal;

                    scheduleHTML += `
                        <tr class="hover:bg-red-50 transition">
                            <td class="px-4 py-2 font-bold">${i}</td>
                            <td class="px-4 py-2 text-gray-600">${fmt(principal)}</td>
                            <td class="px-4 py-2 text-red-500">${fmt(interest)}</td>
                            <td class="px-4 py-2 font-bold text-gray-800">${fmt(pmt)}</td>
                            <td class="px-4 py-2 text-gray-500">${fmt(Math.max(0, remaining))}</td>
                        </tr>`;
                }
            }

            document.getElementById('loan-result').classList.remove('hidden');
            document.getElementById('loan-schedule-container').classList.remove('hidden');
            
            document.getElementById('loan-res-interest').innerText = fmt(totalInterest);
            document.getElementById('loan-res-total').innerText = fmt(P + totalInterest);
            document.getElementById('loan-res-monthly').innerText = fmt(maxMonthly);
            document.getElementById('loan-schedule-body').innerHTML = scheduleHTML;
        });
    }
});
// --- 7. Tool Hệ Sinh Thái Gia Phả ---
registerTool({
    id: 'tab-family-pro',
    name: 'Gia Phả',
    icon: '🌳',
    html: `
        <style>
            .ft-tab-btn { padding: 0.5rem 1rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; color: #6b7280; transition: all 0.2s; background: transparent; }
            .ft-tab-btn.active { background: #fffaf5; color: #f97316; box-shadow: 0 1px 3px rgba(249, 115, 22, 0.1); border: 1px solid #ffedd5; }
            
            /* CSS Sơ đồ cây - Khoảng cách anh chị em rộng hơn (20px) */
            .css-tree ul { padding-top: 20px; position: relative; transition: all 0.5s; display: flex; justify-content: center; gap: 20px; padding-left: 0; }
            .css-tree li { float: left; text-align: center; list-style-type: none; position: relative; padding: 20px 5px 0 5px; transition: all 0.5s; }
            .css-tree li::before, .css-tree li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 2px solid #fdba74; width: 50%; height: 20px; }
            .css-tree li::after { right: auto; left: 50%; border-left: 2px solid #fdba74; }
            .css-tree li:only-child::after, .css-tree li:only-child::before { display: none; }
            .css-tree li:only-child { padding-top: 0; }
            .css-tree li:first-child::before, .css-tree li:last-child::after { border: 0 none; }
            .css-tree li:last-child::before { border-right: 2px solid #fdba74; border-radius: 0 5px 0 0; }
            .css-tree li:first-child::after { border-radius: 5px 0 0 0; }
            .css-tree ul ul::before { content: ''; position: absolute; top: 0; left: 50%; border-left: 2px solid #fdba74; width: 0; height: 20px; }

            /* Ô tên hiển thị: Cố định kích thước, tự động xuống dòng trọn vẹn tên */
            .ft-node-box { width: 110px; height: 54px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; border: 1px solid #fed7aa; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); cursor: pointer; transition: all 0.2s; padding: 4px; z-index: 10; position: relative; overflow: hidden; }
            .ft-node-box:hover { box-shadow: 0 4px 8px rgba(249,115,22,0.15); border-color: #f97316; transform: translateY(-2px); }
            .ft-node-text { font-size: 0.75rem; font-weight: 700; text-align: center; white-space: normal; line-height: 1.2; word-wrap: break-word; }
            .ft-node-male { color: #1d4ed8; }
            .ft-node-female { color: #be185d; }
            .ft-node-dead { text-decoration: line-through; color: #9ca3af; }
            
            /* Nét đứt/liền nối Vợ chồng (Rất ngắn để 2 vợ chồng sát nhau) */
            .ft-bridge { width: 16px; height: 2px; background: #fdba74; align-self: center; position: relative; z-index: 0; }
        </style>

        <div class="text-center mb-6">
            <span class="bg-orange-100 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Hệ thống gia tộc</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Quản Lý <span class="text-orange-500">Gia Phả</span> 🌳</h2>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-6 bg-white/60 p-2 rounded-2xl border border-orange-50 shadow-sm backdrop-blur-md">
            <button onclick="ftSwitch('stats')" id="ft-nav-stats" class="ft-tab-btn active">📊 Thống Kê</button>
            <button onclick="ftSwitch('events')" id="ft-nav-events" class="ft-tab-btn">📅 Sự Kiện</button>
            <button onclick="ftSwitch('list')" id="ft-nav-list" class="ft-tab-btn">📇 Danh Sách</button>
            <button onclick="ftSwitch('tree')" id="ft-nav-tree" class="ft-tab-btn">🕸️ Sơ Đồ</button>
            <button onclick="ftSwitch('lookup')" id="ft-nav-lookup" class="ft-tab-btn">🔍 Danh Xưng</button>
        </div>

        <div id="ft-view-stats" class="space-y-6 block">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-orange-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Tổng thành viên</div>
                    <div class="text-3xl font-black text-gray-800" id="ft-s-total">0</div>
                </div>
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-blue-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Nam</div>
                    <div class="text-3xl font-black text-blue-600" id="ft-s-male">0</div>
                </div>
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-pink-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Nữ</div>
                    <div class="text-3xl font-black text-pink-600" id="ft-s-female">0</div>
                </div>
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-gray-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Đã mất</div>
                    <div class="text-3xl font-black text-gray-600" id="ft-s-dead">0</div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Con trưởng 👑</span>
                    <span class="text-xl font-black text-yellow-500" id="ft-s-firstborn">0</span>
                </div>
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Đã kết hôn 💍</span>
                    <span class="text-xl font-black text-red-400" id="ft-s-married">0</span>
                </div>
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Dâu / Rể 🌸</span>
                    <span class="text-xl font-black text-emerald-500" id="ft-s-inlaw">0</span>
                </div>
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Số đời 🌿</span>
                    <span class="text-xl font-black text-orange-500" id="ft-s-gen">0</span>
                </div>
            </div>
        </div>

        <div id="ft-view-events" class="hidden space-y-4">
            <div class="glass-card p-6 md:p-8 rounded-[2rem] border-t-4 border-t-red-400">
                <h3 class="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2"><span>🎂</span> Sự kiện sắp tới (30 ngày)</h3>
                <div id="ft-event-list" class="space-y-3"></div>
            </div>
        </div>

        <div id="ft-view-list" class="hidden space-y-4">
            <div class="flex flex-wrap gap-2 justify-between">
                <input type="text" id="ft-search" class="bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-orange-200 text-sm w-full md:w-64" placeholder="🔍 Tìm tên...">
                <div class="flex gap-2">
                    <button class="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-xl text-sm" onclick="ftExport()">📥 Xuất JSON</button>
                    <label class="bg-purple-50 text-purple-600 font-bold px-4 py-2 rounded-xl text-sm cursor-pointer">
                        📂 Nhập <input type="file" id="ft-import" accept=".json" class="hidden">
                    </label>
                    <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition" onclick="ftOpenModal()">+ Thêm</button>
                </div>
            </div>
            <div id="ft-list-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2"></div>
        </div>

        <div id="ft-view-tree" class="hidden space-y-4">
            <div class="flex justify-end">
                <button id="ft-btn-export-pdf" onclick="ftExportPDF()" class="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition flex items-center gap-2">
                    📄 Xuất PDF (Bản in)
                </button>
            </div>
            <div class="glass-card rounded-[2rem] p-8 overflow-auto min-h-[500px] flex justify-center items-start custom-scrollbar bg-white" id="ft-tree-print-area">
                <div id="ft-tree-container" class="css-tree">
                    <div class="text-gray-400 italic text-sm text-center mt-10">Cây gia phả đang trống.</div>
                </div>
            </div>
        </div>

        <div id="ft-view-lookup" class="hidden space-y-6">
            <div class="glass-card p-6 md:p-8 rounded-[2rem] border-t-4 border-t-yellow-400">
                <h3 class="font-bold text-gray-800 text-xl mb-4">Tra cứu quan hệ & Danh xưng</h3>
                
                <div class="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <div class="flex-1 w-full">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Người A</label>
                        <select id="ft-lu-a" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-bold text-gray-700"></select>
                    </div>
                    <div class="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm">↔</div>
                    <div class="flex-1 w-full">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Người B</label>
                        <select id="ft-lu-b" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-bold text-gray-700"></select>
                    </div>
                </div>

                <button onclick="ftCalculateRelation()" class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow-md transition hover:scale-[1.01] mb-6">✨ TÍNH TOÁN QUAN HỆ</button>

                <div id="ft-lu-result" class="hidden space-y-4">
                    <div class="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-center text-sm font-medium text-yellow-800" id="ft-lu-common"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white border border-orange-100 p-4 rounded-xl text-center shadow-sm">
                            <div class="text-xs text-gray-400 font-bold uppercase mb-2">Người A gọi Người B là</div>
                            <div class="text-2xl font-black text-orange-600" id="ft-lu-res-a">...</div>
                        </div>
                        <div class="bg-white border border-orange-100 p-4 rounded-xl text-center shadow-sm">
                            <div class="text-xs text-gray-400 font-bold uppercase mb-2">Người B gọi Người A là</div>
                            <div class="text-2xl font-black text-orange-600" id="ft-lu-res-b">...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="ft-modal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] hidden flex items-center justify-center p-4 opacity-0 transition-opacity duration-300">
            <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden transform scale-95 transition-transform duration-300 relative border border-orange-100">
                <div class="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <div class="p-6 border-b border-orange-50 flex justify-between items-center relative z-10">
                    <h3 id="ft-modal-title" class="font-bold text-xl text-gray-800">Thông tin thành viên</h3>
                    <button onclick="ftCloseModal()" class="text-gray-400 hover:text-red-500 font-bold text-xl w-8 h-8 rounded-full bg-gray-50 flex justify-center items-center transition">&times;</button>
                </div>
                
                <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar relative z-10">
                    <input type="hidden" id="ft-m-id">
                    
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Họ và Tên</label>
                        <input type="text" id="ft-m-name" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-bold text-gray-700">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giới tính</label>
                            <select id="ft-m-gender" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-medium">
                                <option value="male">Nam 👨</option><option value="female">Nữ 👩</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Trạng thái</label>
                            <select id="ft-m-status" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-medium">
                                <option value="alive">Còn sống</option><option value="deceased">Đã mất</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Năm / Ngày sinh</label>
                            <input type="text" id="ft-m-birth" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200" placeholder="VD: 1990">
                        </div>
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Ngày mất (Tùy chọn)</label>
                            <input type="text" id="ft-m-death" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200" placeholder="VD: 10/03/2020">
                        </div>
                    </div>

                    <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Là con của</label>
                                <select id="ft-m-parent" class="w-full bg-white border border-gray-200 rounded-xl p-2 outline-none focus:border-orange-300 text-sm">
                                    <option value="">-- Cụ Tổ (Không có) --</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phân loại con</label>
                                <select id="ft-m-childtype" class="w-full bg-white border border-gray-200 rounded-xl p-2 outline-none focus:border-orange-300 text-sm">
                                    <option value="chung">Con chung</option>
                                    <option value="rieng">Con riêng</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-2 px-2">
                            <input type="checkbox" id="ft-m-firstborn" class="w-4 h-4 text-orange-500 rounded focus:ring-orange-400">
                            <label class="text-sm font-bold text-gray-700">Là con trưởng</label>
                        </div>
                        
                        <div class="border-t border-gray-200 pt-3">
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Vợ / Chồng của</label>
                            <select id="ft-m-spouse" class="w-full bg-white border border-gray-200 rounded-xl p-2 outline-none focus:border-orange-300 text-sm">
                                <option value="">-- Độc thân / Chưa rõ --</option>
                            </select>
                            <p class="text-[10px] text-gray-400 mt-1 ml-2 italic">* Chọn mục này nếu người này là Dâu/Rể ngoại tộc</p>
                        </div>
                    </div>

                    <button id="ft-btn-save" class="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md">LƯU THÀNH VIÊN</button>
                    
                    <div id="ft-edit-actions" class="hidden mt-2 text-center pt-2">
                        <button class="text-red-400 hover:text-red-600 text-xs font-bold" onclick="ftDelete()">🗑️ Xóa thành viên</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    logic: function() {
        const STORAGE_KEY = 'my_family_tree_pro';
        let data = []; 

        const genId = () => 'id_' + Math.random().toString(36).substr(2, 9);
        const load = () => { try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ data = []; } };
        const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        
        window.ftSwitch = (tab) => {
            ['stats', 'events', 'list', 'tree', 'lookup'].forEach(t => {
                document.getElementById('ft-view-' + t).classList.add('hidden');
                document.getElementById('ft-nav-' + t).classList.remove('active');
            });
            document.getElementById('ft-view-' + tab).classList.remove('hidden');
            document.getElementById('ft-nav-' + tab).classList.add('active');
            
            if(tab === 'stats') renderStats();
            if(tab === 'list') renderList();
            if(tab === 'tree') renderTree();
            if(tab === 'events') renderEvents();
            if(tab === 'lookup') renderLookupOptions();
        };

        const getGen = (id, visited = new Set()) => {
            if(visited.has(id)) return 1; 
            visited.add(id);
            const node = data.find(n => n.id === id);
            if(!node) return 0;
            if(node.spouseId && !node.parentId) return getGen(node.spouseId, visited);
            if(!node.parentId) return 1;
            return getGen(node.parentId, visited) + 1;
        };

        const getYear = (str) => {
            if(!str) return 9999;
            const match = str.match(/\d{4}/);
            return match ? parseInt(match[0]) : 9999;
        };

        const renderStats = () => {
            const tot = data.length;
            document.getElementById('ft-s-total').innerText = tot;
            document.getElementById('ft-s-male').innerText = data.filter(n => n.gender === 'male').length;
            document.getElementById('ft-s-female').innerText = data.filter(n => n.gender === 'female').length;
            document.getElementById('ft-s-dead').innerText = data.filter(n => n.status === 'deceased').length;
            document.getElementById('ft-s-firstborn').innerText = data.filter(n => n.isFirstBorn).length;
            document.getElementById('ft-s-inlaw').innerText = data.filter(n => n.spouseId && !n.parentId).length;
            
            let married = new Set();
            data.forEach(n => { if(n.spouseId) { married.add(n.id); married.add(n.spouseId); } });
            document.getElementById('ft-s-married').innerText = married.size;

            let maxGen = 0;
            data.forEach(n => { const g = getGen(n.id); if(g > maxGen) maxGen = g; });
            document.getElementById('ft-s-gen').innerText = maxGen;
        };

        const renderList = (filter = '') => {
            const container = document.getElementById('ft-list-container');
            container.innerHTML = '';
            const filtered = data.filter(n => n.name.toLowerCase().includes(filter.toLowerCase()));

            filtered.forEach(node => {
                const gen = getGen(node.id);
                const isInlaw = node.spouseId && !node.parentId;
                let badges = '';
                if(node.status === 'deceased') badges += '<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Đã mất</span> ';
                if(isInlaw) badges += '<span class="bg-pink-50 text-pink-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Dâu/Rể</span> ';
                if(node.isFirstBorn) badges += '<span class="bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Con trưởng</span> ';
                if(node.childType === 'rieng') badges += '<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Con riêng</span> ';
                if(gen > 0) badges += `<span class="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Đời ${gen}</span>`;

                container.innerHTML += `
                    <div class="glass-card rounded-2xl p-4 flex flex-col hover:shadow-md hover:border-orange-300 transition cursor-pointer" onclick="ftOpenModal('${node.id}')">
                        <div class="font-bold text-gray-800 text-base truncate ${node.gender==='male'?'text-blue-600':'text-pink-600'}">${node.name}</div>
                        <div class="text-xs text-gray-400 mt-1">${node.birth || '?'} ${node.death ? '→ ' + node.death : ''}</div>
                        <div class="mt-2 flex flex-wrap gap-1">${badges}</div>
                    </div>
                `;
            });
        };

        document.getElementById('ft-search').addEventListener('input', e => renderList(e.target.value));

        const parseDate = (str) => {
            if(!str) return null;
            const parts = str.split('/');
            if(parts.length >= 2) return { d: parseInt(parts[0]), m: parseInt(parts[1]) };
            return null;
        };
        const getDaysLeft = (dateObj) => {
            if(!dateObj) return Infinity;
            const today = new Date(); 
            let target = new Date(today.getFullYear(), dateObj.m - 1, dateObj.d);
            if(today > target) target.setFullYear(target.getFullYear() + 1);
            return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
        };

        const renderEvents = () => {
            const list = document.getElementById('ft-event-list');
            list.innerHTML = '';
            let events = [];

            data.forEach(n => {
                if(n.status === 'alive' && n.birth) {
                    const parsed = parseDate(n.birth);
                    const days = getDaysLeft(parsed);
                    if(days <= 30) events.push({ node: n, type: 'Sinh nhật', days, dateStr: n.birth });
                }
                if(n.status === 'deceased' && n.death) {
                    const parsed = parseDate(n.death);
                    const days = getDaysLeft(parsed);
                    if(days <= 30) events.push({ node: n, type: 'Ngày giỗ', days, dateStr: n.death });
                }
            });
            events.sort((a,b) => a.days - b.days);

            if(events.length === 0) {
                list.innerHTML = '<div class="text-center text-gray-400 italic text-sm">Không có sự kiện nào trong 30 ngày tới.</div>';
                return;
            }

            events.forEach(ev => {
                let badge = ev.days === 0 ? '<span class="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">Hôm nay!</span>' 
                          : `<span class="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">${ev.days} ngày nữa</span>`;
                list.innerHTML += `
                    <div class="bg-white border border-orange-50 p-3 rounded-xl shadow-sm flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full ${ev.type === 'Sinh nhật' ? 'bg-pink-50' : 'bg-gray-100'} flex items-center justify-center text-lg">
                                ${ev.type === 'Sinh nhật' ? '🎂' : '🕯️'}
                            </div>
                            <div>
                                <div class="font-bold text-gray-800 text-sm">${ev.node.name}</div>
                                <div class="text-xs text-gray-400">${ev.type} - ${ev.dateStr}</div>
                            </div>
                        </div>
                        ${badge}
                    </div>
                `;
            });
        };

        // --- 5. TRA CỨU DANH XƯNG ---
        const renderLookupOptions = () => {
            const selA = document.getElementById('ft-lu-a');
            const selB = document.getElementById('ft-lu-b');
            let opts = '<option value="">-- Chọn thành viên --</option>';
            data.forEach(n => opts += `<option value="${n.id}">${n.name} (Đời ${getGen(n.id)})</option>`);
            selA.innerHTML = selB.innerHTML = opts;
        };

        window.ftCalculateRelation = () => {
            const idA = document.getElementById('ft-lu-a').value;
            const idB = document.getElementById('ft-lu-b').value;
            if(!idA || !idB || idA === idB) return alert("Vui lòng chọn 2 người khác nhau!");

            const nodeA = data.find(n => n.id === idA);
            const nodeB = data.find(n => n.id === idB);
            
            if (nodeA.spouseId === nodeB.id || nodeB.spouseId === nodeA.id) {
                document.getElementById('ft-lu-result').classList.remove('hidden');
                document.getElementById('ft-lu-common').innerHTML = "✨ <b>Quan hệ:</b> Hôn nhân";
                document.getElementById('ft-lu-res-a').innerText = nodeB.gender === 'male' ? "Chồng" : "Vợ";
                document.getElementById('ft-lu-res-b').innerText = nodeA.gender === 'male' ? "Chồng" : "Vợ";
                return;
            }

            const getBloodPath = (id) => {
                let p = [];
                let curr = data.find(n => n.id === id);
                let visited = new Set();
                let isLaw = false;
                
                if (curr && !curr.parentId && curr.spouseId) {
                    isLaw = true;
                    curr = data.find(n => n.id === curr.spouseId);
                }
                
                while(curr && !visited.has(curr.id)) {
                    visited.add(curr.id);
                    p.push(curr);
                    curr = data.find(n => n.id === curr.parentId);
                }
                return { path: p.reverse(), isLaw }; 
            };

            const traceA = getBloodPath(idA);
            const traceB = getBloodPath(idB);
            const pathA = traceA.path;
            const pathB = traceB.path;

            let lcaNode = null;
            let i = 0;
            while(i < pathA.length && i < pathB.length && pathA[i].id === pathB[i].id) {
                lcaNode = pathA[i]; 
                i++;
            }

            const resDiv = document.getElementById('ft-lu-result');
            resDiv.classList.remove('hidden');

            if(!lcaNode) {
                document.getElementById('ft-lu-common').innerHTML = "Không tìm thấy liên kết huyết thống / họ hàng trực tiếp.";
                document.getElementById('ft-lu-res-a').innerText = "Chưa rõ";
                document.getElementById('ft-lu-res-b').innerText = "Chưa rõ";
                return;
            }

            const dA = pathA.length - i; 
            const dB = pathB.length - i; 

            let sideA = 'noi';
            if (dA > 0 && pathA[i] && pathA[i].gender === 'female') sideA = 'ngoai';
            
            let sideB = 'noi';
            if (dB > 0 && pathB[i] && pathB[i].gender === 'female') sideB = 'ngoai';

            let isOlderB = false;
            let isOlderA = false;
            if (dA >= 1 && dB >= 1) {
                const bloodNodeA = pathA[i]; 
                const bloodNodeB = pathB[i]; 
                
                let yA = getYear(bloodNodeA.birth);
                let yB = getYear(bloodNodeB.birth);
                
                if (yA === 9999 || yB === 9999) {
                    const indexA = data.findIndex(n => n.id === bloodNodeA.id);
                    const indexB = data.findIndex(n => n.id === bloodNodeB.id);
                    isOlderB = indexB < indexA;
                    isOlderA = indexA < indexB;
                } else {
                    isOlderB = yB < yA;
                    isOlderA = yA < yB;
                }
            }

            document.getElementById('ft-lu-common').innerHTML = `✨ <b>Tổ tiên chung:</b> ${lcaNode.name} (Cách A ${dA} đời, cách B ${dB} đời)`;

            const getTitle = (distA, distB, gA, gB, lawB, side, isOlder, nodeMe, nodeThem) => {
                if (distA > 0 && distB === 0) {
                    if (distA === 1) {
                        const isStep = nodeMe.childType === 'rieng' && nodeMe.parentId !== nodeThem.id;
                        if (isStep) return gB === 'male' ? "Cha dượng" : "Mẹ kế";
                        return gB === 'male' ? "Cha / Ba" : "Mẹ / Má";
                    }
                    if (distA === 2) return gB === 'male' ? `Ông ${side==='noi'?'nội':'ngoại'}` : `Bà ${side==='noi'?'nội':'ngoại'}`;
                    if (distA === 3) return gB === 'male' ? "Cụ / Cố ông" : "Cụ / Cố bà";
                    if (distA >= 4) return gB === 'male' ? "Kị / Sơ ông" : "Kị / Sơ bà";
                }
                
                if (distA === 0 && distB > 0) {
                    if (distB === 1) {
                        const isStep = nodeThem.childType === 'rieng' && nodeThem.parentId !== nodeMe.id;
                        if (isStep) return "Con riêng";
                        return lawB ? (gB === 'male' ? "Con rể" : "Con dâu") : "Con";
                    }
                    if (distB === 2) return lawB ? (gB === 'male' ? "Cháu rể" : "Cháu dâu") : (side === 'noi' ? "Cháu nội" : "Cháu ngoại");
                    if (distB === 3) return "Chắt";
                    if (distB >= 4) return "Chút / Chít";
                }

                if (distA === 1 && distB === 1) {
                    if (lawB) return gB === 'male' ? "Anh rể / Em rể" : "Chị dâu / Em dâu";
                    if (isOlder) return gB === 'male' ? "Anh ruột" : "Chị ruột";
                    return gB === 'male' ? "Em trai ruột" : "Em gái ruột";
                }

                if (distA === 2 && distB === 1) {
                    if (side === 'noi') {
                        if (isOlder) return lawB ? (gB === 'male' ? "Bác trai" : "Bác dâu") : (gB === 'male' ? "Bác trai" : "Bác gái");
                        return lawB ? (gB === 'male' ? "Dượng" : "Thím") : (gB === 'male' ? "Chú" : "Cô");
                    } else {
                        if (lawB) return gB === 'male' ? "Dượng" : "Mợ";
                        return gB === 'male' ? "Cậu" : "Dì";
                    }
                }

                if (distA === 1 && distB === 2) {
                    return lawB ? (gB === 'male' ? "Cháu rể" : "Cháu dâu") : "Cháu"; 
                }

                if (distA === distB && distA >= 2) return "Anh / Chị / Em họ";
                if (distA > distB) return "Bề trên (Họ hàng)";
                return "Con cháu (Họ hàng)";
            };

            document.getElementById('ft-lu-res-b').innerText = getTitle(dA, dB, nodeA.gender, nodeB.gender, traceB.isLaw, sideA, isOlderB, nodeA, nodeB); 
            document.getElementById('ft-lu-res-a').innerText = getTitle(dB, dA, nodeB.gender, nodeA.gender, traceA.isLaw, sideB, isOlderA, nodeB, nodeA); 
        };

        // --- 6. SƠ ĐỒ CÂY ---
        const buildTreeHTML = (nodeId) => {
            const node = data.find(n => n.id === nodeId);
            if(!node) return '';
            const children = data.filter(n => n.parentId === nodeId);
            const spouses = data.filter(n => (n.spouseId === nodeId || node.spouseId === n.id) && n.id !== nodeId);

            let html = '<li>';
            html += `<div class="inline-flex items-center z-10 relative">`;
            
            let sClassA = node.status === 'deceased' ? 'ft-node-dead' : (node.gender === 'male' ? 'ft-node-male' : 'ft-node-female');
            let childBadgeA = node.childType === 'rieng' ? `<div class="text-[9px] text-red-500 font-bold mt-1 leading-none">(Con riêng)</div>` : '';
            html += `
                <div class="ft-node-box" onclick="ftOpenModal('${node.id}')">
                    <span class="ft-node-text ${sClassA}">${node.name}</span>
                    ${childBadgeA}
                </div>
            `;
            
            // Vẽ Vợ/Chồng nối liền, sát nhau hơn
            spouses.forEach(sp => {
                if(sp.id !== node.parentId) { 
                    let sClassB = sp.status === 'deceased' ? 'ft-node-dead' : (sp.gender === 'male' ? 'ft-node-male' : 'ft-node-female');
                    html += `<div class="ft-bridge"></div>`;
                    html += `
                        <div class="ft-node-box bg-orange-50/30 border-dashed border-orange-300" onclick="ftOpenModal('${sp.id}')">
                            <span class="ft-node-text ${sClassB}">${sp.name}</span>
                        </div>
                    `;
                }
            });
            html += `</div>`;

            if(children.length > 0) {
                html += '<ul>' + children.map(c => buildTreeHTML(c.id)).join('') + '</ul>';
            }
            html += '</li>';
            return html;
        };

        const renderTree = () => {
            const container = document.getElementById('ft-tree-container');
            const roots = data.filter(n => {
                if (n.parentId) return false; 
                if (!n.spouseId) return true; 
                const spouse = data.find(s => s.id === n.spouseId);
                if (!spouse) return true; 
                if (spouse.parentId) return false; 
                return n.id > spouse.id;
            });
            
            if(roots.length === 0) {
                container.innerHTML = '<div class="text-gray-400 italic text-sm text-center mt-10">Sơ đồ trống. Chuyển sang Danh Sách để thêm người.</div>';
                return;
            }
            container.innerHTML = '<ul>' + roots.map(r => buildTreeHTML(r.id)).join('') + '</ul>';
        };

        // --- XUẤT PDF ---
        window.ftExportPDF = () => {
            const btn = document.getElementById('ft-btn-export-pdf');
            const originalText = btn.innerHTML;
            btn.innerHTML = '⏳ Đang tạo PDF...';
            
            const doExport = () => {
                const el = document.getElementById('ft-tree-print-area');
                
                const oldW = el.style.width; const oldH = el.style.height; const oldOverflow = el.style.overflow;
                el.style.width = 'max-content'; el.style.height = 'max-content'; el.style.overflow = 'visible';
                
                const opt = {
                  margin:       10,
                  filename:     'So-Do-Gia-Pha-' + Date.now() + '.pdf',
                  image:        { type: 'jpeg', quality: 1 },
                  html2canvas:  { scale: 2, useCORS: true },
                  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
                };
                
                html2pdf().set(opt).from(el).save().then(() => {
                    el.style.width = oldW; el.style.height = oldH; el.style.overflow = oldOverflow;
                    btn.innerHTML = originalText;
                }).catch(err => {
                    alert("Lỗi khi tạo PDF!");
                    btn.innerHTML = originalText;
                });
            };

            if (typeof html2pdf === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                script.onload = () => doExport();
                document.head.appendChild(script);
            } else {
                doExport();
            }
        };

        // --- 7. MODAL QUẢN LÝ ---
        const modal = document.getElementById('ft-modal');
        window.ftOpenModal = (id = null) => {
            let opts = '<option value="">-- Cụ Tổ / Không có --</option>';
            data.forEach(n => { if(n.id !== id) opts += `<option value="${n.id}">${n.name}</option>`; });
            document.getElementById('ft-m-parent').innerHTML = opts;
            
            let spouseOpts = '<option value="">-- Độc thân / Chưa rõ --</option>';
            data.forEach(n => { if(n.id !== id) spouseOpts += `<option value="${n.id}">${n.name}</option>`; });
            document.getElementById('ft-m-spouse').innerHTML = spouseOpts;

            if(id) {
                const node = data.find(n => n.id === id);
                document.getElementById('ft-m-id').value = node.id;
                document.getElementById('ft-m-name').value = node.name;
                document.getElementById('ft-m-gender').value = node.gender;
                document.getElementById('ft-m-status').value = node.status;
                document.getElementById('ft-m-birth').value = node.birth || '';
                document.getElementById('ft-m-death').value = node.death || '';
                document.getElementById('ft-m-parent').value = node.parentId || '';
                document.getElementById('ft-m-childtype').value = node.childType || 'chung';
                document.getElementById('ft-m-spouse').value = node.spouseId || '';
                document.getElementById('ft-m-firstborn').checked = node.isFirstBorn || false;
                
                document.getElementById('ft-modal-title').innerText = "Chỉnh sửa thành viên";
                document.getElementById('ft-edit-actions').classList.remove('hidden');
            } else {
                ['ft-m-id','ft-m-name','ft-m-birth','ft-m-death','ft-m-parent','ft-m-spouse'].forEach(i => document.getElementById(i).value = '');
                document.getElementById('ft-m-status').value = 'alive';
                document.getElementById('ft-m-childtype').value = 'chung';
                document.getElementById('ft-m-firstborn').checked = false;
                document.getElementById('ft-modal-title').innerText = "Thêm thành viên mới";
                document.getElementById('ft-edit-actions').classList.add('hidden');
            }
            modal.classList.remove('hidden');
            setTimeout(() => { modal.classList.remove('opacity-0'); modal.firstElementChild.classList.remove('scale-95'); }, 10);
        };

        window.ftCloseModal = () => {
            modal.classList.add('opacity-0'); modal.firstElementChild.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        };

        document.getElementById('ft-btn-save').onclick = () => {
            const name = document.getElementById('ft-m-name').value.trim();
            if(!name) return alert("Vui lòng nhập tên!");
            const id = document.getElementById('ft-m-id').value || genId();
            
            const node = {
                id, name,
                gender: document.getElementById('ft-m-gender').value,
                status: document.getElementById('ft-m-status').value,
                birth: document.getElementById('ft-m-birth').value.trim(),
                death: document.getElementById('ft-m-death').value.trim(),
                parentId: document.getElementById('ft-m-parent').value || null,
                childType: document.getElementById('ft-m-childtype').value,
                spouseId: document.getElementById('ft-m-spouse').value || null,
                isFirstBorn: document.getElementById('ft-m-firstborn').checked
            };

            const idx = data.findIndex(n => n.id === id);
            if(idx > -1) data[idx] = node; else data.push(node);

            save(); renderList(); renderTree(); renderStats(); ftCloseModal();
        };

        window.ftDelete = () => {
            const id = document.getElementById('ft-m-id').value;
            if(data.some(n => n.parentId === id)) return alert("Không thể xóa người đang có dữ liệu con cái!");
            if(confirm("Xóa vĩnh viễn thành viên này?")) {
                data = data.filter(n => n.id !== id);
                data.forEach(n => { if (n.spouseId === id) n.spouseId = null; });
                save(); renderList(); renderTree(); renderStats(); ftCloseModal();
            }
        };

        window.ftExport = () => {
            const a = document.createElement('a');
            a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
            a.download = "Gia_Pha_Sync_" + Date.now() + ".json";
            a.click();
        };
        document.getElementById('ft-import').addEventListener('change', e => {
            const f = e.target.files[0]; if(!f) return;
            const r = new FileReader();
            r.onload = ev => {
                try { data = JSON.parse(ev.target.result); save(); ftSwitch('list'); alert("Nhập thành công!"); } 
                catch(err) { alert("Lỗi file JSON!"); }
            };
            r.readAsText(f);
        });

        // Init
        load();
        ftSwitch('stats');
    }
});
