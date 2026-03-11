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
            
            /* Custom Range Slider cho Music Player */
            .player-slider { -webkit-appearance: none; background: transparent; }
            .player-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 10px; width: 10px;
                border-radius: 50%;
                background: white;
                cursor: pointer;
                margin-top: -3.5px;
                box-shadow: 0 0 5px rgba(255,255,255,0.5);
            }
            .player-slider::-webkit-slider-runnable-track {
                width: 100%; height: 3px;
                cursor: pointer;
                background: rgba(255,255,255,0.3);
                border-radius: 2px;
            }
            .player-slider:disabled::-webkit-slider-thumb { background: #666; cursor: not-allowed; }
            
            /* Animation đĩa than dừng/chạy */
            .spin-slow { animation: spin 10s linear infinite; }
            .spin-paused { animation-play-state: paused; }
        </style>

        <div id="ws-container" class="relative w-full h-[85vh] min-h-[600px] rounded-[2rem] overflow-hidden shadow-2xl bg-gray-900 font-sans group transition-all duration-500 select-none">
            <img id="ws-bg-image" src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000" alt="background" />
            
            <div class="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>

            <div class="absolute top-6 right-6 z-40 flex items-center gap-3">
                <button id="ws-fullscreen-btn" class="text-white/70 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md p-2 rounded-full transition" title="Toàn màn hình">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                </button>
            </div>

            <div class="absolute top-6 left-1/2 -translate-x-1/2 flex items-center bg-black/60 backdrop-blur-md rounded-full border border-white/10 z-20 shadow-lg px-1 py-1 overflow-hidden">
                <button id="btn-mode-pomo" class="px-4 py-1.5 rounded-full bg-white text-black text-[10px] font-bold tracking-widest uppercase transition-all">POMODORO</button>
                <button id="btn-mode-clock" class="px-4 py-1.5 rounded-full text-white/70 hover:text-white text-[10px] font-bold tracking-widest uppercase transition-all">CLOCK</button>
            </div>

            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-white">
                <div id="ws-pomo-view" class="flex flex-col items-center transition-opacity duration-500 pointer-events-auto">
                    <div id="ws-pomo-time" class="text-[8rem] md:text-[11rem] font-bold drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] tracking-wider leading-none clock-font-1 cursor-pointer hover:opacity-80 transition hover:scale-105" title="Nhấp để đổi số phút">25:00</div>
                    <div class="flex items-center gap-3 mt-2">
                        <button id="ws-pomo-reset" class="w-8 h-8 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/60 transition backdrop-blur-md border border-white/10" title="Đặt lại">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                        </button>
                        <button id="ws-pomo-start" class="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition shadow-lg">
                            <svg id="pomo-icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                            <svg id="pomo-icon-pause" class="hidden" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                        </button>
                    </div>
                </div>

                <div id="ws-clock-view" class="hidden flex-col items-center transition-opacity duration-500 pointer-events-auto">
                    <div id="ws-time" class="text-[8rem] md:text-[11rem] font-bold drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] tracking-wider leading-none clock-font-1 cursor-pointer hover:opacity-80 transition hover:scale-105">16:21</div>
                    <div id="ws-date" class="text-lg md:text-xl mt-0 font-medium text-white/80 drop-shadow-md tracking-wide">Sunday, 25 January</div>
                </div>
            </div>

            <div class="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 bg-black/60 backdrop-blur-xl py-4 px-2.5 rounded-[1.5rem] border border-white/10 z-30 shadow-2xl">
                <button title="Giao diện & Đồng hồ" id="btn-toggle-themes" class="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
                </button>
                <button title="YouTube" id="btn-toggle-yt" class="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                </button>
                <button title="Thêm Ghi chú" id="btn-add-note" class="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </button>
            </div>

            <div id="widget-themes" class="hidden absolute top-16 left-20 w-[300px] bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-40">
                <div id="drag-themes" class="bg-white/5 p-3 flex justify-between items-center cursor-move border-b border-white/10">
                    <span class="text-white/90 text-sm font-bold">🎨 Tùy chỉnh</span>
                    <button class="close-widget text-white/50 hover:text-white text-xs">✕</button>
                </div>
                <div class="p-4 space-y-4">
                    <div>
                        <div class="text-[10px] font-bold text-white/50 mb-2 uppercase">Kiểu Đồng Hồ</div>
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="changeClockFont('clock-font-1')" class="py-1.5 bg-white/10 hover:bg-white/20 rounded text-white clock-font-1 text-lg transition">Caveat</button>
                            <button onclick="changeClockFont('clock-font-2')" class="py-1.5 bg-white/10 hover:bg-white/20 rounded text-white clock-font-2 text-xs transition">Modern</button>
                            <button onclick="changeClockFont('clock-font-3')" class="py-1.5 bg-white/10 hover:bg-white/20 rounded text-white clock-font-3 text-xs transition">Digital</button>
                            <button onclick="changeClockFont('clock-font-4')" class="py-1.5 bg-white/10 hover:bg-white/20 rounded text-white clock-font-4 text-xs transition">Pacifico</button>
                        </div>
                    </div>
                    <div>
                        <div class="text-[10px] font-bold text-white/50 mb-2 uppercase">Hình Nền</div>
                        <div class="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
                            <img onclick="changeBg('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1920')" src="https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=200" class="w-14 h-10 object-cover rounded cursor-pointer hover:border-2 border-white shrink-0">
                            <img onclick="changeBg('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920')" src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=200" class="w-14 h-10 object-cover rounded cursor-pointer hover:border-2 border-white shrink-0">
                            <img onclick="changeBg('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1920')" src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=200" class="w-14 h-10 object-cover rounded cursor-pointer hover:border-2 border-white shrink-0">
                        </div>
                        <input type="file" id="local-bg-upload" class="hidden" accept="image/*">
                        <button onclick="document.getElementById('local-bg-upload').click()" class="w-full mt-2 py-1.5 bg-white/10 hover:bg-white/20 rounded text-white text-xs font-medium transition">
                            + Tải ảnh từ máy
                        </button>
                    </div>
                </div>
            </div>

            <div id="widget-yt" class="hidden absolute top-20 left-[100px] w-[320px] bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl z-40">
                <div id="drag-yt" class="bg-white/5 p-3 flex justify-between items-center cursor-move border-b border-white/10">
                    <span class="text-white/90 text-sm font-bold flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="red"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/></svg> YouTube Player</span>
                    <button class="close-widget text-white/50 hover:text-white text-xs">✕</button>
                </div>
                <div class="p-3">
                    <input type="text" id="yt-input" placeholder="Dán link YouTube..." class="w-full bg-black/50 text-white text-xs px-3 py-2 rounded-lg border border-white/10 focus:outline-none focus:border-white/30 mb-3">
                    <div class="relative w-full aspect-video bg-black rounded-lg overflow-hidden" id="yt-player-container"></div>
                </div>
            </div>

            <div id="notes-container"></div>

            <div class="absolute bottom-6 left-6 z-30 flex items-center gap-3 max-w-[250px] md:max-w-[300px]">
                <div class="relative w-12 h-12 rounded-full border-2 border-black/50 shadow-lg overflow-hidden shrink-0">
                    <img id="ws-track-cover" src="https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg" class="w-full h-full object-cover spin-slow spin-paused" alt="cover">
                    <div class="absolute inset-0 m-auto w-3 h-3 bg-black rounded-full border border-gray-700"></div>
                </div>
                <div class="min-w-0">
                    <div id="ws-track-title" class="text-sm font-bold text-white truncate drop-shadow-md">Lofi Girl - chill beats</div>
                    <div id="ws-track-author" class="text-xs text-white/70 truncate drop-shadow-sm">YouTube Audio</div>
                </div>
            </div>

            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#121212]/90 backdrop-blur-xl rounded-full border border-white/10 py-2.5 px-6 flex items-center gap-5 z-30 shadow-2xl">
                <button id="ws-player-play" class="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition shrink-0">
                    <svg id="icon-play" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    <svg id="icon-pause" class="hidden" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
                </button>
                
                <div class="flex items-center gap-3">
                    <button id="ws-player-prev" title="-10s" class="text-white/60 hover:text-white transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/></svg></button>
                    <button id="ws-player-next" title="+10s" class="text-white/60 hover:text-white transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg></button>
                </div>
                
                <button id="ws-player-mute" title="Âm lượng" class="text-white/60 hover:text-white transition"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg></button>
                
                <input type="range" id="ws-player-progress" value="0" max="100" class="player-slider w-24 md:w-36">
                
                <span id="ws-player-time" class="text-[11px] font-medium text-white/80 tracking-wide min-w-[70px] shrink-0 text-right whitespace-nowrap">0:00 / 0:00</span>
            </div>
        </div>
    `,
    logic: function() {
        // --- 1. LOGIC ĐỒNG HỒ & POMODORO ---
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
                el.className = `text-[8rem] md:text-[11rem] font-bold drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] tracking-wider leading-none transition-all duration-300 cursor-pointer hover:opacity-80 hover:scale-105 ${fontClass}`;
            });
        };

        const btnClock = document.getElementById('btn-mode-clock');
        const btnPomo = document.getElementById('btn-mode-pomo');
        const viewClock = document.getElementById('ws-clock-view');
        const viewPomo = document.getElementById('ws-pomo-view');

        btnClock.addEventListener('click', () => {
            btnClock.className = "px-4 py-1.5 rounded-full bg-white text-black text-[10px] font-bold tracking-widest uppercase transition-all";
            btnPomo.className = "px-4 py-1.5 rounded-full text-white/70 hover:text-white text-[10px] font-bold tracking-widest uppercase transition-all";
            viewClock.classList.remove('hidden'); viewClock.classList.add('flex');
            viewPomo.classList.add('hidden'); viewPomo.classList.remove('flex');
        });

        btnPomo.addEventListener('click', () => {
            btnPomo.className = "px-4 py-1.5 rounded-full bg-white text-black text-[10px] font-bold tracking-widest uppercase transition-all";
            btnClock.className = "px-4 py-1.5 rounded-full text-white/70 hover:text-white text-[10px] font-bold tracking-widest uppercase transition-all";
            viewPomo.classList.remove('hidden'); viewPomo.classList.add('flex');
            viewClock.classList.add('hidden'); viewClock.classList.remove('flex');
        });

        let defaultPomoTime = 25 * 60, pomoTime = defaultPomoTime, pomoInterval = null, isRunning = false;
        const pomoDisplay = document.getElementById('ws-pomo-time');
        const btnPomoStart = document.getElementById('ws-pomo-start');
        const btnPomoReset = document.getElementById('ws-pomo-reset');
        const pomoPlayIcon = document.getElementById('pomo-icon-play');
        const pomoPauseIcon = document.getElementById('pomo-icon-pause');

        function updatePomoDisplay() {
            const m = Math.floor(pomoTime / 60).toString().padStart(2, '0');
            const s = (pomoTime % 60).toString().padStart(2, '0');
            pomoDisplay.innerText = `${m}:${s}`;
        }

        pomoDisplay.addEventListener('click', () => {
            if (isRunning) { alert("Dừng đồng hồ trước khi đổi giờ nhé!"); return; }
            const input = prompt("Nhập số phút tập trung (VD: 25, 45, 60):", Math.floor(defaultPomoTime / 60));
            if (input && !isNaN(input) && input > 0) {
                defaultPomoTime = parseInt(input) * 60; pomoTime = defaultPomoTime; updatePomoDisplay();
            }
        });

        btnPomoStart.addEventListener('click', () => {
            if (isRunning) {
                clearInterval(pomoInterval);
                pomoPlayIcon.classList.remove('hidden'); pomoPauseIcon.classList.add('hidden');
            } else {
                pomoInterval = setInterval(() => {
                    if (pomoTime > 0) { pomoTime--; updatePomoDisplay(); } 
                    else { clearInterval(pomoInterval); alert("Hết giờ! Nghỉ ngơi nhé ☕"); }
                }, 1000);
                pomoPlayIcon.classList.add('hidden'); pomoPauseIcon.classList.remove('hidden');
            }
            isRunning = !isRunning;
        });

        btnPomoReset.addEventListener('click', () => {
            clearInterval(pomoInterval); isRunning = false; pomoTime = defaultPomoTime; updatePomoDisplay();
            pomoPlayIcon.classList.remove('hidden'); pomoPauseIcon.classList.add('hidden');
        });

        // --- 2. HÌNH NỀN ---
        window.changeBg = function(url) { document.getElementById('ws-bg-image').src = url; };
        document.getElementById('local-bg-upload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) changeBg(URL.createObjectURL(file));
        });

        // --- 3. WIDGET KÉO THẢ ---
        const toggleWidget = (btnId, widgetId) => {
            document.getElementById(btnId).addEventListener('click', () => document.getElementById(widgetId).classList.toggle('hidden'));
            document.querySelector(`#${widgetId} .close-widget`).addEventListener('click', () => document.getElementById(widgetId).classList.add('hidden'));
        };
        toggleWidget('btn-toggle-themes', 'widget-themes');
        toggleWidget('btn-toggle-yt', 'widget-yt');

        function dragElement(elmnt, headerId) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            const header = document.getElementById(headerId);
            if(header) header.onmousedown = dragMouseDown;
            function dragMouseDown(e) {
                e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY;
                document.onmouseup = closeDragElement; document.onmousemove = elementDrag;
                document.querySelectorAll('[id^="widget-"]').forEach(el => el.style.zIndex = '40');
                elmnt.style.zIndex = '50'; 
            }
            function elementDrag(e) {
                e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
                pos3 = e.clientX; pos4 = e.clientY;
                elmnt.style.top = (elmnt.offsetTop - pos2) + "px"; elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
            function closeDragElement() { document.onmouseup = null; document.onmousemove = null; }
        }
        dragElement(document.getElementById("widget-themes"), "drag-themes");
        dragElement(document.getElementById("widget-yt"), "drag-yt");

        // --- 4. GHI CHÚ ---
        const notesContainer = document.getElementById('notes-container');
        const noteColors = [
            { bg: 'bg-pink-100', head: 'bg-pink-200/60', text: 'text-pink-900' },
            { bg: 'bg-yellow-100', head: 'bg-yellow-200/60', text: 'text-yellow-900' },
            { bg: 'bg-blue-100', head: 'bg-blue-200/60', text: 'text-blue-900' }
        ];
        let noteCounter = 0;
        document.getElementById('btn-add-note').addEventListener('click', () => {
            noteCounter++; const id = `widget-note-${noteCounter}`; const headerId = `drag-note-${noteCounter}`;
            const color = noteColors[noteCounter % noteColors.length];
            const html = `
                <div id="${id}" class="absolute w-[240px] ${color.bg} rounded-xl shadow-lg overflow-hidden" style="top: ${100 + (noteCounter*20)%100}px; left: ${300 + (noteCounter*20)%100}px; z-index: 45;">
                    <div id="${headerId}" class="${color.head} p-2 flex justify-between cursor-move"><span class="${color.text} text-[11px] font-bold">📝 Note</span><button class="close-note text-black/50 hover:text-black text-xs">✕</button></div>
                    <div class="p-2"><textarea class="w-full h-32 bg-transparent ${color.text} text-xs focus:outline-none resize-none" placeholder="Nhập..."></textarea></div>
                </div>`;
            notesContainer.insertAdjacentHTML('beforeend', html);
            const newNote = document.getElementById(id); dragElement(newNote, headerId);
            newNote.querySelector('.close-note').addEventListener('click', () => newNote.remove());
        });

        // --- 5. YOUTUBE PLAYER & TRACK INFO ---
        let ytPlayer; let isPlayerReady = false;
        const currentVideoId = 'jfKfPfyJRdk'; // Lofi mặc định

        if (!window.YT) {
            const tag = document.createElement('script'); tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0]; firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        const checkYT = setInterval(() => {
            if (window.YT && window.YT.Player) { clearInterval(checkYT); initYouTubePlayer(); }
        }, 500);

        function initYouTubePlayer() {
            ytPlayer = new YT.Player('yt-player-container', {
                height: '100%', width: '100%', videoId: currentVideoId,
                playerVars: { 'playsinline': 1, 'controls': 1 },
                events: {
                    'onReady': (e) => { isPlayerReady = true; fetchVideoInfo(currentVideoId); },
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function fetchVideoInfo(vid) {
            document.getElementById('ws-track-cover').src = `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
            setTimeout(() => {
                if(ytPlayer.getVideoData) {
                    const data = ytPlayer.getVideoData();
                    document.getElementById('ws-track-title').innerText = data.title || "Unknown Audio";
                    document.getElementById('ws-track-author').innerText = data.author || "YouTube Stream";
                }
            }, 1000);
        }

        document.getElementById('yt-input').addEventListener('change', function(e) {
            let val = e.target.value; let videoId = "";
            let match = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
            if(match && match[1]) videoId = match[1]; else videoId = val;
            
            if(videoId && isPlayerReady) {
                ytPlayer.loadVideoById(videoId);
                fetchVideoInfo(videoId);
            }
        });

        // UI Variables
        const playBtn = document.getElementById('ws-player-play');
        const iconPlay = document.getElementById('icon-play');
        const iconPause = document.getElementById('icon-pause');
        const progressSlider = document.getElementById('ws-player-progress');
        const timeDisplay = document.getElementById('ws-player-time');
        const trackCover = document.getElementById('ws-track-cover');
        
        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                iconPlay.classList.add('hidden'); iconPause.classList.remove('hidden');
                trackCover.classList.remove('spin-paused'); 
            } else {
                iconPlay.classList.remove('hidden'); iconPause.classList.add('hidden');
                trackCover.classList.add('spin-paused'); 
            }
        }

        playBtn.addEventListener('click', () => {
            if(!isPlayerReady) return;
            if(ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) ytPlayer.pauseVideo();
            else ytPlayer.playVideo();
        });

        document.getElementById('ws-player-prev').addEventListener('click', () => { if(isPlayerReady) ytPlayer.seekTo(ytPlayer.getCurrentTime() - 10, true); });
        document.getElementById('ws-player-next').addEventListener('click', () => { if(isPlayerReady) ytPlayer.seekTo(ytPlayer.getCurrentTime() + 10, true); });
        
        let isMuted = false;
        document.getElementById('ws-player-mute').addEventListener('click', () => {
            if(!isPlayerReady) return;
            if(isMuted) { ytPlayer.unMute(); isMuted = false; } else { ytPlayer.mute(); isMuted = true; }
        });

        function formatTime(sec) {
            if (!sec || isNaN(sec) || sec === Infinity) return "0:00";
            const h = Math.floor(sec / 3600);
            const m = Math.floor((sec % 3600) / 60).toString().padStart(h > 0 ? 2 : 1, '0');
            const s = Math.floor(sec % 60).toString().padStart(2, '0');
            return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
        }

        setInterval(() => {
            if(isPlayerReady && ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                const dur = ytPlayer.getDuration();
                const curr = ytPlayer.getCurrentTime();
                
                let isLive = false;
                
                if (ytPlayer.getVideoData) {
                    const vData = ytPlayer.getVideoData();
                    if (vData && vData.isLive) isLive = true;
                }
                
                if (!dur || dur <= 0 || dur > 43200 || curr > 43200) {
                    isLive = true;
                }
                
                if (isLive) {
                    timeDisplay.innerText = "🔴 LIVE";
                    timeDisplay.classList.add('text-red-400');
                    progressSlider.value = 100;
                    progressSlider.disabled = true;
                } else {
                    timeDisplay.classList.remove('text-red-400');
                    progressSlider.disabled = false;
                    progressSlider.value = (curr / dur) * 100;
                    timeDisplay.innerText = formatTime(curr) + ' / ' + formatTime(dur);
                }
            }
        }, 1000);

        progressSlider.addEventListener('input', (e) => {
            if(!isPlayerReady || progressSlider.disabled) return;
            const dur = ytPlayer.getDuration();
            ytPlayer.seekTo((e.target.value / 100) * dur, true);
        });

        document.getElementById('ws-fullscreen-btn').addEventListener('click', () => {
            if (!document.fullscreenElement) document.getElementById('ws-container').requestFullscreen();
            else document.exitFullscreen();
        });
    }
});
