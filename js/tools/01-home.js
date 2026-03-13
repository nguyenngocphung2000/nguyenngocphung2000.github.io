export function setupTool() {
    const tabId = 'tab-home';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    panel.innerHTML = `
        <div class="space-y-8"> 
            <div class="glass-card p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row items-center md:items-start gap-6 border-t-4 border-t-orange-400 relative overflow-hidden shadow-sm">
                <div class="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
                
                <div class="relative w-24 h-24 md:w-32 md:h-32 shrink-0 z-10 group cursor-default">
                    <div class="absolute inset-0 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-full blur-md opacity-40 group-hover:opacity-80 transition duration-500"></div>
                    
                    <div class="relative w-full h-full rounded-full bg-gradient-to-br from-orange-50 to-orange-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-5xl md:text-6xl transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105">
                        🧑‍💻
                    </div>
                    
                    <div class="absolute bottom-1 right-1 w-5 h-5 md:w-6 md:h-6 bg-green-500 border-[3px] border-white rounded-full shadow-sm flex items-center justify-center z-20">
                        <span class="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                    </div>
                </div>

                <div class="text-center md:text-left flex-1 z-10">
                    <div class="inline-flex items-center gap-1.5 bg-gradient-to-r from-orange-100 to-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm border border-orange-200/50 hover:shadow-md transition">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        Nguyễn Ngọc Phụng
                    </div>
                    
                    <h1 class="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
                        Hello, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 drop-shadow-sm">Nothing</span>
                    </h1>
                    
                    <p class="text-gray-600 leading-relaxed mb-4 text-sm md:text-base border-l-4 border-orange-300 pl-4 py-1 bg-gradient-to-r from-orange-50/10 to-transparent rounded-r-xl relative z-10 font-medium">
                        <strong class="text-orange-600">NOTHING BUT SOMETHING</strong> • Hello there! Welcome to my little corner. This is a small stash containing some little toys that I personally... asked AI to code for me 😂, along with a basket of cool tricks and tips I picked up or came up with myself. Initially, these things were created just to "save" my own life, but out of the goodness of my overflowing heart, I decided to bring them all out here to share with everyone. Make yourself at home, feel free to tinker around. If there are any bugs... let me know so I can ask AI to fix them, my contact info is right below!
                    </p>
                    
                    <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                        <span class="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Application</span>
                        <span class="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Tips</span>
                        <span class="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Tools</span>
                        <span class="bg-white border border-gray-200 text-gray-600 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Nothing</span>
                        
                        <span class="bg-orange-50 border border-orange-200 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#AI_Powered 🚀</span>
                        <span class="bg-orange-50 border border-orange-200 text-orange-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-orange-500 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#CodeForFun ✌️</span>
                    </div>
                </div>
            </div>

            <div class="glass-card p-6 md:p-8 rounded-[2rem] border-t-4 border-t-orange-400 relative overflow-hidden bg-white/40 shadow-sm">
                
                <div class="mb-6 flex items-center gap-3 px-2">
                    <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl shadow-inner">📚</div>
                    <h2 class="text-2xl font-bold text-gray-800 tracking-tight">Tìm thử biết đâu có thứ cần</h2>
                </div>

                <div class="relative mb-8 group">
                    <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                        <span class="text-gray-400 group-focus-within:text-orange-500 transition-colors">🔍</span>
                    </div>
                    <input type="text" id="guide-search" class="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 text-base text-gray-700 focus:outline-none focus:border-orange-300 focus:ring-4 ring-orange-50 shadow-sm transition-all placeholder-gray-400 font-medium hover:border-orange-100" placeholder="Nhập từ khóa để tìm bài viết, thủ thuật...">
                </div>
                
                <div id="guide-list" class="space-y-4">
                    <div class="text-center p-8 text-orange-500 font-bold animate-pulse bg-orange-50/50 rounded-2xl border border-orange-100">Đang tải bài viết... ⏳</div>
                </div>

                <div id="guide-no-result" class="hidden text-center p-10 text-gray-500 italic bg-white/60 rounded-2xl border border-dashed border-gray-200 mt-4 shadow-sm">
                    <div class="text-4xl mb-3 opacity-80">🥲</div>
                    <p class="font-medium text-lg">Không tìm thấy bài viết nào phù hợp...</p>
                    <p class="text-sm mt-1 text-gray-400">Thử tìm với từ khóa khác xem sao!</p>
                </div>
            </div>

        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    // --- BẮT ĐẦU LOGIC ---
    const guideList = document.getElementById('guide-list');
    const searchInput = document.getElementById('guide-search');
    const noResult = document.getElementById('guide-no-result');
    
    let loadedGuides = [];
    
    const manifest = [
        { title: "ℹ️ Contact me", date: "Nothing", path: "posts/contact.md" },
        { title: "🤖 Tạo Bot Telegram quản lý tài chính với Google Sheet", date: "Nothing", path: "posts/bot-telegram.md" },
        { title: "⛑️ Chặn quảng cáo Web, App, Zalo bằng NextDNS", date: "Thủ thuật IOS", path: "posts/nextdns.md" },
        { title: "📅 Cài Lịch Âm & Bộ gõ tiếng Việt trên macOS", date: "Thủ thuật Mac", path: "posts/mac-apps.md" }
    ];
    
    const fetchAllMarkdown = async () => {
        try {
            const promises = manifest.map(async (item) => {
                const response = await fetch(item.path);
                if (!response.ok) throw new Error("Lỗi tải file " + item.path);
                const markdownText = await response.text();
                
                return {
                    title: item.title,
                    date: item.date,
                    content: markdownText
                };
            });
            
            loadedGuides = await Promise.all(promises);
            renderGuideList();
            
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu bài viết:", error);
            guideList.innerHTML = `<div class="text-center p-5 text-red-500 bg-red-50 rounded-2xl border border-red-100">⚠️ Không thể tải được bài viết. Vui lòng kiểm tra lại đường dẫn file thư mục <b>posts/</b>.</div>`;
        }
    };
    
    const renderGuideList = () => {
        guideList.innerHTML = '';
        
        loadedGuides.forEach((guide, index) => {
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
    };
    
    fetchAllMarkdown();
    
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        const items = document.querySelectorAll('.guide-item');
        let hasVisible = false;
        
        loadedGuides.forEach((guide, index) => {
            const match = guide.title.toLowerCase().includes(term) || guide.content.toLowerCase().includes(term);
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
    
    window.toggleGuide = function(index) {
        const contentDiv = document.getElementById('content-' + index);
        const iconDiv = document.getElementById('icon-' + index);
        const renderDiv = document.getElementById('md-render-' + index);
        
        if (contentDiv.classList.contains('hidden')) {
            loadedGuides.forEach((_, i) => {
                if (i !== index) {
                    document.getElementById('content-' + i).classList.add('hidden');
                    document.getElementById('icon-' + i).style.transform = 'rotate(0deg)';
                }
            });
            
            contentDiv.classList.remove('hidden');
            iconDiv.style.transform = 'rotate(180deg)';
            
            if (renderDiv.innerHTML.trim() === '') {
                if (window.marked) {
                    let text = loadedGuides[index].content;
                    text = text.replace(/^@time\[(.*?)\] (.*)$/gm, '<div class="md-timeline-node"><span class="md-time-badge">$1</span><div class="md-time-text">$2</div></div>');
                    renderDiv.innerHTML = marked.parse(text);
                    renderDiv.querySelectorAll('a').forEach(link => {
                        link.setAttribute('target', '_blank');
                        link.className = 'text-orange-500 font-bold hover:underline';
                    });
                } else {
                    renderDiv.innerHTML = "<p class='text-red-500'>Lỗi: Không tải được thư viện giải mã Markdown.</p>";
                }
            }
        } else {
            contentDiv.classList.add('hidden');
            iconDiv.style.transform = 'rotate(0deg)';
        }
    };
}