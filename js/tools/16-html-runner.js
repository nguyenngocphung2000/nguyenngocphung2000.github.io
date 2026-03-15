
export function setupTool() {
    const tabId = 'tab-html-runner';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    // Giao diện Ombre Tím nhưng Title màu Cam
    panel.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

            .html-runner-app {
                background: linear-gradient(180deg, #6c47ff 0%, #9e6cf6 40%, #ffcbe6 100%);
                border-radius: 2rem;
                font-family: 'Nunito', sans-serif;
                box-shadow: 0 20px 40px -10px rgba(108, 71, 255, 0.4);
                overflow: hidden;
                color: #ffffff;
            }

            .html-runner-textarea {
                width: 100%;
                height: 300px; /* Thẻ không có iframe nên được kéo dài ra gõ cho sướng */
                background: rgba(255, 255, 255, 0.1);
                border-radius: 1rem;
                padding: 1.25rem;
                border: 2px solid rgba(255, 255, 255, 0.2);
                color: #ffffff;
                font-family: 'Courier New', Courier, monospace;
                font-size: 0.95rem;
                line-height: 1.6;
                resize: none;
                transition: all 0.3s ease;
            }

            .html-runner-textarea:focus {
                outline: none;
                background: rgba(255, 255, 255, 0.15);
                border-color: rgba(255, 255, 255, 0.5);
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
            }

            .html-runner-textarea::placeholder {
                color: rgba(255, 255, 255, 0.6);
            }

            /* Nút Chạy Mã Chính */
            .html-runner-btn {
                background: #8155ff;
                color: #ffffff;
                border: none;
                border-radius: 9999px;
                padding: 0.75rem 2rem;
                font-size: 1rem;
                font-weight: 800;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 5px 15px rgba(129, 85, 255, 0.3);
            }
            .html-runner-btn:hover { background: #6c47ff; transform: translateY(-2px); }
            .html-runner-btn:active { transform: translateY(1px); }

            /* Nút phụ (Dán, Xóa) */
            .html-btn-secondary {
                background: rgba(255, 255, 255, 0.15);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: #ffffff;
                border-radius: 9999px;
                padding: 0.75rem 1.25rem;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .html-btn-secondary:hover { background: rgba(255, 255, 255, 0.25); transform: translateY(-1px); }
            .html-btn-secondary:active { transform: scale(0.95); }
            
            /* Tùy chỉnh thanh cuộn siêu mượt */
            .scroll-hide::-webkit-scrollbar { width: 6px; }
            .scroll-hide::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 10px; }
        </style>

        <div class="text-center mb-5">
            <span class="bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Developer</span>
            <h2 class="text-3xl font-black mt-2 text-slate-800 tracking-tight" style="font-family: 'Nunito', sans-serif;">Trình Chạy <span class="text-orange-500">HTML 🚀</span></h2>
        </div>

        <div class="html-runner-app w-full max-w-4xl mx-auto relative p-5 md:p-8">
            
            <textarea class="html-runner-textarea scroll-hide" id="html-code-input" spellcheck="false" placeholder="\n<style>\n  h1 { color: #f97316; text-align: center; font-family: sans-serif; margin-top: 50px; }\n</style>\n\n<h1>Xin chào! 👋</h1>\n<script>\n  console.log('Mã đã sẵn sàng!');\n</script>"></textarea>
            
            <div class="flex flex-wrap items-center justify-end gap-3 mt-5">
                <button class="html-btn-secondary flex items-center gap-1.5" id="clear-html-btn">
                    <span>🗑️</span> Xóa sạch
                </button>
                <button class="html-btn-secondary flex items-center gap-1.5" id="paste-html-btn">
                    <span>📋</span> Dán mã
                </button>
                <button class="html-runner-btn flex items-center gap-1.5 ml-2" id="run-html-btn">
                    <span>▶️</span> Chạy Tab Mới
                </button>
            </div>
            
        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    // --- LOGIC CHẠY MÃ VÀ CÁC NÚT ---
    const runBtn = document.getElementById('run-html-btn');
    const clearBtn = document.getElementById('clear-html-btn');
    const pasteBtn = document.getElementById('paste-html-btn');
    const codeInput = document.getElementById('html-code-input');
    
    // Gán mã mẫu
    const sampleCode = `<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 90vh; background-color: #f8fafc; margin: 0; }
  .box { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }
  h1 { color: #f97316; margin-bottom: 10px; font-weight: 800; }
  button { background: linear-gradient(to right, #f97316, #f59e0b); border: none; padding: 12px 25px; border-radius: 30px; color: white; font-weight: bold; cursor: pointer; transition: transform 0.2s; box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3); }
  button:hover { transform: translateY(-2px); }
</style>
</head>
<body>
  <div class="box">
      <h1>Code của bạn hoạt động tuyệt vời! 🚀</h1>
      <p style="color: #64748b; margin-bottom: 20px;">Trang web thu nhỏ này hoàn toàn độc lập và sạch sẽ.</p>
      <button onclick="alert('JS hoạt động 100% nha bạn yêu!')">Bấm Thử JS Nào</button>
  </div>
</body>
</html>`;

    if (!codeInput.value) {
        codeInput.value = sampleCode;
    }

    // Nút Xóa
    clearBtn.addEventListener('click', () => {
        codeInput.value = '';
        codeInput.focus();
    });

    // Nút Dán
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
            alert('Trình duyệt chặn quyền Clipboard. Bạn hãy dùng phím tắt Ctrl+V hoặc Nhấn Giữ -> Dán nhé!');
        }
    });

    // Nút Chạy Mã - Bật Tab mới và đóng dấu Logo Cam
    runBtn.addEventListener('click', function() {
        const code = codeInput.value;
        if (!code.trim()) {
            alert('Vui lòng nhập mã HTML trước nhé bạn yêu!');
            return;
        }
        
        // Mở Tab Mới Trắng Tinh
        const newWindow = window.open('', '_blank');
        
        // Tuyệt chiêu đóng dấu Watermark Logo màu Cam lơ lửng góc phải dưới (Không can thiệp layout của code gốc)
        const orangeLogoWatermark = `
            <div style="position: fixed; bottom: 20px; right: 20px; z-index: 2147483647; display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 8px 18px; border-radius: 999px; box-shadow: 0 10px 25px rgba(249, 115, 22, 0.25); border: 1.5px solid rgba(249, 115, 22, 0.3); font-family: sans-serif; pointer-events: none;">
                <span style="background: linear-gradient(90deg, #f97316, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; font-size: 14px; letter-spacing: 1px;">NOTHING</span>
                <span style="font-size: 16px; filter: drop-shadow(0 2px 4px rgba(249,115,22,0.4));">🧑‍💻</span>
            </div>
        `;
        
        // Ghi code của người dùng vào Tab mới, đính kèm Logo vào dòng cuối cùng
        newWindow.document.write(code + orangeLogoWatermark);
        newWindow.document.close();
    });
}
