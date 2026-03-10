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
