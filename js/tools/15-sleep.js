
export function setupTool() {
    const tabId = 'tab-sleep';
    
    if (document.getElementById(tabId)) return;
    
    const panel = document.createElement('div');
    panel.id = tabId;
    panel.className = 'tab-panel active';
    
    panel.innerHTML = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap');

            .sleep-app {
                background: radial-gradient(circle at 50% -20%, #161036 0%, #070412 80%);
                border-radius: 2.5rem;
                position: relative;
                overflow: hidden;
                color: white;
                font-family: 'Nunito', system-ui, -apple-system, sans-serif;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05);
            }
            
            .sleep-star {
                position: absolute;
                background: white;
                border-radius: 50%;
                opacity: 0;
                animation: star-twinkle infinite alternate;
                pointer-events: none;
            }
            
            @keyframes star-twinkle {
                0% { opacity: 0; transform: scale(0.5); }
                50% { opacity: 0.7; transform: scale(1.2); }
                100% { opacity: 0; transform: scale(0.5); }
            }
            
            .sleep-element-dark {
                background-color: #110c22;
                border: 1.5px solid #2d2a4a;
                border-radius: 9999px; 
                transition: all 0.2s ease;
            }
            .sleep-element-dark:focus-within, .sleep-element-dark:hover {
                border-color: #4f46e5;
                background-color: #1a1433;
            }
            
            .sleep-time-input {
                background: transparent;
                outline: none;
                font-size: 2rem; 
                font-weight: 700; 
                text-align: center;
                letter-spacing: 1px;
            }
            .sleep-time-input::-webkit-calendar-picker-indicator {
                display: none; 
            }

            .sleep-card {
                background-color: #110c22;
                border: 1px solid #2d2a4a;
                border-radius: 1.5rem;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                transition: transform 0.2s;
            }
            .sleep-card:hover {
                transform: translateY(-2px);
                border-color: #4f46e5;
            }
            
            .sleep-fade-in { animation: fadeIn 0.4s ease forwards; }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>

        <div class="text-center mb-6">
            <span class="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Sức khỏe</span>
            <h2 class="text-3xl font-black mt-2 text-slate-800 tracking-tight" style="font-family: 'Nunito', sans-serif;">Tính Giấc <span class="text-indigo-600">Ngủ 🌙</span></h2>
        </div>

        <div id="sleep-container" class="sleep-app w-full max-w-md mx-auto min-h-[550px] p-6 pb-8 flex flex-col relative">
            
            <div class="text-center mt-2 mb-6 z-10">
                <h1 class="text-[1.4rem] font-bold text-[#818cf8] tracking-wide drop-shadow-lg">Chu Kỳ Giấc Ngủ</h1>
            </div>

            <div id="sleep-view-home" class="flex-1 flex flex-col items-center justify-center space-y-10 sleep-fade-in z-10 w-full pb-6">
                
                <div class="w-full text-center">
                    <p class="text-[1.05rem] font-bold tracking-wide mb-3" style="color: #ffb47b !important;">Tôi sẽ thức dậy lúc...</p>
                    <div class="flex items-center justify-center gap-3">
                        <div class="sleep-element-dark px-5 py-1.5 flex items-center justify-center min-w-[125px]">
                            <input type="time" id="sleep-wake-time" value="07:00" class="sleep-time-input w-full" style="color: #ffb47b !important;">
                        </div>
                        <button type="button" id="btn-calc-wake" class="sleep-element-dark w-[50px] h-[50px] flex items-center justify-center text-2xl pb-1 transition active:scale-95 shadow-md" style="color: #ffb47b !important;">
                            →
                        </button>
                    </div>
                </div>

                <div class="w-full text-center">
                    <p class="text-[1.05rem] font-bold tracking-wide mb-3" style="color: #ffffff !important;">Tôi sẽ đi ngủ lúc...</p>
                    <div class="flex items-center justify-center gap-3">
                        <div class="sleep-element-dark px-5 py-1.5 flex items-center justify-center min-w-[125px]">
                            <input type="time" id="sleep-bed-time" value="18:43" class="sleep-time-input w-full" style="color: #ffffff !important;">
                        </div>
                        <button type="button" id="btn-calc-bed" class="sleep-element-dark w-[50px] h-[50px] flex items-center justify-center text-2xl pb-1 transition active:scale-95 shadow-md" style="color: #ffffff !important;">
                            →
                        </button>
                    </div>
                </div>

                <div class="pt-2">
                    <button type="button" id="btn-sleep-now" class="sleep-element-dark px-6 py-3 text-[1rem] font-bold hover:bg-[#1a1433] transition active:scale-95 shadow-lg tracking-wide flex items-center gap-2" style="color: #e2e8f0 !important;">
                        Ngủ ngay 😴
                    </button>
                </div>
            </div>

            <div id="sleep-view-results" class="hidden flex-1 flex flex-col items-center justify-start sleep-fade-in z-10 w-full pt-0">
                <div class="text-center mb-6 w-full relative">
                    <div class="mb-3 flex justify-center opacity-80" style="color: #e2e8f0 !important;">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    </div>

                    <div id="sleep-target-time" class="text-[2.5rem] font-bold bg-[#110c22] rounded-[1.5rem] px-10 py-2 border border-[#2d2a4a] inline-block mb-5 shadow-lg">
                        18:43
                    </div>
                    
                    <h2 id="sleep-result-title" class="text-[1.1rem] font-bold tracking-wide" style="color: #ffffff !important;">Bạn nên thức dậy vào lúc:</h2>
                </div>

                <div id="sleep-grid" class="grid grid-cols-2 gap-3 w-full max-w-[320px] mb-8">
                    </div>

                <div class="text-center w-full mb-2">
                    <button type="button" id="btn-sleep-back" class="sleep-element-dark hover:bg-[#1a1433] font-bold py-2.5 px-8 transition active:scale-95 text-[0.95rem]" style="color: #a5b4fc !important;">
                        Tính lại từ đầu
                    </button>
                </div>
            </div>

            <div class="mt-auto pt-6 z-10 text-center w-full">
                <p class="text-[11px] leading-relaxed max-w-[280px] mx-auto font-medium" style="color: #64748b !important;">
                    Dựa trên chu kỳ 90 phút y khoa.<br>Đã tính trung bình 14 phút để chìm vào giấc ngủ.
                </p>
            </div>
        </div>
    `;
    
    document.getElementById('app-container').appendChild(panel);
    
    const container = document.getElementById('sleep-container');
    for (let i = 0; i < 35; i++) {
        let star = document.createElement('div');
        star.className = 'sleep-star';
        let size = Math.random() * 2 + 1; 
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDelay = (Math.random() * 3) + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(star);
    }

    const viewHome = document.getElementById('sleep-view-home');
    const viewResults = document.getElementById('sleep-view-results');
    const titleEl = document.getElementById('sleep-result-title');
    const targetTimeEl = document.getElementById('sleep-target-time');
    const gridEl = document.getElementById('sleep-grid');

    const wakeInput = document.getElementById('sleep-wake-time');
    const bedInput = document.getElementById('sleep-bed-time');

    let now = new Date();
    bedInput.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const parseTime = (timeStr) => {
        const [h, m] = timeStr.split(':').map(Number);
        const d = new Date();
        d.setHours(h, m, 0, 0);
        return d;
    };

    const renderCards = (targetDate, mode) => {
        gridEl.innerHTML = '';
        let cyclesArray = [1, 2, 3, 4, 5, 6]; 
        
        cyclesArray.forEach(c => {
            let time = new Date(targetDate.getTime());
            
            if (mode === 'wake') {
                time.setMinutes(time.getMinutes() - (c * 90) - 14);
            } else {
                time.setMinutes(time.getMinutes() + 14 + (c * 90));
            }

            let hours = time.getHours().toString().padStart(2, '0');
            let mins = time.getMinutes().toString().padStart(2, '0');
            let timeStr = `${hours}:${mins}`;
            let hrCount = (c * 90) / 60; 

            let iconSvg = '';
            let iconColorHex = '';
            
            if (c <= 2) {
                iconColorHex = '#f87171'; // red-400
                iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
            } else if (c <= 4) {
                iconColorHex = '#facc15'; // yellow-400
                iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="15" x2="16" y2="15"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
            } else {
                iconColorHex = '#4ade80'; // green-400
                iconSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`;
            }

            let card = document.createElement('div');
            card.className = 'sleep-card flex flex-col items-center justify-center p-4 gap-0.5 cursor-default';
            // Ép màu trực tiếp vào style của thẻ
            card.innerHTML = `
                <div style="color: ${iconColorHex} !important; margin-bottom: 0.25rem; opacity: 0.8;">${iconSvg}</div>
                <div class="text-[1.6rem] font-bold mb-0.5 tracking-tight" style="color: #f8fafc !important;">${timeStr}</div>
                <div class="text-[12px] font-bold" style="color: #64748b !important;">${c} chu kỳ</div>
                <div class="text-[11px] font-semibold" style="color: #475569 !important;">${hrCount} giờ</div>
            `;
            gridEl.appendChild(card);
        });
    };

    const showResults = (titleText, targetTimeStr, dateObj, mode) => {
        titleEl.innerText = titleText;
        targetTimeEl.innerText = targetTimeStr;
        
        // Dùng setProperty để đảm bảo chèn lệnh !important qua Javascript
        if(mode === 'wake') {
            targetTimeEl.style.setProperty('color', '#ffb47b', 'important');
        } else {
            targetTimeEl.style.setProperty('color', '#ffffff', 'important');
        }
        
        renderCards(dateObj, mode);

        viewHome.classList.add('hidden');
        viewResults.classList.remove('hidden');
    };

    document.getElementById('btn-calc-wake').addEventListener('click', () => {
        const val = wakeInput.value;
        if (!val) return;
        showResults('Bạn nên ĐI NGỦ vào lúc:', val, parseTime(val), 'wake');
    });

    document.getElementById('btn-calc-bed').addEventListener('click', () => {
        const val = bedInput.value;
        if (!val) return;
        showResults('Bạn nên THỨC DẬY vào lúc:', val, parseTime(val), 'bed');
    });

    document.getElementById('btn-sleep-now').addEventListener('click', () => {
        const tNow = new Date();
        const h = tNow.getHours().toString().padStart(2, '0');
        const m = tNow.getMinutes().toString().padStart(2, '0');
        showResults('Bạn nên THỨC DẬY vào lúc:', `${h}:${m}`, tNow, 'bed');
    });

    document.getElementById('btn-sleep-back').addEventListener('click', () => {
        viewResults.classList.add('hidden');
        viewHome.classList.remove('hidden');
    });
}
