// --- 17. Tool ASCII Tree Generator (Thêm Nút Tải Ảnh Tự Động Vẽ Canvas) ---
export function setupTool() {
    const tabId = 'tab-ascii-tree';
    
    if (document.getElementById(tabId)) return;
    
    // Tự động tải thư viện JSZip nếu web chưa có
    if (!window.JSZip) {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        document.head.appendChild(script);
    }
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    // Giao diện Sáng (Light Mode default) + Hỗ trợ Auto Dark Mode
    panel.innerHTML = `
        <style>
            .ascii-wrapper {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 1.5rem;
                color: #1f2937;
                overflow: hidden;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
            }

            .ascii-header {
                background-color: #f9fafb;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid #e5e7eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 700;
                transition: all 0.3s;
            }

            .ascii-dropzone {
                margin: 1.5rem;
                padding: 2.5rem 1rem;
                border: 2px dashed #d1d5db;
                border-radius: 1rem;
                text-align: center;
                color: #6b7280;
                background-color: #f9fafb;
                cursor: pointer;
                transition: all 0.2s;
                font-weight: 500;
            }
            .ascii-dropzone:hover, .ascii-dropzone.dragover {
                background-color: #eff6ff;
                border-color: #3b82f6;
                color: #2563eb;
            }

            .ascii-tabs {
                display: flex;
                background-color: #f3f4f6;
                border-bottom: 1px solid #e5e7eb;
                transition: all 0.3s;
            }

            .ascii-tab {
                padding: 0.75rem 1.5rem;
                cursor: pointer;
                color: #6b7280;
                font-weight: 600;
                font-size: 0.9rem;
                border-bottom: 2px solid transparent;
                transition: all 0.2s;
            }
            .ascii-tab:hover { color: #374151; }
            .ascii-tab.active {
                color: #2563eb;
                border-bottom: 2px solid #2563eb;
                background-color: #ffffff;
            }

            .ascii-panel-content {
                padding: 1.5rem;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 0.85rem;
                line-height: 1.6;
                overflow-x: auto;
                white-space: pre;
                min-height: 250px;
                max-height: 500px;
                background-color: #ffffff;
                color: #374151;
                transition: all 0.3s;
            }

            .ascii-cmd-text { color: #059669; white-space: pre-wrap; word-break: break-all; }

            .ascii-controls {
                display: flex;
                justify-content: flex-end;
                gap: 0.75rem;
                padding: 1rem 1.5rem;
                border-top: 1px solid #e5e7eb;
                background-color: #f9fafb;
                transition: all 0.3s;
            }

            .ascii-btn {
                background-color: #2563eb;
                color: #ffffff;
                border: none;
                border-radius: 0.5rem;
                padding: 0.6rem 1.2rem;
                font-weight: 600;
                font-size: 0.9rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .ascii-btn:hover { background-color: #1d4ed8; transform: translateY(-1px); }
            .ascii-btn:active { transform: translateY(1px); }
            
            /* Nút tải ảnh màu khác để dễ nhận diện */
            .ascii-btn-download { background-color: #10b981; }
            .ascii-btn-download:hover { background-color: #059669; }

            .scroll-hide::-webkit-scrollbar { width: 6px; height: 6px; }
            .scroll-hide::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }

            /* ========================================= */
            /* 🌙 AUTO DARK MODE TỰ ĐỘNG THÍCH ỨNG        */
            /* ========================================= */
            html.dark .ascii-wrapper, body.dark .ascii-wrapper { background-color: #18181b; border-color: #27272a; color: #f4f4f5; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            html.dark .ascii-header, body.dark .ascii-header { background-color: #27272a; border-color: #3f3f46; color: #e4e4e7; }
            html.dark .ascii-dropzone, body.dark .ascii-dropzone { background-color: #09090b; border-color: #3f3f46; color: #a1a1aa; }
            html.dark .ascii-dropzone:hover, html.dark .ascii-dropzone.dragover, body.dark .ascii-dropzone:hover, body.dark .ascii-dropzone.dragover { background-color: #1e1b4b; border-color: #6366f1; color: #818cf8; }
            html.dark .ascii-tabs, body.dark .ascii-tabs { background-color: #27272a; border-color: #3f3f46; }
            html.dark .ascii-tab, body.dark .ascii-tab { color: #a1a1aa; }
            html.dark .ascii-tab:hover, body.dark .ascii-tab:hover { color: #f4f4f5; }
            html.dark .ascii-tab.active, body.dark .ascii-tab.active { color: #60a5fa; border-bottom-color: #60a5fa; background-color: #18181b; }
            html.dark .ascii-panel-content, body.dark .ascii-panel-content { background-color: #18181b; color: #d1d5db; }
            html.dark .ascii-cmd-text, body.dark .ascii-cmd-text { color: #34d399; }
            html.dark .ascii-controls, body.dark .ascii-controls { background-color: #27272a; border-color: #3f3f46; }
            html.dark .ascii-btn, body.dark .ascii-btn { background-color: #3b82f6; }
            html.dark .ascii-btn:hover, body.dark .ascii-btn:hover { background-color: #2563eb; }
            html.dark .ascii-btn-download, body.dark .ascii-btn-download { background-color: #10b981; }
            html.dark .ascii-btn-download:hover, body.dark .ascii-btn-download:hover { background-color: #059669; }
            html.dark .scroll-hide::-webkit-scrollbar-thumb, body.dark .scroll-hide::-webkit-scrollbar-thumb { background: #52525b; }
        </style>

        <div class="text-center mb-5">
            <span class="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Directory</span>
            <h2 class="text-3xl font-black mt-2 text-slate-800 dark:text-white tracking-tight">ASCII <span class="text-blue-500">Tree 📂</span></h2>
        </div>

        <div class="ascii-wrapper w-full max-w-4xl mx-auto relative z-10">
            
            <div class="ascii-header">
                <div class="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    <span>Cấu trúc Thư mục</span>
                </div>
                <label class="cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-md text-xs font-bold transition">
                    Chọn File ZIP
                    <input type="file" id="zipInput" accept=".zip" class="hidden">
                </label>
            </div>

            <div id="ascii-drop" class="ascii-dropzone">
                <div class="text-3xl mb-2">📥</div>
                <div>Kéo thả file ZIP vào đây hoặc bấm nút Chọn File ở trên</div>
                <div class="text-xs opacity-70 mt-1">(Dữ liệu xử lý trực tiếp trên trình duyệt, cực kỳ bảo mật)</div>
            </div>

            <div id="ascii-result-area" style="display: none;">
                <div class="ascii-tabs">
                    <div class="ascii-tab active" data-tab="tree">ASCII Tree</div>
                    <div class="ascii-tab" data-tab="cmd">Terminal Command</div>
                </div>

                <div id="treePanel" class="ascii-panel-content scroll-hide"></div>
                <div id="cmdPanel" class="ascii-panel-content scroll-hide ascii-cmd-text" style="display:none"></div>

                <div class="ascii-controls">
                    <button class="ascii-btn" id="ascii-copy-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span id="ascii-copy-text">Copy Code</span>
                    </button>
                    <button class="ascii-btn ascii-btn-download" id="ascii-dl-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        <span id="ascii-dl-text">Tải Ảnh</span>
                    </button>
                </div>
            </div>

        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    // --- BẮT ĐẦU LOGIC XỬ LÝ ZIP VÀ VẼ CÂY ---
    let root = {};
    let asciiOutput = "";
    let cmdOutput = "";

    const zipInput = document.getElementById('zipInput');
    const dropZone = document.getElementById('ascii-drop');
    const resultArea = document.getElementById('ascii-result-area');
    const treePanel = document.getElementById('treePanel');
    const cmdPanel = document.getElementById('cmdPanel');
    const copyBtn = document.getElementById('ascii-copy-btn');
    const copyText = document.getElementById('ascii-copy-text');
    const dlBtn = document.getElementById('ascii-dl-btn');
    const dlText = document.getElementById('ascii-dl-text');

    function processZip(file) {
        if (!file || !file.name.endsWith('.zip')) {
            alert('Vui lòng chọn một file .zip nhé bạn yêu!');
            return;
        }

        if (!window.JSZip) {
            alert('Đang tải thư viện xử lý ZIP, bạn đợi 1 giây rồi thử lại nhé!');
            return;
        }

        dropZone.innerHTML = '<div class="text-2xl mb-2 animate-spin">⏳</div><div>Đang phân tích cấu trúc...</div>';

        JSZip.loadAsync(file).then(zip => {
            root = {};

            for (const entryName in zip.files) {
                const entry = zip.files[entryName];
                // Lọc rác từ macOS
                if (entryName.includes('__MACOSX') || entryName.includes('.DS_Store')) continue;

                const parts = entry.name.split("/").filter(Boolean);
                let current = root;

                for (let i = 0; i < parts.length; i++) {
                    const part = parts[i];
                    if (!current[part]) {
                        if (i === parts.length - 1 && !entry.dir) {
                            current[part] = null;
                        } else {
                            current[part] = {};
                        }
                    }
                    if (current[part] !== null) {
                        current = current[part];
                    }
                }
            }

            generateOutputs();
            
            dropZone.innerHTML = '<div class="text-3xl mb-2">✅</div><div>Đã phân tích xong! Bạn có thể kéo file ZIP khác vào đây.</div>';
            resultArea.style.display = 'block';

        }).catch(err => {
            console.error(err);
            dropZone.innerHTML = '<div class="text-3xl mb-2 text-red-500">❌</div><div class="text-red-500">Lỗi không đọc được file ZIP.</div>';
        });
    }

    zipInput.addEventListener("change", e => processZip(e.target.files[0]));

    dropZone.ondragover = e => { e.preventDefault(); dropZone.classList.add('dragover'); };
    dropZone.ondragleave = e => { e.preventDefault(); dropZone.classList.remove('dragover'); };
    dropZone.ondrop = e => { e.preventDefault(); dropZone.classList.remove('dragover'); processZip(e.dataTransfer.files[0]); };

    function sortNode(node) {
        const dirs = [];
        const files = [];
        for (const k in node) {
            if (node[k] === null) files.push(k);
            else dirs.push(k);
        }
        dirs.sort((a, b) => a.localeCompare(b, "en"));
        files.sort((a, b) => a.localeCompare(b, "en"));
        return [...dirs, ...files];
    }

    function drawTree(node, prefix = "") {
        let out = "";
        const keys = sortNode(node);

        keys.forEach((k, i) => {
            const last = i === keys.length - 1;
            const pointer = last ? "└── " : "├── ";
            const nextPrefix = prefix + (last ? "    " : "│   ");

            if (node[k] === null) {
                out += prefix + pointer + k + "\n";
            } else {
                out += prefix + pointer + k + "/\n";
                out += drawTree(node[k], nextPrefix);
            }
        });
        return out;
    }

    function listPaths(node, path = "", dirs = [], files = []) {
        for (const k in node) {
            const p = path ? path + "/" + k : k;
            if (node[k] === null) {
                files.push(p);
            } else {
                dirs.push(p);
                listPaths(node[k], p, dirs, files);
            }
        }
        return { dirs, files };
    }

    function generateOutputs() {
        asciiOutput = ".\n" + drawTree(root);
        treePanel.textContent = asciiOutput;

        const { dirs, files } = listPaths(root);
        
        const mkdirs = dirs.length > 0 ? `mkdir -p ${dirs.map(d => `"${d}"`).join(" ")}` : "";
        const touches = files.length > 0 ? `touch ${files.map(f => `"${f}"`).join(" ")}` : "";
        
        cmdOutput = [mkdirs, touches].filter(Boolean).join(" && ");
        if (!cmdOutput) cmdOutput = "echo 'ZIP rỗng!'";
        
        cmdPanel.textContent = cmdOutput;
    }

    // Xử lý chuyển Tab
    document.querySelectorAll(".ascii-tab").forEach(t => {
        t.onclick = () => {
            document.querySelectorAll(".ascii-tab").forEach(x => x.classList.remove("active"));
            t.classList.add("active");

            const tab = t.dataset.tab;
            treePanel.style.display = tab === "tree" ? "block" : "none";
            cmdPanel.style.display = tab === "cmd" ? "block" : "none";
            
            // Chỉ hiện nút Tải Ảnh nếu đang ở tab ASCII Tree
            dlBtn.style.display = tab === "tree" ? "flex" : "none";
        }
    });

    // Xử lý Copy
    copyBtn.onclick = () => {
        const activeTab = document.querySelector(".ascii-tab.active").dataset.tab;
        const textToCopy = activeTab === "tree" ? asciiOutput : cmdOutput;

        navigator.clipboard.writeText(textToCopy).then(() => {
            copyText.innerText = 'Đã Copy!';
            copyBtn.style.backgroundColor = '#059669'; 
            setTimeout(() => {
                copyText.innerText = 'Copy Code';
                copyBtn.style.backgroundColor = ''; 
            }, 1500);
        });
    };

    // --- LOGIC TẢI ẢNH (CANVAS DRAWING) ---
    dlBtn.onclick = () => {
        if (!asciiOutput) return;

        dlText.innerText = 'Đang vẽ...';
        
        setTimeout(() => {
            const lines = asciiOutput.split('\n');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Kích thước font và dòng
            const fontSize = 14;
            const lineHeight = 22;
            const padding = 30;
            
            // Thiết lập font lần đầu để đo chiều rộng chính xác
            ctx.font = `${fontSize}px monospace, "Courier New"`;
            
            // Tìm dòng dài nhất để đặt chiều rộng Canvas
            let maxWidth = 0;
            for (let line of lines) {
                const w = ctx.measureText(line).width;
                if (w > maxWidth) maxWidth = w;
            }
            
            // Scale x2 để ảnh tải về nét căng (High-Res Retina)
            const scale = 2;
            canvas.width = (maxWidth + padding * 2) * scale;
            canvas.height = (lines.length * lineHeight + padding * 2) * scale;
            
            // Reset lại tỉ lệ và font sau khi thay đổi kích thước canvas
            ctx.scale(scale, scale);
            ctx.font = `${fontSize}px monospace, "Courier New"`;
            ctx.textBaseline = 'top';
            
            // Kiểm tra xem người dùng đang bật Dark Mode hay Light Mode để tô màu nền ảnh tương ứng
            const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
            
            // Vẽ màu nền
            ctx.fillStyle = isDark ? '#18181b' : '#ffffff'; // Nền đen nhám hoặc trắng tinh
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Vẽ màu chữ
            ctx.fillStyle = isDark ? '#d1d5db' : '#374151'; 
            
            // Viết từng dòng text lên ảnh
            lines.forEach((line, i) => {
                ctx.fillText(line, padding, padding + (i * lineHeight));
            });
            
            // Xuất ra file ảnh và kích hoạt tải về
            const link = document.createElement('a');
            link.download = 'ascii-tree-export.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            // Báo hiệu thành công
            dlText.innerText = 'Đã Tải!';
            dlBtn.style.backgroundColor = '#059669'; 
            setTimeout(() => {
                dlText.innerText = 'Tải Ảnh';
                dlBtn.style.backgroundColor = ''; 
            }, 1500);
            
        }, 100); // Timeout nhẹ để UI kịp update chữ "Đang vẽ..."
    };
}
