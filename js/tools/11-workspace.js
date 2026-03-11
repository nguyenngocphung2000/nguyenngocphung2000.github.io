// --- 2. Tool Không Gian Tập Trung (Focus Workspace) ---
registerTool({
    id: 'tab-workspace',
    name: 'Tập Trung',
    icon: '🎧',
    isDefault: false,
    html: `
        <div id="ws-container" class="relative w-full h-[85vh] min-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-900 font-sans group transition-all duration-500">
            <img id="ws-bg-image" src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-80 transition-opacity duration-1000" alt="background" />
            
            <div class="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

            <button id="ws-fullscreen-btn" class="absolute top-6 right-6 z-40 text-white/70 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md p-3 rounded-xl transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            </button>

            <div class="absolute top-8 left-1/2 -translate-x-1/2 flex bg-black/40 backdrop-blur-xl p-1 rounded-full border border-white/10 z-20 shadow-lg">
                <button id="btn-mode-clock" class="px-6 py-2 rounded-full bg-white/90 text-black text-sm font-bold shadow-sm transition-all">CLOCK</button>
                <button id="btn-mode-pomo" class="px-6 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-sm font-bold transition-all">POMODORO</button>
            </div>

            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-white select-none">
                <div id="ws-clock-view" class="flex flex-col items-center transition-opacity duration-500">
                    <div id="ws-time" class="text-8xl md:text-[10rem] font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wider leading-none" style="font-family: 'Comic Sans MS', 'Caveat', cursive;">16:21</div>
                    <div id="ws-date" class="text-xl md:text-2xl mt-4 font-medium text-white/80 drop-shadow-md">Sunday, 25 January</div>
                </div>

                <div id="ws-pomo-view" class="hidden flex-col items-center transition-opacity duration-500 pointer-events-auto">
                    <div id="ws-pomo-time" class="text-8xl md:text-[10rem] font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wider leading-none" style="font-family: 'Comic Sans MS', 'Caveat', cursive;">25:00</div>
                    <div class="flex gap-4 mt-6">
                        <button id="ws-pomo-start" class="w-12 h-12 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </button>
                        <button id="ws-pomo-reset" class="w-12 h-12 flex items-center justify-center bg-white/20 text-white border border-white/30 rounded-full hover:bg-white/30 transition backdrop-blur-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </button>
                    </div>
                </div>
            </div>

            <div class="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-black/40 backdrop-blur-xl p-3 rounded-2xl border border-white/10 z-30 shadow-2xl">
                <button title="Đổi hình nền" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition" onclick="changeBackground()">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </button>
                <div class="w-8 h-px bg-white/10 mx-auto my-1"></div>
                <button title="YouTube" id="btn-toggle-yt" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-[#FF0000] hover:bg-white/10 transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </button>
                <button title="Ghi chú" id="btn-toggle-notes" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-yellow-300 hover:bg-white/10 transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </button>
                <button title="Âm thanh Môi trường" id="btn-toggle-mixer" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-blue-300 hover:bg-white/10 transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                </button>
            </div>

            <div id="widget-yt" class="hidden absolute top-20 left-24 w-[360px] bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-40">
                <div id="drag-yt" class="bg-black/50 p-3 flex justify-between items-center cursor-move border-b border-white/10">
                    <span class="text-white/90 text-sm font-bold flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="red"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg> YouTube Player</span>
                    <button class="close-widget text-white/50 hover:text-white">✕</button>
                </div>
                <div class="p-4">
                    <input type="text" id="yt-input" placeholder="Dán link YouTube (URL/ID)..." class="w-full bg-black/50 text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-orange-500 mb-3">
                    <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
                        <iframe id="yt-iframe" class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/jfKfPfyJRdk" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>

            <div id="widget-notes" class="hidden absolute top-24 right-[30%] w-[300px] bg-pink-100 rounded-2xl shadow-2xl z-40 overflow-hidden">
                <div id="drag-notes" class="bg-pink-200/50 p-3 flex justify-between items-center cursor-move">
                    <span class="text-gray-800 text-sm font-bold">📝 Quick Notes</span>
                    <button class="close-widget text-gray-500 hover:text-gray-800">✕</button>
                </div>
                <div class="p-4">
                    <textarea class="w-full h-48 bg-transparent text-gray-800 focus:outline-none resize-none placeholder-gray-500" placeholder="Viết mục tiêu hôm nay...
1. Code xong trang Home
2. Review Pull Request
3. Uống nhiều nước"></textarea>
                </div>
            </div>

            <div id="widget-mixer" class="hidden absolute top-20 right-8 w-[280px] bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl z-40 text-white">
                <div id="drag-mixer" class="bg-white/5 p-3 flex justify-between items-center cursor-move border-b border-white/10">
                    <span class="text-white/90 text-sm font-bold flex items-center gap-2">🎧 Sound Mixer</span>
                    <button class="close-widget text-white/50 hover:text-white">✕</button>
                </div>
                <div class="p-5 space-y-5">
                    <div>
                        <div class="flex justify-between text-xs mb-2"><span class="flex items-center gap-2">🌧️ Tiếng mưa</span><span class="text-white/50">50%</span></div>
                        <input type="range" class="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" value="50">
                    </div>
                    <div>
                        <div class="flex justify-between text-xs mb-2"><span class="flex items-center gap-2">⌨️ Bàn phím cơ</span><span class="text-white/50">0%</span></div>
                        <input type="range" class="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" value="0">
                    </div>
                    <div>
                        <div class="flex justify-between text-xs mb-2"><span class="flex items-center gap-2">☕ Quán Cafe</span><span class="text-white/50">30%</span></div>
                        <input type="range" class="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white" value="30">
                    </div>
                </div>
            </div>

            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-xl bg-black/60 backdrop-blur-xl rounded-full border border-white/10 p-3 px-6 flex items-center gap-4 z-30 text-white shadow-2xl">
                <img src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=100&auto=format&fit=crop" class="w-10 h-10 rounded-full animate-[spin_10s_linear_infinite]" alt="cover">
                <div class="flex-1">
                    <div class="text-sm font-bold">Lofi Chill vibes ~ Không lời</div>
                    <div class="text-xs text-white/50">N.Phụng Workspace</div>
                </div>
                <div class="flex items-center gap-3">
                    <button class="text-white/70 hover:text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg></button>
                    <button class="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
                    <button class="text-white/70 hover:text-white"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg></button>
                </div>
            </div>
        </div>
    `,
    logic: function() {
        // --- 1. LOGIC ĐỒNG HỒ THỰC TẾ ---
        const timeEl = document.getElementById('ws-time');
        const dateEl = document.getElementById('ws-date');
        
        function updateClock() {
            const now = new Date();
            timeEl.innerText = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            dateEl.innerText = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
        setInterval(updateClock, 1000);
        updateClock();

        // --- 2. LOGIC ĐỔI CHẾ ĐỘ (CLOCK <-> POMODORO) ---
        const btnClock = document.getElementById('btn-mode-clock');
        const btnPomo = document.getElementById('btn-mode-pomo');
        const viewClock = document.getElementById('ws-clock-view');
        const viewPomo = document.getElementById('ws-pomo-view');

        btnClock.addEventListener('click', () => {
            btnClock.className = "px-6 py-2 rounded-full bg-white/90 text-black text-sm font-bold shadow-sm transition-all";
            btnPomo.className = "px-6 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-sm font-bold transition-all";
            viewClock.classList.remove('hidden');
            viewClock.classList.add('flex');
            viewPomo.classList.add('hidden');
            viewPomo.classList.remove('flex');
        });

        btnPomo.addEventListener('click', () => {
            btnPomo.className = "px-6 py-2 rounded-full bg-white/90 text-black text-sm font-bold shadow-sm transition-all";
            btnClock.className = "px-6 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-sm font-bold transition-all";
            viewPomo.classList.remove('hidden');
            viewPomo.classList.add('flex');
            viewClock.classList.add('hidden');
            viewClock.classList.remove('flex');
        });

        // --- 3. LOGIC POMODORO TIMER ---
        let pomoTime = 25 * 60; // 25 phút
        let pomoInterval = null;
        let isRunning = false;
        const pomoDisplay = document.getElementById('ws-pomo-time');
        const btnPomoStart = document.getElementById('ws-pomo-start');
        const btnPomoReset = document.getElementById('ws-pomo-reset');

        function updatePomoDisplay() {
            const m = Math.floor(pomoTime / 60).toString().padStart(2, '0');
            const s = (pomoTime % 60).toString().padStart(2, '0');
            pomoDisplay.innerText = `${m}:${s}`;
        }

        btnPomoStart.addEventListener('click', () => {
            if (isRunning) {
                clearInterval(pomoInterval);
                btnPomoStart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'; // Icon Play
            } else {
                pomoInterval = setInterval(() => {
                    if (pomoTime > 0) {
                        pomoTime--;
                        updatePomoDisplay();
                    } else {
                        clearInterval(pomoInterval);
                        alert("Hết giờ! Nghỉ ngơi xíu nhé ☕");
                    }
                }, 1000);
                btnPomoStart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>'; // Icon Pause
            }
            isRunning = !isRunning;
        });

        btnPomoReset.addEventListener('click', () => {
            clearInterval(pomoInterval);
            isRunning = false;
            pomoTime = 25 * 60;
            updatePomoDisplay();
            btnPomoStart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        });

        // --- 4. HỆ THỐNG WIDGET (BẬT TẮT & KÉO THẢ) ---
        const toggleWidget = (btnId, widgetId) => {
            document.getElementById(btnId).addEventListener('click', () => {
                const w = document.getElementById(widgetId);
                w.classList.toggle('hidden');
            });
            // Nút tắt x trong cửa sổ
            document.querySelector(`#${widgetId} .close-widget`).addEventListener('click', () => {
                document.getElementById(widgetId).classList.add('hidden');
            });
        };

        toggleWidget('btn-toggle-yt', 'widget-yt');
        toggleWidget('btn-toggle-notes', 'widget-notes');
        toggleWidget('btn-toggle-mixer', 'widget-mixer');

        // Hàm kéo thả
        function dragElement(elmnt, headerId) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            document.getElementById(headerId).onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
                // Đưa widget lên trên cùng khi click
                elmnt.style.zIndex = 50; 
            }

            function elementDrag(e) {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }

            function closeDragElement() {
                document.onmouseup = null;
                document.onmousemove = null;
                elmnt.style.zIndex = 40;
            }
        }

        dragElement(document.getElementById("widget-yt"), "drag-yt");
        dragElement(document.getElementById("widget-notes"), "drag-notes");
        dragElement(document.getElementById("widget-mixer"), "drag-mixer");

        // --- 5. LOGIC ĐỔI HÌNH NỀN ---
        const backgrounds = [
            "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop", // Đêm Lofi
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop", // Biển chill
            "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920&auto=format&fit=crop", // Rừng dark
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920&auto=format&fit=crop"  // Núi đêm
        ];
        let bgIndex = 0;
        window.changeBackground = function() {
            bgIndex = (bgIndex + 1) % backgrounds.length;
            document.getElementById('ws-bg-image').src = backgrounds[bgIndex];
        };

        // Cập nhật link Youtube khi dán
        document.getElementById('yt-input').addEventListener('change', function(e) {
            let val = e.target.value;
            let videoId = "";
            if(val.includes('v=')) videoId = val.split('v=')[1].split('&')[0];
            else if(val.includes('youtu.be/')) videoId = val.split('youtu.be/')[1].split('?')[0];
            else videoId = val;
            
            if(videoId) {
                document.getElementById('yt-iframe').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
        });

        // --- 6. FULLSCREEN (Tuỳ chọn bổ sung trải nghiệm tốt nhất) ---
        const wsContainer = document.getElementById('ws-container');
        document.getElementById('ws-fullscreen-btn').addEventListener('click', () => {
            if (!document.fullscreenElement) {
                wsContainer.requestFullscreen().catch(err => console.log(err));
            } else {
                document.exitFullscreen();
            }
        });
    }
});
