export function setupTool() {
    const tabId = 'tab-md';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    panel.innerHTML = `
        <style>
            /* Typography Căn Đều Hoàn Hảo */
            .premium-justify {
                text-align: justify !important;
                text-justify: inter-word;
                word-spacing: -0.04em; 
                letter-spacing: -0.015em; 
                hyphens: auto;
                -webkit-hyphens: auto;
                overflow-wrap: break-word; 
            }
            .prose-custom code {
                white-space: pre-wrap !important;
                word-break: break-word !important;
            }
            .prose-custom pre {
                max-width: 100%;
                overflow-x: auto;
                background-color: #f8fafc;
                padding: 1rem;
                border-radius: 0.75rem;
                border: 1px solid #e2e8f0;
                margin: 1rem 0;
            }
            .prose-custom pre code {
                white-space: pre !important;
                word-break: normal !important;
                background: transparent !important;
                color: #334155 !important;
                padding: 0 !important;
            }
            #md-preview {
                max-width: 100%;
                overflow-x: hidden;
                word-wrap: break-word;
            }
            .prose-custom img {
                max-width: 100%;
                height: auto;
                border-radius: 0.5rem;
            }
        </style>

        <div class="text-center mb-6">
           <span class="bg-gray-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Giải mã</span>
            <h2 class="text-3xl font-bold mt-2">Trình đọc <span class="text-orange-500">Markdown 📝</span></h2>
             <p class="text-sm text-gray-500 mt-2 italic">Nhập ngôn ngữ markdown hoặc chọn file .md.</p>
        </div>
        
        <div class="glass-card p-4 sm:p-6 md:p-8 rounded-[2rem] w-full overflow-hidden">
            <div class="flex justify-center mb-4">
                <label class="cursor-pointer bg-orange-100 text-orange-600 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-orange-200 transition shadow-sm active:scale-95 flex items-center gap-2">
                    <span>📁</span> Chọn File (.md)
                    <input type="file" id="md-file" accept=".md" class="hidden">
                </label>
            </div>
            
            <textarea id="md-input" class="w-full h-48 bg-gray-50/80 backdrop-blur-sm rounded-2xl p-5 font-mono text-sm border border-gray-200 focus:outline-none focus:ring-4 ring-orange-100 shadow-inner transition-all placeholder-gray-400" placeholder="# Gõ Markdown vào đây hoặc tải file lên..."></textarea>
            
            <div id="md-preview" class="prose-custom max-w-none premium-justify mt-6 p-5 sm:p-6 md:p-8 bg-white rounded-[1.5rem] shadow-sm border border-gray-100 min-h-[150px] leading-relaxed text-[15px] sm:text-base"></div>
        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    // --- BẮT ĐẦU LOGIC ---
    const mdIn = document.getElementById('md-input');
    const mdPre = document.getElementById('md-preview');
    const mdFile = document.getElementById('md-file');
    
    const renderMD = () => {
        if (window.marked) {
            mdPre.innerHTML = marked.parse(mdIn.value);
            // Xử lý thêm các thẻ link (mở tab mới, làm nổi bật màu cam)
            mdPre.querySelectorAll('a').forEach(link => {
                link.setAttribute('target', '_blank');
                link.className = 'text-orange-500 font-bold hover:underline';
            });
        } else {
            mdPre.innerHTML = '<p class="text-red-500">Thư viện giải mã Markdown chưa được tải!</p>';
        }
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
