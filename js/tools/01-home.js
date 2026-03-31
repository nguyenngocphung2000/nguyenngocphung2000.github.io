export function setupTool() {
    const tabId = 'tab-home';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    panel.innerHTML = `
        <style>
            /* ĐỈNH CAO TYPOGRAPHY - CĂN ĐỀU KHÔNG LỖ HỔNG DÀNH CHO MOBILE */
            .perfect-justify {
                text-align: justify !important;
                text-justify: inter-word;
                /* Thu nhỏ cực nhẹ khoảng cách TỪ (word) và CHỮ (letter) theo ý bạn */
                word-spacing: -0.04em; 
                letter-spacing: -0.015em; 
                /* Bật gạch nối tự động cho từ tiếng Anh quá dài */
                hyphens: auto;
                -webkit-hyphens: auto;
                /* Ép bẻ từ nếu rơi vào ngõ cụt */
                overflow-wrap: break-word; 
            }

            /* BỘ QUY TẮC DARK MODE ĐỒNG BỘ CHO TAB HOME */
            body.dark-mode .bio-box {
                background-image: linear-gradient(to right, rgba(249, 115, 22, 0.05), transparent) !important;
                border-left-color: #f97316 !important;
            }
            body.dark-mode .glass-card { background-color: rgba(30, 41, 59, 0.8) !important; border-color: #334155 !important; }
            body.dark-mode .glass-card h1, body.dark-mode .glass-card h2, body.dark-mode .glass-card strong { color: #f8fafc !important; }
            body.dark-mode .glass-card p.text-gray-700, body.dark-mode .glass-card p.text-gray-600 { color: #cbd5e1 !important; }
            
            /* Cấu hình Hashtag trong Dark Mode */
            body.dark-mode .glass-card span.bg-white { background-color: #1e293b !important; border-color: #334155 !important; color: #cbd5e1 !important; }
            body.dark-mode .glass-card span.bg-orange-50 { background-color: rgba(249, 115, 22, 0.1) !important; border-color: rgba(249, 115, 22, 0.3) !important; color: #fb923c !important; }
            body.dark-mode .glass-card span:hover { background-color: #f97316 !important; color: #fff !important; border-color: #f97316 !important; }
            
            /* Cấu hình Danh sách bài viết */
            body.dark-mode .guide-item { background-color: #1e293b !important; border-color: #334155 !important; }
            body.dark-mode .guide-item h3 { color: #f8fafc !important; }
            body.dark-mode .guide-item button:hover h3 { color: #f97316 !important; }
            body.dark-mode .guide-item p.bg-orange-50 { background-color: rgba(249, 115, 22, 0.15) !important; border-color: rgba(249, 115, 22, 0.2) !important; color: #fb923c !important; }
            
            /* KHU VỰC NỘI DUNG MARKDOWN MỞ RỘNG (Tối ưu chống chói) */
            body.dark-mode .guide-item > div[id^="content-"] { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; }
            body.dark-mode .prose-custom { color: #cbd5e1 !important; }
            body.dark-mode .prose-custom h1, body.dark-mode .prose-custom h2, body.dark-mode .prose-custom h3, body.dark-mode .prose-custom h4, body.dark-mode .prose-custom strong { color: #f8fafc !important; }
            body.dark-mode .prose-custom a { color: #fb923c !important; }
            body.dark-mode .prose-custom code { background-color: #334155 !important; color: #f8fafc !important; border: 1px solid #475569; }
            body.dark-mode .prose-custom pre { background-color: #0f172a !important; border: 1px solid #334155; }
            body.dark-mode .prose-custom blockquote { border-left-color: #f97316 !important; color: #94a3b8 !important; background-color: rgba(249, 115, 22, 0.05); }
            
            /* Khung Search & Thông báo */
            body.dark-mode input#guide-search { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; color: #f8fafc !important; }
            body.dark-mode input#guide-search::placeholder { color: #64748b !important; }
            body.dark-mode #guide-no-result { background-color: rgba(15, 23, 42, 0.4) !important; border-color: #334155 !important; }
            body.dark-mode #guide-no-result p.text-gray-700 { color: #cbd5e1 !important; }
        </style>
        
        <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="space-y-6 md:space-y-8"> 
                
                <div class="glass-card p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-6 lg:gap-8 border border-orange-100 bg-white/80 backdrop-blur-xl relative overflow-hidden shadow-lg shadow-orange-100/50 transition-colors duration-300">
                    
                    <div class="absolute top-0 right-0 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
                    <div class="absolute bottom-0 left-0 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-[60px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>
                    
                    <div class="relative w-28 h-28 md:w-36 md:h-36 shrink-0 z-10 group cursor-default">
                        <div class="absolute inset-0 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500"></div>
                        
                        <div class="relative w-full h-full rounded-full bg-gradient-to-br from-white to-orange-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
                            <span class="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-amber-600">NP</span>
                        </div>
                        
                        <div class="absolute bottom-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-green-500 border-[3px] border-white rounded-full shadow-sm flex items-center justify-center z-20">
                            <span class="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                        </div>
                    </div>

                    <div class="text-center md:text-left flex-1 z-10 w-full">
                        <div class="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm border border-orange-200 transition">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Nguyễn Ngọc Phụng
                        </div>
                        
                        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
                            Hi I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Nothing</span>
                        </h1>
                        
                        <div class="mb-6 relative border-l-4 border-orange-400 bg-gradient-to-r from-orange-50/20 to-transparent rounded-r-2xl p-4 md:p-5 bio-box">
                            <p lang="en" class="text-gray-700 leading-relaxed text-[14px] md:text-[15px] font-medium perfect-justify">
                                <strong class="text-orange-600 tracking-tight block mb-1.5 uppercase text-xs md:text-sm">Nothing yet Everything</strong> 
                                Xin chào! Chào mừng đến với góc nhỏ của tôi. Kho lưu trữ này là nơi tập hợp vài món đồ chơi được tôi "vibe coding" ra, cùng với đủ loại mẹo vặt hay ho. Mấy công cụ này vốn được sinh ra để tự cứu lấy mình, nhưng giờ tôi quyết định mở bát chia sẻ cho tất cả mọi người. Cứ tự nhiên vọc vạch nhé, và nếu có bắt gặp bug nào... hãy nhắn tôi để tôi "vibe" ra bản vá lỗi, thông tin liên hệ ở ngay bên dưới!
                            </p>
                        </div>
                        
                        <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Application</span>
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Vibe_coding</span>
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Tips</span>
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Tools</span>
                            <span class="bg-orange-50 border border-orange-200 text-orange-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-bold hover:bg-orange-600 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#AI_Powered</span>
                            <span class="bg-orange-50 border border-orange-200 text-orange-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-bold hover:bg-orange-600 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#CodeForFun</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card p-5 sm:p-6 md:p-8 rounded-[2rem] border border-gray-100 relative overflow-hidden bg-white/80 backdrop-blur-md shadow-sm transition-colors duration-300">
                    
                    <div class="mb-6">
                        <h2 class="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Tìm thử biết đâu có thứ cần</h2>
                    </div>

                    <div class="relative mb-6 group">
                        <input type="text" id="guide-search" class="w-full bg-gray-50/50 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-3.5 px-5 text-base text-gray-700 focus:outline-none focus:border-orange-300 focus:ring-4 ring-orange-50 shadow-sm transition-all placeholder-gray-400 font-medium hover:border-orange-200 relative z-0" placeholder="Nhập từ khóa tìm kiếm...">
                    </div>
                    
                    <div id="guide-list" class="space-y-3">
                        </div>

                    <div id="guide-no-result" class="hidden text-center p-10 text-gray-500 italic bg-gray-50/80 rounded-2xl border border-dashed border-gray-200 mt-4 shadow-sm transition-colors duration-300">
                        <p class="font-medium text-lg text-gray-700">Không tìm thấy bài viết nào phù hợp...</p>
                        <p class="text-sm mt-1 text-gray-400">Thử tìm với từ khóa khác xem sao!</p>
                    </div>
                </div>

            </div>
        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    // --- BẮT ĐẦU LOGIC LAZY LOAD ---
    const guideList = document.getElementById('guide-list');
    const searchInput = document.getElementById('guide-search');
    const noResult = document.getElementById('guide-no-result');
    
    let cachedContent = {};
    
    const manifest = [
        { title: "Contact me", date: "Nothing", path: "posts/contact.md" },
        { title: "Tạo Bot Telegram quản lý tài chính với Google Sheet", date: "Nothing", path: "posts/bot-telegram.md" },
        { title: "Chặn quảng cáo Web, App, Zalo bằng NextDNS", date: "Thủ thuật IOS", path: "posts/nextdns.md" },
        { title: "Cài Lịch Âm & Bộ gõ tiếng Việt trên macOS, các ứng dụng khác", date: "Thủ thuật Mac", path: "posts/mac-apps.md" },
        { title: "Tổng hợp tài liệu học lập trình và công nghệ thông tin từ Freetuts", date: "Tài liệu học tập", path: "posts/tong-hop-tai-lieu-freetuts.md" },
        { title: "Tổng hợp các nhóm crack mod hack - apk,ipa(android/ios) trên Telegram", date: "Phần mềm/Ứng dụng", path: "posts/group-telegram.md" },
        { title: "Tổng hợp các trang web chia sẻ tài nguyên ứng dụng trên Mac", date: "Thủ thuật Mac", path: "posts/mac-webs.md" }
    ];
    
    const renderGuideList = () => {
        guideList.innerHTML = '';
        manifest.forEach((guide, index) => {
            const item = document.createElement('div');
            item.id = `guide-item-${index}`;
            item.className = 'guide-item bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition hover:shadow-md hover:border-orange-100 duration-300';
            
            item.innerHTML = `
                <button class="w-full text-left px-4 py-4 md:px-6 md:py-5 flex items-center justify-between focus:outline-none group" onclick="toggleGuide(${index})">
                    <div class="pr-4">
                        <h3 class="font-bold text-gray-800 group-hover:text-orange-500 transition text-[15px] md:text-lg leading-snug">${guide.title}</h3>
                        <p class="inline-block mt-2 bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors">${guide.date}</p>
                    </div>
                    <div id="icon-${index}" class="text-gray-400 transform transition-transform duration-300 w-8 h-8 flex items-center justify-center bg-gray-50 rounded-full group-hover:bg-orange-100 group-hover:text-orange-500 shrink-0">▼</div>
                </button>
                <div id="content-${index}" class="hidden border-t border-gray-100 bg-gray-50/50 transition-colors duration-300">
                    <div class="prose-custom max-w-none px-4 py-5 md:p-6 text-[14.5px] md:text-base leading-relaxed perfect-justify" id="md-render-${index}"></div>
                </div>
            `;
            guideList.appendChild(item);
        });
    };
    
    renderGuideList();
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('.guide-item');
        let hasVisible = false;
        
        manifest.forEach((guide, index) => {
            const match = guide.title.toLowerCase().includes(term);
            if (match) {
                if (items[index]) items[index].style.display = 'block';
                hasVisible = true;
            } else {
                if (items[index]) items[index].style.display = 'none';
            }
        });
        
        if (!hasVisible) {
            noResult.classList.remove('hidden');
        } else {
            noResult.classList.add('hidden');
        }
    });
    
    window.toggleGuide = async function(index) {
        const contentDiv = document.getElementById('content-' + index);
        const iconDiv = document.getElementById('icon-' + index);
        const renderDiv = document.getElementById('md-render-' + index);
        const parentItem = document.getElementById('guide-item-' + index);
        
        manifest.forEach((_, i) => {
            if (i !== index) {
                const otherContent = document.getElementById('content-' + i);
                const otherIcon = document.getElementById('icon-' + i);
                if(otherContent && !otherContent.classList.contains('hidden')) {
                    otherContent.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        if (contentDiv.classList.contains('hidden')) {
            contentDiv.classList.remove('hidden');
            iconDiv.style.transform = 'rotate(180deg)';
            
            if (!cachedContent[index]) {
                renderDiv.innerHTML = '<div class="text-orange-500 font-bold animate-pulse text-center py-6 flex flex-col items-center gap-2"><div class="w-6 h-6 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div> Đang nạp dữ liệu bài viết...</div>';
                try {
                    const response = await fetch(manifest[index].path);
                    if (!response.ok) throw new Error("Lỗi tải file");
                    let text = await response.text();
                    
                    if (window.marked) {
                        text = text.replace(/^@time\[(.*?)\] (.*)$/gm, '<div class="md-timeline-node"><span class="md-time-badge">$1</span><div class="md-time-text">$2</div></div>');
                        cachedContent[index] = marked.parse(text);
                    } else {
                        cachedContent[index] = "<p class='text-red-500 text-center py-4'>Lỗi: Không tải được thư viện giải mã Markdown.</p>";
                    }
                } catch (error) {
                    console.error(error);
                    cachedContent[index] = `<div class="text-red-500 bg-red-50 p-4 text-center rounded-xl border border-red-100 my-4">Không thể tải nội dung file <b>${manifest[index].path}</b></div>`;
                }
            }
            
            renderDiv.innerHTML = cachedContent[index];
            renderDiv.querySelectorAll('a').forEach(link => {
                link.setAttribute('target', '_blank');
                link.className = 'text-orange-500 font-bold hover:underline';
            });

            setTimeout(() => {
                if (parentItem) {
                    const yOffset = -20; 
                    const y = parentItem.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100); 
            
        } else {
            contentDiv.classList.add('hidden');
            iconDiv.style.transform = 'rotate(0deg)';
        }
    };
}
