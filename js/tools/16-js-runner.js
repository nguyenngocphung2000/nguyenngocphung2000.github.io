// --- 16. Tool Trình Chạy Mã JS (Giao diện Rộng - Ngắn - Có Xóa/Dán) ---
export function setupTool() {
    const tabId = 'tab-js-runner';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    // Giao diện Ombre Tím tối ưu kích thước
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
                height: 220px; /* Thu ngắn chiều cao ô nhập để thẻ ngắn lại */
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

            /* Nút Chạy Mã Chính */
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

            /* Nút phụ (Dán, Xóa) */
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
            
            /* Tùy chỉnh thanh cuộn siêu mượt */
            .scroll-hide::-webkit-scrollbar { width: 6px; }
            .scroll-hide::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        </style>

        <div class="text-center mb-5">
            <span class="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Developer</span>
            <h2 class="text-3xl font-black mt-2 text-slate-800 tracking-tight" style="font-family: 'Nunito', sans-serif;">Trình Chạy <span class="text-purple-600">JavaScript 🚀</span></h2>
        </div>

        <div class="js-runner-app w-full max-w-4xl mx-auto relative p-6">
            
            <textarea class="js-runner-textarea scroll-hide" id="js-code-input" spellcheck="false" placeholder="// Dán hoặc gõ mã JavaScript của bạn vào đây...&#10;console.log('Chào bạn yêu!');"></textarea>
            
            <div class="flex flex-wrap items-center justify-end gap-3 mt-4">
                <button class="js-btn-secondary flex items-center gap-1.5" id="clear-js-btn">
                    <span>🗑️</span> Xóa sạch
                </button>
                <button class="js-btn-secondary flex items-center gap-1.5" id="paste-js-btn">
                    <span>📋</span> Dán mã
                </button>
                <button class="js-runner-btn flex items-center gap-1.5 ml-2" id="run-js-btn">
                    <span>▶️</span> Chạy Mã
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    // --- LOGIC CHẠY MÃ JS & CÁC NÚT ---
    const runBtn = document.getElementById('run-js-btn');
    const clearBtn = document.getElementById('clear-js-btn');
    const pasteBtn = document.getElementById('paste-js-btn');
    const codeInput = document.getElementById('js-code-input');
    
    // Logic nút Xóa
    clearBtn.addEventListener('click', () => {
        codeInput.value = '';
        codeInput.focus();
    });

    // Logic nút Dán (Dán đúng vào vị trí con trỏ chuột)
    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                const start = codeInput.selectionStart;
                const end = codeInput.selectionEnd;
                // Chèn văn bản vào đúng chỗ đang trỏ chuột
                codeInput.value = codeInput.value.substring(0, start) + text + codeInput.value.substring(end);
                // Đẩy con trỏ chuột về cuối đoạn vừa dán
                codeInput.selectionStart = codeInput.selectionEnd = start + text.length;
            }
            codeInput.focus();
        } catch (err) {
            alert('Trình duyệt của bạn đang chặn quyền lấy dữ liệu từ Clipboard. Bạn hãy dùng phím tắt Ctrl+V hoặc Nhấn Giữ -> Dán nhé!');
        }
    });

    // Logic nút Chạy Mã
    runBtn.addEventListener('click', function() {
        const code = codeInput.value.trim();
        if (!code) {
            alert('Vui lòng dán mã JS trước khi chạy nhé bạn yêu!');
            return;
        }
        
        // Mở trang mới để chạy mã
        const newWindow = window.open('', '_blank');
        
        // Tạo nội dung HTML cho trang kết quả
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="vi">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>JS Runner - Kết Quả</title>
                <style>
                    body {
                        font-family: 'Nunito', system-ui, sans-serif;
                        padding: 30px;
                        background-color: #f8fafc;
                        color: #1e293b;
                        line-height: 1.6;
                    }
                    h1 { color: #6c47ff; margin-bottom: 20px; font-weight: 800; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
                    #output {
                        background-color: #0f172a;
                        color: #38bdf8;
                        border-radius: 12px;
                        padding: 20px;
                        font-family: 'Courier New', monospace;
                        white-space: pre-wrap;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                        min-height: 200px;
                        font-size: 14px;
                    }
                    .log-line { margin-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px; }
                    .log-error { color: #ef4444; font-weight: bold; background: rgba(239, 68, 68, 0.1); padding: 2px 5px; border-radius: 4px; }
                </style>
            </head>
            <body>
                <h1>Kết quả Console 🚀</h1>
                <div id="output"></div>
                <script>
                    const outputDiv = document.getElementById('output');
                    
                    // Ghi đè console.log để in ra màn hình siêu đẹp
                    const originalLog = console.log;
                    console.log = function(...args) {
                        originalLog(...args); 
                        const message = args.map(arg => {
                            if (typeof arg === 'object') {
                                return JSON.stringify(arg, null, 2); 
                            }
                            return String(arg);
                        }).join(' ');
                        outputDiv.innerHTML += '<div class="log-line">➔ ' + message + '</div>';
                    };

                    // Chạy mã JS của người dùng
                    try {
                        ${code}
                    } catch (error) {
                        outputDiv.innerHTML += '<div class="log-line log-error">⚠️ Lỗi: ' + error.message + '</div>';
                    }
                </script>
            </body>
            </html>
        `;
        
        newWindow.document.write(htmlContent);
        newWindow.document.close(); 
    });
}
