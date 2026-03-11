// --- 9. Tool Lịch Vạn Niên ---
registerTool({
    id: 'tab-calendar',
    name: 'Lịch Vạn Niên',
    icon: '📆',
    html: `
        <div class="text-center mb-6">
            <span class="bg-[#eaf0f6] text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">Thời gian</span>
            <h2 class="text-3xl font-bold mt-2 text-slate-800">Lịch <span class="text-orange-500">Việt Nam</span></h2>
        </div>

        <div class="max-w-md mx-auto space-y-6 pb-10">

            <div class="flex justify-center">
                <div class="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl flex flex-col items-center shadow-sm border border-slate-100">
                    <div id="live-clock" class="text-3xl font-black text-slate-700 tracking-wider font-mono">00:00:00</div>
                    <div id="live-date" class="text-[11px] font-bold text-orange-500 uppercase tracking-widest mt-1">Đang tải...</div>
                </div>
            </div>
            
            <div class="glass-card p-5 md:p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-4 relative">
                
                <div class="flex bg-slate-100 p-1 rounded-xl">
                    <button id="cal-mode-solar" class="flex-1 py-2 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition">Dương Lịch</button>
                    <button id="cal-mode-lunar" class="flex-1 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition">Âm Lịch</button>
                </div>

                <div class="flex gap-2">
                    <div class="flex-1 relative">
                        <label class="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Ngày</label>
                        <select id="sel-d" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-bold text-lg outline-none focus:ring-2 ring-orange-200 appearance-none text-center cursor-pointer"></select>
                    </div>
                    <div class="flex-1 relative">
                        <label class="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Tháng</label>
                        <select id="sel-m" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-bold text-lg outline-none focus:ring-2 ring-orange-200 appearance-none text-center cursor-pointer"></select>
                    </div>
                    <div class="flex-1 relative">
                        <label class="text-[10px] font-bold text-slate-400 uppercase ml-1 mb-1 block">Năm</label>
                        <select id="sel-y" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 font-bold text-lg outline-none focus:ring-2 ring-orange-200 appearance-none text-center cursor-pointer"></select>
                    </div>
                </div>

                <button id="btn-lookup" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-base">
                    🔍 TRA CỨU
                </button>
            </div>

            <div id="cal-loading" class="text-center py-10 text-slate-400 font-bold animate-pulse">
                Đang kết nối thư viện lịch... ⏳
            </div>

            <div id="cal-widget" class="hidden space-y-4">
                
                <div class="bg-[#e9eff6] rounded-[2rem] p-6 md:p-8 shadow-sm border border-white relative">
                    <div class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1" id="res-weekday">THỨ ...</div>
                    
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="flex items-baseline gap-2">
                                <div class="text-6xl md:text-7xl font-black text-slate-800 tracking-tighter leading-none">Ngày <span id="res-main-d">--</span></div>
                            </div>
                            <div class="text-lg md:text-xl font-bold text-slate-600 mt-3" id="res-main-my">Tháng -- năm --</div>
                            <div class="text-sm font-medium text-slate-500 mt-1" id="res-sub-date">--/--/----</div>
                        </div>

                        <div class="text-center pt-2">
                            <div class="text-5xl drop-shadow-md" id="res-moon-icon">🌕</div>
                            <div class="text-[10px] font-bold text-slate-500 mt-2" id="res-moon-text">Trăng...</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 md:p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4 pb-3 border-b border-slate-50">
                        <span>🇻🇳</span> Dấu ấn sự kiện
                    </h3>
                    <div id="res-events" class="space-y-3">
                        </div>
                </div>

            </div>
        </div>
    `,
    logic: function() {
        const loading = document.getElementById('cal-loading');
        const widget = document.getElementById('cal-widget');
        
        // --- ĐỒNG HỒ ---
        const clockEl = document.getElementById('live-clock');
        const dateEl = document.getElementById('live-date');
        const wdNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        
        setInterval(() => {
            const now = new Date();
            clockEl.innerText = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            dateEl.innerText = `${wdNames[now.getDay()]}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        }, 1000);

        // --- CƠ SỞ DỮ LIỆU SỰ KIỆN (CHUẨN DD/MM) ---
        const evSolar = {
            "01/01": ["Tết Dương Lịch"],
            "09/01": ["Ngày truyền thống Học sinh, Sinh viên Việt Nam (1950)"],
            "03/02": ["Ngày thành lập Đảng Cộng sản Việt Nam (1930)"],
            "09/02": ["Ngày sinh Tổng Bí thư Trường Chinh (1907)"],
            "27/02": ["Ngày Thầy thuốc Việt Nam (1955)"],
            "01/03": ["Ngày sinh Thủ tướng Phạm Văn Đồng (1906)"],
            "08/03": ["Ngày Quốc tế Phụ nữ"],
            "26/03": ["Ngày thành lập Đoàn TNCS Hồ Chí Minh (1931)"],
            "30/03": ["Ngày mất Chủ tịch Tôn Đức Thắng (1980)"],
            "07/04": ["Ngày sinh Tổng Bí thư Lê Duẩn (1907)"],
            "14/04": ["Ngày sinh Tổng Bí thư Nguyễn Phú Trọng (1944)"],
            "27/04": ["Ngày mất Tổng Bí thư Nguyễn Văn Linh (1998)"],
            "29/04": ["Ngày mất Thủ tướng Phạm Văn Đồng (2000)"],
            "30/04": ["Ngày Giải phóng Miền Nam, thống nhất đất nước (1975)"],
            "01/05": ["Ngày Quốc tế Lao động", "Ngày sinh Tổng Bí thư Trần Phú (1904)"],
            "07/05": ["Chiến thắng lịch sử Điện Biên Phủ (1954)"],
            "15/05": ["Ngày thành lập Đội TNTP Hồ Chí Minh (1941)"],
            "19/05": ["Ngày sinh Chủ tịch Hồ Chí Minh (1890)"],
            "01/06": ["Ngày Quốc tế Thiếu nhi"],
            "11/06": ["Ngày mất Thủ tướng Võ Văn Kiệt (2008)"],
            "21/06": ["Ngày Báo chí Cách mạng Việt Nam (1925)"],
            "28/06": ["Ngày Gia đình Việt Nam"],
            "01/07": ["Ngày sinh Tổng Bí thư Nguyễn Văn Linh (1915)"],
            "10/07": ["Ngày mất Tổng Bí thư Lê Duẩn (1986)"],
            "19/07": ["Ngày mất Tổng Bí thư Nguyễn Phú Trọng (2024)"],
            "27/07": ["Ngày Thương binh - Liệt sĩ (1947)"],
            "19/08": ["Ngày Cách mạng tháng Tám thành công (1945)", "Ngày truyền thống Công an Nhân dân (1945)"],
            "20/08": ["Ngày sinh Chủ tịch Tôn Đức Thắng (1888)"],
            "25/08": ["Ngày sinh Đại tướng Võ Nguyên Giáp (1911)"],
            "02/09": ["Ngày Quốc khánh nước CHXHCN Việt Nam (1945)", "Ngày mất Chủ tịch Hồ Chí Minh (1969)"],
            "06/09": ["Ngày sinh TBT Lê Hồng Phong (1902)", "Ngày mất TBT Trần Phú (1931)", "Ngày mất TBT Lê Hồng Phong (1942)"],
            "30/09": ["Ngày mất Tổng Bí thư Trường Chinh (1988)"],
            "04/10": ["Ngày mất Đại tướng Võ Nguyên Giáp (2013)"],
            "10/10": ["Ngày Giải phóng Thủ đô (1954)"],
            "20/10": ["Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam (1930)"],
            "20/11": ["Ngày Nhà giáo Việt Nam (1982)"],
            "23/11": ["Ngày sinh Thủ tướng Võ Văn Kiệt (1922)", "Ngày Khởi nghĩa Nam Kỳ (1940)"],
            "22/12": ["Ngày thành lập Quân đội Nhân dân Việt Nam (1944)"]
        };
        const evLunar = {
            "01/01": ["Tết Nguyên Đán (Mùng 1)"], "02/01": ["Mùng 2 Tết Nguyên Đán"], "03/01": ["Mùng 3 Tết Nguyên Đán"],
            "15/01": ["Tết Nguyên Tiêu (Rằm tháng Giêng)"], "10/03": ["Giỗ Tổ Hùng Vương"],
            "15/04": ["Lễ Phật Đản"], "05/05": ["Tết Đoan Ngọ"],
            "15/07": ["Lễ Vu Lan báo hiếu"], "15/08": ["Tết Trung Thu"],
            "23/12": ["Ngày đưa Ông Táo về trời"], "30/12": ["Lễ Giao Thừa"], "29/12": ["Lễ Giao Thừa (Tháng thiếu)"]
        };

        const initTool = () => {
            loading.classList.add('hidden');
            widget.classList.remove('hidden');

            const btnS = document.getElementById('cal-mode-solar');
            const btnL = document.getElementById('cal-mode-lunar');
            const selD = document.getElementById('sel-d');
            const selM = document.getElementById('sel-m');
            const selY = document.getElementById('sel-y');
            let isSolarMode = true;

            // Đổ dữ liệu vào Select Box
            let dOpts = ''; for(let i=1; i<=31; i++) dOpts += `<option value="${i}">${i}</option>`; selD.innerHTML = dOpts;
            let mOpts = ''; for(let i=1; i<=12; i++) mOpts += `<option value="${i}">${i}</option>`; selM.innerHTML = mOpts;
            let yOpts = ''; 
            const curY = new Date().getFullYear();
            for(let i=curY-100; i<=curY+50; i++) yOpts += `<option value="${i}">${i}</option>`; 
            selY.innerHTML = yOpts;

            // Set Mặc định Hôm nay
            const today = new Date();
            selD.value = today.getDate();
            selM.value = today.getMonth() + 1;
            selY.value = today.getFullYear();

            // Chuyển Mode
            btnS.onclick = () => {
                isSolarMode = true;
                btnS.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition';
                btnL.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition';
            };
            btnL.onclick = () => {
                isSolarMode = false;
                btnL.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition';
                btnS.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition';
            };

            const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
            const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

            const renderWidget = (solar, lunar) => {
                const sDay = solar.getDay().toString().padStart(2, '0');
                const sMonth = solar.getMonth().toString().padStart(2, '0');
                const sYear = solar.getYear();
                
                const lDay = lunar.getDay().toString().padStart(2, '0');
                const lMonth = lunar.getMonth().toString().padStart(2, '0');
                
                let lYearText = CAN[lunar.getYearGanIndex()] + ' ' + CHI[lunar.getYearZhiIndex()];
                if (lunar.getLeap() > 0 && lunar.getMonth() === lunar.getLeap()) lYearText += " (Nhuận)";

                // Nếu đang tra Dương -> Hiển thị Âm to lên. Nếu tra Âm -> Hiển thị Dương to lên.
                if(isSolarMode) {
                    document.getElementById('res-weekday').innerText = wdNames[solar.getWeek()];
                    document.getElementById('res-main-d').innerText = lDay;
                    document.getElementById('res-main-my').innerText = `Tháng ${lMonth} năm ${lYearText}`;
                    document.getElementById('res-sub-date').innerText = `Dương lịch: ${sDay}/${sMonth}/${sYear}`;
                } else {
                    document.getElementById('res-weekday').innerText = wdNames[solar.getWeek()];
                    document.getElementById('res-main-d').innerText = sDay;
                    document.getElementById('res-main-my').innerText = `Tháng ${sMonth} năm ${sYear}`;
                    document.getElementById('res-sub-date').innerText = `Âm lịch: Ngày ${lDay} Tháng ${lMonth} Năm ${lYearText}`;
                }

                // Tính pha Mặt Trăng
                let phase = lunar.getDay() < 15 ? 'Trăng khuyết' : (lunar.getDay() === 15 ? 'Trăng tròn' : 'Trăng tàn');
                let icon = lunar.getDay() < 7 ? '🌒' : (lunar.getDay() < 14 ? '🌓' : (lunar.getDay() <= 16 ? '🌕' : (lunar.getDay() < 23 ? '🌗' : '🌘')));
                if(lunar.getDay() === 1 || lunar.getDay() >= 29) { phase = 'Trăng non'; icon = '🌑'; }
                document.getElementById('res-moon-text').innerText = phase;
                document.getElementById('res-moon-icon').innerText = icon;

                // Sự Kiện
                const evContainer = document.getElementById('res-events');
                evContainer.innerHTML = '';
                
                let sKey = `${sDay}/${sMonth}`;
                let lKey = `${lDay}/${lMonth}`;
                
                let todaysEvents = [];
                if(evSolar[sKey]) todaysEvents = todaysEvents.concat(evSolar[sKey]);
                if(evLunar[lKey]) todaysEvents = todaysEvents.concat(evLunar[lKey].map(e => e + ' (Âm lịch)'));

                if(todaysEvents.length === 0) {
                    evContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Hôm nay không có sự kiện đặc biệt.</div>';
                } else {
                    todaysEvents.forEach(e => {
                        evContainer.innerHTML += `
                            <div class="bg-orange-50/50 p-3 rounded-xl flex gap-3 items-start border border-orange-100">
                                <span class="text-orange-500 mt-0.5">📌</span>
                                <span class="font-bold text-slate-700 text-sm leading-snug">${e}</span>
                            </div>
                        `;
                    });
                }
            };

            document.getElementById('btn-lookup').onclick = () => {
                let d = parseInt(selD.value), m = parseInt(selM.value), y = parseInt(selY.value);
                
                try {
                    if(isSolarMode) {
                        const solar = Solar.fromYmd(y, m, d);
                        const lunar = solar.getLunar();
                        renderWidget(solar, lunar);
                    } else {
                        // Cứu lỗi nếu chọn ngày Âm 30 nhưng tháng đó chỉ có 29 ngày
                        let lunar;
                        try { lunar = Lunar.fromYmd(y, m, d); } 
                        catch(e) { lunar = Lunar.fromYmd(y, m, d-1); alert("Tháng âm này chỉ có 29 ngày! Đã tự động điều chỉnh."); }
                        
                        const solar = lunar.getSolar();
                        renderWidget(solar, lunar);
                    }
                } catch(e) {
                    alert("Ngày không hợp lệ! (Ví dụ: Tháng 2 không có ngày 30, 31)");
                }
            };

            // Ép chạy lần đầu
            document.getElementById('btn-lookup').click();
        };

        // NẠP THƯ VIỆN LUNAR TỪ CDN
        if (typeof Solar !== 'undefined' && typeof Lunar !== 'undefined') {
            initTool();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/lunar-javascript/lunar.min.js';
            script.onload = () => initTool();
            script.onerror = () => {
                loading.innerHTML = '<span class="text-red-500">Lỗi mạng! Không tải được thư viện tính lịch.</span>';
            };
            document.head.appendChild(script);
        }
    }
});
