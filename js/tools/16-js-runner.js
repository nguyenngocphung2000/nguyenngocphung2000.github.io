// --- 16. Tool Trình Chạy Mã JS (Mở tab mới sạch sẽ hoàn toàn) ---
export function setupTool() {
    const tabId = 'tab-js-runner';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    // Giao diện Ombre Tím ở công cụ gõ code (Giữ nguyên)
    panel.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

            .js-runner-app {
                background: linear-gradient(180deg, #6c47ff 0%, #9e6cf6 40%, #ffcbe6 100%);
                border-radius: 2rem;
                font-family: 'Nunito', sans-serif;
                box-shadow: 0 20px 40px -10px rgba(108, 71, 255, 0.4);
                overflow: hidden;
                color: #ffffff;
            }

            .js-runner-textarea {
                width: 100%;
                height: 220px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                padding: 1.25rem;
                border: 2px solid rgba(255, 255, 255, 0.2);
                color: #ffffff;
                font-family: 'Courier New', Courier, monospace;
                font-size: 0.9rem;
                line-height: 1.5;
                resize: none;
                transition: all 0.3s ease;
            }

            .js-runner-textarea:focus {
                outline: none;
                background: rgba(255, 255, 255, 0.15);
                border-color: rgba(255, 255, 255, 0.5);
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
            }

            .js-runner-textarea::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }

            .js-runner-btn {
                background: #8155ff;
                color: #ffffff;
                border: none;
                border-radius: 9999px;
                padding: 0.6rem 1.5rem;
                font-size: 1rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 5px 15px rgba(129, 85, 255, 0.3);
            }
            .js-runner-btn:hover { background: #6c47ff; transform: translateY(-2px); }
            .js-runner-btn:active { transform: translateY(1px); }

            .js-btn-secondary {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #ffffff;
                border-radius: 9999px;
                padding: 0.6rem 1.2rem;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .js-btn-secondary:hover { background: rgba(255, 255, 255, 0.25); transform: translateY(-1px); }
            .js-btn-secondary:active { transform: scale(0.95); }
            
            .scroll-hide::-webkit-scrollbar { width: 6px; }
            .scroll-hide::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        </style>

        <div class="text-center mb-5">
            <span class="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Developer</span>
            <h2 class="text-3xl font-black mt-2 text-slate-800 tracking-tight" style="font-family: 'Nunito', sans-serif;">Trình Chạy <span class="text-purple-600">JavaScript 🚀</span></h2>
        </div>

        <div class="js-runner-app w-full max-w-4xl mx-auto relative p-6">
            <textarea class="js-runner-textarea scroll-hide" id="js-code-input" spellcheck="false" placeholder="// Dán mã JavaScript của bạn vào đây..."></textarea>
            
            <div class="flex flex-wrap items-center justify-end gap-3 mt-4">
                <button class="js-btn-secondary flex items-center gap-1.5" id="clear-js-btn"><span>🗑️</span> Xóa sạch</button>
                <button class="js-btn-secondary flex items-center gap-1.5" id="paste-js-btn"><span>📋</span> Dán mã</button>
                <button class="js-runner-btn flex items-center gap-1.5 ml-2" id="run-js-btn"><span>▶️</span> Chạy Mã</button>
            </div>
        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    // --- LOGIC ---
    const runBtn = document.getElementById('run-js-btn');
    const clearBtn = document.getElementById('clear-js-btn');
    const pasteBtn = document.getElementById('paste-js-btn');
    const codeInput = document.getElementById('js-code-input');
    
    clearBtn.addEventListener('click', () => { codeInput.value = '';
        codeInput.focus(); });
    
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                const start = codeInput.selectionStart;
                const end = codeInput.selectionEnd;
                codeInput.value = codeInput.value.substring(0, start) + text + codeInput.value.substring(end);
                codeInput.selectionStart = codeInput.selectionEnd = start + text.length;
            }
            codeInput.focus();
        } catch (err) {
            alert('Trình duyệt chặn quyền Clipboard. Hãy dùng phím tắt Ctrl+V hoặc Nhấn Giữ -> Dán nhé!');
        }
    });
    
    runBtn.addEventListener('click', function() {
        const code = codeInput.value.trim();
        if (!code) return;
        
        const newWindow = window.open('', '_blank');
        
        // BẢN RÚT GỌN TRANG TRẮNG: Không trang trí dư thừa, chỉ chèn CDN Tailwind, thư viện Marked và tạo sẵn div#app-container
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Code Preview</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                <style>
                    body { background-color: #f8fafc; padding: 2rem; }
                </style>
            </head>
            <body>
                <div id="app-container" class="max-w-4xl mx-auto"></div>
                
                <script>
                    try {
                        ${code}
                    } catch (error) {
                        document.body.innerHTML += '<div style="color: red; background: #fee2e2; padding: 1rem; border-radius: 0.5rem; border: 1px solid #f87171; margin-top: 1rem;">⚠️ Lỗi JS: ' + error.message + '</div>';
                        console.error(error);
                    }
                </script>
            </body>
            </html>
        `;
        
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    });
}