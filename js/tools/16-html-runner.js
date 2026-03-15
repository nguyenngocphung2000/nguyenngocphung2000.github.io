// --- 16. Tool Trình Chạy HTML/CSS/JS Code Editor chuẩn VS Code  ---
export function setupTool() {
    const tabId = 'tab-html-runner';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    panel.innerHTML = `
        <style>
            .cobalt-ui-wrapper {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #f4f4f5; 
                border-radius: 1.5rem;
                color: #18181b;
                overflow: hidden;
                transition: background-color 0.3s, color 0.3s;
            }

            .cb-btn {
                background-color: #e4e4e7;
                border: none;
                border-radius: 0.75rem;
                padding: 0.75rem 0.5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
                cursor: pointer;
                transition: background 0.2s, transform 0.1s;
                color: #18181b;
            }
            .cb-btn:active { background-color: #d4d4d8; transform: scale(0.96); }
            .cb-btn svg { width: 22px; height: 22px; stroke-width: 1.5; }
            .cb-btn span { font-size: 0.85rem; font-weight: 500; letter-spacing: -0.3px; }

            .cb-btn-black {
                background-color: #000000;
                color: #ffffff;
                width: 100%;
                border: none;
                border-radius: 0.75rem;
                padding: 1rem;
                font-size: 1.1rem;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.1s, background-color 0.3s, color 0.3s;
                letter-spacing: -0.3px;
            }
            .cb-btn-black:active { transform: scale(0.98); }

            .cb-editor-box {
                display: flex;
                background-color: #ffffff;
                border: 1px solid #e4e4e7;
                border-radius: 1rem;
                overflow: hidden;
                height: 400px;
                position: relative;
                margin: 1rem 0;
                transition: background-color 0.3s, border-color 0.3s;
            }

            .cb-lines {
                width: 40px;
                background-color: #f8fafc;
                border-right: 1px solid #f1f5f9;
                text-align: right;
                padding-right: 8px;
                color: #94a3b8;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 13px;
                line-height: 22px;
                padding-top: 12px;
                padding-bottom: 12px;
                overflow: hidden;
                user-select: none;
                transition: background-color 0.3s, border-color 0.3s;
            }

            .cb-code-area {
                flex: 1;
                position: relative;
                overflow: hidden;
            }

            .cb-textarea, .cb-highlight {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                margin: 0;
                padding: 12px;
                border: none;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 13px;
                line-height: 22px;
                white-space: pre;
                overflow: auto;
                tab-size: 4;
            }

            .cb-textarea {
                color: transparent !important;
                background: transparent !important;
                caret-color: #000; 
                resize: none;
                outline: none;
                z-index: 2;
            }
            .cb-textarea::selection { background: rgba(0, 100, 255, 0.2); color: transparent; }

            .cb-highlight {
                color: #24292e;
                background: transparent; 
                z-index: 1;
                pointer-events: none; 
            }

            /* ========================================= */
            /* 🎨 BẢNG MÀU CÚ PHÁP BAN NGÀY (Light Theme) */
            /* ========================================= */
            .syn-tag { color: #d73a49; }       /* Thẻ HTML (Đỏ) */
            .syn-attr { color: #6f42c1; }      /* Thuộc tính (Tím) */
            .syn-str { color: #032f62; }       /* Chuỗi String (Xanh đậm) */
            .syn-kw { color: #d73a49; font-weight: 600; }  /* Từ khóa JS (Đỏ) */
            .syn-func { color: #005cc5; font-weight: 600; } /* Tên hàm (Xanh dương) */
            .syn-num { color: #005cc5; }       /* Số liệu (Xanh dương) */
            .syn-css { color: #005cc5; }       /* CSS Props (Xanh dương) */
            .syn-cmt { color: #6a737d; font-style: italic; } /* Chú thích (Xám) */

            .scroll-hide::-webkit-scrollbar { width: 4px; height: 4px; }
            .scroll-hide::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

            /* ========================================= */
            /* 🌙 ĐỘ DARK MODE ĐỈNH CAO CHUẨN COBALT DARK  */
            /* ========================================= */
            html.dark .cobalt-ui-wrapper, body.dark .cobalt-ui-wrapper { background-color: #18181b; color: #f4f4f5; }
            html.dark .cb-btn, body.dark .cb-btn { background-color: #27272a; color: #e4e4e7; }
            html.dark .cb-btn:active, body.dark .cb-btn:active { background-color: #3f3f46; }
            html.dark .cb-btn-black, body.dark .cb-btn-black { background-color: #ffffff; color: #000000; }
            html.dark .cb-editor-box, body.dark .cb-editor-box { background-color: #0d1117; border-color: #30363d; }
            html.dark .cb-lines, body.dark .cb-lines { background-color: #0d1117; border-color: #30363d; color: #6e7681; }
            html.dark .cb-highlight, body.dark .cb-highlight { color: #c9d1d9; }
            html.dark .cb-textarea, body.dark .cb-textarea { caret-color: #ffffff; }
            html.dark .cb-textarea::selection, body.dark .cb-textarea::selection { background: rgba(255, 255, 255, 0.2); }
            html.dark .scroll-hide::-webkit-scrollbar-thumb, body.dark .scroll-hide::-webkit-scrollbar-thumb { background: #3f3f46; }

            /* 🎨 BẢNG MÀU CÚ PHÁP BAN ĐÊM (Neon Dark Theme) */
            html.dark .syn-tag, body.dark .syn-tag { color: #7ee787; }      /* Thẻ HTML (Xanh Neon) */
            html.dark .syn-attr, body.dark .syn-attr { color: #d2a8ff; }    /* Thuộc tính (Tím nhạt) */
            html.dark .syn-str, body.dark .syn-str { color: #a5d6ff; }      /* Chuỗi (Xanh dương sáng) */
            html.dark .syn-kw, body.dark .syn-kw { color: #ff7b72; font-weight: 600;}  /* Từ khóa JS (Đỏ san hô) */
            html.dark .syn-func, body.dark .syn-func { color: #d2a8ff; font-weight: 600;} /* Tên hàm (Tím) */
            html.dark .syn-num, body.dark .syn-num { color: #79c0ff; }      /* Số liệu (Xanh lơ) */
            html.dark .syn-css, body.dark .syn-css { color: #79c0ff; }      /* CSS Props (Xanh lơ) */
            html.dark .syn-cmt, body.dark .syn-cmt { color: #8b949e; }      /* Chú thích (Xám bạc) */
        </style>

        <div class="cobalt-ui-wrapper w-full max-w-3xl mx-auto p-3 sm:p-5 shadow-md relative z-10">
            
            <div class="flex items-center gap-2 mb-4 px-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <h2 class="font-bold text-lg tracking-tight">html runner</h2>
            </div>

            <div class="grid grid-cols-3 gap-2 sm:gap-3">
                <button class="cb-btn" id="cb-clear">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <span>clear</span>
                </button>
                <button class="cb-btn" id="cb-copy">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    <span>copy</span>
                </button>
                <button class="cb-btn" id="cb-paste">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                    <span>paste</span>
                </button>
            </div>

            <div class="cb-editor-box">
                <div class="cb-lines" id="cb-lines">1</div>
                <div class="cb-code-area">
                    <textarea class="cb-textarea scroll-hide" id="cb-input" spellcheck="false" wrap="off"></textarea>
                    <pre class="cb-highlight" id="cb-highlight" aria-hidden="true"></pre>
                </div>
            </div>

            <button class="cb-btn-black" id="cb-run">
                run in new tab
            </button>

        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    const codeInput = document.getElementById('cb-input');
    const codeHighlight = document.getElementById('cb-highlight');
    const lineNumbers = document.getElementById('cb-lines');
    
    const runBtn = document.getElementById('cb-run');
    const clearBtn = document.getElementById('cb-clear');
    const copyBtn = document.getElementById('cb-copy');
    const pasteBtn = document.getElementById('cb-paste');

    // 🚀 THUẬT TOÁN HIGHLIGHT MỚI: THEO QUY LUẬT & SIÊU CHI TIẾT
    function highlightCode(code) {
        // 1. Mã hóa HTML trước để không vỡ layout
        let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
        // 2. CHUỖI VĂN BẢN (Strings)
        html = html.replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, '<span class="syn-str">$1</span>');
        
        // 3. CHÚ THÍCH (Comments)
        html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syn-cmt">$1</span>');
        html = html.replace(/(?<!:)(\/\/.*$)/gm, '<span class="syn-cmt">$1</span>');
        
        // 4. THẺ HTML (HTML Tags: html, body, div, h1...)
        html = html.replace(/(&lt;\/?)([a-zA-Z0-9-]+)/g, '$1<span class="syn-tag">$2</span>');
        
        // 5. THUỘC TÍNH HTML (HTML Attributes: class=, id=...)
        html = html.replace(/([a-zA-Z0-9_-]+)(?==<span class="syn-str">)/g, '<span class="syn-attr">$1</span>');

        // 6. THUỘC TÍNH CSS (CSS Properties: color:, font-size:...)
        html = html.replace(/([a-zA-Z0-9_-]+)(?=: )/g, '<span class="syn-css">$1</span>');

        // 7. TÊN HÀM (Functions: console.log, alert...)
        html = html.replace(/\b([a-zA-Z0-9_]+)(?=\()/g, '<span class="syn-func">$1</span>');

        // 8. CON SỐ (Numbers: 100, 0.5...) 
        // Phép Regex này sử dụng (?![^<]*>) để ĐẢM BẢO nó không bao giờ chèn lầm vào mã HTML sinh ra do các class trước đó.
        html = html.replace(/\b(\d+(\.\d+)?)\b(?![^<]*>)/g, '<span class="syn-num">$1</span>');
        
        // 9. TỪ KHÓA LẬP TRÌNH (Keywords)
        const keywords = /\b(function|const|let|var|return|if|else|for|while|document|window|console|import|export|true|false|new|class|await|async)\b(?![^<]*>)/g;
        html = html.replace(keywords, '<span class="syn-kw">$1</span>');

        return html;
    }

    function updateLineNumbers() {
        const linesCount = codeInput.value.split('\n').length;
        let numbersHTML = '';
        for (let i = 1; i <= linesCount; i++) {
            numbersHTML += i + '<br>';
        }
        lineNumbers.innerHTML = numbersHTML;
    }

    codeInput.addEventListener('input', () => {
        codeHighlight.innerHTML = highlightCode(codeInput.value);
        updateLineNumbers();
    });

    codeInput.addEventListener('scroll', () => {
        codeHighlight.scrollTop = codeInput.scrollTop;
        codeHighlight.scrollLeft = codeInput.scrollLeft;
        lineNumbers.scrollTop = codeInput.scrollTop;
    });

    clearBtn.addEventListener('click', () => {
        codeInput.value = '';
        codeInput.dispatchEvent(new Event('input')); 
        codeInput.focus();
    });

    copyBtn.addEventListener('click', () => {
        if (!codeInput.value) return;
        navigator.clipboard.writeText(codeInput.value);
        const originalText = copyBtn.querySelector('span').innerText;
        copyBtn.querySelector('span').innerText = 'copied!';
        setTimeout(() => copyBtn.querySelector('span').innerText = originalText, 1500);
    });

    pasteBtn.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                const start = codeInput.selectionStart;
                const end = codeInput.selectionEnd;
                codeInput.value = codeInput.value.substring(0, start) + text + codeInput.value.substring(end);
                codeInput.selectionStart = codeInput.selectionEnd = start + text.length;
                codeInput.dispatchEvent(new Event('input')); 
            }
            codeInput.focus();
        } catch (err) {
            alert('Trình duyệt chặn Clipboard. Dùng Ctrl+V hoặc Nhấn Giữ -> Dán nhé!');
        }
    });

    runBtn.addEventListener('click', function() {
        const code = codeInput.value;
        if (!code.trim()) {
            alert('please enter some code!');
            return;
        }
        
        const newWindow = window.open('', '_blank');
        
        const orangeLogoWatermark = `
            <div style="position: fixed; bottom: 20px; right: 20px; z-index: 2147483647; display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 8px 18px; border-radius: 999px; box-shadow: 0 10px 25px rgba(249, 115, 22, 0.25); border: 1.5px solid rgba(249, 115, 22, 0.3); font-family: sans-serif; pointer-events: none;">
                <span style="background: linear-gradient(90deg, #f97316, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; font-size: 14px; letter-spacing: 1px;">NOTHING</span>
                <span style="font-size: 16px; filter: drop-shadow(0 2px 4px rgba(249,115,22,0.4));">🧑‍💻</span>
            </div>
        `;
        
        newWindow.document.write(code + orangeLogoWatermark);
        newWindow.document.close();
    });

    // Mã mẫu thể hiện đầy đủ các loại màu sắc
    codeInput.value = `\n<!DOCTYPE html>\n<html>\n<head>\n  <title>hello</title>\n</head>\n<body>\n  <h1 id="title" class="main-text">hello world!</h1>\n  \n  <style>\n    body { background-color: #18181b; }\n    h1 { color: #f97316; font-size: 24px; }\n  </style>\n\n  <script>\n    // JS Function test\n    const limit = 100;\n    function sayHello() {\n      console.log("no more bugs! " + limit);\n    }\n    sayHello();\n  </script>\n</body>\n</html>`;
    codeInput.dispatchEvent(new Event('input')); 
}
