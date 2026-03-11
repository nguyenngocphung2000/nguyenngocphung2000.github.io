// --- 11. Tool Không Gian Tập Trung (Focus Workspace) ---
registerTool({
    id: 'tab-workspace',
    name: 'Tập Trung',
    icon: '🎧',
    isDefault: false,
    html: `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Nunito:wght@800&family=Space+Mono:wght@700&family=Pacifico&display=swap');
            
            .clock-font-1 { font-family: 'Caveat', cursive; }
            .clock-font-2 { font-family: 'Nunito', sans-serif; font-weight: 800; }
            .clock-font-3 { font-family: 'Space Mono', monospace; }
            .clock-font-4 { font-family: 'Pacifico', cursive; }
            
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            
            /* Custom Range Slider */
            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                margin-top: -4px;
            }
            input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: rgba(255,255,255,0.2);
                border-radius: 2px;
            }
        </style>

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
                    <div id="ws-time" class="text-8xl md:text-[10rem] font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wider leading-none clock-font-1">16:21</div>
                    <div id="ws-date" class="text-xl md:text-2xl mt-4 font-medium text-white/80 drop-shadow-md">Sunday, 25 January</div>
                </div>

                <div id="ws-pomo-view" class="hidden flex-col items-center transition-opacity duration-500 pointer-events-auto">
                    <div id="ws-pomo-time" class="text-8xl md:text-[10rem] font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wider leading-none clock-font-1 cursor-pointer hover:opacity-80 transition hover:scale-105" title="Nhấp để đổi số phút">25:00</div>
                    <div class="text-white/60 text-sm mt-2 flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Nhấp vào số để thay đổi thời gian</div>
                    
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
                <button title="Giao diện & Đồng hồ" id="btn-toggle-themes" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                </button>
                <div class="w-8 h-px bg-white/10 mx-auto my-1"></div>
                <button title="YouTube" id="btn-toggle-yt" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-[#FF0000] hover:bg-white/10 transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </button>
                <button title="Thêm Ghi chú mới" id="btn-add-note" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-yellow-300 hover:bg-white/10 transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </button>
                <button title="Âm thanh Môi trường" id="btn-toggle-mixer" class="ws-tool-btn p-3 rounded-xl text-white/70 hover:text-blue-300 hover:bg-white/10 transition">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
                </button>
            </div>

            <div id="widget-themes" class="hidden absolute top-16 left-24 w-[340px] bg-black/80 backdrop-blur-2xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-40">
                <div id="drag-themes" class="bg-white/5 p-3 flex justify-between items-center cursor-move border-b border-white/10">
                    <span class="text-white/90 text-sm font-bold flex items-center gap-2">🎨 Tùy chỉnh Không gian</span>
                    <button class="close-widget text-white/50 hover:text-white">✕</button>
                </div>
                <div class="p-4 space-y-5">
                    <div>
                        <div class="text-xs font-bold text-white/50 mb-3 uppercase tracking-wider">Kiểu Đồng Hồ</div>
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="changeClockFont('clock-font-1')" class="py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white clock-font-1 text-xl transition">Caveat</button>
                            <button onclick="changeClockFont('clock-font-2')" class="py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white clock-font-2 text-sm transition">Modern</button>
                            <button onclick="changeClockFont('clock-font-3')" class="py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white clock-font-3 text-sm transition">Digital</button>
                            <button onclick="changeClockFont('clock-font-4')" class="py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white clock-font-4 text-sm transition">Pacifico</button>
                        </div>
                    </div>
                    <div>
                        <div class="text-xs font-bold text-white/50 mb-3 uppercase tracking-wider">Hình Nền</div>
                        <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                            <img onclick="changeBg('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920')" src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=200" class="w-16 h-12 object-cover rounded-md cursor-pointer hover:border-2 border-orange-500 shrink-0">
                            <img onclick="changeBg('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920')" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200" class="w-16 h-12 object-cover rounded-md cursor-pointer hover:border-2 border-orange-500 shrink-0">
                            <img onclick="changeBg('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920')" src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=200" class="w-16 h-12 object-cover rounded-md cursor-pointer hover:border-2 border-orange-500 shrink-0">
                            <img onclick="changeBg('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920')" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=200" class="w-16 h-12 object-cover rounded-md cursor-pointer hover:border-2 border-orange-500 shrink-0">
                        </div>
                        
                        <input type="file" id="local-bg-upload" class="hidden" accept="image/*">
                        <button onclick="document.getElementById('local-bg-upload').click()" class="w-full mt-2 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg text-white text-sm font-bold shadow-md transition flex items-center justify-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Tải ảnh từ máy
                        </button>
                    </div>
                </div>
            </div>

            <div id="widget-yt" class="hidden absolute top-20 left-[400px] w-[360px] bg-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl z-40">
                <div id="drag-yt" class="bg-black/50 p-3 flex justify-between items-center cursor-move border-b border-white/10">
                    <span class="text-white/90 text-sm font-bold flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="red"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg> YouTube Player</span>
                    <button class="close-widget text-white/50 hover:text-white">✕</button>
                </div>
                <div class="p-4">
                    <input type="text" id="yt-input" placeholder="Dán link YouTube (URL/ID)..." class="w-full bg-black/50 text-white text-sm px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-orange-500 mb-3">
                    <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden" id="yt-player-container">
                        </div>
                </div>
            </div>

            <div id="notes-container"></div>

            <div id="widget-mixer" class="hidden absolute top-20 right-8 w-[280px] bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl z-40 text-white">
                <div id="drag-mixer" class="bg-white/5 p-3 flex justify-between items-center cursor-move border-b border-white/10">
                    <span class="text-white/90 text-sm font-bold flex items-center gap-2">🎧 Sound Mixer</span>
                    <button class="close-widget text-white/50 hover:text-white">✕</button>
                </div>
                <div class="p-5 space-y-5">
                    <div>
                        <div class="flex justify-between text-xs mb-2"><span class="flex items-center gap-2">🌧️ Tiếng mưa</span><span class="text-white/50">50%</span></div>
                        <input type="range" class="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-white" value="50">
                    </div>
                    <div>
                        <div class="flex justify-between text-xs mb-2"><span class="flex items-center gap-2">⌨️ Bàn phím cơ</span><span class="text-white/50">0%</span></div>
                        <input type="range" class="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-white" value="0">
                    </div>
                    <div>
                        <div class="flex justify-between text-xs mb-2"><span class="flex items-center gap-2">☕ Quán Cafe</span><span class="text-white/50">30%</span></div>
                        <input type="range" class="w-full h-1 bg-white/20 appearance-none cursor-pointer accent-white" value="30">
                    </div>
                </div>
            </div>

            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[320px] bg-black/85 backdrop-blur-xl rounded-full border border-white/10 p-2 px-5 flex items-center gap-4 z-30 text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                <button id="ws-player-play" class="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition shrink-0">
                    <svg id="icon-play" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    <svg id="icon-pause" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                </button>
                
                <button id="ws-player-prev" title="Lùi 10s" class="text-white/70 hover:text-white transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg></button>
                <button id="ws-player-next" title="Tiến 10s" class="text-white/70 hover:text-white transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg></button>
                
                <button id="ws-player-mute" title="Tắt/Mở Tiếng" class="text-white/70 hover:text-white ml-1 transition"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button>
                
                <input type="range" id="ws-player-progress" value="0" max="100" class="w-32 md:w-48 appearance-none transition bg-transparent focus:outline-none">
                
                <span id="ws-player-time" class="text-[13px] font-medium text-white/90 tracking-wide w-20 text-right">0:00 / 0:00</span>
            </div>
        </div>
    `,
    logic: function() {
        // --- 1. LOGIC ĐỒNG HỒ ---
        const timeEl = document.getElementById('ws-time');
        const dateEl = document.getElementById('ws-date');
        
        function updateClock() {
            const now = new Date();
            timeEl.innerText = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            dateEl.innerText = now.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
        setInterval(updateClock, 1000);
        updateClock();

        const clockEls = [document.getElementById('ws-time'), document.getElementById('ws-pomo-time')];
        window.changeClockFont = function(fontClass) {
            clockEls.forEach(el => {
                el.className = `text-8xl md:text-[10rem] font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] tracking-wider leading-none transition-all duration-300 cursor-pointer hover:opacity-80 hover:scale-105 ${fontClass}`;
            });
        };

        // --- 2. TẢI ẢNH TỪ MÁY & ĐỔI NỀN ---
        window.changeBg = function(url) {
            document.getElementById('ws-bg-image').src = url;
        };

        document.getElementById('local-bg-upload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);
                changeBg(imageUrl);
            }
        });

        // --- 3. ĐỔI CHẾ ĐỘ (CLOCK <-> POMODORO) & LOGIC POMODORO ---
        const btnClock = document.getElementById('btn-mode-clock');
        const btnPomo = document.getElementById('btn-mode-pomo');
        const viewClock = document.getElementById('ws-clock-view');
        const viewPomo = document.getElementById('ws-pomo-view');

        btnClock.addEventListener('click', () => {
            btnClock.className = "px-6 py-2 rounded-full bg-white/90 text-black text-sm font-bold shadow-sm transition-all";
            btnPomo.className = "px-6 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-sm font-bold transition-all";
            viewClock.classList.remove('hidden'); viewClock.classList.add('flex');
            viewPomo.classList.add('hidden'); viewPomo.classList.remove('flex');
        });

        btnPomo.addEventListener('click', () => {
            btnPomo.className = "px-6 py-2 rounded-full bg-white/90 text-black text-sm font-bold shadow-sm transition-all";
            btnClock.className = "px-6 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 text-sm font-bold transition-all";
            viewPomo.classList.remove('hidden'); viewPomo.classList.add('flex');
            viewClock.classList.add('hidden'); viewClock.classList.remove('flex');
        });

        // Pomodoro logic
        let defaultPomoTime = 25 * 60; // 25 phút mặc định
        let pomoTime = defaultPomoTime, pomoInterval = null, isRunning = false;
        const pomoDisplay = document.getElementById('ws-pomo-time');
        const btnPomoStart = document.getElementById('ws-pomo-start');
        const btnPomoReset = document.getElementById('ws-pomo-reset');

        function updatePomoDisplay() {
            const m = Math.floor(pomoTime / 60).toString().padStart(2, '0');
            const s = (pomoTime % 60).toString().padStart(2, '0');
            pomoDisplay.innerText = `${m}:${s}`;
        }

        // TÍNH NĂNG CHỈNH SỬA THỜI GIAN
        pomoDisplay.addEventListener('click', () => {
            if (isRunning) {
                alert("Vui lòng Dừng (Pause) hoặc Đặt lại (Reset) đồng hồ trước khi đổi giờ nhé!");
                return;
            }
            const currentMins = Math.floor(defaultPomoTime / 60);
            const input = prompt("Nhập số phút tập trung (VD: 5, 25, 45, 60...):", currentMins);
            
            if (input !== null && !isNaN(input) && input > 0) {
                defaultPomoTime = parseInt(input) * 60;
                pomoTime = defaultPomoTime;
                updatePomoDisplay();
            }
        });

        btnPomoStart.addEventListener('click', () => {
            if (isRunning) {
                clearInterval(pomoInterval);
                btnPomoStart.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
            } else {
                pomoInterval = setInterval(() => {
                    if (pomoTime > 0) { pomoTime--; updatePomoDisplay(); } 
                    else { clearInterval(pomoInterval); alert("Hết giờ! Nghỉ ngơi xíu nhé ☕"); }
                }, 1000);
                btnPomoStart.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>';
            }
            isRunning = !isRunning;
        });

        btnPomoReset.addEventListener('click', () => {
            clearInterval(pomoInterval); isRunning = false; pomoTime = defaultPomoTime; updatePomoDisplay();
            btnPomoStart.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        });

        // --- 4. HỆ THỐNG WIDGET VÀ KÉO THẢ ---
        const toggleWidget = (btnId, widgetId) => {
            document.getElementById(btnId).addEventListener('click', () => {
                document.getElementById(widgetId).classList.toggle('hidden');
            });
            document.querySelector(`#${widgetId} .close-widget`).addEventListener('click', () => {
                document.getElementById(widgetId).classList.add('hidden');
            });
        };

        toggleWidget('btn-toggle-themes', 'widget-themes');
        toggleWidget('btn-toggle-yt', 'widget-yt');
        toggleWidget('btn-toggle-mixer', 'widget-mixer');

        function dragElement(elmnt, headerId) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const header = document.getElementById(headerId);
            if(header) header.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e.preventDefault();
                pos3 = e.clientX; pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
                document.querySelectorAll('[id^="widget-"]').forEach(el => el.style.zIndex = '40');
                elmnt.style.zIndex = '50'; 
            }
            function elementDrag(e) {
                e.preventDefault();
                pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
                pos3 = e.clientX; pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
                elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            function closeDragElement() {
                document.onmouseup = null; document.onmousemove = null;
            }
        }

        dragElement(document.getElementById("widget-themes"), "drag-themes");
        dragElement(document.getElementById("widget-yt"), "drag-yt");
        dragElement(document.getElementById("widget-mixer"), "drag-mixer");

        // --- 5. LOGIC MULTIPLE NOTES ---
        const notesContainer = document.getElementById('notes-container');
        const noteColors = [
            { bg: 'bg-pink-100', head: 'bg-pink-200/60', text: 'text-pink-900' },
            { bg: 'bg-green-100', head: 'bg-green-200/60', text: 'text-green-900' },
            { bg: 'bg-blue-100', head: 'bg-blue-200/60', text: 'text-blue-900' },
            { bg: 'bg-yellow-100', head: 'bg-yellow-200/60', text: 'text-yellow-900' },
            { bg: 'bg-purple-100', head: 'bg-purple-200/60', text: 'text-purple-900' }
        ];
        let noteCounter = 0;

        document.getElementById('btn-add-note').addEventListener('click', () => {
            noteCounter++;
            const id = `widget-note-${noteCounter}`;
            const headerId = `drag-note-${noteCounter}`;
            const color = noteColors[noteCounter % noteColors.length];
            const topOffset = 100 + (noteCounter * 20) % 150;
            const leftOffset = 300 + (noteCounter * 30) % 200;

            const noteHTML = `
                <div id="${id}" class="absolute w-[280px] ${color.bg} rounded-2xl shadow-xl overflow-hidden" style="top: ${topOffset}px; left: ${leftOffset}px; z-index: 45;">
                    <div id="${headerId}" class="${color.head} p-2 px-3 flex justify-between items-center cursor-move">
                        <span class="${color.text} text-xs font-bold">📝 Note ${noteCounter}</span>
                        <button class="close-note text-gray-500 hover:text-gray-800 text-sm">✕</button>
                    </div>
                    <div class="p-3">
                        <textarea class="w-full h-40 bg-transparent ${color.text} text-sm focus:outline-none resize-none placeholder-gray-500/50 font-medium" placeholder="Nhập ghi chú..."></textarea>
                    </div>
                </div>
            `;
            notesContainer.insertAdjacentHTML('beforeend', noteHTML);
            const newNote = document.getElementById(id);
            dragElement(newNote, headerId);
            newNote.querySelector('.close-note').addEventListener('click', () => { newNote.remove(); });
        });

        // --- 6. API YOUTUBE & TRÌNH PHÁT NHẠC (ĐÃ LIÊN KẾT) ---
        let ytPlayer;
        let isPlayerReady = false;

        // Tiêm Script API Youtube nếu chưa có
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Đợi API Youtube load xong rồi thiết lập
        const checkYT = setInterval(() => {
            if (window.YT && window.YT.Player) {
                clearInterval(checkYT);
                initYouTubePlayer();
            }
        }, 500);

        function initYouTubePlayer() {
            ytPlayer = new YT.Player('yt-player-container', {
                height: '100%',
                width: '100%',
                videoId: 'jfKfPfyJRdk', // Video lofi mặc định (Lofi Girl)
                playerVars: { 'playsinline': 1, 'controls': 1 },
                events: {
                    'onReady': () => { isPlayerReady = true; },
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // Bắt sự kiện dán link để load bài nhạc
        document.getElementById('yt-input').addEventListener('change', function(e) {
            let val = e.target.value;
            let videoId = "";
            let match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            if(match && match[1]) videoId = match[1];
            else videoId = val;
            
            if(videoId && isPlayerReady) {
                ytPlayer.loadVideoById(videoId);
            }
        });

        // Các biến UI Player
        const playBtn = document.getElementById('ws-player-play');
        const iconPlay = document.getElementById('icon-play');
        const iconPause = document.getElementById('icon-pause');
        const progressSlider = document.getElementById('ws-player-progress');
        const timeDisplay = document.getElementById('ws-player-time');
        
        // Đổi Icon Play/Pause khi Youtube thay đổi trạng thái
        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                iconPlay.classList.add('hidden');
                iconPause.classList.remove('hidden');
            } else {
                iconPlay.classList.remove('hidden');
                iconPause.classList.add('hidden');
            }
        }

        // Nút bấm Play/Pause
        playBtn.addEventListener('click', () => {
            if(!isPlayerReady) return;
            const state = ytPlayer.getPlayerState();
            if(state === YT.PlayerState.PLAYING) ytPlayer.pauseVideo();
            else ytPlayer.playVideo();
        });

        // Tua lùi/Tới 10 giây
        document.getElementById('ws-player-prev').addEventListener('click', () => {
            if(!isPlayerReady) return;
            ytPlayer.seekTo(ytPlayer.getCurrentTime() - 10, true);
        });
        document.getElementById('ws-player-next').addEventListener('click', () => {
            if(!isPlayerReady) return;
            ytPlayer.seekTo(ytPlayer.getCurrentTime() + 10, true);
        });

        // Nút Mute / Unmute
        let isMuted = false;
        document.getElementById('ws-player-mute').addEventListener('click', () => {
            if(!isPlayerReady) return;
            if(isMuted) { ytPlayer.unMute(); isMuted = false; }
            else { ytPlayer.mute(); isMuted = true; }
        });

        // Vòng lặp cập nhật thanh tiến trình & thời gian mỗi giây
        function formatTime(sec) {
            if (!sec) return "0:00";
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec % 60).toString().padStart(2, '0');
            return `${m}:${s}`;
        }

        setInterval(() => {
            if(isPlayerReady && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                const curr = ytPlayer.getCurrentTime();
                const dur = ytPlayer.getDuration();
                progressSlider.value = (curr / dur) * 100;
                timeDisplay.innerText = formatTime(curr) + ' / ' + formatTime(dur);
            }
        }, 1000);

        // Kéo thanh Slider để tua bài nhạc
        progressSlider.addEventListener('input', (e) => {
            if(!isPlayerReady) return;
            const dur = ytPlayer.getDuration();
            const seekTo = (e.target.value / 100) * dur;
            ytPlayer.seekTo(seekTo, true);
        });

        // --- 7. FULLSCREEN ---
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
