// --- 10. Tool Tính Khoảng Cách Thời Gian (Quy ước 1 tháng 30 ngày) ---
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
                border-color: rgba(255, 255, 255, 0.05) !important;
            }
        </style>

        <div class="text-center mb-6">
            <span class="bg-teal-100 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-teal-200">Công thức</span>
            <h2 class="text-3xl font-bold mt-2 text-slate-800">Khoảng Cách <span class="text-teal-500">Thời Gian</span> ⏳</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Tính toán theo quy ước (1 tháng = 30 ngày)</p>
        </div>

        <div class="max-w-md mx-auto space-y-5 pb-10">
            
            <div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Từ ngày (Bắt đầu)</label>
                    <input type="date" id="tc-start" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 ring-teal-200 transition">
                </div>
                
                <div>
                    <label class="text-[10px] font-bold text-slate-400 uppercase mb-1 block ml-1">Đến ngày (Kết thúc)</label>
                    <input type="date" id="tc-end" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 ring-teal-200 transition">
                </div>

                <button id="tc-btn-calc" class="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-sm mt-2">
                    🧮 KẾT QUẢ
                </button>
            </div>

            <div id="tc-result" class="hidden space-y-4">
                <div class="tc-card bg-[#e0f2fe] rounded-[2rem] p-6 md:p-8 shadow-sm border border-white relative overflow-hidden">
                    
                    <div class="text-teal-600 font-bold text-xs tracking-widest uppercase mb-5 border-b border-teal-200/50 pb-2">KẾT QUẢ QUY ĐỔI</div>

                    <div class="space-y-3">
                        <div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-white shadow-sm flex flex-col">
                            <span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Chuẩn Năm - Tháng - Ngày</span>
                            <span class="text-xl font-black text-slate-800" id="tc-res-1">--</span>
                        </div>

                        <div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-white shadow-sm flex flex-col">
                            <span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Quý (1 Quý = 3 Tháng)</span>
                            <span class="text-lg font-bold text-slate-700" id="tc-res-2">--</span>
                        </div>

                        <div class="tc-inner-card bg-white/70 p-4 rounded-2xl border border-white shadow-sm flex flex-col">
                            <span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Tháng</span>
                            <span class="text-lg font-bold text-slate-700" id="tc-res-3">--</span>
                        </div>

                        <div class="tc-inner-card bg-teal-500 p-4 rounded-2xl border border-teal-400 shadow-md flex flex-col">
                            <span class="text-[9px] text-teal-100 font-bold uppercase tracking-wider mb-1">Tổng Ngày Tuyệt Đối</span>
                            <span class="text-2xl font-black text-white" id="tc-res-4">--</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    `,
    logic: function() {
        // KHÔNG DÙNG BACKTICK, CHỈ DÙNG NỐI CHUỖI (+) ĐỂ ĐẢM BẢO AN TOÀN 100%
        var btn = document.getElementById('tc-btn-calc');
        var resDiv = document.getElementById('tc-result');

        btn.onclick = function() {
            var startVal = document.getElementById('tc-start').value;
            var endVal = document.getElementById('tc-end').value;

            if (!startVal || !endVal) {
                alert("Vui lòng chọn đầy đủ cả 2 ngày nhé bạn yêu!");
                return;
            }

            var sParts = startVal.split('-');
            var y1 = parseInt(sParts[0]);
            var m1 = parseInt(sParts[1]);
            var d1 = parseInt(sParts[2]);

            var eParts = endVal.split('-');
            var y2 = parseInt(eParts[0]);
            var m2 = parseInt(eParts[1]);
            var d2 = parseInt(eParts[2]);

            // Validate ngày kết thúc phải lớn hơn ngày bắt đầu
            var startDate = new Date(y1, m1 - 1, d1);
            var endDate = new Date(y2, m2 - 1, d2);
            
            if (endDate < startDate) {
                alert("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!");
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
            
            // 1. Năm - Tháng - Ngày
            var str1 = yearRes + " năm " + monthRes + " tháng " + dayRes + " ngày";

            // 2. Tổng Quý
            var totalMonthsForQuarter = (yearRes * 12) + monthRes;
            var totalQuarters = Math.floor(totalMonthsForQuarter / 3);
            var leftoverMonths = totalMonthsForQuarter % 3;
            var leftoverDaysForQuarter = (leftoverMonths * 30) + dayRes;
            
            var str2 = totalQuarters + " quý " + leftoverDaysForQuarter + " ngày";

            // 3. Tổng Tháng
            var str3 = totalMonthsForQuarter + " tháng " + dayRes + " ngày";

            // 4. Tổng Ngày Tuyệt Đối
            var totalDays = (yearRes * 360) + (monthRes * 30) + dayRes;
            var str4 = totalDays + " ngày";

            // HIỂN THỊ KẾT QUẢ
            document.getElementById('tc-res-1').innerText = str1;
            document.getElementById('tc-res-2').innerText = str2;
            document.getElementById('tc-res-3').innerText = str3;
            document.getElementById('tc-res-4').innerText = str4;

            resDiv.classList.remove('hidden');
        };
    }
});
