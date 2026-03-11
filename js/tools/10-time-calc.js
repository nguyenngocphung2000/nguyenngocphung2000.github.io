// --- 10. Tool Tính Số Ngày (Tích hợp Module Đa Chiều) ---
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
          '<span class="bg-teal-100 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-teal-200">Công thức & Thực tế</span>' +
          '<h2 class="text-3xl font-bold mt-2 text-slate-800">Tính Khoảng Cách <span class="text-teal-500">Thời Gian</span> ⏳</h2>' +
          '</div>' +
          '<div class="max-w-md mx-auto space-y-6 pb-10">' +

          '' +
          '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 space-y-5">' +
          '<div class="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2"><span class="text-teal-500 text-lg">📏</span><h3 class="font-bold text-slate-600 text-sm uppercase">Khoảng cách 2 mốc ngày</h3></div>' +
          
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Từ ngày (Bắt đầu)</label>' +
          '<div class="flex justify-center items-center gap-2 w-full">' +
          '<select id="tc-start-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-start-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-start-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
          '</div></div>' +
          
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Đến ngày (Kết thúc)</label>' +
          '<div class="flex justify-center items-center gap-2 w-full">' +
          '<select id="tc-end-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-end-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="tc-end-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
          '</div></div>' +
          
          '<div class="flex gap-2 w-full mt-2">' +
          '<button id="tc-btn-conv" class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex flex-col items-center justify-center">' +
          '<span class="text-sm">🧮 CÔNG THỨC</span><span class="text-[9px] font-medium opacity-90 mt-0.5">(Quy ước 30 ngày)</span></button>' +
          '<button id="tc-btn-real" class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex flex-col items-center justify-center">' +
          '<span class="text-sm">📅 THEO LỊCH</span><span class="text-[9px] font-medium opacity-90 mt-0.5">(Thực tế)</span></button>' +
          '</div></div>' +

          '<div id="tc-result" class="hidden space-y-4">' +
          '<div class="tc-card bg-[#e0f2fe] rounded-[2rem] p-6 md:p-8 shadow-sm border border-white relative overflow-hidden">' +
          '<div class="flex justify-between items-end border-b border-teal-200/50 pb-2 mb-4">' +
          '<div class="text-teal-600 font-bold text-xs tracking-widest uppercase">KẾT QUẢ MODULE 1</div>' +
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

          '' +
          '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 space-y-5">' +
          '<div class="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2"><span class="text-orange-500 text-lg">🎯</span><h3 class="font-bold text-slate-600 text-sm uppercase">Giải mã mốc đa chiều</h3></div>' +
          '<p class="text-[10px] text-slate-500 italic mt-0">Mẹo: Nhập dữ liệu đã biết, để trống các ô cần tìm (hoặc để #). Hệ thống sẽ tự động tính toán hai chiều.</p>' +
          
          '' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">1. Ngày Bắt Đầu (Bắt buộc)</label>' +
          '<div class="flex justify-center items-center gap-2 w-full">' +
          '<select id="m2-start-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="m2-start-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="m2-start-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 cursor-pointer"></select>' +
          '</div></div>' +

          '' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">2. Ngày Chạm Mốc (Đích đến)</label>' +
          '<div class="flex justify-center items-center gap-2 w-full">' +
          '<select id="m2-end-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-orange-50 border border-orange-200 rounded-xl text-center font-bold text-orange-600 py-3 outline-none focus:ring-2 ring-orange-400 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="m2-end-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-orange-50 border border-orange-200 rounded-xl text-center font-bold text-orange-600 py-3 outline-none focus:ring-2 ring-orange-400 cursor-pointer"></select>' +
          '<span class="text-slate-300 font-black">/</span>' +
          '<select id="m2-end-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-orange-50 border border-orange-200 rounded-xl text-center font-bold text-orange-600 py-3 outline-none focus:ring-2 ring-orange-400 cursor-pointer"></select>' +
          '</div></div>' +

          '' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">3. Tổng Thời Gian Chờ</label>' +
          '<div class="flex justify-center items-center gap-2 w-full">' +
          '<div class="flex-1 flex flex-col items-center"><input id="m2-wait-y" type="number" min="0" placeholder="#" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-2.5 outline-none focus:ring-2 ring-orange-200"><span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">Năm</span></div>' +
          '<div class="flex-1 flex flex-col items-center"><input id="m2-wait-m" type="number" min="0" placeholder="#" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-2.5 outline-none focus:ring-2 ring-orange-200"><span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">Tháng</span></div>' +
          '<div class="flex-1 flex flex-col items-center"><input id="m2-wait-d" type="number" min="0" placeholder="#" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-2.5 outline-none focus:ring-2 ring-orange-200"><span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">Ngày</span></div>' +
          '</div></div>' +

          '' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">4. Tỷ lệ mốc</label>' +
          '<div class="flex justify-center items-center gap-3 w-full px-8">' +
          '<input id="m2-ratio-num" type="number" placeholder="#" class="w-20 bg-slate-50 border border-slate-200 rounded-xl text-center font-black text-slate-700 text-lg py-2 outline-none focus:ring-2 ring-orange-200">' +
          '<span class="text-2xl font-black text-slate-300">/</span>' +
          '<input id="m2-ratio-den" type="number" placeholder="#" class="w-20 bg-slate-50 border border-slate-200 rounded-xl text-center font-black text-slate-700 text-lg py-2 outline-none focus:ring-2 ring-orange-200">' +
          '</div></div>' +

          '<button id="mod2-btn-calc" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-sm mt-2">' +
          '🚀 GIẢI MÃ TỰ ĐỘNG' +
          '</button>' +

          '' +
          '<div id="mod2-result" class="hidden tc-card bg-[#fff7ed] rounded-[1.5rem] p-5 shadow-sm border border-orange-100 mt-4 space-y-2">' +
          '<div class="text-orange-600 font-bold text-[10px] tracking-widest uppercase border-b border-orange-200/50 pb-2 mb-3">BẢNG KẾT QUẢ ĐA CHIỀU</div>' +
          '<div class="flex justify-between items-center bg-white/70 px-3 py-2.5 rounded-lg border border-orange-50"><span class="text-[10px] font-bold text-slate-500 uppercase">Ngày Bắt Đầu</span><span class="font-black text-slate-700 text-sm" id="res2-start">--</span></div>' +
          '<div class="flex justify-between items-center bg-white/70 px-3 py-2.5 rounded-lg border border-orange-50"><span class="text-[10px] font-bold text-slate-500 uppercase">Ngày Đích Đến</span><span class="font-black text-orange-600 text-base" id="res2-end">--</span></div>' +
          '<div class="flex justify-between items-center bg-white/70 px-3 py-2.5 rounded-lg border border-orange-50"><span class="text-[10px] font-bold text-slate-500 uppercase">Tổng Thời Gian</span><span class="font-black text-slate-700 text-sm" id="res2-total">--</span></div>' +
          '<div class="flex justify-between items-center bg-white/70 px-3 py-2.5 rounded-lg border border-orange-50"><span class="text-[10px] font-bold text-slate-500 uppercase">Tỷ Lệ Mốc</span><span class="font-black text-slate-700 text-sm" id="res2-ratio">--</span></div>' +
          '<div class="flex flex-col items-center bg-orange-500 p-3 mt-3 rounded-xl border border-orange-600 shadow-md"><span class="text-[9px] font-bold text-orange-100 uppercase tracking-wider mb-1">Thời gian đã quy đổi</span><span class="font-black text-white text-lg" id="res2-passed">--</span></div>' +
          '</div></div>' +

          '' +
          '<div class="bg-white/90 backdrop-blur-md p-5 rounded-[2rem] shadow-sm border border-slate-100">' +
          '<div class="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">' +
          '<h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><span>📚</span> Lịch sử tính toán</h3>' +
          '<button id="tc-btn-clear" class="text-[9px] bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition shadow-sm border border-red-100">XÓA LỊCH SỬ</button>' +
          '</div>' +
          '<div id="tc-history-list" class="space-y-2 max-h-[650px] overflow-y-auto custom-scrollbar pr-1"></div>' +
          '</div></div>',
    logic: function() {
        // === MODULE 1 VARIABLES ===
        var sD = document.getElementById('tc-start-d');
        var sM = document.getElementById('tc-start-m');
        var sY = document.getElementById('tc-start-y');
        var eD = document.getElementById('tc-end-d');
        var eM = document.getElementById('tc-end-m');
        var eY = document.getElementById('tc-end-y');
        var btnConv = document.getElementById('tc-btn-conv');
        var btnReal = document.getElementById('tc-btn-real');
        var resDiv1 = document.getElementById('tc-result');

        // === MODULE 2 VARIABLES ===
        var m2sD = document.getElementById('m2-start-d');
        var m2sM = document.getElementById('m2-start-m');
        var m2sY = document.getElementById('m2-start-y');
        
        var m2eD = document.getElementById('m2-end-d');
        var m2eM = document.getElementById('m2-end-m');
        var m2eY = document.getElementById('m2-end-y');
        
        var m2wY = document.getElementById('m2-wait-y');
        var m2wM = document.getElementById('m2-wait-m');
        var m2wD = document.getElementById('m2-wait-d');

        var m2rNum = document.getElementById('m2-ratio-num');
        var m2rDen = document.getElementById('m2-ratio-den');
        
        var btnMod2 = document.getElementById('mod2-btn-calc');
        var resDiv2 = document.getElementById('mod2-result');

        // === HISTORY VARIABLES ===
        var btnClear = document.getElementById('tc-btn-clear');
        var historyList = document.getElementById('tc-history-list');

        var tcHistory = [];
        try {
            var stored = localStorage.getItem('nothing_tc_history');
            if(stored) tcHistory = JSON.parse(stored);
        } catch(e) { tcHistory = []; }

        var saveHistory = function() { localStorage.setItem('nothing_tc_history', JSON.stringify(tcHistory)); };

        var renderHistory = function() {
            historyList.innerHTML = '';
            if(tcHistory.length === 0) {
                historyList.innerHTML = '<div class="text-xs text-slate-400 italic text-center py-4">Chưa có lịch sử tính toán nào.</div>';
                return;
            }
            for(var i = 0; i < tcHistory.length; i++) {
                var h = tcHistory[i];
                var colorType = 'text-teal-600';
                if(h.typeLabel === "Thực tế (Theo Lịch)") colorType = 'text-indigo-600';
                if(h.typeLabel === "Mốc Đa Chiều") colorType = 'text-orange-600';
                
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
            if(confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) { tcHistory = []; saveHistory(); renderHistory(); }
        };

        // Hàm đổ dữ liệu cho các Select cơ bản (Không có ô Trống)
        var updateDays = function(dElem, mElem, yElem) {
            var currentD = parseInt(dElem.value) || new Date().getDate();
            var m = parseInt(mElem.value) || (new Date().getMonth() + 1);
            var y = parseInt(yElem.value) || new Date().getFullYear();
            var maxD = new Date(y, m, 0).getDate(); 
            if(currentD > maxD) currentD = maxD;
            var dOpts = ''; 
            for(var i = 1; i <= maxD; i++) dOpts += '<option value="' + i + '" ' + (i === currentD ? 'selected' : '') + '>' + i + '</option>';
            dElem.innerHTML = dOpts;
        };

        var mOpts = ''; for(var i = 1; i <= 12; i++) mOpts += '<option value="' + i + '">' + i + '</option>'; 
        sM.innerHTML = mOpts; eM.innerHTML = mOpts; m2sM.innerHTML = mOpts;
        
        var yOpts = ''; var curY = new Date().getFullYear();
        for(var i = curY - 50; i <= curY + 50; i++) yOpts += '<option value="' + i + '">' + i + '</option>'; 
        sY.innerHTML = yOpts; eY.innerHTML = yOpts; m2sY.innerHTML = yOpts;

        var setupDateListeners = function(d, m, y) {
            m.addEventListener('change', function() { updateDays(d, m, y); });
            y.addEventListener('change', function() { updateDays(d, m, y); });
        };
        setupDateListeners(sD, sM, sY); setupDateListeners(eD, eM, eY); setupDateListeners(m2sD, m2sM, m2sY);

        var today = new Date();
        sM.value = today.getMonth() + 1; sY.value = today.getFullYear(); updateDays(sD, sM, sY); sD.value = today.getDate();
        eM.value = today.getMonth() + 1; eY.value = today.getFullYear(); updateDays(eD, eM, eY); eD.value = today.getDate();
        m2sM.value = 2; m2sY.value = 2020; updateDays(m2sD, m2sM, m2sY); m2sD.value = 22;

        // Hàm đổ dữ liệu cho Ngày Đích (Có ô Trống #)
        var updateEndDays = function() {
            var currentD = m2eD.value;
            var m = parseInt(m2eM.value); var y = parseInt(m2eY.value);
            var dOpts = '<option value=""># Ngày</option>'; 
            var maxD = (!isNaN(m) && !isNaN(y)) ? new Date(y, m, 0).getDate() : 31;
            for(var i = 1; i <= maxD; i++) dOpts += '<option value="' + i + '" ' + (i == currentD ? 'selected' : '') + '>' + i + '</option>';
            m2eD.innerHTML = dOpts;
        };
        var mOptsE = '<option value=""># Tháng</option>'; for(var i = 1; i <= 12; i++) mOptsE += '<option value="' + i + '">' + i + '</option>'; 
        m2eM.innerHTML = mOptsE;
        var yOptsE = '<option value=""># Năm</option>'; for(var i = curY - 50; i <= curY + 50; i++) yOptsE += '<option value="' + i + '">' + i + '</option>'; 
        m2eY.innerHTML = yOptsE;
        updateEndDays();
        m2eM.addEventListener('change', updateEndDays); m2eY.addEventListener('change', updateEndDays);

        // ================= XỬ LÝ MODULE 1 (Giữ nguyên) =================
        var processCalcModule1 = function(isReal) {
            var d1 = parseInt(sD.value), m1 = parseInt(sM.value), y1 = parseInt(sY.value);
            var d2 = parseInt(eD.value), m2 = parseInt(eM.value), y2 = parseInt(eY.value);
            var startDate = new Date(y1, m1 - 1, d1), endDate = new Date(y2, m2 - 1, d2);
            if (endDate < startDate) { alert("Lỗi: Ngày kết thúc phải lớn hơn ngày bắt đầu!"); return; }

            var str1 = "", str2 = "", str3 = "", str4 = "", typeLabel = "";
            if (!isReal) {
                typeLabel = "Công thức (30đ/tháng)";
                var yearRes = 0, monthRes = 0, dayRes = 0;
                var tempD2 = d2, tempM2 = m2, tempY2 = y2;
                if (tempD2 >= d1) { dayRes = tempD2 - d1; } else { dayRes = (tempD2 + 30) - d1; tempM2 = tempM2 - 1; }
                if (tempM2 >= m1) { monthRes = tempM2 - m1; } else { monthRes = (tempM2 + 12) - m1; tempY2 = tempY2 - 1; }
                yearRes = tempY2 - y1;
                str1 = yearRes + " năm " + monthRes + " tháng " + dayRes + " ngày";
                var totalMonths = (yearRes * 12) + monthRes;
                str2 = Math.floor(totalMonths / 3) + " quý " + ((totalMonths % 3) * 30 + dayRes) + " ngày";
                str3 = totalMonths + " tháng " + dayRes + " ngày";
                str4 = ((yearRes * 360) + (monthRes * 30) + dayRes) + " ngày";
            } else {
                typeLabel = "Thực tế (Theo Lịch)";
                var totalDaysReal = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
                var totalMonthsReal = (y2 - y1) * 12 + (m2 - m1);
                if (d2 < d1) totalMonthsReal--; 
                var yearResReal = Math.floor(totalMonthsReal / 12), monthResReal = totalMonthsReal % 12;
                var tempDate = new Date(y1, m1 - 1, d1); var originalDay = tempDate.getDate();
                tempDate.setMonth(tempDate.getMonth() + totalMonthsReal);
                if (tempDate.getDate() !== originalDay) { tempDate.setDate(0); }
                var dayResReal = Math.round((endDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24));
                str1 = yearResReal + " năm " + monthResReal + " tháng " + dayResReal + " ngày";
                str2 = Math.floor(totalMonthsReal / 3) + " quý " + (totalMonthsReal % 3) + " tháng " + dayResReal + " ngày";
                str3 = totalMonthsReal + " tháng " + dayResReal + " ngày";
                str4 = totalDaysReal + " ngày";
            }

            document.getElementById('tc-res-1').innerText = str1; document.getElementById('tc-res-2').innerText = str2;
            document.getElementById('tc-res-3').innerText = str3; document.getElementById('tc-res-4').innerText = str4;
            document.getElementById('tc-res-type').innerText = typeLabel;
            resDiv1.classList.remove('hidden');

            var startStr = ('0'+d1).slice(-2)+'/'+('0'+m1).slice(-2)+'/'+y1; var endStr = ('0'+d2).slice(-2)+'/'+('0'+m2).slice(-2)+'/'+y2;
            var isDup = tcHistory.length > 0 && tcHistory[0].dateStart === startStr && tcHistory[0].dateEnd === endStr && tcHistory[0].typeLabel === typeLabel;
            if(!isDup) {
                tcHistory.unshift({ dateStart: startStr, dateEnd: endStr, resText1: str1, resText4: "Tổng: " + str4, typeLabel: typeLabel, isReal: isReal });
                if(tcHistory.length > 30) tcHistory.pop(); saveHistory(); renderHistory();
            }
        };

        btnConv.onclick = function() { processCalcModule1(false); };
        btnReal.onclick = function() { processCalcModule1(true); };

        // ================= XỬ LÝ MODULE 2 (THUẬT TOÁN ĐA CHIỀU) =================
        var getDays360 = function(d1, m1, y1, d2, m2, y2) { return ((y2 - y1) * 360) + ((m2 - m1) * 30) + (d2 - d1); };
        var daysToYMD = function(days) { return { y: Math.floor(days/360), m: Math.floor((days%360)/30), d: (days%360)%30 }; };

        btnMod2.onclick = function() {
            var sD = parseInt(m2sD.value), sM = parseInt(m2sM.value), sY = parseInt(m2sY.value);
            var eD = m2eD.value, eM = m2eM.value, eY = m2eY.value;
            var wY = m2wY.value, wM = m2wM.value, wD = m2wD.value;
            var rN = m2rNum.value, rD = m2rDen.value;

            var hasEnd = (eD !== '' && eM !== '' && eY !== '');
            var hasWait = (wY !== '' || wM !== '' || wD !== '');
            var hasRatio = (rN !== '' && rD !== '');

            var resStart = ('0'+sD).slice(-2) + "/" + ('0'+sM).slice(-2) + "/" + sY;
            var resEnd = "#", resWait = "#", resRatio = "#", resPassed = "#";

            if (hasWait && hasRatio && !hasEnd) {
                // TH1: Tìm Ngày Đích
                var waitDays = ((parseInt(wY)||0) * 360) + ((parseInt(wM)||0) * 30) + (parseInt(wD)||0);
                var rNum = parseInt(rN)||0, rDen = parseInt(rD)||1;
                if(rDen === 0) { alert("Mẫu số không thể bằng 0!"); return; }
                
                var passDays = Math.floor(waitDays * (rNum / rDen));
                var p = daysToYMD(passDays);
                var temp = new Date(sY + p.y, (sM - 1) + p.m, sD + p.d);
                
                resEnd = ('0'+temp.getDate()).slice(-2) + "/" + ('0'+(temp.getMonth()+1)).slice(-2) + "/" + temp.getFullYear();
                resWait = (parseInt(wY)||0) + " năm " + (parseInt(wM)||0) + " tháng " + (parseInt(wD)||0) + " ngày";
                resRatio = rNum + " / " + rDen;
                resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";
            } 
            else if (hasEnd && hasRatio && !hasWait) {
                // TH2: Tìm Tổng Thời Gian
                var passDays = getDays360(sD, sM, sY, parseInt(eD), parseInt(eM), parseInt(eY));
                if (passDays < 0) { alert("Ngày đích phải sau ngày bắt đầu!"); return; }
                var rNum = parseInt(rN)||0, rDen = parseInt(rD)||1;
                if(rDen === 0 || rNum === 0) { alert("Tỷ lệ không hợp lệ!"); return; }
                
                var waitDays = Math.floor(passDays / (rNum / rDen));
                var w = daysToYMD(waitDays);
                var p = daysToYMD(passDays);

                resEnd = ('0'+eD).slice(-2) + "/" + ('0'+eM).slice(-2) + "/" + eY;
                resWait = w.y + " năm " + w.m + " tháng " + w.d + " ngày";
                resRatio = rNum + " / " + rDen;
                resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";
            }
            else if (hasEnd && hasWait && !hasRatio) {
                // TH3: Tìm Tỷ Lệ
                var passDays = getDays360(sD, sM, sY, parseInt(eD), parseInt(eM), parseInt(eY));
                if (passDays < 0) { alert("Ngày đích phải sau ngày bắt đầu!"); return; }
                var waitDays = ((parseInt(wY)||0) * 360) + ((parseInt(wM)||0) * 30) + (parseInt(wD)||0);
                if (waitDays <= 0) { alert("Tổng thời gian chờ phải lớn hơn 0!"); return; }
                
                var percent = ((passDays / waitDays) * 100).toFixed(2);
                var p = daysToYMD(passDays);

                resEnd = ('0'+eD).slice(-2) + "/" + ('0'+eM).slice(-2) + "/" + eY;
                resWait = (parseInt(wY)||0) + " năm " + (parseInt(wM)||0) + " tháng " + (parseInt(wD)||0) + " ngày";
                resRatio = percent + "% (Khoảng " + passDays + "/" + waitDays + " ngày)";
                resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";
            }
            else if (hasEnd && hasWait && hasRatio) {
                // TH4: Nhập Đủ Hết -> Tính thời gian thực tế đã qua
                var passDays = getDays360(sD, sM, sY, parseInt(eD), parseInt(eM), parseInt(eY));
                if (passDays < 0) { alert("Ngày đích phải sau ngày bắt đầu!"); return; }
                var p = daysToYMD(passDays);

                resEnd = ('0'+eD).slice(-2) + "/" + ('0'+eM).slice(-2) + "/" + eY;
                resWait = (parseInt(wY)||0) + " năm " + (parseInt(wM)||0) + " tháng " + (parseInt(wD)||0) + " ngày";
                resRatio = (parseInt(rN)||0) + " / " + (parseInt(rDen)||1);
                resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";
            }
            else {
                alert("Bạn cần cung cấp ít nhất 2 trong 3 dữ liệu: 'Ngày Chạm Mốc', 'Tổng Thời Gian' hoặc 'Tỷ Lệ' để giải mã nhé!");
                return;
            }

            // In kết quả ra Bảng Đa Chiều
            document.getElementById('res2-start').innerText = resStart;
            document.getElementById('res2-end').innerText = resEnd;
            document.getElementById('res2-total').innerText = resWait;
            document.getElementById('res2-ratio').innerText = resRatio;
            document.getElementById('res2-passed').innerText = resPassed;
            resDiv2.classList.remove('hidden');

            // Lưu lịch sử
            var isDup = tcHistory.length > 0 && tcHistory[0].dateStart === resStart && tcHistory[0].dateEnd === resEnd && tcHistory[0].typeLabel === "Mốc Đa Chiều";
            if(!isDup) {
                tcHistory.unshift({ dateStart: resStart, dateEnd: (resEnd==='#' ? 'Tìm đích' : resEnd), resText1: "Đã qua: " + resPassed, resText4: "Tổng: " + resWait + " | Tỷ lệ: " + resRatio, typeLabel: "Mốc Đa Chiều", isReal: false });
                if(tcHistory.length > 30) tcHistory.pop(); saveHistory(); renderHistory();
            }
        };
    }
});
