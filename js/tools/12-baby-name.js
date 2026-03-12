// --- 12. Tool Đặt Tên Con  ---
registerTool({
    id: 'tab-baby-name',
    name: 'Đặt Tên Con',
    icon: '👶',
    html: '<style>' +
          'body.dark-mode .bn-card { background-image: linear-gradient(to bottom right, #1e293b, #0f172a) !important; border-color: #334155 !important; } ' +
          'body.dark-mode .bn-input { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; color: #f8fafc !important; } ' +
          'body.dark-mode .bn-name-nam { background-color: rgba(30, 58, 138, 0.3) !important; border-color: rgba(59, 130, 246, 0.4) !important; color: #93c5fd !important; } ' +
          'body.dark-mode .bn-name-nu { background-color: rgba(131, 24, 67, 0.3) !important; border-color: rgba(236, 72, 153, 0.4) !important; color: #f9a8d4 !important; } ' +
          '</style>' +
          '<div class="text-center mb-6">' +
          '<span class="bg-pink-100 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-pink-200">Kho dữ liệu vô tận</span>' +
          '<h2 class="text-3xl font-bold mt-2 text-slate-800">Đặt Tên Cho <span class="text-pink-500">Bé Yêu</span> 👶</h2>' +
          '</div>' +
          '<div class="max-w-md mx-auto space-y-6 pb-10">' +

          '' +
          '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">' +
          '<div class="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2"><span class="text-pink-500 text-lg">⚙️</span><h3 class="font-bold text-slate-600 text-sm uppercase">Bộ lọc tùy chỉnh</h3></div>' +
          
          '<div class="flex gap-3">' +
          '<div class="flex-1">' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Giới tính</label>' +
          '<select id="bn-gender" style="text-align-last: center;" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200 cursor-pointer">' +
          '<option value="all">🌈 Nam & Nữ</option>' +
          '<option value="nam">👦 Bé Trai</option>' +
          '<option value="nu">👧 Bé Gái</option>' +
          '</select>' +
          '</div>' +
          '<div class="flex-1">' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Số lượng</label>' +
          '<input id="bn-count" type="number" placeholder="Mặc định: 10" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200">' +
          '</div>' +
          '</div>' +

          '' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Độ dài tên (Số chữ)</label>' +
          '<select id="bn-length" style="text-align-last: center;" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200 cursor-pointer">' +
          '<option value="all">🎲 Ngẫu nhiên (2 đến 6 chữ)</option>' +
          '<option value="3">📝 3 Chữ (VD: Lê Văn A)</option>' +
          '<option value="4">📜 4 Chữ (VD: Nguyễn Thị Thu B)</option>' +
          '<option value="5">🌟 5 Chữ (VD: Nguyễn Lê Huỳnh Phương Tồn)</option>' +
          '<option value="6">🔥 6 Chữ (Độc lạ, siêu dài)</option>' +
          '<option value="2">✂️ 2 Chữ (VD: Trần C)</option>' +
          '</select>' +
          '</div>' +

          '<div class="flex gap-3">' +
          '<div class="flex-1">' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Họ của bé</label>' +
          '<input id="bn-ho" type="text" placeholder="Nguyễn, Lê..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
          '</div>' +
          '<div class="flex-1">' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Chữ lót</label>' +
          '<input id="bn-dem" type="text" placeholder="Lê Huỳnh..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
          '</div>' +
          '</div>' +

          '<div class="flex gap-2 w-full mt-4">' +
          '<button id="bn-btn-reset" class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-xl shadow-sm border border-slate-200 transition active:scale-95 text-[11px] uppercase">' +
          '🔄 Làm Mới' +
          '</button>' +
          '<button id="bn-btn-gen" class="w-2/3 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-sm">' +
          '✨ ĐỀ XUẤT TÊN' +
          '</button>' +
          '</div>' +
          '</div>' +

          '' +
          '<div id="bn-result" class="hidden bn-card bg-slate-50 rounded-[1.5rem] p-5 shadow-sm border border-slate-200">' +
          '<div class="text-pink-600 font-bold text-[10px] tracking-widest uppercase border-b border-pink-200/50 pb-2 mb-3 text-center">DANH SÁCH TÊN GỢI Ý</div>' +
          '<div id="bn-res-list" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>' +
          '</div>' +
          
          '</div>',
    logic: function() {
        var btnGen = document.getElementById('bn-btn-gen');
        var btnReset = document.getElementById('bn-btn-reset');
        var resDiv = document.getElementById('bn-result');
        var resList = document.getElementById('bn-res-list');

        // Viết hoa chữ cái đầu tiên
        var capitalize = function(str) {
            return str.trim().replace(/\s+/g, ' ').split(' ').map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join(' ');
        };

        // Lấy ngẫu nhiên 1 phần tử trong mảng
        var randItem = function(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        btnReset.onclick = function() {
            document.getElementById('bn-gender').value = 'all';
            document.getElementById('bn-count').value = '';
            document.getElementById('bn-length').value = 'all';
            document.getElementById('bn-ho').value = '';
            document.getElementById('bn-dem').value = '';
            resDiv.classList.add('hidden');
        };

        btnGen.onclick = function() {
            if (typeof nam === 'undefined' || typeof nu === 'undefined') {
                alert("Lỗi: Không tìm thấy dữ liệu tên! Hãy chắc chắn file nam.js và nu.js đã được nhúng trong index.html.");
                return;
            }

            // --- BƯỚC 1: TIẾN HÀNH PHÂN RÃ DỮ LIỆU ĐỂ TẠO KHO LẮP RÁP (Chỉ làm 1 lần) ---
            if (!window.nameParsed) {
                window.nameData = {
                    nam: { ho: [], demFull: [], demWords: [], ten: [] },
                    nu: { ho: [], demFull: [], demWords: [], ten: [] }
                };
                var parsePool = function(arr, gender) {
                    arr.forEach(function(n) {
                        var w = n.trim().replace(/\s+/g, ' ').split(' ');
                        if(w.length >= 2) {
                            window.nameData[gender].ho.push(w[0]);
                            window.nameData[gender].ten.push(w[w.length-1]);
                            if(w.length > 2) {
                                var d = w.slice(1, -1);
                                window.nameData[gender].demFull.push(d.join(' ')); // Nguyên cụm lót
                                d.forEach(function(dw) { window.nameData[gender].demWords.push(dw); }); // Từng chữ lót lẻ
                            }
                        }
                    });
                    // Lọc trùng lặp để kho gọn nhẹ
                    window.nameData[gender].ho = [...new Set(window.nameData[gender].ho)];
                    window.nameData[gender].ten = [...new Set(window.nameData[gender].ten)];
                    window.nameData[gender].demFull = [...new Set(window.nameData[gender].demFull)];
                    window.nameData[gender].demWords = [...new Set(window.nameData[gender].demWords)];
                };
                parsePool(nam, 'nam');
                parsePool(nu, 'nu');
                window.nameParsed = true;
            }

            // --- BƯỚC 2: LẤY THÔNG TIN NGƯỜI DÙNG NHẬP ---
            var count = parseInt(document.getElementById('bn-count').value) || 10;
            if (count <= 0 || count > 200) count = 10; // Giới hạn max 200 để tránh treo máy

            var gender = document.getElementById('bn-gender').value;
            var lengthOpt = document.getElementById('bn-length').value;
            var inputHo = document.getElementById('bn-ho').value.trim();
            var inputDem = document.getElementById('bn-dem').value.trim();

            if (lengthOpt === '2' && inputDem !== '') {
                alert("Tên 2 chữ thì không có Chữ lót nhé! Vui lòng xóa 'Chữ lót' hoặc đổi độ dài thành 3-4-5-6 chữ.");
                return;
            }

            var resultsMap = new Map(); // Dùng Map để chống trùng tên tuyệt đối
            var attempts = 0;
            var maxAttempts = count * 100; // Bảo vệ chống treo trình duyệt (lặp tối đa x100 lần)

            // --- BƯỚC 3: THUẬT TOÁN LAI TẠO TÊN VÔ HẠN ---
            while (resultsMap.size < count && attempts < maxAttempts) {
                attempts++;
                
                // Chọn giới tính
                var g = gender === 'all' ? (Math.random() < 0.5 ? 'nam' : 'nu') : gender;
                var data = window.nameData[g];
                
                // Quyết định độ dài (Nếu là ngẫu nhiên thì bốc từ 2 đến 6 chữ)
                var targetL = lengthOpt === 'all' ? (Math.floor(Math.random() * 5) + 2) : parseInt(lengthOpt); 

                // Lắp ráp cơ bản
                var hoStr = inputHo !== '' ? capitalize(inputHo) : randItem(data.ho);
                var tenStr = randItem(data.ten);
                var demInStr = inputDem !== '' ? capitalize(inputDem) : '';

                var c_ho = hoStr.split(' ').length;
                var c_ten = 1; // Tên cuối mặc định 1 chữ
                var c_dem_in = demInStr === '' ? 0 : demInStr.split(' ').length;

                // Tính toán số lượng chữ lót CẦN TÌM THÊM để đạt đúng targetL
                var needed_dem = targetL - c_ho - c_ten - c_dem_in;
                var dem_final = demInStr;

                // Nếu cần bồi thêm chữ lót cho đủ độ dài (Đặc biệt áp dụng cho tên 5-6 chữ)
                if (needed_dem > 0) {
                    var addedDem = '';
                    // 50% tỷ lệ bốc nguyên một cụm chữ lót có sẵn cho tự nhiên, 50% tự tạo chữ mới
                    var exactDems = data.demFull.filter(function(d) { return d.split(' ').length === needed_dem; });
                    if (exactDems.length > 0 && Math.random() < 0.5) {
                        addedDem = randItem(exactDems);
                    } else {
                        // Tự bốc từng chữ lót để ghép (Chống bốc 2 chữ giống nhau liên tiếp)
                        var tempDemArr = [];
                        var lastWord = dem_final.split(' ').pop();
                        for (var j = 0; j < needed_dem; j++) {
                            var w = randItem(data.demWords);
                            var localTries = 0;
                            while (w === lastWord && localTries < 15) { w = randItem(data.demWords); localTries++; }
                            tempDemArr.push(w);
                            lastWord = w;
                        }
                        addedDem = tempDemArr.join(' ');
                    }
                    dem_final = dem_final === '' ? addedDem : (dem_final + ' ' + addedDem);
                } 
                else if (lengthOpt === '2') {
                    // Ép xóa chữ lót nếu chọn 2 chữ
                    dem_final = '';
                }

                // Gộp tất cả lại thành 1 cái tên
                var nameParts = [];
                if (hoStr) nameParts.push(hoStr);
                if (dem_final) nameParts.push(dem_final);
                if (tenStr) nameParts.push(tenStr);
                
                var finalName = nameParts.join(' ').replace(/\s+/g, ' ').trim();
                var finalWordCount = finalName.split(' ').length;

                // Kiểm tra lại lần cuối: Nếu người dùng bắt buộc độ dài X, nhưng bản thân chữ họ/lót người dùng nhập đã quá dài, thì phải chịu khó lấy độ dài thực tế
                if (lengthOpt !== 'all' && finalWordCount !== parseInt(lengthOpt)) {
                    if (c_ho + c_dem_in >= parseInt(lengthOpt)) {
                        // Ngoại lệ: Nhập quá dài, bỏ qua bộ lọc để ưu tiên dữ liệu nhập vào
                    } else {
                        continue; // Làm lại từ đầu nếu bốc nhầm
                    }
                }

                // Nếu tên chưa từng xuất hiện, đưa vào danh sách hiển thị
                if (!resultsMap.has(finalName)) {
                    resultsMap.set(finalName, g);
                }
            }

            // --- BƯỚC 4: XUẤT RA GIAO DIỆN ---
            var generatedHTML = '';
            resultsMap.forEach(function(g, finalName) {
                var icon = g === 'nam' ? '👦' : '👧';
                var colorClass = g === 'nam' ? 'bn-name-nam bg-blue-50 text-blue-700 border-blue-200' : 'bn-name-nu bg-pink-50 text-pink-700 border-pink-200';
                
                generatedHTML += '<div class="p-3 rounded-xl border shadow-sm flex items-center gap-3 transition hover:scale-105 ' + colorClass + '">';
                generatedHTML += '<span class="text-2xl">' + icon + '</span>';
                generatedHTML += '<span class="font-bold text-base">' + finalName + '</span>';
                generatedHTML += '</div>';
            });

            if (resultsMap.size === 0) {
                generatedHTML = '<div class="col-span-1 sm:col-span-2 text-center text-slate-500 italic py-4">Không tìm thấy tổ hợp tên nào! Hãy thử đổi độ dài nhé.</div>';
            }

            resList.innerHTML = generatedHTML;
            resDiv.classList.remove('hidden');
        };
    }
});
