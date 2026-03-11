// --- 9. Tool Lịch Vạn Niên (Bản Chuẩn Định Dạng - An toàn tuyệt đối) ---
registerTool({
    id: 'tab-calendar',
    name: 'Lịch Vạn Niên',
    icon: '📆',
    html: `
        <div class="text-center mb-6">
            <span class="bg-[#eaf0f6] text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">Tra Cứu</span>
            <h2 class="text-3xl font-bold mt-2 text-slate-800">Lịch <span class="text-orange-500">Vạn Niên</span></h2>
        </div>

        <div class="max-w-md mx-auto space-y-5 pb-10">

            <div id="cal-loading" class="text-center py-10 text-slate-400 font-bold animate-pulse">
                Đang kết nối dữ liệu Thiên Văn... ⏳
            </div>

            <div id="cal-widget" class="hidden space-y-5">
                
                <div class="bg-[#e3eaf1] rounded-[2rem] p-6 shadow-sm border border-white relative overflow-hidden">
                    <div class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1" id="res-weekday">THỨ ...</div>
                    
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="text-6xl md:text-7xl font-black text-slate-800 tracking-tighter leading-none mb-2" id="res-main-d">--</div>
                            <div class="text-lg font-bold text-slate-600 mt-2" id="res-main-my">Tháng --, ----</div>
                            
                            <div class="text-sm font-medium text-slate-600 mt-3 flex items-center gap-2">
                                <span class="bg-slate-200/80 text-slate-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-300/50">Âm Lịch</span>
                                <span id="res-sub-date" class="font-bold">--/--/----</span>
                            </div>
                        </div>

                        <div class="text-center pt-2 relative z-10">
                            <div class="w-12 h-12 rounded-full bg-orange-400 mx-auto relative overflow-hidden shadow-sm border border-orange-300">
                                <div id="moon-shadow" class="absolute inset-0 bg-[#e3eaf1] rounded-full w-full h-full transition-transform duration-500"></div>
                            </div>
                            <div class="text-[10px] font-bold text-slate-500 mt-2 uppercase" id="res-moon-text">Trăng...</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
                    
                    <div class="text-center w-full pb-3 border-b border-slate-100">
                        <div id="live-clock" class="text-3xl font-black text-slate-700 font-mono tracking-tight">00:00:00</div>
                        <div id="live-date" class="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">Đang tải...</div>
                    </div>

                    <div class="flex bg-slate-100 p-1 rounded-xl w-full">
                        <button id="cal-mode-solar" class="flex-1 py-2 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition">Dương Lịch</button>
                        <button id="cal-mode-lunar" class="flex-1 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition">Âm Lịch</button>
                    </div>

                    <div class="flex justify-center items-center gap-2 w-full">
                        <div class="flex-1">
                            <label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block text-center">Ngày</label>
                            <select id="sel-d" style="text-align-last: center; direction: ltr;" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 appearance-none cursor-pointer"></select>
                        </div>
                        <span class="text-slate-300 font-black mt-4">/</span>
                        <div class="flex-1">
                            <label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block text-center">Tháng</label>
                            <select id="sel-m" style="text-align-last: center; direction: ltr;" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 appearance-none cursor-pointer"></select>
                        </div>
                        <span class="text-slate-300 font-black mt-4">/</span>
                        <div class="flex-1">
                            <label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block text-center">Năm</label>
                            <select id="sel-y" style="text-align-last: center; direction: ltr;" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 appearance-none cursor-pointer"></select>
                        </div>
                    </div>

                    <button id="btn-lookup" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-sm mt-1">
                        🔍 TRA CỨU
                    </button>
                </div>

                <div class="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100">
                    <div class="text-center font-bold text-slate-700 mb-4 tracking-wider uppercase" id="cal-month-title">THÁNG -- LỊCH DƯƠNG</div>
                    
                    <div class="grid grid-cols-7 gap-1 text-center mb-2 pb-2 border-b border-slate-100">
                        <div class="text-[10px] font-bold text-slate-400">T2</div>
                        <div class="text-[10px] font-bold text-slate-400">T3</div>
                        <div class="text-[10px] font-bold text-slate-400">T4</div>
                        <div class="text-[10px] font-bold text-slate-400">T5</div>
                        <div class="text-[10px] font-bold text-slate-400">T6</div>
                        <div class="text-[10px] font-bold text-orange-400">T7</div>
                        <div class="text-[10px] font-bold text-orange-500">CN</div>
                    </div>
                    
                    <div id="cal-grid" class="grid grid-cols-7 gap-1 text-center"></div>
                </div>

                <div class="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3 pb-2 border-b border-slate-50">
                        <span>🇻🇳</span> Sự Kiện & Lễ Hội Việt Nam
                    </h3>
                    <div id="res-events" class="space-y-2 mt-2"></div>
                </div>

            </div>
        </div>
    `,
    logic: function() {
        var loading = document.getElementById('cal-loading');
        var widget = document.getElementById('cal-widget');
        
        var clockEl = document.getElementById('live-clock');
        var dateEl = document.getElementById('live-date');
        var wdNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        
        setInterval(function() {
            var now = new Date();
            var h = ('0' + now.getHours()).slice(-2);
            var m = ('0' + now.getMinutes()).slice(-2);
            var s = ('0' + now.getSeconds()).slice(-2);
            var d = ('0' + now.getDate()).slice(-2);
            var mo = ('0' + (now.getMonth() + 1)).slice(-2);
            var y = now.getFullYear();
            
            clockEl.innerText = h + ':' + m + ':' + s;
            dateEl.innerText = wdNames[now.getDay()] + ', ' + d + '/' + mo + '/' + y;
        }, 1000);

        var evSolar = {
            "01/01": ["Tết Dương Lịch"],
            "09/01": ["Ngày Học sinh, Sinh viên Việt Nam (1950)"],
            "03/02": ["Thành lập Đảng Cộng sản Việt Nam (1930)"],
            "09/02": ["Ngày sinh Tổng Bí thư Trường Chinh (1907)"],
            "27/02": ["Ngày Thầy thuốc Việt Nam (1955)"],
            "01/03": ["Ngày sinh Thủ tướng Phạm Văn Đồng (1906)"],
            "08/03": ["Ngày Quốc tế Phụ nữ"],
            "24/03": ["Ngày truyền thống Bộ đội Biên phòng (1959)"],
            "26/03": ["Thành lập Đoàn TNCS Hồ Chí Minh (1931)"],
            "30/03": ["Ngày mất Chủ tịch Tôn Đức Thắng (1980)"],
            "07/04": ["Ngày sinh Tổng Bí thư Lê Duẩn (1907)"],
            "14/04": ["Ngày sinh Tổng Bí thư Nguyễn Phú Trọng (1944)"],
            "21/04": ["Ngày Sách và Văn hóa đọc Việt Nam (2014)"],
            "27/04": ["Ngày mất Tổng Bí thư Nguyễn Văn Linh (1998)"],
            "29/04": ["Ngày mất Thủ tướng Phạm Văn Đồng (2000)"],
            "30/04": ["Ngày Giải phóng Miền Nam (1975)"],
            "01/05": ["Quốc tế Lao động", "Ngày sinh TBT Trần Phú (1904)"],
            "07/05": ["Chiến thắng Điện Biên Phủ (1954)"],
            "15/05": ["Thành lập Đội TNTP Hồ Chí Minh (1941)"],
            "19/05": ["Ngày sinh Chủ tịch Hồ Chí Minh (1890)"],
            "01/06": ["Quốc tế Thiếu nhi"],
            "11/06": ["Ngày mất Thủ tướng Võ Văn Kiệt (2008)"],
            "14/06": ["Ngày Thế giới tôn vinh người hiến máu"],
            "21/06": ["Ngày Báo chí Cách mạng Việt Nam (1925)"],
            "28/06": ["Ngày Gia đình Việt Nam"],
            "01/07": ["Ngày sinh Tổng Bí thư Nguyễn Văn Linh (1915)"],
            "10/07": ["Ngày mất Tổng Bí thư Lê Duẩn (1986)"],
            "19/07": ["Ngày mất Tổng Bí thư Nguyễn Phú Trọng (2024)"],
            "27/07": ["Ngày Thương binh - Liệt sĩ (1947)"],
            "28/07": ["Ngày thành lập Công đoàn Việt Nam (1929)"],
            "19/08": ["Cách mạng tháng Tám (1945)", "Thành lập Công an Nhân dân (1945)"],
            "20/08": ["Ngày sinh Chủ tịch Tôn Đức Thắng (1888)"],
            "25/08": ["Ngày sinh Đại tướng Võ Nguyên Giáp (1911)"],
            "02/09": ["Quốc khánh Việt Nam (1945)", "Ngày mất Chủ tịch Hồ Chí Minh (1969)"],
            "06/09": ["Ngày sinh TBT Lê Hồng Phong (1902)", "Ngày mất TBT Trần Phú (1931)"],
            "30/09": ["Ngày mất Tổng Bí thư Trường Chinh (1988)"],
            "01/10": ["Ngày Quốc tế Người cao tuổi"],
            "04/10": ["Ngày mất Đại tướng Võ Nguyên Giáp (2013)"],
            "10/10": ["Ngày Giải phóng Thủ đô (1954)"],
            "13/10": ["Ngày Doanh nhân Việt Nam (2004)"],
            "14/10": ["Ngày thành lập Hội Nông dân Việt Nam (1930)"],
            "15/10": ["Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam (1956)"],
            "20/10": ["Thành lập Hội LHPN Việt Nam (1930)"],
            "09/11": ["Ngày Pháp luật Việt Nam (2013)"],
            "18/11": ["Ngày truyền thống Mặt trận Tổ quốc Việt Nam (1930)", "Ngày Đại đoàn kết toàn dân tộc"],
            "20/11": ["Ngày Nhà giáo Việt Nam (1982)"],
            "23/11": ["Ngày sinh TT Võ Văn Kiệt (1922)", "Ngày Khởi nghĩa Nam Kỳ (1940)"],
            "19/12": ["Ngày Toàn quốc kháng chiến (1946)"],
            "22/12": ["Thành lập Quân đội Nhân dân Việt Nam (1944)"]
        };
        
        var evLunar = {
            "01/01": ["Tết Nguyên Đán (Mùng 1)"], "02/01": ["Mùng 2 Tết"], "03/01": ["Mùng 3 Tết"],
            "15/01": ["Tết Nguyên Tiêu"], "10/03": ["Giỗ Tổ Hùng Vương"],
            "15/04": ["Lễ Phật Đản"], "05/05": ["Tết Đoan Ngọ"],
            "15/07": ["Lễ Vu Lan"], "15/08": ["Tết Trung Thu"],
            "23/12": ["Đưa Ông Táo về trời"], "30/12": ["Lễ Giao Thừa"], "29/12": ["Lễ Giao Thừa (Tháng thiếu)"]
        };
        var initTool = function() {
            loading.classList.add('hidden');
            widget.classList.remove('hidden');

            var btnS = document.getElementById('cal-mode-solar');
            var btnL = document.getElementById('cal-mode-lunar');
            var selD = document.getElementById('sel-d');
            var selM = document.getElementById('sel-m');
            var selY = document.getElementById('sel-y');
            
            var isSolarMode = true;

            var updateDays = function() {
                var currentD = parseInt(selD.value) || new Date().getDate();
                var m = parseInt(selM.value) || (new Date().getMonth() + 1);
                var y = parseInt(selY.value) || new Date().getFullYear();
                
                var maxD = isSolarMode ? new Date(y, m, 0).getDate() : 30; 
                if(currentD > maxD) currentD = maxD;

                var dOpts = ''; 
                for(var i = 1; i <= maxD; i++) {
                    dOpts += '<option value="' + i + '" ' + (i === currentD ? 'selected' : '') + '>' + i + '</option>';
                }
                selD.innerHTML = dOpts;
            };

            var mOpts = ''; 
            for(var i = 1; i <= 12; i++) mOpts += '<option value="' + i + '">' + i + '</option>'; 
            selM.innerHTML = mOpts;
            
            var yOpts = ''; 
            var curY = new Date().getFullYear();
            for(var i = curY - 100; i <= curY + 50; i++) yOpts += '<option value="' + i + '">' + i + '</option>'; 
            selY.innerHTML = yOpts;

            selM.addEventListener('change', updateDays);
            selY.addEventListener('change', updateDays);

            selM.value = new Date().getMonth() + 1;
            selY.value = curY;
            updateDays();
            selD.value = new Date().getDate();

            btnL.onclick = function() {
                if(!isSolarMode) return;
                var d = parseInt(selD.value), m = parseInt(selM.value), y = parseInt(selY.value);
                try {
                    var solar = Solar.fromYmd(y, m, d);
                    var lunar = solar.getLunar();
                    isSolarMode = false;
                    selY.value = lunar.getYear();
                    selM.value = Math.abs(lunar.getMonth());
                    updateDays();
                    selD.value = lunar.getDay();
                } catch(e) {}
                
                btnL.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition';
                btnS.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition';
                document.getElementById('btn-lookup').click();
            };

            btnS.onclick = function() {
                if(isSolarMode) return;
                var d = parseInt(selD.value), m = parseInt(selM.value), y = parseInt(selY.value);
                try {
                    var lunar = Lunar.fromYmd(y, m, d);
                    var solar = lunar.getSolar();
                    isSolarMode = true;
                    selY.value = solar.getYear();
                    selM.value = solar.getMonth();
                    updateDays();
                    selD.value = solar.getDay();
                } catch(e) {}
                
                btnS.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition';
                btnL.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition';
                document.getElementById('btn-lookup').click();
            };

            var CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
            var CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

            var renderMonthGrid = function(targetSolar) {
                var y = targetSolar.getYear();
                var m = targetSolar.getMonth();
                var d = targetSolar.getDay();

                document.getElementById('cal-month-title').innerText = 'THÁNG ' + m + ' - ' + y;

                var firstDay = Solar.fromYmd(y, m, 1);
                var startWeekDay = firstDay.getWeek(); 
                var offset = (startWeekDay === 0) ? 6 : (startWeekDay - 1); 

                var daysInMonth = new Date(y, m, 0).getDate();

                var gridHtml = '';
                for(var i = 0; i < offset; i++) {
                    gridHtml += '<div></div>';
                }

                for(var i = 1; i <= daysInMonth; i++) {
                    var s = Solar.fromYmd(y, m, i);
                    var l = s.getLunar();
                    var lDay = l.getDay();
                    var lMonth = Math.abs(l.getMonth());
                    
                    var lText = (lDay === 1) ? (lDay + '/' + lMonth) : lDay;
                    var isSelected = (i === d);
                    var isWeekend = (s.getWeek() === 0 || s.getWeek() === 6);
                    
                    var bgClass = isSelected ? 'bg-orange-100 border border-orange-200 shadow-sm' : 'border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800';
                    var sColor = isWeekend ? 'text-orange-500' : 'text-slate-700';
                    if (isSelected) sColor = 'text-orange-600';

                    gridHtml += '<div class="cal-cell flex flex-col items-center justify-center py-1.5 rounded-xl cursor-pointer transition ' + bgClass + '" data-d="' + i + '" data-m="' + m + '" data-y="' + y + '">';
                    gridHtml += '<span class="text-sm font-bold ' + sColor + '">' + i + '</span>';
                    gridHtml += '<span class="text-[9px] text-slate-400">' + lText + '</span>';
                    gridHtml += '</div>';
                }
                document.getElementById('cal-grid').innerHTML = gridHtml;
            };

            var renderWidget = function(solar, lunar) {
                var sDayStr = ('0' + solar.getDay()).slice(-2);
                var sMonthStr = ('0' + solar.getMonth()).slice(-2);
                var sYear = solar.getYear();
                
                var lDayStr = ('0' + lunar.getDay()).slice(-2);
                var lMonthAbs = Math.abs(lunar.getMonth());
                var lMonthStr = ('0' + lMonthAbs).slice(-2);
                
                var lYearText = CAN[lunar.getYearGanIndex()] + ' ' + CHI[lunar.getYearZhiIndex()];
                if (lunar.getMonth() < 0) lYearText += " (Nhuận)";
                
                // FORMAT: 13/02/2026 Bính Ngọ
                var lunarFullYear = lunar.getYear();
                var lunarFormattedString = lDayStr + "/" + lMonthStr + "/" + lunarFullYear + " " + lYearText;

                document.getElementById('res-weekday').innerText = wdNames[solar.getWeek()];
                document.getElementById('res-main-d').innerText = solar.getDay();
                document.getElementById('res-main-my').innerText = "Tháng " + solar.getMonth() + ", " + sYear;
                document.getElementById('res-sub-date').innerText = lunarFormattedString;

                var phaseText = 'Trăng khuyết';
                var shadowTranslate = '100%'; 

                if (lunar.getDay() === 1 || lunar.getDay() >= 29) { phaseText = 'Trăng non'; shadowTranslate = '0%'; } 
                else if (lunar.getDay() > 1 && lunar.getDay() < 15) { phaseText = 'Thượng huyền'; shadowTranslate = ((lunar.getDay()/15)*100) + '%'; }
                else if (lunar.getDay() === 15 || lunar.getDay() === 16) { phaseText = 'Trăng tròn'; shadowTranslate = '100%'; } 
                else if (lunar.getDay() > 16 && lunar.getDay() < 29) { phaseText = 'Hạ huyền'; shadowTranslate = '-' + (((lunar.getDay()-15)/15)*100) + '%'; }

                document.getElementById('res-moon-text').innerText = phaseText;
                document.getElementById('moon-shadow').style.transform = 'translateX(' + shadowTranslate + ')';

                renderMonthGrid(solar);

                var evContainer = document.getElementById('res-events');
                evContainer.innerHTML = '';
                
                var sKey = sDayStr + '/' + sMonthStr;
                var lKey = lDayStr + '/' + lMonthStr;
                
                var todaysEvents = [];
                if(evSolar[sKey]) todaysEvents = todaysEvents.concat(evSolar[sKey]);
                if(evLunar[lKey]) {
                    var lunarEvents = evLunar[lKey].map(function(e) { return e + ' (Âm lịch)'; });
                    todaysEvents = todaysEvents.concat(lunarEvents);
                }

                if(todaysEvents.length === 0) {
                    evContainer.innerHTML = '<div class="text-xs text-slate-400 italic">Không có dấu ấn lịch sử nào vào ngày này.</div>';
                } else {
                    todaysEvents.forEach(function(e) {
                        evContainer.innerHTML += '<div class="bg-slate-50 p-3 rounded-xl flex gap-3 items-start border border-slate-100 shadow-sm"><span class="text-orange-500 mt-0.5">📌</span><span class="font-bold text-slate-700 text-xs leading-relaxed">' + e + '</span></div>';
                    });
                }
            };

            document.getElementById('cal-grid').addEventListener('click', function(e) {
                var cell = e.target.closest('.cal-cell');
                if(cell) {
                    var d = cell.getAttribute('data-d');
                    var m = cell.getAttribute('data-m');
                    var y = cell.getAttribute('data-y');
                    
                    document.getElementById('cal-mode-solar').click(); 
                    selD.value = d;
                    selM.value = m;
                    selY.value = y;
                    document.getElementById('btn-lookup').click();
                }
            });

            document.getElementById('btn-lookup').onclick = function() {
                var d = parseInt(selD.value), m = parseInt(selM.value), y = parseInt(selY.value);
                try {
                    if(isSolarMode) {
                        var solar = Solar.fromYmd(y, m, d);
                        var lunar = solar.getLunar();
                        renderWidget(solar, lunar);
                    } else {
                        var lunar;
                        try { 
                            lunar = Lunar.fromYmd(y, m, d); 
                        } catch(e) { 
                            lunar = Lunar.fromYmd(y, m, d-1); 
                            selD.value = d - 1; 
                        }
                        var solar = lunar.getSolar();
                        renderWidget(solar, lunar);
                    }
                } catch(e) { console.error(e); }
            };

            setTimeout(function() { document.getElementById('btn-lookup').click(); }, 200);
        };

        if (typeof Solar !== 'undefined' && typeof Lunar !== 'undefined') {
            initTool();
        } else {
            var script = document.createElement('script');
            script.src = 'https://unpkg.com/lunar-javascript/lunar.js';
            script.onload = function() { initTool(); };
            script.onerror = function() {
                loading.innerHTML = '<span class="text-red-500">Lỗi mạng! Không tải được thư viện tính lịch.</span>';
            };
            document.head.appendChild(script);
        }
    }
});
