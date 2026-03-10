// --- 8. Tool Luyện Đánh Máy (Neon/RGB Style) ---
registerTool({
    id: 'tab-typing',
    name: 'Gõ Phím',
    icon: '⌨️',
    html: `
        <style>
            /* Font chữ chuyên dụng cho code/đánh máy */
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap');

            /* HIỆU ỨNG THEME SÁNG (HỒNG NEON) */
            .type-theme-light {
                --bg-color: #ffffff;
                --border-glow: 0 0 25px rgba(236, 72, 153, 0.4);
                --text-normal: #9ca3af;
                --text-correct: #db2777; /* Hồng đậm */
                --text-glow: 0 0 10px rgba(236, 72, 153, 0.8);
                --caret-color: #db2777;
                --error-color: #ef4444;
                --error-bg: rgba(239, 68, 68, 0.2);
            }

            /* HIỆU ỨNG THEME TỐI (XANH NEON - CYBERPUNK) */
            .type-theme-dark {
                --bg-color: #0f172a;
                --border-glow: 0 0 25px rgba(56, 189, 248, 0.4);
                --text-normal: #475569;
                --text-correct: #38bdf8; /* Xanh dương sáng */
                --text-glow: 0 0 10px rgba(56, 189, 248, 0.8);
                --caret-color: #38bdf8;
                --error-color: #f87171;
                --error-bg: rgba(248, 113, 113, 0.2);
            }

            #typing-container {
                background-color: var(--bg-color);
                box-shadow: var(--border-glow);
                transition: all 0.5s ease;
                font-family: 'Fira Code', monospace;
            }

            .typing-text-area {
                font-size: 1.5rem;
                line-height: 1.8;
                position: relative;
                color: var(--text-normal);
            }

            /* Trạng thái từng chữ cái */
            .char { transition: color 0.1s ease; border-radius: 4px; }
            .char.correct { color: var(--text-correct); text-shadow: var(--text-glow); font-weight: 500; }
            .char.incorrect { color: var(--error-color); background-color: var(--error-bg); }
            
            /* Con trỏ nhấp nháy */
            #caret {
                position: absolute;
                width: 3px;
                height: 1.5rem;
                background-color: var(--caret-color);
                box-shadow: var(--text-glow);
                transition: all 0.1s ease;
                animation: blink 1s infinite;
                top: 0; left: 0;
                border-radius: 2px;
            }
            @keyframes blink { 50% { opacity: 0; } }

            /* Input tàng hình để hứng bộ gõ Tiếng Việt */
            #hidden-input { opacity: 0; position: absolute; z-index: -999; }

            /* Hiệu ứng đếm ngược 3 2 1 */
            #countdown-overlay { backdrop-filter: blur(8px); }
            .count-num {
                animation: popIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
            }
            @keyframes popIn {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.2); opacity: 1; text-shadow: var(--text-glow); color: var(--text-correct); }
                100% { transform: scale(1); opacity: 0; }
            }
        </style>

        <div class="text-center mb-6">
            <span class="bg-gray-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Phím thủ</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Luyện Đánh Máy <span class="text-pink-500">Pro</span> ⌨️</h2>
        </div>

        <div id="tp-setup-screen" class="glass-card p-6 md:p-8 rounded-[2rem] max-w-4xl mx-auto border-t-4 border-t-pink-400 shadow-xl space-y-6 block">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-gray-800 text-lg">1. Dán văn bản cần luyện</h3>
                
                <div class="flex items-center bg-gray-100 p-1 rounded-xl">
                    <button id="tp-btn-light" class="px-4 py-1.5 rounded-lg text-sm font-bold bg-white text-pink-500 shadow-sm transition">Sáng (Hồng)</button>
                    <button id="tp-btn-dark" class="px-4 py-1.5 rounded-lg text-sm font-bold text-gray-500 hover:text-blue-500 transition">Tối (Xanh)</button>
                </div>
            </div>

            <textarea id="tp-source-text" class="w-full h-40 bg-white/50 rounded-2xl p-4 font-sans text-sm border border-pink-100 focus:outline-none focus:ring-2 ring-pink-300 resize-none shadow-inner" placeholder="Hãy dán hoặc gõ đoạn văn bản bạn muốn luyện tập vào đây... (Ví dụ: Lời bài hát, một bài thơ, hoặc đoạn code...)"></textarea>

            <button id="tp-btn-start" class="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl transition shadow-lg text-lg flex justify-center items-center gap-2">
                🚀 BẮT ĐẦU LUYỆN TẬP
            </button>
        </div>

        <div id="tp-game-screen" class="hidden relative max-w-5xl mx-auto">
            
            <div id="countdown-overlay" class="absolute inset-0 z-50 flex items-center justify-center rounded-[2rem] hidden bg-white/80">
                <div id="countdown-text" class="text-9xl font-black count-num">3</div>
            </div>

            <div id="typing-container" class="type-theme-light p-8 md:p-12 rounded-[2rem] border border-gray-100 relative overflow-hidden min-h-[300px] flex flex-col">
                
                <div class="flex justify-between items-center mb-6 border-b border-gray-200/20 pb-4">
                    <div class="text-sm font-bold opacity-70" style="color: var(--text-correct)">Tốc độ: <span id="live-wpm" class="text-xl">0</span> WPM</div>
                    <div class="text-sm font-bold opacity-70" style="color: var(--text-normal)">Độ chính xác: <span id="live-acc">100</span>%</div>
                    <div class="text-sm font-bold opacity-70" style="color: var(--text-normal)">Thời gian: <span id="live-time">0</span>s</div>
                </div>

                <div class="typing-text-area flex-1 relative cursor-text" id="text-display-area">
                    <div id="caret"></div>
                    <div id="words-container" class="flex flex-wrap gap-x-2 gap-y-2 pointer-events-none select-none"></div>
                </div>

                <textarea id="hidden-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
                
                <div class="mt-8 text-center text-xs opacity-50" style="color: var(--text-normal)">*Click vào khung chữ để tiếp tục nếu bị mất focus*</div>
            </div>
        </div>

        <div id="tp-result-screen" class="hidden glass-card p-8 rounded-[2rem] max-w-2xl mx-auto border-t-4 border-t-green-400 shadow-2xl mt-8">
            <h3 class="text-2xl font-bold text-center text-gray-800 mb-6">🎉 Hoàn Thành!</h3>
            
            <div class="grid grid-cols-3 gap-4 mb-8">
                <div class="text-center p-4 bg-green-50 rounded-2xl border border-green-100">
                    <div class="text-4xl font-black text-green-600" id="res-wpm">0</div>
                    <div class="text-xs font-bold text-green-800 uppercase mt-1">WPM (Từ/Phút)</div>
                </div>
                <div class="text-center p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div class="text-4xl font-black text-blue-600" id="res-acc">0%</div>
                    <div class="text-xs font-bold text-blue-800 uppercase mt-1">Chính xác</div>
                </div>
                <div class="text-center p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <div class="text-4xl font-black text-orange-600" id="res-time">0s</div>
                    <div class="text-xs font-bold text-orange-800 uppercase mt-1">Thời gian</div>
                </div>
            </div>

            <div class="flex gap-4">
                <button id="tp-btn-retry" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">🔁 Thử lại</button>
                <button id="tp-btn-new" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-md">📝 Bài mới</button>
            </div>
        </div>
    `,
    logic: function() {
        // --- 1. THEME SWITCHER ---
        const btnLight = document.getElementById('tp-btn-light');
        const btnDark = document.getElementById('tp-btn-dark');
        const typeContainer = document.getElementById('typing-container');
        const countOverlay = document.getElementById('countdown-overlay');

        btnLight.onclick = () => {
            btnLight.className = 'px-4 py-1.5 rounded-lg text-sm font-bold bg-white text-pink-500 shadow-sm transition';
            btnDark.className = 'px-4 py-1.5 rounded-lg text-sm font-bold text-gray-500 hover:text-blue-500 transition';
            typeContainer.classList.remove('type-theme-dark');
            typeContainer.classList.add('type-theme-light');
            countOverlay.classList.remove('bg-gray-900/80');
            countOverlay.classList.add('bg-white/80');
        };

        btnDark.onclick = () => {
            btnDark.className = 'px-4 py-1.5 rounded-lg text-sm font-bold bg-gray-700 text-blue-400 shadow-sm transition';
            btnLight.className = 'px-4 py-1.5 rounded-lg text-sm font-bold text-gray-500 hover:text-pink-500 transition';
            typeContainer.classList.remove('type-theme-light');
            typeContainer.classList.add('type-theme-dark');
            countOverlay.classList.remove('bg-white/80');
            countOverlay.classList.add('bg-gray-900/80');
        };

        // --- 2. HỆ THỐNG BIẾN GAME ---
        const sourceText = document.getElementById('tp-source-text');
        const setupScreen = document.getElementById('tp-setup-screen');
        const gameScreen = document.getElementById('tp-game-screen');
        const resultScreen = document.getElementById('tp-result-screen');
        
        const wordsContainer = document.getElementById('words-container');
        const hiddenInput = document.getElementById('hidden-input');
        const caret = document.getElementById('caret');
        
        let targetText = "";
        let charElements = []; // Mảng chứa các thẻ <span> của từng ký tự
        
        let startTime = null;
        let timerInterval = null;
        let isPlaying = false;
        let totalErrors = 0;

        // Hiển thị live
        const liveWpm = document.getElementById('live-wpm');
        const liveAcc = document.getElementById('live-acc');
        const liveTime = document.getElementById('live-time');

        // --- 3. LOGIC XỬ LÝ GÕ PHÍM VỚI TIẾNG VIỆT ---
        const initGame = (text) => {
            targetText = text.trim().replace(/\\n/g, ' '); // Đổi dòng mới thành dấu cách
            wordsContainer.innerHTML = '';
            charElements = [];
            
            // Render từng ký tự bọc trong <span>
            for (let i = 0; i < targetText.length; i++) {
                const span = document.createElement('span');
                span.innerText = targetText[i];
                span.className = 'char';
                wordsContainer.appendChild(span);
                charElements.push(span);
            }

            hiddenInput.value = '';
            hiddenInput.maxLength = targetText.length;
            totalErrors = 0;
            isPlaying = false;
            startTime = null;
            
            liveWpm.innerText = '0';
            liveAcc.innerText = '100';
            liveTime.innerText = '0';
            
            updateCaret();
            hiddenInput.focus();
        };

        const updateCaret = () => {
            const currentLen = hiddenInput.value.length;
            
            // Hoàn thành bài gõ
            if(currentLen >= targetText.length) {
                finishGame();
                return;
            }

            // Định vị con trỏ tới trước ký tự đang cần gõ
            const targetChar = charElements[currentLen];
            if(targetChar) {
                caret.style.left = targetChar.offsetLeft + 'px';
                caret.style.top = targetChar.offsetTop + 'px';
                // Nếu là dấu cách, chỉnh cao độ cho cân
                caret.style.height = targetChar.offsetHeight > 0 ? (targetChar.offsetHeight * 0.8) + 'px' : '1.5rem';
            }
        };

        const calculateStats = (timeSecs) => {
            const typedText = hiddenInput.value;
            let correctChars = 0;
            
            for(let i=0; i<typedText.length; i++) {
                if(typedText[i] === targetText[i]) correctChars++;
            }

            // WPM = (Số ký tự đúng / 5) / Phút
            let wpm = 0;
            if(timeSecs > 0) {
                wpm = Math.round((correctChars / 5) / (timeSecs / 60));
            }
            
            let acc = 100;
            if(typedText.length > 0) {
                acc = Math.round((correctChars / typedText.length) * 100);
            }

            return { wpm, acc };
        };

        hiddenInput.addEventListener('input', () => {
            if(!isPlaying) return; // Chặn gõ lúc đếm ngược

            const typedText = hiddenInput.value;
            
            // Bắt đầu đếm giờ khi gõ phím đầu tiên
            if(!startTime && typedText.length > 0) {
                startTime = Date.now();
                timerInterval = setInterval(() => {
                    const secs = Math.floor((Date.now() - startTime) / 1000);
                    liveTime.innerText = secs;
                    
                    const stats = calculateStats(secs);
                    liveWpm.innerText = stats.wpm;
                    liveAcc.innerText = stats.acc;
                }, 1000);
            }

            // Quét lại toàn bộ class để xử lý dấu tiếng việt bị xóa lùi (Telex)
            for(let i=0; i < targetText.length; i++) {
                charElements[i].classList.remove('correct', 'incorrect');
                
                if(i < typedText.length) {
                    if(typedText[i] === targetText[i]) {
                        charElements[i].classList.add('correct');
                    } else {
                        charElements[i].classList.add('incorrect');
                    }
                }
            }
            
            updateCaret();
        });

        // Giữ focus vào input tàng hình khi click vùng game
        document.getElementById('text-display-area').addEventListener('click', () => {
            if(isPlaying) hiddenInput.focus();
        });

        // --- 4. LUỒNG MÀN HÌNH (Start, Countdown, Finish) ---
        const startBtn = document.getElementById('tp-btn-start');
        const countText = document.getElementById('countdown-text');

        startBtn.onclick = () => {
            if(!sourceText.value.trim()) { alert("Vui lòng dán văn bản vào nhé!"); return; }
            
            setupScreen.classList.add('hidden');
            resultScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            countOverlay.classList.remove('hidden');
            
            let count = 3;
            countText.innerText = count;
            
            // Hiệu ứng đếm ngược 3, 2, 1
            const countInterval = setInterval(() => {
                count--;
                if(count > 0) {
                    countText.innerText = count;
                    // Reset animation
                    countText.style.animation = 'none';
                    countText.offsetHeight; /* trigger reflow */
                    countText.style.animation = null; 
                } else if(count === 0) {
                    countText.innerText = "GÕ!";
                } else {
                    clearInterval(countInterval);
                    countOverlay.classList.add('hidden');
                    isPlaying = true;
                    initGame(sourceText.value);
                }
            }, 1000);
        };

        const finishGame = () => {
            isPlaying = false;
            clearInterval(timerInterval);
            hiddenInput.blur();

            const secs = Math.floor((Date.now() - startTime) / 1000);
            const stats = calculateStats(secs);

            document.getElementById('res-wpm').innerText = stats.wpm;
            document.getElementById('res-acc').innerText = stats.acc + '%';
            document.getElementById('res-time').innerText = secs + 's';

            gameScreen.classList.add('hidden');
            resultScreen.classList.remove('hidden');
        };

        // Nút Thử lại đoạn cũ
        document.getElementById('tp-btn-retry').onclick = () => {
            resultScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            countOverlay.classList.remove('hidden');
            let count = 3; countText.innerText = count;
            const countInterval = setInterval(() => {
                count--;
                if(count > 0) countText.innerText = count;
                else { clearInterval(countInterval); countOverlay.classList.add('hidden'); isPlaying = true; initGame(sourceText.value); }
            }, 1000);
        };

        // Nút Quay lại dán bài mới
        document.getElementById('tp-btn-new').onclick = () => {
            resultScreen.classList.add('hidden');
            setupScreen.classList.remove('hidden');
            sourceText.value = '';
            sourceText.focus();
        };
    }
});
