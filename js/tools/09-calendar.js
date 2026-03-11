// --- 9. Tool Lịch Vạn Niên ---
registerTool({
    id: 'tab-calendar',
    name: 'Lịch Vạn Niên',
    icon: '🗓️',
    html: `
        <div class="text-center mb-6">
            <span class="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Thời gian</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Lịch <span class="text-indigo-500">Vạn Niên</span> 🗓️</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Tra cứu ngày Âm Dương & Sự kiện lịch sử Việt Nam</p>
        </div>

        <div class="max-w-md mx-auto space-y-6 pb-10">
            
            <div class="glass-card p-4 rounded-2xl shadow-sm border border-indigo-50">
                <div class="flex bg-gray-100 p-1 rounded-xl mb-4">
                    <button id="cal-mode-solar" class="flex-1 py-2 rounded-lg text-sm font-bold bg-white text-indigo-600 shadow-sm transition">Dương sang Âm</button>
                    <button id="cal-mode-lunar" class="flex-1 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-indigo-500 transition">Âm sang Dương</button>
                </div>
                
                <div id="cal-input-solar" class="block">
                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Chọn ngày Dương Lịch</label>
                    <input type="date" id="inp-solar-date" class="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 outline-none focus:ring-2 ring-indigo-200 text-indigo-700 font-bold font-mono">
                </div>

                <div id="cal-input-lunar" class="hidden grid grid-cols-3 gap-2">
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Ngày Âm</label>
                        <input type="number" id="inp-lunar-d" min="1" max="30" class="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 outline-none text-center focus:ring-2 ring-indigo-200 text-indigo-700 font-bold" placeholder="DD">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Tháng Âm</label>
                        <input type="number" id="inp-lunar-m" min="1" max="12" class="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 outline-none text-center focus:ring-2 ring-indigo-200 text-indigo-700 font-bold" placeholder="MM">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-1 mb-1 block">Năm Âm</label>
                        <input type="number" id="inp-lunar-y" class="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 outline-none text-center focus:ring-2 ring-indigo-200 text-indigo-700 font-bold" placeholder="YYYY">
                    </div>
                </div>
            </div>

            <div id="cal-loading" class="text-center py-10 text-indigo-400 font-bold animate-pulse">
                Đang nạp dữ liệu Thiên Văn... 🌌
            </div>

            <div id="cal-widget" class="hidden space-y-3">
                
                <div class="bg-gradient-to-br from-[#eef2f6] to-[#e2e8f0] p-6 rounded-[2rem] shadow-lg relative overflow-hidden border border-white/50">
                    <div class="absolute top-6 right-6 text-center">
                        <div id="w-moon-icon" class="text-4xl drop-shadow-md mb-1">🌖</div>
                        <div id="w-moon-text" class="text-[9px] font-bold text-slate-500">Trăng...</div>
                    </div>
                    
                    <div id="w-weekday" class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1">Thứ ...</div>
                    <div class="flex items-baseline gap-2">
                        <div class="text-5xl font-black text-slate-800 tracking-tighter">Ngày <span id="w-solar-d">--</span></div>
                    </div>
                    <div id="w-lunar-full" class="text-slate-600 font-medium text-lg mt-1">Tháng -- năm -- (Âm)</div>
                    <div id="w-solar-full" class="text-slate-400 text-sm font-medium mt-1">--/--/----</div>

                    <div class="flex gap-2 mt-5">
                        <div class="bg-white/60 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-white/50 flex-1">
                            <span class="text-orange-400 text-lg">☀️</span>
                            <div>
                                <div class="text-[9px] text-slate-400 font-bold uppercase">Tiết khí</div>
                                <div id="w-tietkhi" class="text-xs font-bold text-slate-700">--</div>
                            </div>
                        </div>
                        <div class="bg-white/60 backdrop-blur-md px-3 py-2 rounded-xl flex items-center gap-2 shadow-sm border border-white/50 flex-1">
                            <span class="text-orange-400 text-lg">🕒</span>
                            <div>
                                <div class="text-[9px] text-slate-400 font-bold uppercase">Hoàng đạo</div>
                                <div id="w-hdao-day" class="text-xs font-bold text-slate-700">--</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-[#e2e6eb] p-5 rounded-[2rem] shadow-inner border border-white/30">
                    <div class="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 pl-1">Can Chi & Con Giáp</div>
                    <div class="flex gap-2">
                        <div class="bg-white/40 flex-1 py-3 rounded-xl text-center border border-white/50 shadow-sm">
                            <div class="text-[10px] text-slate-500 font-bold mb-1">Ngày</div>
                            <div id="w-cc-day" class="text-sm font-bold text-slate-800">--</div>
                        </div>
                        <div class="bg-white/40 flex-1 py-3 rounded-xl text-center border border-white/50 shadow-sm">
                            <div class="text-[10px] text-slate-500 font-bold mb-1">Tháng</div>
                            <div id="w-cc-month" class="text-sm font-bold text-slate-800">--</div>
                        </div>
                        <div class="bg-white/40 flex-1 py-3 rounded-xl text-center border border-white/50 shadow-sm">
                            <div class="text-[10px] text-slate-500 font-bold mb-1">Năm</div>
                            <div id="w-cc-year" class="text-sm font-bold text-slate-800">--</div>
                        </div>
                    </div>
                </div>

                <div class="bg-gradient-to-b from-[#fcd3c1] to-[#fce4d6] p-6 rounded-[2rem] shadow-md border border-white/50">
                    <div class="text-[10px] text-orange-800/60 font-bold uppercase tracking-widest mb-4">Giờ Hoàng Đạo & Ngũ Hành</div>
                    
                    <div class="space-y-4">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center text-orange-600 text-sm">🍃</div>
                            <div>
                                <div class="text-[10px] text-orange-800/60 font-bold uppercase">Ngũ hành ngày</div>
                                <div id="w-tv-nguhanh" class="font-bold text-orange-900 text-sm">--</div>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center text-orange-600 text-sm">⚔️</div>
                            <div>
                                <div class="text-[10px] text-orange-800/60 font-bold uppercase">Tuổi xung khắc</div>
                                <div id="w-tv-xung" class="font-bold text-orange-900 text-sm">--</div>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-orange-400/20 flex items-center justify-center text-orange-600 text-sm">🤝</div>
                            <div>
                                <div class="text-[10px] text-orange-800/60 font-bold uppercase">Tam hợp</div>
                                <div id="w-tv-tamhop" class="font-bold text-orange-900 text-sm">--</div>
                            </div>
                        </div>

                        <div class="pt-3 border-t border-orange-900/10">
                            <div class="text-[10px] text-orange-800/60 font-bold uppercase mb-2">Khung giờ đẹp trong ngày</div>
                            <div id="w-tv-hours" class="text-xs font-bold text-orange-900 leading-relaxed">--</div>
                        </div>
                    </div>
                </div>

                <div class="bg-white/80 p-5 rounded-[2rem] shadow-sm border border-indigo-50 mt-4">
                    <div class="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span>🇻🇳</span> Sự Kiện & Lễ Hội
                    </div>
                    <div id="w-events-list" class="space-y-2">
                        </div>
                </div>

            </div>
        </div>
    `,
    logic: function() {
        const loading = document.getElementById('cal-loading');
        const widget = document.getElementById('cal-widget');

        // BỘ TỪ ĐIỂN VIỆT HÓA THUẬT TOÁN
        const CAN = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
        const CHI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
        const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const TIET_KHI = {'DongZhi': 'Đông Chí', 'XiaoHan': 'Lập Xuân', 'DaHan': 'Đại Hàn', 'YuShui': 'Vũ Thủy', 'JingZhe': 'Kinh Trập', 'ChunFen': 'Xuân Phân', 'QingMing': 'Thanh Minh', 'GuYu': 'Cốc Vũ', 'LiXia': 'Lập Hạ', 'XiaoMan': 'Tiểu Mãn', 'MangZhong': 'Mang Chủng', 'XiaZhi': 'Hạ Chí', 'XiaoShu': 'Tiểu Thử', 'DaShu': 'Đại Thử', 'LiQiu': 'Lập Thu', 'ChuShu': 'Xử Thử', 'BaiLu': 'Bạch Lộ', 'QiuFen': 'Thu Phân', 'HanLu': 'Hàn Lộ', 'ShuangJiang': 'Sương Giáng', 'LiDong': 'Lập Đông', 'XiaoXue': 'Tiểu Tuyết', 'DaXue': 'Đại Tuyết'};
        
        // TÍNH NGŨ HÀNH THEO CAN CHI
        const getElement = (canIdx, chiIdx) => {
            const canVal = Math.floor(canIdx / 2) + 1;
            let chiVal = 0;
            if(chiIdx === 0 || chiIdx === 1 || chiIdx === 6 || chiIdx === 7) chiVal = 0;
            else if(chiIdx === 2 || chiIdx === 3 || chiIdx === 8 || chiIdx === 9) chiVal = 1;
            else chiVal = 2;
            let res = canVal + chiVal;
            if(res > 5) res -= 5;
            const elements = {1: 'Kim (Vàng)', 2: 'Thủy (Nước)', 3: 'Hỏa (Lửa)', 4: 'Thổ (Đất)', 5: 'Mộc (Gỗ)'};
            return elements[res];
        };

        // DATABASE SỰ KIỆN VIỆT NAM (Dương Lịch & Âm Lịch) - CẬP NHẬT ĐẦY ĐỦ
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

        // HÀM VẼ GIAO DIỆN TỪ DỮ LIỆU
        const renderData = (solarObj, lunarObj) => {
            // Solar
            const sD = solarObj.getYear();
            const sM = solarObj.getMonth();
            const sDay = solarObj.getDay();
            const weekDay = solarObj.getWeek(); // 0=CN
            
            // Lunar
            const lD = lunarObj.getDay();
            const lM = lunarObj.getMonth();
            const lY = lunarObj.getYear();
            
            // Index Can Chi
            const cY = lunarObj.getYearGanIndex(); const zY = lunarObj.getYearZhiIndex();
            const cM = lunarObj.getMonthGanIndex(); const zM = lunarObj.getMonthZhiIndex();
            const cD = lunarObj.getDayGanIndex(); const zD = lunarObj.getDayZhiIndex();

            // Cập nhật Top Card
            document.getElementById('w-weekday').innerText = WEEKDAYS[weekDay];
            document.getElementById('w-solar-d').innerText = sDay;
            document.getElementById('w-solar-full').innerText = `${sDay.toString().padStart(2,'0')}/${sM.toString().padStart(2,'0')}/${sD}`;
            document.getElementById('w-lunar-full').innerText = `Tháng ${lM} năm ${CAN[cY]} ${CHI[zY]} (Âm)`;
            
            let phase = lD < 15 ? 'Trăng khuyết' : (lD === 15 ? 'Trăng tròn' : 'Trăng tàn');
            let icon = lD < 7 ? '🌒' : (lD < 14 ? '🌓' : (lD <= 16 ? '🌕' : (lD < 23 ? '🌗' : '🌘')));
            if(lD === 1 || lD === 30 || lD === 29) { phase = 'Trăng non'; icon = '🌑'; }
            document.getElementById('w-moon-text').innerText = phase;
            document.getElementById('w-moon-icon').innerText = icon;

            const tk = lunarObj.getJieQi();
            document.getElementById('w-tietkhi').innerText = TIET_KHI[tk] || tk || 'Không rõ';
            document.getElementById('w-hdao-day').innerText = lunarObj.getDayPosition() || 'Hắc đạo';

            // Cập nhật Middle Card
            document.getElementById('w-cc-day').innerText = `${CAN[cD]} ${CHI[zD]}`;
            document.getElementById('w-cc-month').innerText = `${CAN[cM]} ${CHI[zM]}`;
            document.getElementById('w-cc-year').innerText = `${CAN[cY]} ${CHI[zY]}`;

            // Cập nhật Bottom Card (Tử vi)
            document.getElementById('w-tv-nguhanh').innerText = getElement(cD, zD);
            document.getElementById('w-tv-xung').innerText = CHI[(zD + 6) % 12];
            document.getElementById('w-tv-tamhop').innerText = `${CHI[zD]} - ${CHI[(zD + 4) % 12]} - ${CHI[(zD + 8) % 12]}`;
            
            // Giờ Hoàng Đạo
            const hours = lunarObj.getTimeZhiList(); 
            let hStr = hours.map(h => {
                const idx = lunarObj.getTimeZhiIndex(h);
                let startH = (idx * 2 - 1 + 24) % 24;
                let endH = (startH + 2) % 24;
                return `${h} (${startH}h-${endH}h)`;
            }).join(', ');
            document.getElementById('w-tv-hours').innerText = hStr || 'Ngày Hắc đạo, ít giờ tốt';

            // Cập nhật Events
            const evList = document.getElementById('w-events-list');
            evList.innerHTML = '';
            
            let sKey = `${sDay.toString().padStart(2,'0')}/${sM.toString().padStart(2,'0')}`;
            let lKey = `${lD.toString().padStart(2,'0')}/${lM.toString().padStart(2,'0')}`;
            
            let todaysEvents = [];
            if(evSolar[sKey]) todaysEvents = todaysEvents.concat(evSolar[sKey]);
            if(evLunar[lKey]) todaysEvents = todaysEvents.concat(evLunar[lKey].map(e => e + ' (Âm lịch)'));

            if(todaysEvents.length === 0) {
                evList.innerHTML = '<div class="text-xs text-slate-400 italic">Không có sự kiện đặc biệt nào trong ngày này.</div>';
            } else {
                todaysEvents.forEach(e => {
                    evList.innerHTML += `<div class="bg-indigo-50/50 p-2 rounded-lg text-xs font-bold text-indigo-700 border border-indigo-100 flex items-center gap-2"><span>✨</span> ${e}</div>`;
                });
            }
        };

        // --- HỆ THỐNG XỬ LÝ LÕI ---
        const initTool = () => {
            loading.classList.add('hidden');
            widget.classList.remove('hidden');

            const btnS = document.getElementById('cal-mode-solar');
            const btnL = document.getElementById('cal-mode-lunar');
            const inpS = document.getElementById('cal-input-solar');
            const inpL = document.getElementById('cal-input-lunar');
            
            const dpS = document.getElementById('inp-solar-date');
            const dpLd = document.getElementById('inp-lunar-d');
            const dpLm = document.getElementById('inp-lunar-m');
            const dpLy = document.getElementById('inp-lunar-y');

            let isSolarMode = true;

            // Set hôm nay
            const today = new Date();
            // Lấy chuỗi YYYY-MM-DD an toàn theo múi giờ địa phương
            const localDate = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
            dpS.value = localDate;
            
            const calcFromSolar = () => {
                if(!dpS.value) return;
                const [y, m, d] = dpS.value.split('-').map(Number);
                const solar = Solar.fromYmd(y, m, d);
                const lunar = solar.getLunar();
                
                // Update ô nhập Âm lịch cho đồng bộ
                dpLd.value = lunar.getDay();
                dpLm.value = lunar.getMonth();
                dpLy.value = lunar.getYear();
                
                renderData(solar, lunar);
            };

            const calcFromLunar = () => {
                let d = parseInt(dpLd.value);
                let m = parseInt(dpLm.value);
                let y = parseInt(dpLy.value);
                if(!d || !m || !y) return;
                
                try {
                    const lunar = Lunar.fromYmd(y, m, d);
                    const solar = lunar.getSolar();
                    
                    // Update ô nhập Dương lịch
                    dpS.value = `${solar.getYear()}-${solar.getMonth().toString().padStart(2,'0')}-${solar.getDay().toString().padStart(2,'0')}`;
                    
                    renderData(solar, lunar);
                } catch(e) {
                    alert("Ngày Âm lịch không hợp lệ (Có thể tháng đó chỉ có 29 ngày)!");
                }
            };

            btnS.onclick = () => {
                isSolarMode = true;
                btnS.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-indigo-600 shadow-sm transition';
                btnL.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-indigo-500 transition';
                inpS.classList.remove('hidden'); inpL.classList.add('hidden');
            };

            btnL.onclick = () => {
                isSolarMode = false;
                btnL.className = 'flex-1 py-2 rounded-lg text-sm font-bold bg-white text-indigo-600 shadow-sm transition';
                btnS.className = 'flex-1 py-2 rounded-lg text-sm font-bold text-gray-500 hover:text-indigo-500 transition';
                inpL.classList.remove('hidden'); inpS.classList.add('hidden');
                calcFromSolar(); 
            };

            dpS.addEventListener('change', calcFromSolar);
            [dpLd, dpLm, dpLy].forEach(el => el.addEventListener('change', () => {
                if(!isSolarMode) calcFromLunar();
            }));

            // Chạy lần đầu
            calcFromSolar();
        };

        // NẠP THƯ VIỆN THIÊN VĂN TỪ CDN (Lunar-Javascript)
        if (typeof Solar !== 'undefined' && typeof Lunar !== 'undefined') {
            initTool();
        } else {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/lunar-javascript/lunar.min.js';
            script.onload = () => initTool();
            script.onerror = () => {
                loading.innerHTML = '<span class="text-red-500">Lỗi kết nối mạng! Không thể tải dữ liệu Thiên Văn. Vui lòng thử lại sau.</span>';
            };
            document.head.appendChild(script);
        }
    }
});
