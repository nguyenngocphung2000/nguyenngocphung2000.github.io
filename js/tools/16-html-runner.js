// --- 16. Tool Trình Chạy HTML/CSS/JS (Code Editor chuẩn VS Code + Tích hợp Mini Console) ---
export function setupTool() {
    const tabId = 'tab-html-runner';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    // Giao diện xám/đen chuẩn Cobalt + Auto Dark Mode
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

            /* MÀU CÚ PHÁP BAN NGÀY */
            .syn-tag { color: #d73a49; }       
            .syn-attr { color: #6f42c1; }      
            .syn-str { color: #032f62; }       
            .syn-kw { color: #d73a49; font-weight: 600; }  
            .syn-func { color: #005cc5; font-weight: 600; } 
            .syn-num { color: #005cc5; }       
            .syn-css { color: #005cc5; }       
            .syn-cmt { color: #6a737d; font-style: italic; } 

            .scroll-hide::-webkit-scrollbar { width: 4px; height: 4px; }
            .scroll-hide::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

            /* MÀU CÚ PHÁP BAN ĐÊM & DARK MODE GIAO DIỆN */
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

            html.dark .syn-tag, body.dark .syn-tag { color: #7ee787; }      
            html.dark .syn-attr, body.dark .syn-attr { color: #d2a8ff; }    
            html.dark .syn-str, body.dark .syn-str { color: #a5d6ff; }      
            html.dark .syn-kw, body.dark .syn-kw { color: #ff7b72; font-weight: 600;}  
            html.dark .syn-func, body.dark .syn-func { color: #d2a8ff; font-weight: 600;} 
            html.dark .syn-num, body.dark .syn-num { color: #79c0ff; }      
            html.dark .syn-css, body.dark .syn-css { color: #79c0ff; }      
            html.dark .syn-cmt, body.dark .syn-cmt { color: #8b949e; }      
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

    function highlightCode(code) {
        let html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        html = html.replace(/(&quot;.*?&quot;|'.*?'|`.*?`)/g, '<span class="syn-str">$1</span>');
        html = html.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="syn-cmt">$1</span>');
        html = html.replace(/(?<!:)(\/\/.*$)/gm, '<span class="syn-cmt">$1</span>');
        html = html.replace(/(&lt;\/?)([a-zA-Z0-9-]+)/g, '$1<span class="syn-tag">$2</span>');
        html = html.replace(/([a-zA-Z0-9_-]+)(?==<span class="syn-str">)/g, '<span class="syn-attr">$1</span>');
        html = html.replace(/([a-zA-Z0-9_-]+)(?=: )/g, '<span class="syn-css">$1</span>');
        html = html.replace(/\b([a-zA-Z0-9_]+)(?=\()/g, '<span class="syn-func">$1</span>');
        html = html.replace(/\b(\d+(\.\d+)?)\b(?![^<]*>)/g, '<span class="syn-num">$1</span>');
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

    // --- LOGIC XUẤT CODE + CHÈN MINI CONSOLE VÀO TAB MỚI ---
    runBtn.addEventListener('click', function() {
        const code = codeInput.value;
        if (!code.trim()) {
            alert('Vui lòng gõ mã code trước khi chạy nhé bạn yêu!');
            return;
        }
        
        const newWindow = window.open('', '_blank');
        
        // Đoạn Script bí mật cắm vào ĐẦU TAB MỚI để bắt cóc lệnh console.log
        const prependConsoleLogic = `
        <script>
            window.__devLogs = [];
            const ogLog = console.log, ogErr = console.error, ogWarn = console.warn;
            function _fmtArgs(a) { return Array.from(a).map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' '); }
            console.log = function() { ogLog.apply(console, arguments); window.__devLogs.push({msg: _fmtArgs(arguments), type: 'log'}); };
            console.error = function() { ogErr.apply(console, arguments); window.__devLogs.push({msg: _fmtArgs(arguments), type: 'err'}); };
            console.warn = function() { ogWarn.apply(console, arguments); window.__devLogs.push({msg: _fmtArgs(arguments), type: 'warn'}); };
            window.onerror = function(msg, url, line) { window.__devLogs.push({msg: msg + ' (Lỗi ở dòng ' + line + ')', type: 'err'}); return false; };
        </script>
        `;

        // Giao diện Mini Console cắm vào CUỐI TAB MỚI
        const appendConsoleUI = `
        <div id="sys-console-ui" style="position:fixed; bottom:0; left:0; width:100%; height:22vh; min-height:160px; background:rgba(24,24,27,0.95); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border-top:1px solid #3f3f46; color:#e4e4e7; font-family:monospace; z-index:2147483645; display:flex; flex-direction:column; box-shadow: 0 -10px 30px rgba(0,0,0,0.3);">
            <div style="background:#27272a; padding:8px 15px; font-size:12px; font-weight:bold; color:#a1a1aa; border-bottom:1px solid #3f3f46; display:flex; justify-content:space-between; align-items:center; font-family:-apple-system, sans-serif; text-transform:uppercase;">
                <span style="display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:8px; height:8px; background-color:#10b981; border-radius:50%;"></span> Terminal Logs</span>
                <span style="cursor:pointer; color:#ef4444; padding:4px 8px; border-radius:4px; background:rgba(239,68,68,0.1);" onclick="document.getElementById('sys-console-ui').style.display='none'">✕ Đóng</span>
            </div>
            <div id="sys-console-body" style="flex:1; overflow-y:auto; padding:12px; font-size:13px; line-height:1.6;"></div>
        </div>
        <script>
            const cbBody = document.getElementById('sys-console-body');
            function _printUI(item) {
                const d = document.createElement('div');
                d.style.borderBottom = '1px dashed rgba(255,255,255,0.05)'; d.style.padding = '6px 0'; d.style.wordBreak = 'break-all';
                if(item.type === 'err') d.style.color = '#f87171'; 
                else if(item.type === 'warn') d.style.color = '#fbe331'; 
                else d.style.color = '#e4e4e7';
                d.innerHTML = '<strong style="opacity:0.5; margin-right:5px;">❯</strong> ' + item.msg;
                cbBody.appendChild(d);
            }
            // In ra những log đã bắt được trong lúc code vừa chạy
            window.__devLogs.forEach(_printUI);
            
            // Ghi đè lại lần nữa để in trực tiếp nếu User bấm nút trên Web
            console.log = function() { ogLog.apply(console, arguments); _printUI({msg: _fmtArgs(arguments), type: 'log'}); cbBody.scrollTop = cbBody.scrollHeight; };
            console.error = function() { ogErr.apply(console, arguments); _printUI({msg: _fmtArgs(arguments), type: 'err'}); cbBody.scrollTop = cbBody.scrollHeight; };
            console.warn = function() { ogWarn.apply(console, arguments); _printUI({msg: _fmtArgs(arguments), type: 'warn'}); cbBody.scrollTop = cbBody.scrollHeight; };
        </script>
        `;

        // Logo Cam Đóng dấu
        const orangeLogoWatermark = `
            <div style="position: fixed; bottom: calc(22vh + 15px); right: 20px; z-index: 2147483647; display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); padding: 8px 18px; border-radius: 999px; box-shadow: 0 10px 25px rgba(249, 115, 22, 0.25); border: 1.5px solid rgba(249, 115, 22, 0.3); font-family: sans-serif; pointer-events: none;">
                <span style="background: linear-gradient(90deg, #f97316, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; font-size: 14px; letter-spacing: 1px;">NOTHING</span>
                <span style="font-size: 16px;">🧑‍💻</span>
            </div>
        `;
        
        newWindow.document.write(prependConsoleLogic + code + appendConsoleUI + orangeLogoWatermark);
        newWindow.document.close();
    });

    codeInput.value = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; display: grid; place-items: center; height: 80vh; background: #18181b; color: #fff; margin: 0; }
    .box { text-align: center; padding: 2rem; border-radius: 1.2rem; background: #27272a; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    button { margin: 5px; padding: 10px 20px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.2s; }
    .btn-log { background: #3b82f6; color: white; }
    .btn-err { background: #ef4444; color: white; }
    button:active { transform: scale(0.95); }
  </style>
</head>
<body>
  <div class="box">
    <h2>🚀 Live Console</h2>
    <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 20px;">Bấm nút để test Terminal bên dưới</p>
    <button class="btn-log" onclick="testLog()">Gửi Log</button>
    <button class="btn-err" onclick="testErr()">Tạo Lỗi</button>
  </div>
  
  <script>
    console.log("✅ Hệ thống khởi động thành công!");
    console.warn("⚠️ Chú ý: Bạn code quá mượt!");

    function testLog() {
      const id = Math.random().toString(36).substr(2, 5).toUpperCase();
      console.log("👉 Ping ID: " + id);
    }

    function testErr() {
      console.error("❌ Báo động đỏ: Thiếu cà phê trầm trọng!");
      goiHamNayChoVui(); 
    }
  </script>
</body>
</html>`;
    codeInput.dispatchEvent(new Event('input')); 

}
