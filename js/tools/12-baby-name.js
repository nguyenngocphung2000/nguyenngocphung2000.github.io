// --- 12. Tool Đặt Tên Con (Sạch data 100% + Full 3 Ô Nhập Liệu) ---
registerTool({
    id: 'tab-baby-name',
    name: 'Đặt Tên Con',
    icon: '👶',
    html: '<style>' +
          'body.dark-mode .bn-card { background-image: linear-gradient(to bottom right, #1e293b, #0f172a) !important; border-color: #334155 !important; } ' +
          'body.dark-mode .bn-input { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; color: #f8fafc !important; } ' +
          'body.dark-mode .bn-name-nam { background-color: rgba(30, 58, 138, 0.4) !important; border-color: rgba(59, 130, 246, 0.5) !important; color: #bfdbfe !important; } ' +
          'body.dark-mode .bn-name-nu { background-color: rgba(131, 24, 67, 0.4) !important; border-color: rgba(236, 72, 153, 0.5) !important; color: #fbcfe8 !important; } ' +
          'body.dark-mode .bn-icon-nam { background-color: rgba(59, 130, 246, 0.2) !important; color: #60a5fa !important; } ' +
          'body.dark-mode .bn-icon-nu { background-color: rgba(236, 72, 153, 0.2) !important; color: #f472b6 !important; } ' +
          '</style>' +
          '<div class="text-center mb-6">' +
          '<span class="bg-pink-100 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-pink-200">Kho dữ liệu vô tận</span>' +
          '<h2 class="text-3xl font-bold mt-2 text-slate-800">Đặt Tên Cho <span class="text-pink-500">Bé Yêu</span></h2>' +
          '</div>' +
          '<div class="max-w-md mx-auto space-y-6 pb-10">' +

          '' +
          '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">' +
          '<div class="flex items-center gap-2 border-b border-slate-100 pb-2 mb-2"><span class="text-pink-500 text-lg">⚙️</span><h3 class="font-bold text-slate-600 text-sm uppercase">Bộ lọc tùy chỉnh</h3></div>' +
          '<p class="text-[10.5px] text-slate-500 italic mt-0 leading-relaxed font-medium">💡 Mẹo: Muốn tìm gì thì BỎ TRỐNG ô đấy. Máy sẽ tự tìm những từ hay nhất trong kho để đắp vào chỗ trống cho bạn.</p>' +
          
          '<div class="flex gap-3">' +
          '<div class="flex-1">' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Giới tính</label>' +
          '<select id="bn-gender" style="text-align-last: center;" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200 cursor-pointer">' +
          '<option value="all">Tất cả</option>' +
          '<option value="nam">Nam</option>' +
          '<option value="nu">Nữ</option>' +
          '</select>' +
          '</div>' +
          '<div class="flex-1">' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Số lượng</label>' +
          '<input id="bn-count" type="number" placeholder="Mặc định: 10" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200">' +
          '</div>' +
          '</div>' +

          '' +
          '<div>' +
          '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Độ dài tên</label>' +
          '<select id="bn-length" style="text-align-last: center;" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200 cursor-pointer">' +
          '<option value="all">Ngẫu nhiên</option>' +
          '<option value="2">2 Chữ</option>' +
          '<option value="3">3 Chữ</option>' +
          '<option value="4">4 Chữ</option>' +
          '<option value="5">5 Chữ</option>' +
          '<option value="6">6 Chữ</option>' +
          '</select>' +
          '</div>' +

          '' +
          '<div class="flex gap-2">' +
          '<div class="w-1/3">' +
          '<label class="text-[9px] font-bold text-slate-400 uppercase mb-1.5 block ml-1 text-center">Họ</label>' +
          '<input id="bn-ho" type="text" placeholder="Nguyễn..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-center font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
          '</div>' +
          '<div class="w-1/3">' +
          '<label class="text-[9px] font-bold text-slate-400 uppercase mb-1.5 block ml-1 text-center">Chữ lót</label>' +
          '<input id="bn-dem" type="text" placeholder="Thị, Văn..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-center font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
          '</div>' +
          '<div class="w-1/3">' +
          '<label class="text-[9px] font-bold text-slate-400 uppercase mb-1.5 block ml-1 text-center">Tên chính</label>' +
          '<input id="bn-ten" type="text" placeholder="Tâm..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-center font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
          '</div>' +
          '</div>' +

          '<div class="w-full mt-4">' +
          '<button id="bn-btn-gen" class="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-[13px] uppercase tracking-wide">' +
          '✨ Đề Xuất Tên ✨' +
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
        var resDiv = document.getElementById('bn-result');
        var resList = document.getElementById('bn-res-list');

        // Hàm chuẩn hóa viết hoa chữ cái đầu
        var capitalize = function(str) {
            return str.trim().replace(/\s+/g, ' ').split(' ').map(function(word) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join(' ');
        };

        var randItem = function(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        };

        // BỘ CÔNG CỤ LÀM SẠCH DATA DÍNH CHỮ SIÊU CẤP
        var fixStuckWords = function(str) {
            var s = str.trim();
            // 1. Hoa thường dính nhau (NguyễnThị)
            var lower = "a-zàáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ";
            var upper = "A-ZÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ";
            s = s.replace(new RegExp("([" + lower + "])([" + upper + "])", "g"), "$1 $2");

            // 2. Tách 2 chữ thường dính nhau bằng Luật Ngữ Âm Tiếng Việt
            var vowels = "aàáảãạăằắẳẵặâầấẩẫậeèéẻẽẹêềếểễệiìíỉĩịoòóỏõọôồốổỗộơờớởỡợuùúủũụưừứửữựyỳýỷỹỵ";
            
            // Nguyên âm dính vào phụ âm không bao giờ đứng cuối (Ví dụ: lêvăn -> êv -> chia rẽ)
            s = s.replace(new RegExp("([" + vowels + "])([bdđhklqrsvx])", "gi"), "$1 $2");
            
            // Phụ âm cuối dính phụ âm đầu (Ví dụ: nguyễnthị -> nt -> chia rẽ)
            s = s.replace(/n([bcdđklmpqrstvx])/gi, "n $1"); 
            s = s.replace(/m([bcdđghklmnpqrstvx])/gi, "m $1");
            s = s.replace(/c([bcdđgklmnpqrstvx])/gi, "c $1"); 
            s = s.replace(/p([bcdđghklmnpqrstvx])/gi, "p $1");
            s = s.replace(/t([bcdđgklmnpqsx])/gi, "t $1"); 
            s = s.replace(/g([bcdđklmnpqrstvx])/gi, "g $1"); 

            // Ép tách 1 số bộ đôi họ/lót cực kỳ hay bị dính mà quét regex có thể lọt lưới
            s = s.replace(/(nguyễn|trần|lê|phạm|hoàng|huỳnh|phan|vũ|võ|đặng|bùi|đỗ|hồ|ngô|dương|lý)(thị|văn|ngọc|xuân|thu|minh)/gi, "$1 $2");
            s = s.replace(/(thị|văn|ngọc|xuân|thanh|minh)(thu|hoàng|trần|phạm|lê|nguyễn|huỳnh|đặng|bùi)/gi, "$1 $2");

            return s.replace(/\s+/g, ' ').trim();
        };

        btnGen.onclick = function() {
            if (typeof nam === 'undefined' || typeof nu === 'undefined') {
                alert("Lỗi: Không tìm thấy dữ liệu tên! Hãy chắc chắn file nam.js và nu.js đã được nhúng trong index.html.");
                return;
            }

            // --- BƯỚC 1: QUÉT DATA VÀ KHỬ DÍNH CHỮ ---
            if (!window.nameParsed) {
                window.nameData = {
                    nam: { ho: [], demFull: [], demWords: [], ten: [] },
                    nu: { ho: [], demFull: [], demWords: [], ten: [] }
                };
                var parsePool = function(arr, gender) {
                    arr.forEach(function(n) {
                        // Cho chạy qua máy khử dính chữ trước khi băm
                        var cleanName = fixStuckWords(n);
                        var w = cleanName.split(' ');
                        
                        if(w.length >= 2) {
                            window.nameData[gender].ho.push(w[0]);
                            window.nameData[gender].ten.push(w[w.length-1]);
                            if(w.length > 2) {
                                var d = w.slice(1, -1);
                                window.nameData[gender].demFull.push(d.join(' ')); 
                                d.forEach(function(dw) { window.nameData[gender].demWords.push(dw); }); 
                            }
                        }
                    });
                    window.nameData[gender].ho = [...new Set(window.nameData[gender].ho)];
                    window.nameData[gender].ten = [...new Set(window.nameData[gender].ten)];
                    window.nameData[gender].demFull = [...new Set(window.nameData[gender].demFull)];
                    window.nameData[gender].demWords = [...new Set(window.nameData[gender].demWords)];
                };
                parsePool(nam, 'nam');
                parsePool(nu, 'nu');
                window.nameParsed = true;
            }

            // --- BƯỚC 2: ĐỌC DỮ LIỆU NGƯỜI DÙNG YÊU CẦU ---
            var count = parseInt(document.getElementById('bn-count').value) || 10;
            if (count <= 0 || count > 200) count = 10; 

            var gender = document.getElementById('bn-gender').value;
            var lengthOpt = document.getElementById('bn-length').value;
            
            var inputHo = document.getElementById('bn-ho').value.trim();
            var inputDem = document.getElementById('bn-dem').value.trim();
            var inputTen = document.getElementById('bn-ten').value.trim(); // Đã thêm ô Tên

            if (lengthOpt === '2' && inputDem !== '') {
                alert("Tên 2 chữ thì không có Chữ lót nhé! Vui lòng xóa 'Chữ lót' hoặc đổi độ dài thành 3-4-5-6 chữ.");
                return;
            }

            var resultsMap = new Map(); 
            var attempts = 0;
            var maxAttempts = count * 100; 

            // --- BƯỚC 3: THUẬT TOÁN LAI TẠO TÊN ---
            while (resultsMap.size < count && attempts < maxAttempts) {
                attempts++;
                
                var g = gender === 'all' ? (Math.random() < 0.5 ? 'nam' : 'nu') : gender;
                var data = window.nameData[g];
                
                var targetL = lengthOpt === 'all' ? (Math.floor(Math.random() * 5) + 2) : parseInt(lengthOpt); 

                // Nếu bạn có nhập thì ưu tiên từ của bạn, bỏ trống thì máy tự bốc
                var hoStr = inputHo !== '' ? capitalize(inputHo) : randItem(data.ho);
                var demInStr = inputDem !== '' ? capitalize(inputDem) : '';
                var tenStr = inputTen !== '' ? capitalize(inputTen) : randItem(data.ten);

                var c_ho = hoStr.split(' ').length;
                var c_ten = tenStr.split(' ').length; 
                var c_dem_in = demInStr === '' ? 0 : demInStr.split(' ').length;

                var needed_dem = targetL - c_ho - c_ten - c_dem_in;
                var dem_final = demInStr;

                if (needed_dem > 0) {
                    var addedDem = '';
                    var exactDems = data.demFull.filter(function(d) { return d.split(' ').length === needed_dem; });
                    if (exactDems.length > 0 && Math.random() < 0.5) {
                        addedDem = randItem(exactDems);
                    } else {
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
                    dem_final = '';
                }

                var nameParts = [];
                if (hoStr) nameParts.push(hoStr);
                if (dem_final) nameParts.push(dem_final);
                if (tenStr) nameParts.push(tenStr);
                
                var finalName = nameParts.join(' ').replace(/\s+/g, ' ').trim();
                var finalWordCount = finalName.split(' ').length;

                if (lengthOpt !== 'all' && finalWordCount !== parseInt(lengthOpt)) {
                    if (c_ho + c_dem_in + c_ten >= parseInt(lengthOpt)) {
                        // Ngoại lệ an toàn
                    } else {
                        continue; 
                    }
                }

                if (!resultsMap.has(finalName)) {
                    resultsMap.set(finalName, g);
                }
            }

            // --- BƯỚC 4: RENDER KẾT QUẢ ---
            var generatedHTML = '';
            resultsMap.forEach(function(g, finalName) {
                var icon = g === 'nam' ? '♂' : '♀';
                var colorClass = g === 'nam' 
                    ? 'bn-name-nam bg-blue-100 text-blue-800 border-blue-300' 
                    : 'bn-name-nu bg-pink-100 text-pink-800 border-pink-300';
                    
                var iconBgClass = g === 'nam' 
                    ? 'bn-icon-nam bg-blue-200 text-blue-600' 
                    : 'bn-icon-nu bg-pink-200 text-pink-600';
                
                generatedHTML += '<div class="p-3 rounded-xl border shadow-sm flex items-center gap-3 transition hover:scale-105 ' + colorClass + '">';
                generatedHTML += '<div class="flex items-center justify-center w-8 h-8 rounded-full ' + iconBgClass + '"><span class="text-xl font-black leading-none pb-0.5">' + icon + '</span></div>';
                generatedHTML += '<span class="font-bold text-[15px]">' + finalName + '</span>';
                generatedHTML += '</div>';
            });

            if (resultsMap.size === 0) {
                generatedHTML = '<div class="col-span-1 sm:col-span-2 text-center text-slate-500 italic py-4">Không tìm thấy tổ hợp tên nào! Hãy thử đổi bộ lọc nhé.</div>';
            }

            resList.innerHTML = generatedHTML;
            resDiv.classList.remove('hidden');
        };
    }
});
