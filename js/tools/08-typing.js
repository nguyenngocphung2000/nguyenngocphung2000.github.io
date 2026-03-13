export function setupTool() {
    const tabId = 'tab-typing';

    if (document.getElementById(tabId)) return;

    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';

    panel.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

            .type-theme-light {
                --bg-color: #ffffff;
                --border-glow: 0 0 25px rgba(236, 72, 153, 0.4);
                --text-normal: #9ca3af;
                --text-correct: #db2777;
                --text-glow: 0 0 10px rgba(236, 72, 153, 0.8);
                --caret-color: #db2777;
                --error-color: #ef4444;
                --error-bg: rgba(239, 68, 68, 0.2);
            }

            .type-theme-dark {
                --bg-color: #0f172a;
                --border-glow: 0 0 25px rgba(56, 189, 248, 0.4);
                --text-normal: #64748b; 
                --text-correct: #38bdf8;
                --text-glow: 0 0 10px rgba(56, 189, 248, 0.8);
                --caret-color: #38bdf8;
                --error-color: #f87171;
                --error-bg: rgba(248, 113, 113, 0.2);
            }

            #typing-container {
                background-color: var(--bg-color);
                box-shadow: var(--border-glow);
                transition: background-color 0.5s ease, box-shadow 0.5s ease;
            }

            .typing-text-area {
                font-family: 'JetBrains Mono', monospace; 
                font-size: 1.3rem;
                line-height: 1.8;
                position: relative;
                color: var(--text-normal);
                white-space: pre-wrap; 
                word-wrap: break-word;
            }
            @media (min-width: 768px) { .typing-text-area { font-size: 1.6rem; } }

            .char { 
                opacity: 0.4; 
                font-weight: 400;
                transition: all 0.15s ease; 
                border-radius: 4px; 
            }
            .char.correct { 
                opacity: 1; 
                color: var(--text-correct); 
                text-shadow: var(--text-glow); 
                font-weight: 700; 
            }
            .char.incorrect { 
                opacity: 1;
                color: var(--error-color); 
                background-color: var(--error-bg); 
                font-weight: 700;
            }
            
            #caret {
                position: absolute;
                width: 3px;
                height: 1.5rem;
                background-color: var(--caret-color);
                box-shadow: var(--text-glow);
                transition: left 0.1s ease, top 0.1s ease;
                animation: blink 1s infinite;
                top: 0; left: 0;
                border-radius: 2px;
                z-index: 10;
            }
            @keyframes blink { 50% { opacity: 0; } }

            #hidden-input { 
                position: absolute; 
                width: 10px; height: 10px; 
                opacity: 0; 
                z-index: -1; 
                border: none; outline: none; resize: none;
                padding: 0; margin: 0;
                pointer-events: none; 
            }

            #countdown-overlay { backdrop-filter: blur(8px); }
            
            .count-num { animation: popIn 1s infinite; }
            @keyframes popIn {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.2); opacity: 1; text-shadow: var(--text-glow); color: var(--text-correct); }
                100% { transform: scale(1); opacity: 0; }
            }

            .flash-effect { animation: flash-screen 0.3s ease; }
            @keyframes flash-screen {
                0% { opacity: 1; }
                50% { opacity: 0.3; }
                100% { opacity: 1; }
            }
        </style>

        <div class="text-center mb-6">
            <span class="bg-gray-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Hãy trở thành</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Phím Thủ <span class="text-pink-500">Pro Max</span> ⌨️</h2>
             <p class="text-sm text-gray-500 mt-2 italic">Cân kèo mọi siêu anh hùng bàn phím</p>
        </div>

        <div id="tp-setup-screen" class="glass-card p-6 md:p-8 rounded-[2rem] max-w-4xl mx-auto border-t-4 border-t-pink-400 shadow-xl space-y-6 block">
            <div class="flex justify-between items-center">
                <h3 class="font-bold text-gray-800 text-lg">1. Dán văn bản cần luyện</h3>
                <div class="flex items-center bg-gray-100 p-1 rounded-xl shrink-0 ml-4">
                    <button id="tp-btn-light" class="px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold bg-white text-pink-500 shadow-sm transition">Sáng</button>
                    <button id="tp-btn-dark" class="px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold text-gray-500 hover:text-blue-500 transition">Tối</button>
                </div>
            </div>

            <textarea id="tp-source-text" class="w-full h-40 bg-white/50 rounded-2xl p-4 font-sans text-sm border border-pink-100 focus:outline-none focus:ring-2 ring-pink-300 resize-none shadow-inner" placeholder="Hãy dán văn bản vào đây. Hệ thống sẽ tự động chia nhỏ mỗi tiến trình ~50 từ để bạn dễ gõ..."></textarea>

            <button id="tp-btn-start" class="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 rounded-xl transition shadow-lg text-lg flex justify-center items-center gap-2">
                🚀 BẮT ĐẦU
            </button>
        </div>

        <div id="tp-game-screen" class="hidden relative max-w-5xl mx-auto">
            <div id="countdown-overlay" class="absolute inset-0 z-50 flex items-center justify-center rounded-[2rem] hidden bg-white/80">
                <div id="countdown-text" class="text-9xl font-black count-num">3</div>
            </div>

            <div id="typing-container" class="type-theme-light p-6 md:p-12 rounded-[2rem] border border-gray-100 relative overflow-hidden min-h-[300px] flex flex-col">
                
                <div class="flex flex-wrap justify-between items-center mb-6 border-b border-gray-200/20 pb-4 z-30 gap-2">
                    <div class="text-sm font-bold opacity-70" style="color: var(--text-correct)">Tốc độ: <span id="live-wpm" class="text-xl">0</span> WPM</div>
                    <div class="text-sm font-bold opacity-70" style="color: var(--text-normal)">Chính xác: <span id="live-acc">100</span>%</div>
                    <div class="text-sm font-bold opacity-70" style="color: var(--text-normal)">Thời gian: <span id="live-time">0</span>s</div>
                    <div class="text-sm font-bold opacity-70 bg-gray-100/10 px-3 py-1 rounded-lg" style="color: var(--text-normal)">Tiến trình: <span id="live-progress">1/1</span></div>
                </div>

                <div class="typing-text-area flex-1 relative" id="text-display-area">
                    <div id="caret"></div>
                    <div id="words-container" class="pointer-events-none select-none z-10"></div>
                </div>

                <textarea id="hidden-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></textarea>
                
                <div class="mt-8 text-center text-[10px] md:text-xs opacity-50 z-30" style="color: var(--text-normal)">* Múa phím thần sầu - Đánh thức bản năng *</div>
            </div>
        </div>

        <div id="tp-result-screen" class="hidden glass-card p-6 md:p-8 rounded-[2rem] max-w-2xl mx-auto border-t-4 border-t-green-400 shadow-2xl mt-8">
            <h3 class="text-2xl font-bold text-center text-gray-800 mb-6">🎉 Hoàn Thành Xuất Sắc!</h3>
            
            <div class="grid grid-cols-3 gap-2 md:gap-4 mb-8">
                <div class="text-center p-3 md:p-4 bg-green-50 rounded-2xl border border-green-100">
                    <div class="text-2xl md:text-4xl font-black text-green-600" id="res-wpm">0</div>
                    <div class="text-[10px] md:text-xs font-bold text-green-800 uppercase mt-1">WPM</div>
                </div>
                <div class="text-center p-3 md:p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <div class="text-2xl md:text-4xl font-black text-blue-600" id="res-acc">0%</div>
                    <div class="text-[10px] md:text-xs font-bold text-blue-800 uppercase mt-1">Chính xác</div>
                </div>
                <div class="text-center p-3 md:p-4 bg-orange-50 rounded-2xl border border-orange-100">
                    <div class="text-2xl md:text-4xl font-black text-orange-600" id="res-time">0s</div>
                    <div class="text-[10px] md:text-xs font-bold text-orange-800 uppercase mt-1">Thời gian</div>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-4">
                <button id="tp-btn-retry" class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 rounded-xl transition">🔁 Gõ lại bài này</button>
                <button id="tp-btn-new" class="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition shadow-md">📝 Bài mới</button>
            </div>
        </div>
    `;

    document.getElementById('app-container').appendChild(panel);

    // ==========================================
    // LOGIC CHUYỂN ĐỔI SANG MODULE
    // ==========================================
    const btnLight = document.getElementById('tp-btn-light');
    const btnDark = document.getElementById('tp-btn-dark');
    const typeContainer = document.getElementById('typing-container');
    const countOverlay = document.getElementById('countdown-overlay');

    btnLight.onclick = () => {
        btnLight.className = 'px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold bg-white text-pink-500 shadow-sm transition';
        btnDark.className = 'px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold text-gray-500 hover:text-blue-500 transition';
        typeContainer.classList.remove('type-theme-dark');
        typeContainer.classList.add('type-theme-light');
        countOverlay.classList.remove('bg-gray-900/80');
        countOverlay.classList.add('bg-white/80');
    };

    btnDark.onclick = () => {
        btnDark.className = 'px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold bg-gray-700 text-blue-400 shadow-sm transition';
        btnLight.className = 'px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-bold text-gray-500 hover:text-pink-500 transition';
        typeContainer.classList.remove('type-theme-light');
        typeContainer.classList.add('type-theme-dark');
        countOverlay.classList.remove('bg-white/80');
        countOverlay.classList.add('bg-gray-900/80');
    };

    const sourceText = document.getElementById('tp-source-text');
    const setupScreen = document.getElementById('tp-setup-screen');
    const gameScreen = document.getElementById('tp-game-screen');
    const resultScreen = document.getElementById('tp-result-screen');
    
    const wordsContainer = document.getElementById('words-container');
    const hiddenInput = document.getElementById('hidden-input');
    const caret = document.getElementById('caret');
    
    let textChunks = [];       
    let currentChunkIdx = 0;   
    let targetText = "";       
    let charElements = []; 
    
    let startTime = null;
    let timerInterval = null;
    let countIntervalObj = null;
    let isPlaying = false;
    
    let previousCorrectChars = 0; 
    let previousTotalTyped = 0;

    const liveWpm = document.getElementById('live-wpm');
    const liveAcc = document.getElementById('live-acc');
    const liveTime = document.getElementById('live-time');
    const liveProgress = document.getElementById('live-progress');

    const chunkText = (text) => {
        const words = text.trim().replace(/\n/g, ' ').split(/\s+/).filter(w => w.length > 0);
        const chunks = [];
        const WORDS_PER_SCREEN = 50; 

        for (let i = 0; i < words.length; i += WORDS_PER_SCREEN) {
            let chunkStr = words.slice(i, i + WORDS_PER_SCREEN).join(' ');
            if (i + WORDS_PER_SCREEN < words.length) chunkStr += ' ';
            chunks.push(chunkStr);
        }
        return chunks;
    };

    const loadChunk = (index) => {
        targetText = textChunks[index];
        wordsContainer.innerHTML = '';
        charElements = [];
        
        for (let i = 0; i < targetText.length; i++) {
            const span = document.createElement('span');
            span.textContent = targetText[i]; 
            span.className = 'char';
            wordsContainer.appendChild(span);
            charElements.push(span);
        }

        hiddenInput.value = '';
        hiddenInput.maxLength = targetText.length;
        liveProgress.innerText = (index + 1) + '/' + textChunks.length;
        
        updateCaret();

        typeContainer.classList.remove('flash-effect');
        void typeContainer.offsetWidth; 
        typeContainer.classList.add('flash-effect');
    };

    const initGame = (text) => {
        textChunks = chunkText(text);
        currentChunkIdx = 0;
        previousCorrectChars = 0;
        previousTotalTyped = 0;

        isPlaying = false;
        startTime = null;
        
        liveWpm.innerText = '0';
        liveAcc.innerText = '100';
        liveTime.innerText = '0';
        
        loadChunk(currentChunkIdx);
    };

    const updateCaret = () => {
        const currentLen = hiddenInput.value.length;
        
        if(currentLen >= targetText.length) {
            const typedText = hiddenInput.value;
            for(let i=0; i<typedText.length; i++) {
                if(typedText[i] === targetText[i]) previousCorrectChars++;
            }
            previousTotalTyped += typedText.length;

            if (currentChunkIdx < textChunks.length - 1) {
                currentChunkIdx++;
                loadChunk(currentChunkIdx);
            } else {
                finishGame();
            }
            return;
        }

        const targetChar = charElements[currentLen];
        if(targetChar) {
            caret.style.left = targetChar.offsetLeft + 'px';
            caret.style.top = targetChar.offsetTop + 'px';
            const h = targetChar.offsetHeight;
            caret.style.height = h > 0 ? h + 'px' : '1.5rem';

            hiddenInput.style.left = targetChar.offsetLeft + 'px';
            hiddenInput.style.top = targetChar.offsetTop + 'px';
        }
    };

    const calculateStats = (timeSecs) => {
        const typedText = hiddenInput.value;
        let currentCorrect = 0;
        for(let i=0; i<typedText.length; i++) {
            if(typedText[i] === targetText[i]) currentCorrect++;
        }

        let totalCorrect = previousCorrectChars + currentCorrect;
        let totalTyped = previousTotalTyped + typedText.length;

        let wpm = timeSecs > 0 ? Math.round((totalCorrect / 5) / (timeSecs / 60)) : 0;
        let acc = totalTyped > 0 ? Math.round((totalCorrect / totalTyped) * 100) : 100;
        
        return { wpm, acc };
    };

    hiddenInput.addEventListener('input', () => {
        if(!isPlaying) {
            hiddenInput.value = '';
            return;
        }

        const typedText = hiddenInput.value;
        
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

    typeContainer.addEventListener('click', () => {
        if (isPlaying) {
            hiddenInput.focus();
        }
    });

    const startBtn = document.getElementById('tp-btn-start');
    const countText = document.getElementById('countdown-text');

    const startCountdown = () => {
        if(countIntervalObj) clearInterval(countIntervalObj);
        
        let count = 3;
        countText.innerText = count;
        countOverlay.classList.remove('hidden');
        
        countIntervalObj = setInterval(() => {
            count--;
            if(count > 0) {
                countText.innerText = count;
            } else if(count === 0) {
                countText.innerText = "GÕ!";
            } else {
                clearInterval(countIntervalObj);
                countOverlay.classList.add('hidden');
                isPlaying = true;
                hiddenInput.focus();
            }
        }, 1000); 
    };

    startBtn.onclick = () => {
        const text = sourceText.value.trim();
        if(!text) { alert("Vui lòng dán văn bản vào nhé!"); return; }
        
        setupScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        hiddenInput.value = '';
        
        initGame(text);
        startCountdown();
        
        gameScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    document.getElementById('tp-btn-retry').onclick = () => {
        resultScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        
        hiddenInput.value = '';
        initGame(sourceText.value);
        startCountdown();
    };

    document.getElementById('tp-btn-new').onclick = () => {
        resultScreen.classList.add('hidden');
        setupScreen.classList.remove('hidden');
        sourceText.value = '';
        sourceText.focus();
    };
}