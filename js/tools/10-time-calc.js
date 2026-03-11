// --- 10. Tool Tính Số Ngày ---
registerTool({
    id: 'tab-time-calc',
    name: 'Tính Số Ngày',
    icon: '⏳',
    html: `
        <style>
            /* Hỗ trợ Dark Mode cho Tool 10 */
            body.dark-mode .tc-card {
                background-image: linear-gradient(to bottom right, #1e293b, #0f172a) !important;
                border-color: #334155 !important;
            }
            body.dark-mode .tc-inner-card {
                background-color: rgba(15, 23, 42, 0.6) !important;
                border-color: rgba(45, 212, 191, 0.2) !important; /* Viền Teal mờ trong dark mode */
            }
            body.dark-mode .tc-history-item {
                background-color: rgba(30, 41, 59, 0.8) !important;
                border-color: rgba(255, 255, 255, 0.05) !important;
            }
        </style>

        <div class="text-center mb-6">
            <span class="bg-teal-100 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-teal-200">Công thức</span>
            <h2 class="text-3xl font-bold mt-2 text-slate-800">Khoảng Cách <span class="text-teal-500">Thời Gian</span> ⏳</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Tính toán theo quy ước (1 tháng = 30 ngày)</p>
        </div>

        <div class="max-w-md mx-auto space-y-5 pb-10">
            
            <div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 space-y-5">
                
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Từ ngày (Bắt đầu)</label>
                    <div class="flex justify-center items-center gap-2 w-full">
                        <select id="tc-start-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>
                        <span class="text-slate-300 font-black">/</span>
                        <select id="tc-start-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>
                        <span class="text-slate-300 font-black">/</span>
                        <select id="tc-start-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>
                    </div>
                </div>
                
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Đến ngày (Kết thúc)</label>
                    <div class="flex justify-center items-center gap-2 w-full">
                        <select id="tc-end-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>
                        <span class="text-slate-300 font-black">/</span>
                        <select id="tc-end-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>
                        <span class="text-slate-300 font-black">/</span>
                        <select id="tc-end-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>
                    </div>
                </div>

                <button id="tc-btn-calc" class="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-sm mt-2">
                    🧮 KẾT QUẢ
                </button>
            </div>

            <div id="tc-result" class="hidden space-y-4">
                <div class="tc-card bg-[#e0f2fe] rounded-[2rem] p-6 md:p-8 shadow-sm border border-white relative overflow-hidden">
                    
                    <div class="text-teal-600 font-bold text-xs tracking-widest uppercase mb-4 border-b border-teal-200/50 pb-2">KẾT QUẢ QUY ĐỔI</div>

                    <div class="space-y-3">
                        <div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-teal-200 shadow-sm flex flex-col">
                            <span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Chuẩn Năm - Tháng - Ngày</span>
                            <span class="text-xl font-black text-slate-800" id="tc-res-1">--</span>
                        </div>

                        <div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-teal-200 shadow-sm flex flex-col">
                            <span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Quý (1 Quý = 3 Tháng)</span>
                            <span class="text-lg font-bold text-slate-700" id="tc-res-2">--</span>
                        </div>

                        <div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-teal-200 shadow-sm flex flex-col">
                            <span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Tháng</span>
                            <span class="text-lg font-bold text-slate-700" id="tc-res-3">--</span>
                        </div>

                        <div class="tc-inner-card bg-teal-500 p-4 rounded-2xl border border-teal-600 shadow-md flex flex-col">
                            <span class="text-[9px] text-teal-100 font-bold uppercase tracking-wider mb-1">Tổng Ngày Tuyệt Đối</span>
                            <span class="text-2xl font-black text-white" id="tc-res-4">--</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-white/90 backdrop-blur-md p-5 rounded-[2rem] shadow-sm border border-slate-100">
                <div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                    <h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span>📚</span> Lịch sử tính toán
                    </h3>
                    <button id="tc-btn-clear" class="text-[9px] bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition shadow-sm border border-red-100">
                        XÓA LỊCH SỬ
                    </button>
                </div>
                <div id="tc-history-list" class="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                    </div>
            </div>

        </div>
    `,
    logic: function() {
        // KHÔNG DÙNG BACKTICK, CHỈ DÙNG NỐI CHUỖI (+) ĐỂ ĐẢM BẢO AN TOÀN 100%
        
        var sD = document.getElementById('tc-start-d');
        var sM = document.getElementById('tc-start-m');
        var sY = document.getElementById('tc-start-y');
        
        var eD = document.getElementById('tc-end-d');
        var eM = document.getElementById('tc-end-m');
        var eY = document.getElementById('tc-end-y');

        var btn = document.getElementById('tc-btn-calc');
        var btnClear = document.getElementById('tc-btn-clear');
        var resDiv = document.getElementById('tc-result');
        var historyList = document.getElementById('tc-history-list');

        // Khởi tạo Lịch sử từ LocalStorage
        var tcHistory = [];
        try {
            var stored = localStorage.getItem('nothing_tc_history');
            if(stored) tcHistory = JSON.parse(stored);
        } catch(e) {
            tcHistory = [];
        }

        var saveHistory = function() {
            localStorage.setItem('nothing_tc_history', JSON.stringify(tcHistory));
        };

        var renderHistory = function() {
            historyList.innerHTML = '';
            if(tcHistory.length === 0) {
                historyList.innerHTML = '<div class="text-xs text-slate-400 italic text-center py-4">Chưa có lịch sử tính toán nào.</div>';
                return;
            }
            
            for(var i = 0; i < tcHistory.length; i++) {
                var h = tcHistory[i];
                var itemHtml = '<div class="tc-history-item bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1 shadow-sm">';
                itemHtml += '<div class="text-[10px] font-bold text-teal-600">' + h.dateStart + ' ➔ ' + h.dateEnd + '</div>';
                itemHtml += '<div class="text-sm font-black text-slate-700">' + h.resText1 + '</div>';
                itemHtml += '<div class="text-xs font-medium text-slate-500">' + h.resText4 + '</div>';
                itemHtml += '</div>';
                historyList.innerHTML += itemHtml;
            }
        };

        // Render lịch sử lần đầu
        renderHistory();

        // Xóa Lịch sử
        btnClear.onclick = function() {
            if(confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử tính toán?")) {
                tcHistory = [];
                saveHistory();
                renderHistory();
            }
        };

        // Đổ dữ liệu vào Select Box
        var updateDays = function(dElem, mElem, yElem) {
            var currentD = parseInt(dElem.value) || new Date().getDate();
            var m = parseInt(mElem.value) || (new Date().getMonth() + 1);
            var y = parseInt(yElem.value) || new Date().getFullYear();
            
            var maxD = new Date(y, m, 0).getDate(); 
            if(currentD > maxD) currentD = maxD;

            var dOpts = ''; 
            for(var i = 1; i <= maxD; i++) {
                dOpts += '<option value="' + i + '" ' + (i === currentD ? 'selected' : '') + '>' + i + '</option>';
            }
            dElem.innerHTML = dOpts;
        };

        // Sinh danh sách Tháng, Năm
        var mOpts = ''; 
        for(var i = 1; i <= 12; i++) mOpts += '<option value="' + i + '">' + i + '</option>'; 
        sM.innerHTML = mOpts;
        eM.innerHTML = mOpts;
        
        var yOpts = ''; 
        var curY = new Date().getFullYear();
        for(var i = curY - 50; i <= curY + 50; i++) yOpts += '<option value="' + i + '">' + i + '</option>'; 
        sY.innerHTML = yOpts;
        eY.innerHTML = yOpts;

        // Lắng nghe sự kiện đổi tháng/năm để cập nhật ngày
        sM.addEventListener('change', function() { updateDays(sD, sM, sY); });
        sY.addEventListener('change', function() { updateDays(sD, sM, sY); });
        eM.addEventListener('change', function() { updateDays(eD, eM, eY); });
        eY.addEventListener('change', function() { updateDays(eD, eM, eY); });

        // Mặc định: Từ ngày (Hôm nay), Đến ngày (Hôm nay)
        var today = new Date();
        sM.value = today.getMonth() + 1;
        sY.value = today.getFullYear();
        updateDays(sD, sM, sY);
        sD.value = today.getDate();

        eM.value = today.getMonth() + 1;
        eY.value = today.getFullYear();
        updateDays(eD, eM, eY);
        eD.value = today.getDate();

        // XỬ LÝ TÍNH TOÁN
        btn.onclick = function() {
            var d1 = parseInt(sD.value);
            var m1 = parseInt(sM.value);
            var y1 = parseInt(sY.value);

            var d2 = parseInt(eD.value);
            var m2 = parseInt(eM.value);
            var y2 = parseInt(eY.value);

            // Validate ngày kết thúc phải lớn hơn ngày bắt đầu
            var startDate = new Date(y1, m1 - 1, d1);
            var endDate = new Date(y2, m2 - 1, d2);
            
            if (endDate < startDate) {
                alert("Lỗi: Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!");
                return;
            }

            var dayRes = 0;
            var monthRes = 0;
            var yearRes = 0;

            var tempD2 = d2;
            var tempM2 = m2;
            var tempY2 = y2;

            // BƯỚC 1: Tính Ngày (Thuật toán mượn 30 ngày)
            if (tempD2 >= d1) {
                dayRes = tempD2 - d1;
            } else {
                dayRes = (tempD2 + 30) - d1;
                tempM2 = tempM2 - 1;
            }

            // BƯỚC 2: Tính Tháng (Thuật toán mượn 12 tháng)
            if (tempM2 >= m1) {
                monthRes = tempM2 - m1;
            } else {
                monthRes = (tempM2 + 12) - m1;
                tempY2 = tempY2 - 1;
            }

            // BƯỚC 3: Tính Năm
            yearRes = tempY2 - y1;

            // QUY ĐỔI RA CÁC ĐỊNH DẠNG:
            var str1 = yearRes + " năm " + monthRes + " tháng " + dayRes + " ngày";

            var totalMonthsForQuarter = (yearRes * 12) + monthRes;
            var totalQuarters = Math.floor(totalMonthsForQuarter / 3);
            var leftoverMonths = totalMonthsForQuarter % 3;
            var leftoverDaysForQuarter = (leftoverMonths * 30) + dayRes;
            var str2 = totalQuarters + " quý " + leftoverDaysForQuarter + " ngày";

            var str3 = totalMonthsForQuarter + " tháng " + dayRes + " ngày";

            var totalDays = (yearRes * 360) + (monthRes * 30) + dayRes;
            var str4 = totalDays + " ngày";

            // HIỂN THỊ KẾT QUẢ
            document.getElementById('tc-res-1').innerText = str1;
            document.getElementById('tc-res-2').innerText = str2;
            document.getElementById('tc-res-3').innerText = str3;
            document.getElementById('tc-res-4').innerText = str4;

            resDiv.classList.remove('hidden');

            // LƯU LỊCH SỬ
            var startStr = ('0' + d1).slice(-2) + '/' + ('0' + m1).slice(-2) + '/' + y1;
            var endStr = ('0' + d2).slice(-2) + '/' + ('0' + m2).slice(-2) + '/' + y2;
            
            var newHistoryItem = {
                dateStart: startStr,
                dateEnd: endStr,
                resText1: str1,
                resText4: "Tổng: " + str4
            };

            // Đưa lên đầu danh sách, giữ tối đa 15 lịch sử gần nhất
            tcHistory.unshift(newHistoryItem);
            if(tcHistory.length > 15) tcHistory.pop();
            
            saveHistory();
            renderHistory();
        };
    }
});
