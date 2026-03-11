// --- 10. Tool Tính Số Ngày (Chống Spam Lịch Sử & Cuộn mượt) ---
registerTool({
    id: 'tab-time-calc',
    name: 'Tính Số Ngày',
    icon: '⏳',
    html: '<style>' +
          'body.dark-mode .tc-card { background-image: linear-gradient(to bottom right, #1e293b, #0f172a) !important; border-color: #334155 !important; } ' +
          'body.dark-mode .tc-inner-card { background-color: rgba(15, 23, 42, 0.6) !important; border-color: rgba(45, 212, 191, 0.2) !important; } ' +
          'body.dark-mode .tc-history-item { background-color: rgba(30, 41, 59, 0.8) !important; border-color: rgba(255, 255, 255, 0.05) !important; }' +
          '</style>' +
          '<div class="text-center mb-6">' +
          '<span class="bg-teal-100 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-teal-200">Nhìn Lại Thời Gian</span>' +
          '<h2 class="text-3xl font-bold mt-2 text-slate-800">Khoảng Cách <span class="text-teal-500">Thời Gian</span> ⏳</h2>' +
          '<p class="text-sm text-gray-500
mt-2 italic">Tính toán ngày 30 ngày/tháng hoặc theo lịch thực tế</p>' +
          '</div>' +
          '<div class="max-w-md mx-auto space-y-5 pb-10">' +
          '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 space-y-5">' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Từ ngày</label>' +
          '<div class="flex justify-center items-center gap-2 w-full">' +
          '<select id="tc-start-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-start-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-start-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>' +
          '</div></div>' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Đến ngày</label>' +
          '<div class="flex justify-center items-center gap-2 w-full">' +
          '<select id="tc-end-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-end-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-end-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 appearance-none cursor-pointer"></select>' +
          '</div></div>' +
          '<div class="flex gap-2 w-full mt-2">' +
          '<button id="tc-btn-conv" class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex flex-col items-center justify-center">' +
          '<span class="text-sm">🧮 CÔNG THỨC</span><span class="text-[9px] font-medium opacity-90 mt-0.5">(Quy ước 30day)</span></button>' +
          '<button id="tc-btn-real" class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex flex-col items-center justify-center">' +
          '<span class="text-sm">📅 THEO LỊCH</span><span class="text-[9px] font-medium opacity-90 mt-0.5">(Lịch thực tế)</span></button>' +
          '</div></div>' +
          '<div id="tc-result" class="hidden space-y-4">' +
          '<div class="tc-card bg-[#e0f2fe] rounded-[2rem] p-6 md:p-8 shadow-sm border border-white relative overflow-hidden">' +
          '<div class="flex justify-between items-end border-b border-teal-200/50 pb-2 mb-4">' +
          '<div class="text-teal-600 font-bold text-xs tracking-widest uppercase">KẾT QUẢ</div>' +
          '<div id="tc-res-type" class="text-[10px] font-bold text-teal-700/60 uppercase bg-teal-50/50 px-2 py-0.5 rounded border border-teal-100">--</div>' +
          '</div>' +
          '<div class="space-y-3">' +
          '<div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-teal-200 shadow-sm flex flex-col">' +
          '<span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Chuẩn Năm - Tháng - Ngày</span>' +
          '<span class="text-xl font-black text-slate-800" id="tc-res-1">--</span></div>' +
          '<div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-teal-200 shadow-sm flex flex-col">' +
          '<span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Quý (1 Quý = 3 Tháng)</span>' +
          '<span class="text-lg font-bold text-slate-700" id="tc-res-2">--</span></div>' +
          '<div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-teal-200 shadow-sm flex flex-col">' +
          '<span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Tháng</span>' +
          '<span class="text-lg font-bold text-slate-700" id="tc-res-3">--</span></div>' +
          '<div class="tc-inner-card bg-teal-500 p-4 rounded-2xl border border-teal-600 shadow-md flex flex-col">' +
          '<span class="text-[9px] text-teal-100 font-bold uppercase tracking-wider mb-1">Tổng Ngày Tuyệt Đối</span>' +
          '<span class="text-2xl font-black text-white" id="tc-res-4">--</span></div>' +
          '</div></div></div>' +
          '<div class="bg-white/90 backdrop-blur-md p-5 rounded-[2rem] shadow-sm border border-slate-100">' +
          '<div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">' +
          '<h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><span>📚</span> Lịch sử tính toán</h3>' +
          '<button id="tc-btn-clear" class="text-[9px] bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition shadow-sm border border-red-100">XÓA LỊCH SỬ</button>' +
          '</div>' +
          '<div id="tc-history-list" class="space-y-2 max-h-[650px] overflow-y-auto custom-scrollbar pr-1"></div>' +
          '</div></div>',
    logic: function() {
        var sD = document.getElementById('tc-start-d');
        var sM = document.getElementById('tc-start-m');
        var sY = document.getElementById('tc-start-y');
        var eD = document.getElementById('tc-end-d');
        var eM = document.getElementById('tc-end-m');
        var eY = document.getElementById('tc-end-y');

        var btnConv = document.getElementById('tc-btn-conv');
        var btnReal = document.getElementById('tc-btn-real');
        var btnClear = document.getElementById('tc-btn-clear');
        var resDiv = document.getElementById('tc-result');
        var historyList = document.getElementById('tc-history-list');

        var tcHistory = [];
        try {
            var stored = localStorage.getItem('nothing_tc_history');
            if(stored) tcHistory = JSON.parse(stored);
        } catch(e) { tcHistory = []; }

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
                var colorType = h.isReal ? 'text-indigo-600' : 'text-teal-600';
                
                var itemHtml = '<div class="tc-history-item bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1 shadow-sm">';
                itemHtml += '<div class="flex justify-between items-center">';
                itemHtml += '<div class="text-[10px] font-bold text-slate-500">' + h.dateStart + ' ➔ ' + h.dateEnd + '</div>';
                itemHtml += '<div class="text-[9px] font-bold ' + colorType + ' uppercase bg-white px-1.5 py-0.5 rounded border border-slate-200">' + h.typeLabel + '</div>';
                itemHtml += '</div>';
                itemHtml += '<div class="text-sm font-black text-slate-700 mt-1">' + h.resText1 + '</div>';
                itemHtml += '<div class="text-xs font-medium text-slate-500">' + h.resText4 + '</div>';
                itemHtml += '</div>';
                historyList.innerHTML += itemHtml;
            }
        };

        renderHistory();

        btnClear.onclick = function() {
            if(confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử tính toán?")) {
                tcHistory = []; saveHistory(); renderHistory();
            }
        };

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

        var mOpts = ''; 
        for(var i = 1; i <= 12; i++) mOpts += '<option value="' + i + '">' + i + '</option>'; 
        sM.innerHTML = mOpts; eM.innerHTML = mOpts;
        
        var yOpts = ''; 
        var curY = new Date().getFullYear();
        for(var i = curY - 50; i <= curY + 50; i++) yOpts += '<option value="' + i + '">' + i + '</option>'; 
        sY.innerHTML = yOpts; eY.innerHTML = yOpts;

        sM.addEventListener('change', function() { updateDays(sD, sM, sY); });
        sY.addEventListener('change', function() { updateDays(sD, sM, sY); });
        eM.addEventListener('change', function() { updateDays(eD, eM, eY); });
        eY.addEventListener('change', function() { updateDays(eD, eM, eY); });

        var today = new Date();
        sM.value = today.getMonth() + 1; sY.value = today.getFullYear();
        updateDays(sD, sM, sY); sD.value = today.getDate();
        eM.value = today.getMonth() + 1; eY.value = today.getFullYear();
        updateDays(eD, eM, eY); eD.value = today.getDate();

        // HÀM TÍNH TOÁN CHUNG
        var processCalc = function(isReal) {
            var d1 = parseInt(sD.value), m1 = parseInt(sM.value), y1 = parseInt(sY.value);
            var d2 = parseInt(eD.value), m2 = parseInt(eM.value), y2 = parseInt(eY.value);

            var startDate = new Date(y1, m1 - 1, d1);
            var endDate = new Date(y2, m2 - 1, d2);
            
            if (endDate < startDate) {
                alert("Lỗi: Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!");
                return;
            }

            var str1 = "", str2 = "", str3 = "", str4 = "";
            var typeLabel = "";

            if (!isReal) {
                typeLabel = "Công thức (30đ/tháng)";
                var yearRes = 0, monthRes = 0, dayRes = 0;
                var tempD2 = d2, tempM2 = m2, tempY2 = y2;

                if (tempD2 >= d1) { dayRes = tempD2 - d1; } 
                else { dayRes = (tempD2 + 30) - d1; tempM2 = tempM2 - 1; }

                if (tempM2 >= m1) { monthRes = tempM2 - m1; } 
                else { monthRes = (tempM2 + 12) - m1; tempY2 = tempY2 - 1; }

                yearRes = tempY2 - y1;

                str1 = yearRes + " năm " + monthRes + " tháng " + dayRes + " ngày";

                var totalMonths = (yearRes * 12) + monthRes;
                var quarters = Math.floor(totalMonths / 3);
                var leftMonths = totalMonths % 3;
                var leftDays = (leftMonths * 30) + dayRes;
                str2 = quarters + " quý " + leftDays + " ngày";
                str3 = totalMonths + " tháng " + dayRes + " ngày";

                var totalDays = (yearRes * 360) + (monthRes * 30) + dayRes;
                str4 = totalDays + " ngày";

            } else {
                typeLabel = "Thực tế (Theo Lịch)";
                var msDiff = endDate.getTime() - startDate.getTime();
                var totalDaysReal = Math.round(msDiff / (1000 * 60 * 60 * 24));

                var totalMonthsReal = (y2 - y1) * 12 + (m2 - m1);
                if (d2 < d1) totalMonthsReal--; 

                var yearResReal = Math.floor(totalMonthsReal / 12);
                var monthResReal = totalMonthsReal % 12;

                var tempDate = new Date(y1, m1 - 1, d1);
                var originalDay = tempDate.getDate();
                tempDate.setMonth(tempDate.getMonth() + totalMonthsReal);
                if (tempDate.getDate() !== originalDay) { tempDate.setDate(0); }

                var dayResReal = Math.round((endDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));

                str1 = yearResReal + " năm " + monthResReal + " tháng " + dayResReal + " ngày";

                var quartersReal = Math.floor(totalMonthsReal / 3);
                var leftMonthsReal = totalMonthsReal % 3;
                str2 = quartersReal + " quý " + leftMonthsReal + " tháng " + dayResReal + " ngày";
                str3 = totalMonthsReal + " tháng " + dayResReal + " ngày";
                str4 = totalDaysReal + " ngày";
            }

            document.getElementById('tc-res-1').innerText = str1;
            document.getElementById('tc-res-2').innerText = str2;
            document.getElementById('tc-res-3').innerText = str3;
            document.getElementById('tc-res-4').innerText = str4;
            document.getElementById('tc-res-type').innerText = typeLabel;

            resDiv.classList.remove('hidden');

            var startStr = ('0' + d1).slice(-2) + '/' + ('0' + m1).slice(-2) + '/' + y1;
            var endStr = ('0' + d2).slice(-2) + '/' + ('0' + m2).slice(-2) + '/' + y2;
            
            var newHistoryItem = {
                dateStart: startStr,
                dateEnd: endStr,
                resText1: str1,
                resText4: "Tổng: " + str4,
                typeLabel: typeLabel,
                isReal: isReal
            };

            // THUẬT TOÁN CHỐNG SPAM: Nếu kết quả mới y hệt kết quả cũ gần nhất thì KHÔNG LƯU
            var isDuplicate = false;
            if(tcHistory.length > 0) {
                var lastItem = tcHistory[0];
                if(lastItem.dateStart === startStr && lastItem.dateEnd === endStr && lastItem.typeLabel === typeLabel) {
                    isDuplicate = true;
                }
            }

            if(!isDuplicate) {
                tcHistory.unshift(newHistoryItem);
                if(tcHistory.length > 30) tcHistory.pop(); // Lưu 30 cái, UI sẽ tự cuộn khi quá 10 cái
                saveHistory();
                renderHistory();
            }
        };

        btnConv.onclick = function() { processCalc(false); };
        btnReal.onclick = function() { processCalc(true); };
    }
});
