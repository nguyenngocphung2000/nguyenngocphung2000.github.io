// --- 9. Tool Lịch Vạn Niên ---
registerTool({
    id: 'tab-calendar',
    name: 'Lịch Vạn Niên',
    icon: '🗓️',
    html: `
        <div class="flex justify-center mb-4">
            <div class="glass-card px-5 py-2 rounded-full flex flex-col items-center shadow-sm border border-indigo-100">
                <div id="live-clock" class="text-2xl font-black text-indigo-600 tracking-wider font-mono">00:00:00</div>
                <div id="live-date" class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Đang tải...</div>
            </div>
        </div>

        <div class="text-center mb-6">
            <h2 class="text-3xl font-bold text-gray-800">Lịch <span class="text-indigo-500">Việt Nam</span> 🇻🇳</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Nhập dương lịch hoặc âm lịch</p>
        </div>

        <div class="max-w-md mx-auto space-y-6 pb-10">
            
            <div class="glass-card p-5 md:p-6 rounded-[2rem] shadow-md border border-indigo-100 space-y-5 relative">
                
                <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100 relative">
                    <label class="absolute -top-2.5 left-4 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Dương Lịch</label>
                    <div class="flex gap-2 mt-1">
                        <input type="number" id="s-dd" placeholder="Ngày" class="s-inp auto-jump w-1/3 text-center bg-white border border-blue-100 rounded-lg py-3 text-blue-800 font-black text-lg outline-none focus:ring-2 ring-blue-300 transition" data-next="s-mm" data-max="2">
                        <input type="number" id="s-mm" placeholder="Tháng" class="s-inp auto-jump w-1/3 text-center bg-white border border-blue-100 rounded-lg py-3 text-blue-800 font-black text-lg outline-none focus:ring-2 ring-blue-300 transition" data-next="s-yy" data-max="2">
                        <input type="number" id="s-yy" placeholder="Năm" class="s-inp auto-jump w-1/3 text-center bg-white border border-blue-100 rounded-lg py-3 text-blue-800 font-black text-lg outline-none focus:ring-2 ring-blue-300 transition" data-max="4">
                    </div>
                </div>

                <div class="flex justify-center">
                    <div class="bg-gray-100 text-gray-400 w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold shadow-inner">↕</div>
                </div>

                <div class="bg-rose-50/50 p-4 rounded-xl border border-rose-100 relative">
                    <label class="absolute -top-2.5 left-4 bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">Âm Lịch</label>
                    <div class="flex gap-2 mt-1">
                        <input type="number" id="l-dd" placeholder="Ngày" class="l-inp auto-jump w-1/3 text-center bg-white border border-rose-100 rounded-lg py-3 text-rose-800 font-black text-lg outline-none focus:ring-2 ring-rose-300 transition" data-next="l-mm" data-max="2">
                        <input type="number" id="l-mm" placeholder="Tháng" class="l-inp auto-jump w-1/3 text-center bg-white border border-rose-100 rounded-lg py-3 text-rose-800 font-black text-lg outline-none focus:ring-2 ring-rose-300 transition" data-next="l-yy" data-max="2">
                        <input type="number" id="l-yy" placeholder="Năm" class="l-inp auto-jump w-1/3 text-center bg-white border border-rose-100 rounded-lg py-3 text-rose-800 font-black text-lg outline-none focus:ring-2 ring-rose-300 transition" data-max="4">
                    </div>
                </div>

                <button id="btn-lookup" class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-black py-4 rounded-xl shadow-lg transition active:scale-95 flex justify-center items-center gap-2 text-lg">
                    🔎 Tìm Kiếm
                </button>
            </div>

            <div id="cal-loading" class="text-center py-10 text-indigo-400 font-bold animate-pulse">
                Đang nạp dữ liệu Thiên Văn... 🌌
            </div>

            <div id="cal-widget" class="hidden space-y-4">
                
                <div class="glass-card bg-gradient-to-br from-blue-50 to-indigo-100 rounded-[2rem] p-6 md:p-8 shadow-xl relative overflow-hidden border border-white/50">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
                    
                    <div class="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-1" id="res-weekday">Thứ ...</div>
                    <div class="flex items-baseline gap-2 mb-6">
                        <div class="text-7xl font-black text-indigo-900 tracking-tighter" id="res-s-day">--</div>
                        <div class="text-xl font-bold text-indigo-800/60 pb-2" id="res-s-my">Tháng --, ----</div>
                    </div>
                    
                    <hr class="border-indigo-200/50 mb-5">
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Âm Lịch</div>
                            <div class="text-2xl font-black text-slate-800" id="res-l-full">Ngày -- Tháng --</div>
                            <div class="text-sm font-bold text-slate-500 mt-1" id="res-l-year">Năm ----</div>
                        </div>
                        <div class="text-center bg-white/50 p-3 rounded-2xl shadow-sm border border-white">
                            <div class="text-4xl drop-shadow-md mb-1" id="res-moon-icon">🌕</div>
                            <div class="text-[9px] font-bold text-indigo-500 uppercase" id="res-moon-text">Trăng...</div>
                        </div>
                    </div>
                </div>

                <div class="glass-card p-5 md:p-6 rounded-[2rem] border border-rose-100 shadow-md bg-white">
                    <h3 class="text-sm font-bold text-rose-500 uppercase tracking-widest flex items-center gap-2 mb-4 pb-2 border-b border-gray-100">
                        <span>🇻🇳</span> Dấu ấn lịch sử
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
        
        // --- 1. HỆ THỐNG ĐỒNG HỒ THỜI GIAN THỰC ---
        const clockEl = document.getElementById('live-clock');
        const dateEl = document.getElementById('live-date');
        const wdNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        
        setInterval(() => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            const s = now.getSeconds().toString().padStart(2, '0');
            clockEl.innerText = `${h}:${m}:${s}`;
            
            const dd = now.getDate().toString().padStart(2, '0');
            const mm = (now.getMonth() + 1).toString().padStart(2, '0');
            const yyyy = now.getFullYear();
            const wd = wdNames[now.getDay()];
            dateEl.innerText = `${wd}, ${dd}/${mm}/${yyyy}`;
        }, 1000);

        // --- 2. CƠ SỞ DỮ LIỆU SỰ KIỆN VIỆT NAM (CHUẨN XÁC 100%) ---
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
            "06/09": ["Ngày sinh Tổng Bí thư Lê Hồng Phong (1902)", "Ngày mất Tổng Bí thư Trần Phú (1931)", "Ngày mất Tổng Bí thư Lê Hồng Phong (1942)"],
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
            "23/12": ["Ngày đưa Ông Táo về trời"], "30/12": ["Lễ Giao Thừa"]
        };

        // --- 3. HỆ THỐNG TÍNH TOÁN & RENDER UI ---
        const initTool = () => {
            loading.classList.add('hidden');
            widget.classList.remove('hidden');

            const sD = document.getElementById('s-dd'); const sM = document.getElementById('s-mm'); const sY = document.getElementById('s-yy');
            const lD = document.getElementById('l-dd'); const lM = document.getElementById('l-mm'); const lY = document.getElementById('l-yy');
            
            let lastEdited = 'solar'; // Theo dõi người dùng vừa gõ ô nào

            // Logic Auto-jump
            document.querySelectorAll('.auto-jump').forEach(inp => {
                inp.addEventListener('input', function() {
                    let maxL = parseInt(this.getAttribute('data-max'));
                    if(this.value.length >= maxL) {
                        this.value = this.value.slice(0, maxL);
                        let nextId = this.getAttribute('data-next');
                        if(nextId) document.getElementById(nextId).focus();
                    }
                });
                inp.addEventListener('focus', function() {
                    lastEdited = this.classList.contains('s-inp') ? 'solar' : 'lunar';
                });
            });

            // Set Mặc định Hôm nay
            const today = new Date();
            sD.value = today.getDate().toString().padStart(2, '0');
            sM.value = (today.getMonth() + 1).toString().padStart(2, '0');
            sY.value = today.getFullYear();

            // Hàm vẽ dữ liệu
            const renderWidget = (solar, lunar) => {
                // Top Card (Dương & Âm)
                document.getElementById('res-weekday').innerText = wdNames[solar.getWeek()];
                document.getElementById('res-s-day').innerText = solar.getDay().toString().padStart(2, '0');
                document.getElementById('res-s-my').innerText = `Tháng ${solar.getMonth().toString().padStart(2, '0')}, ${solar.getYear()}`;

                document.getElementById('res-l-full').innerText = `Ngày ${lunar.getDay().toString().padStart(2, '0')} Tháng ${lunar.getMonth().toString().padStart(2, '0')}`;
                
                const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
                const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
                let yearText = lunar.getYear() + ' (' + CAN[lunar.getYearGanIndex()] + ' ' + CHI[lunar.getYearZhiIndex()] + ')';
                if (lunar.getLeap() > 0 && lunar.getMonth() === lunar.getLeap()) yearText += " [Tháng Nhuận]";
                document.getElementById('res-l-year').innerText = "Năm " + yearText;

                // Tính pha Mặt Trăng
                let phase = lunar.getDay() < 15 ? 'Trăng khuyết' : (lunar.getDay() === 15 ? 'Trăng tròn' : 'Trăng tàn');
                let icon = lunar.getDay() < 7 ? '🌒' : (lunar.getDay() < 14 ? '🌓' : (lunar.getDay() <= 16 ? '🌕' : (lunar.getDay() < 23 ? '🌗' : '🌘')));
                if(lunar.getDay() === 1 || lunar.getDay() >= 29) { phase = 'Trăng non'; icon = '🌑'; }
                document.getElementById('res-moon-text').innerText = phase;
                document.getElementById('res-moon-icon').innerText = icon;

                // Cập nhật Sự Kiện (Sử dụng key chuẩn MM/DD để khớp Database)
                const evContainer = document.getElementById('res-events');
                evContainer.innerHTML = '';
                
                let sKey = `${solar.getDay().toString().padStart(2,'0')}/${solar.getMonth().toString().padStart(2,'0')}`;
                let lKey = `${lunar.getDay().toString().padStart(2,'0')}/${lunar.getMonth().toString().padStart(2,'0')}`;
                
                let todaysEvents = [];
                if(evSolar[sKey]) todaysEvents = todaysEvents.concat(evSolar[sKey]);
                if(evLunar[lKey]) todaysEvents = todaysEvents.concat(evLunar[lKey].map(e => e + ' (Âm lịch)'));

                if(todaysEvents.length === 0) {
                    evContainer.innerHTML = '<div class="text-sm text-slate-400 italic">Hôm nay không có sự kiện đặc biệt nào.</div>';
                } else {
                    todaysEvents.forEach(e => {
                        evContainer.innerHTML += `
                            <div class="bg-rose-50/60 p-3 rounded-xl border border-rose-100 flex gap-3 items-start">
                                <span class="text-rose-500 mt-0.5">🌟</span>
                                <span class="font-bold text-gray-700 text-sm leading-snug">${e}</span>
                            </div>
                        `;
                    });
                }
            };

            // Xử lý khi nhấn nút Tra Cứu
            document.getElementById('btn-lookup').onclick = () => {
                if(lastEdited === 'solar') {
                    let d = parseInt(sD.value), m = parseInt(sM.value), y = parseInt(sY.value);
                    if(!d || !m || !y) return alert("Vui lòng nhập đủ thông tin Dương Lịch!");
                    
                    try {
                        const solar = Solar.fromYmd(y, m, d);
                        const lunar = solar.getLunar();
                        
                        lD.value = lunar.getDay().toString().padStart(2, '0');
                        lM.value = lunar.getMonth().toString().padStart(2, '0');
                        lY.value = lunar.getYear();
                        
                        renderWidget(solar, lunar);
                    } catch(e) { alert("Ngày Dương Lịch không hợp lệ!"); }
                    
                } else {
                    let d = parseInt(lD.value), m = parseInt(lM.value), y = parseInt(lY.value);
                    if(!d || !m || !y) return alert("Vui lòng nhập đủ thông tin Âm Lịch!");
                    
                    try {
                        const lunar = Lunar.fromYmd(y, m, d);
                        const solar = lunar.getSolar();
                        
                        sD.value = solar.getDay().toString().padStart(2, '0');
                        sM.value = solar.getMonth().toString().padStart(2, '0');
                        sY.value = solar.getYear();
                        
                        renderWidget(solar, lunar);
                    } catch(e) { alert("Ngày Âm Lịch không hợp lệ (Ví dụ: Tháng đó chỉ có 29 ngày)!"); }
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
