// --- 9. Tool Lịch Vạn Niên ---
registerTool({
    id: 'tab-calendar',
    name: 'Lịch Vạn Niên',
    icon: '📆',
    html: `
        <div class="text-center mb-6">
            <span class="bg-[#eaf0f6] text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">Tra Cứu</span>
            <h2 class="text-3xl font-bold mt-2 text-slate-800">Lịch <span class="text-orange-500">Việt Nam</span></h2>
            <p class="text-sm text-gray-500
mt-2 italic">Nhập Dương ra Âm, nhập Âm ra
Dương</p>
        </div>

        <div class="max-w-md mx-auto space-y-6 pb-10">

            <div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
                
                <div class="text-center w-full pb-3 border-b border-slate-100">
                    <div id="live-clock" class="text-3xl font-black text-slate-700 font-mono tracking-tight">00:00:00</div>
                    <div id="live-date" class="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">Đang tải...</div>
                </div>

                <div class="flex bg-slate-100 p-1 rounded-xl w-full">
                    <button id="cal-mode-solar" class="flex-1 py-1.5 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition">Dương Lịch</button>
                    <button id="cal-mode-lunar" class="flex-1 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition">Âm Lịch</button>
                </div>

                <div class="flex justify-center items-center gap-2 w-full">
                    <div class="flex flex-col items-center">
                        <span class="text-[9px] font-bold text-slate-400 uppercase mb-1">Ngày</span>
                        <select id="sel-d" class="w-16 h-10 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold text-slate-700 outline-none focus:ring-2 ring-orange-200 appearance-none"></select>
                    </div>
                    <span class="text-slate-300 font-black mt-4">/</span>
                    <div class="flex flex-col items-center">
                        <span class="text-[9px] font-bold text-slate-400 uppercase mb-1">Tháng</span>
                        <select id="sel-m" class="w-16 h-10 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold text-slate-700 outline-none focus:ring-2 ring-orange-200 appearance-none"></select>
                    </div>
                    <span class="text-slate-300 font-black mt-4">/</span>
                    <div class="flex flex-col items-center">
                        <span class="text-[9px] font-bold text-slate-400 uppercase mb-1">Năm</span>
                        <select id="sel-y" class="w-20 h-10 bg-slate-50 border border-slate-200 rounded-lg text-center font-bold text-slate-700 outline-none focus:ring-2 ring-orange-200 appearance-none"></select>
                    </div>
                </div>

                <button id="btn-lookup" class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-sm">
                    🔍 TRA CỨU
                </button>
            </div>

            <div id="cal-loading" class="text-center py-10 text-slate-400 font-bold animate-pulse">
                Đang kết nối thư viện... ⏳
            </div>

            <div id="cal-widget" class="hidden space-y-4">
                
                <div class="bg-[#e3eaf1] rounded-[2rem] p-6 md:p-8 shadow-sm border border-white relative">
                    <div class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1" id="res-weekday">THỨ ...</div>
                    
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="text-6xl md:text-7xl font-black text-slate-800 tracking-tighter leading-none mb-2" id="res-main-d">Ngày --</div>
                            <div class="text-lg md:text-xl font-bold text-slate-600 mt-2" id="res-main-my">Tháng -- năm --</div>
                            <div class="text-sm font-medium text-slate-500 mt-1" id="res-sub-date">--/--/----</div>
                        </div>

                        <div class="text-center pt-2">
                            <div class="w-12 h-12 rounded-full bg-orange-400 mx-auto relative overflow-hidden shadow-sm border border-orange-300">
                                <div id="moon-shadow" class="absolute inset-0 bg-slate-800/40 rounded-full w-full h-full transition-transform duration-500"></div>
                            </div>
                            <div class="text-[10px] font-bold text-slate-500 mt-2 uppercase" id="res-moon-text">Trăng...</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3 pb-2 border-b border-slate-50">
                        <span>🇻🇳</span> Sự Kiện & Lễ Hội Việt Nam
                    </h3>
                    <div id="res-events" class="space-y-2 mt-2">
                        </div>
                </div>

            </div>
        </div>
    `,
    logic: function() {
        const loading = document.getElementById('cal-loading');
        const widget = document.getElementById('cal-widget');
        
        // --- 1. ĐỒNG HỒ ---
        const clockEl = document.getElementById('live-clock');
        const dateEl = document.getElementById('live-date');
        const wdNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        
        setInterval(() => {
            const now = new Date();
            clockEl.innerText = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
            dateEl.innerText = `${wdNames[now.getDay()]}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        }, 1000);

        // --- 2. CƠ SỞ DỮ LIỆU SỰ KIỆN (CHUẨN XÁC) ---
        const evSolar = {
            "01/01": ["Tết Dương Lịch"],
            "09/01": ["Ngày Học sinh, Sinh viên Việt Nam (1950)"],
            "03/02": ["Thành lập Đảng Cộng sản Việt Nam (1930)"],
            "09/02": ["Ngày sinh Tổng Bí thư Trường Chinh (1907)"],
            "27/02": ["Ngày Thầy thuốc Việt Nam (1955)"],
            "01/03": ["Ngày sinh Thủ tướng Phạm Văn Đồng (1906)"],
            "08/03": ["Ngày Quốc tế Phụ nữ"],
            "26/03": ["Thành lập Đoàn TNCS Hồ Chí Minh (1931)"],
            "30/03": ["Ngày mất Chủ tịch Tôn Đức Thắng (1980)"],
            "07/04": ["Ngày sinh Tổng Bí thư Lê Duẩn (1907)"],
            "14/04": ["Ngày sinh Tổng Bí thư Nguyễn Phú Trọng (1944)"],
            "27/04": ["Ngày mất Tổng Bí thư Nguyễn Văn Linh (1998)"],
            "29/04": ["Ngày mất Thủ tướng Phạm Văn Đồng (2000)"],
            "30/04": ["Ngày Giải phóng Miền Nam, thống nhất đất nước (1975)"],
            "01/05": ["Quốc tế Lao động", "Ngày sinh Tổng Bí thư Trần Phú (1904)"],
            "07/05": ["Chiến thắng Điện Biên Phủ (1954)"],
            "15/05": ["Thành lập Đội TNTP Hồ Chí Minh (1941)"],
            "19/05": ["Ngày sinh Chủ tịch Hồ Chí Minh (1890)"],
            "01/06": ["Quốc tế Thiếu nhi"],
            "11/06": ["Ngày mất Thủ tướng Võ Văn Kiệt (2008)"],
            "21/06": ["Ngày Báo chí Cách mạng Việt Nam (1925)"],
            "28/06": ["Ngày Gia đình Việt Nam"],
            "01/07": ["Ngày sinh Tổng Bí thư Nguyễn Văn Linh (1915)"],
            "10/07": ["Ngày mất Tổng Bí thư Lê Duẩn (1986)"],
            "19/07": ["Ngày mất Tổng Bí thư Nguyễn Phú Trọng (2024)"],
            "27/07": ["Ngày Thương binh - Liệt sĩ (1947)"],
            "19/08": ["Cách mạng tháng Tám (1945)", "Ngày truyền thống Công an Nhân dân (1945)"],
            "20/08": ["Ngày sinh Chủ tịch Tôn Đức Thắng (1888)"],
            "25/08": ["Ngày sinh Đại tướng Võ Nguyên Giáp (1911)"],
            "02/09": ["Quốc khánh nước CHXHCN Việt Nam (1945)", "Ngày mất Chủ tịch Hồ Chí Minh (1969)"],
            "06/09": ["Ngày sinh TBT Lê Hồng Phong (1902)", "Ngày mất TBT Trần Phú (1931)", "Ngày mất TBT Lê Hồng Phong (1942)"],
            "30/09": ["Ngày mất Tổng Bí thư Trường Chinh (1988)"],
            "04/10": ["Ngày mất Đại tướng Võ Nguyên Giáp (2013)"],
            "10/10": ["Ngày Giải phóng Thủ đô (1954)"],
            "20/10": ["Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam (1930)"],
            "20/11": ["Ngày Nhà giáo Việt Nam (1982)"],
            "23/11": ["Ngày sinh Thủ tướng Võ Văn Kiệt (1922)", "Ngày Khởi nghĩa Nam Kỳ (1940)"],
            "22/12": ["Thành lập Quân đội Nhân dân Việt Nam (1944)"]
        };
        const evLunar = {
            "01/01": ["Tết Nguyên Đán (Mùng 1)"], "02/01": ["Mùng 2 Tết"], "03/01": ["Mùng 3 Tết"],
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
            const updateDays = () => {
                let currentD = parseInt(selD.value) || new Date().getDate();
                let m = parseInt(selM.value) || (new Date().getMonth() + 1);
                let y = parseInt(selY.value) || new Date().getFullYear();
                
                let maxD = isSolarMode ? new Date(y, m, 0).getDate() : 30; 
                if(currentD > maxD) currentD = maxD;

                let dOpts = ''; 
                for(let i=1; i<=maxD; i++) {
                    dOpts += \`<option value="\${i}" \${i===currentD ? 'selected':''}>\${i}</option>\`;
                }
                selD.innerHTML = dOpts;
            };

            let mOpts = ''; for(let i=1; i<=12; i++) mOpts += \`<option value="\${i}">\${i}</option>\`; selM.innerHTML = mOpts;
            let yOpts = ''; const curY = new Date().getFullYear();
            for(let i=curY-100; i<=curY+50; i++) yOpts += \`<option value="\${i}">\${i}</option>\`; selY.innerHTML = yOpts;

            // Lắng nghe đổi tháng/năm để cập nhật số ngày
            selM.addEventListener('change', updateDays);
            selY.addEventListener('change', updateDays);

            // Set Mặc định Hôm nay
            selM.value = new Date().getMonth() + 1;
            selY.value = curY;
            updateDays();
            selD.value = new Date().getDate();

            // Chuyển Mode
            btnS.onclick = () => {
                isSolarMode = true;
                btnS.className = 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-white text-orange-500 shadow-sm transition';
                btnL.className = 'flex-1 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-orange-500 transition';
                updateDays();
            };
            btnL.onclick = () => {
                isSolarMode = false;
                btnL.className = 'flex-1 py-1.5 rounded-lg text-xs font-bold bg-white text-orange-500 shadow-sm transition';
                btnS.className = 'flex-1 py-1.5 rounded-lg text-xs font-bold text-slate-500 hover:text-orange-500 transition';
                updateDays();
            };

            const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
            const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

            const renderWidget = (solar, lunar) => {
                const sDay = solar.getDay().toString().padStart(2, '0');
                const sMonth = solar.getMonth().toString().padStart(2, '0');
                const sYear = solar.getYear();
                
                const lDay = lunar.getDay();
                const lMonthAbs = Math.abs(lunar.getMonth());
                
                let lYearText = CAN[lunar.getYearGanIndex()] + ' ' + CHI[lunar.getYearZhiIndex()];
                if (lunar.getMonth() < 0) lYearText += " (Nhuận)"; // Đã bỏ hàm getLeap() gây lỗi

                // GIAO DIỆN APPLE WIDGET: Âm lịch hiện to, Dương lịch hiện nhỏ ở dưới
                document.getElementById('res-weekday').innerText = wdNames[solar.getWeek()];
                document.getElementById('res-main-d').innerText = "Ngày " + lDay;
                document.getElementById('res-main-my').innerText = \`Tháng \${lMonthAbs} năm \${lYearText}\`;
                document.getElementById('res-sub-date').innerText = \`Dương Lịch: \${sDay}/\${sMonth}/\${sYear}\`;

                // Tính pha Mặt Trăng & Vẽ Bóng (Shadow)
                let phaseText = 'Trăng khuyết';
                let shadowTranslate = '100%'; // Full moon (Mặc định không có bóng)

                if (lDay === 1 || lDay >= 29) { phaseText = 'Trăng non'; shadowTranslate = '0%'; } // Tối thui
                else if (lDay > 1 && lDay < 15) { phaseText = 'Trăng thượng huyền'; shadowTranslate = \`\${(lDay/15)*100}%\`; }
                else if (lDay === 15 || lDay === 16) { phaseText = 'Trăng tròn'; shadowTranslate = '100%'; } // Sáng 100%
                else if (lDay > 16 && lDay < 29) { phaseText = 'Trăng hạ huyền'; shadowTranslate = \`-\${((lDay-15)/15)*100}%\`; }

                document.getElementById('res-moon-text').innerText = phaseText;
                document.getElementById('moon-shadow').style.transform = \`translateX(\${shadowTranslate})\`;

                // Cập nhật Sự Kiện
                const evContainer = document.getElementById('res-events');
                evContainer.innerHTML = '';
                
                let sKey = \`\${sDay}/\${sMonth}\`;
                let lKey = \`\${lDay.toString().padStart(2, '0')}/\${lMonthAbs.toString().padStart(2, '0')}\`;
                
                let todaysEvents = [];
                if(evSolar[sKey]) todaysEvents = todaysEvents.concat(evSolar[sKey]);
                if(evLunar[lKey]) todaysEvents = todaysEvents.concat(evLunar[lKey].map(e => e + ' (Âm lịch)'));

                if(todaysEvents.length === 0) {
                    evContainer.innerHTML = '<div class="text-xs text-slate-400 italic">Không có dấu ấn lịch sử nào vào ngày này.</div>';
                } else {
                    todaysEvents.forEach(e => {
                        evContainer.innerHTML += \`
                            <div class="bg-blue-50/50 p-3 rounded-xl flex gap-3 items-start border border-blue-100">
                                <span class="text-orange-500 mt-0.5">📌</span>
                                <span class="font-bold text-slate-700 text-xs leading-relaxed">\${e}</span>
                            </div>
                        \`;
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
                        let lunar;
                        try { 
                            lunar = Lunar.fromYmd(y, m, d); 
                        } catch(e) { 
                            // Nếu chọn Âm lịch ngày 30 nhưng tháng đó chỉ có 29 ngày, tự động lùi về ngày 29
                            lunar = Lunar.fromYmd(y, m, d-1); 
                            alert("Tháng Âm lịch này chỉ có 29 ngày! Hệ thống tự động điều chỉnh về ngày cuối tháng.");
                        }
                        const solar = lunar.getSolar();
                        renderWidget(solar, lunar);
                    }
                } catch(e) {
                    console.error(e);
                }
            };

            // Ép chạy lần đầu
            setTimeout(() => document.getElementById('btn-lookup').click(), 200);
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
