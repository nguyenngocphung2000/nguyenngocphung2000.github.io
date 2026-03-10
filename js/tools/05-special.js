// --- 5. Tool Kí tự đặc biệt (Bản Siêu Cấp: Chữ Thư Pháp + PNG Photoshop) ---
registerTool({
    id: 'tab-special-chars',
    name: 'Kí Tự Đặc Biệt',
    icon: '✨',
    html: `
        <div class="text-center mb-6">
            <span class="bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Sáng tạo</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Tạo Tên <span class="text-purple-500">Đặc Biệt</span> ✨</h2>
            <p class="text-sm text-gray-500 mt-2 italic">100+ đề xuất ngầu & Studio chữ thư pháp PNG tách nền!</p>
        </div>

        <div class="space-y-6 max-w-4xl mx-auto">
            
            <div class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-indigo-400 shadow-xl">
                <div class="flex flex-col md:flex-row justify-between mb-4 gap-4">
                    <div class="flex items-start space-x-3">
                        <div class="bg-indigo-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">🔤</div>
                        <div>
                            <h3 class="font-bold text-gray-800">Studio Chữ Nghệ Thuật (Tải PNG)</h3>
                            <p class="text-xs text-gray-500">Tải font, viết thư pháp dọc và xuất ảnh trong suốt!</p>
                        </div>
                    </div>
                    <label class="cursor-pointer bg-indigo-100 text-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-200 transition shadow-sm whitespace-nowrap text-center h-fit">
                        📂 Chọn Font (.ttf, .otf)
                        <input type="file" id="font-upload" accept=".ttf, .otf, .woff, .woff2" class="hidden">
                    </label>
                </div>

                <div class="flex flex-wrap items-center gap-2 mb-4 bg-indigo-50 p-2 md:p-3 rounded-xl border border-indigo-100 text-sm">
                    <button class="font-btn p-2 rounded-lg hover:bg-indigo-200 bg-indigo-200 shadow-sm font-bold text-indigo-700 transition" data-align="left" title="Căn trái">⬅️ Trái</button>
                    <button class="font-btn p-2 rounded-lg hover:bg-indigo-200 bg-transparent font-bold text-indigo-700 transition" data-align="center" title="Căn giữa">↔️ Giữa</button>
                    <button class="font-btn p-2 rounded-lg hover:bg-indigo-200 bg-transparent font-bold text-indigo-700 transition" data-align="right" title="Căn phải">➡️ Phải</button>

                    <div class="w-px h-6 bg-indigo-300 mx-1 hidden md:block"></div>

                    <button id="btn-vertical" class="p-2 rounded-lg hover:bg-indigo-200 bg-white border border-indigo-100 shadow-sm font-bold text-indigo-700 transition" title="Xếp từ theo chiều dọc">⬇️ Dọc</button>

                    <div class="w-px h-6 bg-indigo-300 mx-1 hidden md:block"></div>

                    <div class="flex items-center gap-2 bg-white px-2 py-1 rounded-lg shadow-sm border border-indigo-100">
                        <input type="color" id="font-color" value="#4f46e5" class="w-8 h-8 rounded cursor-pointer border-none p-0 bg-transparent" title="Màu chữ">
                        <input type="range" id="font-size" min="20" max="150" value="40" class="w-20 md:w-24 cursor-pointer accent-indigo-500" title="Cỡ chữ">
                    </div>

                    <div class="w-full md:w-px md:h-6 bg-transparent md:bg-indigo-300 mx-1"></div>

                    <button id="btn-download-png" class="flex-1 md:flex-none bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-4 py-2 rounded-lg text-xs shadow-md transition ml-auto flex justify-center items-center gap-2">
                        <span>📥</span> TẢI PNG
                    </button>
                </div>

                <div class="flex flex-col md:flex-row gap-4">
                    <textarea id="custom-font-input" class="w-full md:w-1/2 h-48 bg-white border border-indigo-100 rounded-2xl p-4 outline-none focus:ring-2 ring-indigo-200 text-gray-700 resize-none font-medium placeholder-gray-400" placeholder="Nhập nội dung chữ của bạn vào đây..."></textarea>

                    <div class="w-full md:w-1/2 min-h-[12rem] bg-gray-100 rounded-2xl border border-indigo-200 overflow-hidden relative flex p-4" style="background-image: linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%); background-size: 20px 20px; background-position: 0 0, 0 10px, 10px -10px, -10px 0px;">
                        <div id="custom-font-preview" class="w-full h-full text-[#4f46e5] break-words" style="text-align: left;">Chữ sẽ hiện ở đây</div>
                    </div>
                </div>
            </div>

            <div class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-purple-400 shadow-xl">
                <div class="flex items-start space-x-3 mb-4">
                    <div class="bg-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">🎲</div>
                    <div>
                        <h3 class="font-bold text-gray-800">Máy Tạo Nickname Tự Động</h3>
                        <p class="text-xs text-gray-500">Nhập tên để xuất xưởng 100 siêu phẩm!</p>
                    </div>
                </div>
                
                <div class="relative w-full mb-6">
                    <input type="text" id="nick-input" class="w-full bg-purple-50/50 border-2 border-purple-100 rounded-2xl p-4 pr-32 outline-none focus:border-purple-400 focus:ring-4 ring-purple-100 font-bold text-lg text-purple-700 placeholder-purple-300 transition" placeholder="Nhập tên vào đây...">
                    <button id="btn-gen-nick" class="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-4 md:px-6 rounded-xl transition shadow-md active:scale-95 whitespace-nowrap">TẠO 100 TÊN</button>
                </div>

                <div class="bg-white/50 rounded-2xl p-4 border border-purple-50">
                    <div class="flex justify-between items-center mb-3">
                        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">100 Đề Xuất (Click để Copy)</p>
                        <span id="copy-toast-nick" class="opacity-0 transition-opacity bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Đã Copy! ✔</span>
                    </div>
                    
                    <div id="nick-results" class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        <div class="text-center p-4 text-sm text-gray-400 italic w-full col-span-full">Vui lòng nhập tên và bấm nút TẠO 100 TÊN!</div>
                    </div>
                </div>
            </div>

            <div class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-pink-400 shadow-xl relative">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-start space-x-3">
                        <div class="bg-pink-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0">💎</div>
                        <div>
                            <h3 class="font-bold text-gray-800">Kho Kí Tự Tổng Hợp</h3>
                            <p class="text-xs text-gray-500">Chạm vào kí tự bất kỳ để Copy!</p>
                        </div>
                    </div>
                    <span id="copy-toast-lib" class="opacity-0 transition-opacity bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">Đã Copy! ✔</span>
                </div>
                
                <div id="char-library" class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"></div>
            </div>
        </div>
    `,
    logic: function() {
        // ==========================================
        // 1. LOGIC STUDIO CHỮ & PNG (Viết dọc kiểu thư pháp)
        // ==========================================
        const fontUpload = document.getElementById('font-upload');
        const fontPreview = document.getElementById('custom-font-preview');
        const fontInput = document.getElementById('custom-font-input');
        const btnVertical = document.getElementById('btn-vertical');
        const fontColor = document.getElementById('font-color');
        const fontSize = document.getElementById('font-size');
        const alignBtns = document.querySelectorAll('.font-btn');
        const btnDownload = document.getElementById('btn-download-png');

        let currentAlign = 'left';
        let isVertical = false;
        let loadedFontName = '';

        const updatePreview = () => {
            let actualText = fontInput.value;
            if (!actualText.trim()) actualText = "Tết trong nhà\nLộc trên trời";
            
            fontPreview.style.color = fontColor.value;
            fontPreview.style.fontSize = fontSize.value + 'px';
            fontPreview.style.fontFamily = loadedFontName || 'sans-serif';

            if (isVertical) {
                // Tách từng dòng thành cột, tách từng từ xuống hàng
                const lines = actualText.split('\n');
                fontPreview.innerHTML = '';
                fontPreview.style.display = 'flex';
                fontPreview.style.flexDirection = 'row';
                
                if (currentAlign === 'center') fontPreview.style.justifyContent = 'center';
                else if (currentAlign === 'right') fontPreview.style.justifyContent = 'flex-end';
                else fontPreview.style.justifyContent = 'flex-start';
                
                fontPreview.style.gap = '2rem';
                fontPreview.style.writingMode = 'horizontal-tb';
                fontPreview.style.textAlign = 'center'; // Canh giữa các từ trong 1 cột
                
                lines.forEach(line => {
                    const col = document.createElement('div');
                    const words = line.trim().split(/\s+/).filter(w => w.length > 0);
                    col.innerHTML = words.join('<br>');
                    fontPreview.appendChild(col);
                });
            } else {
                fontPreview.style.display = 'block';
                fontPreview.style.writingMode = 'horizontal-tb';
                fontPreview.style.textAlign = currentAlign;
                fontPreview.innerHTML = actualText.replace(/\n/g, '<br>');
            }
        };

        fontInput.addEventListener('input', updatePreview);
        fontColor.addEventListener('input', updatePreview);
        fontSize.addEventListener('input', updatePreview);

        fontUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(evt) {
                const fontDataUrl = evt.target.result;
                loadedFontName = 'CustomFont_' + Date.now();
                const newFont = new FontFace(loadedFontName, `url(${fontDataUrl})`);
                newFont.load().then((loaded) => {
                    document.fonts.add(loaded);
                    fontInput.placeholder = "✅ Font tải thành công! Gõ chữ vào đây...";
                    if(!fontInput.value) {
                        fontInput.value = "Tết trong nhà\nLộc trên trời";
                    }
                    updatePreview();
                }).catch(err => alert("Lỗi tải font. Hãy đảm bảo file bạn chọn là định dạng .ttf hoặc .otf!"));
            };
            reader.readAsDataURL(file);
        });

        alignBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                alignBtns.forEach(b => { 
                    b.classList.remove('bg-indigo-200'); 
                    b.classList.add('bg-transparent'); 
                });
                btn.classList.add('bg-indigo-200');
                btn.classList.remove('bg-transparent');
                
                currentAlign = btn.getAttribute('data-align');
                updatePreview();
            });
        });

        btnVertical.addEventListener('click', () => {
            isVertical = !isVertical;
            if(isVertical) {
                btnVertical.classList.add('bg-indigo-500', 'text-white');
                btnVertical.classList.remove('bg-white');
            } else {
                btnVertical.classList.remove('bg-indigo-500', 'text-white');
                btnVertical.classList.add('bg-white');
            }
            updatePreview();
        });

        // XUẤT ẢNH PNG CỰC NÉT
        btnDownload.addEventListener('click', () => {
            let actualText = fontInput.value;
            if (!actualText.trim()) actualText = "Tết trong nhà\nLộc trên trời";

            const scale = 3; 
            const size = parseInt(fontSize.value) * scale; 
            const color = fontColor.value;
            const fontFamily = loadedFontName || 'sans-serif';

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const lines = actualText.split('\n'); 

            ctx.font = `${size}px "${fontFamily}"`;

            if (isVertical) {
                let colWidths = [];
                let totalWidth = 0;
                let maxTotalHeight = 0;
                const gap = size * 1.5; 
                
                const cols = lines.map(line => line.trim().split(/\s+/).filter(w => w.length > 0));
                
                cols.forEach(words => {
                    let maxW = 0;
                    let totalH = 0;
                    words.forEach(word => {
                        let w = ctx.measureText(word).width;
                        if(w > maxW) maxW = w;
                        totalH += size * 1.3;
                    });
                    colWidths.push(maxW);
                    totalWidth += maxW;
                    if(totalH > maxTotalHeight) maxTotalHeight = totalH;
                });
                
                totalWidth += gap * (Math.max(0, cols.length - 1));
                
                canvas.width = totalWidth + (40 * scale);
                canvas.height = maxTotalHeight + (40 * scale);

                ctx.font = `${size}px "${fontFamily}"`; 
                ctx.fillStyle = color;
                ctx.textBaseline = 'top';
                ctx.textAlign = 'center';

                let startX = 20 * scale; 
                let startY = 20 * scale;

                cols.forEach((words, i) => {
                    let curX = startX + (colWidths[i] / 2);
                    let curY = startY;
                    words.forEach(word => {
                        ctx.fillText(word, curX, curY);
                        curY += size * 1.3;
                    });
                    startX += colWidths[i] + gap;
                });
            } else {
                let maxWidth = 0;
                lines.forEach(line => {
                    let w = ctx.measureText(line).width;
                    if(w > maxWidth) maxWidth = w;
                });
                
                canvas.width = maxWidth + (40 * scale);
                canvas.height = (lines.length * size * 1.3) + (40 * scale);

                ctx.font = `${size}px "${fontFamily}"`; 
                ctx.fillStyle = color;
                ctx.textBaseline = 'top';

                let startY = 20 * scale;
                let startX = 20 * scale;

                if (currentAlign === 'center') {
                    ctx.textAlign = 'center';
                    startX = canvas.width / 2;
                } else if (currentAlign === 'right') {
                    ctx.textAlign = 'right';
                    startX = canvas.width - (20 * scale);
                } else {
                    ctx.textAlign = 'left';
                    startX = 20 * scale;
                }

                lines.forEach(line => {
                    ctx.fillText(line, startX, startY);
                    startY += size * 1.3;
                });
            }

            const a = document.createElement('a');
            a.download = 'Chu_Nghe_Thuat_Tach_Nen.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
        });

        // Initialize preview on first load
        updatePreview();

        // ==========================================
        // 2. LOGIC TẠO 100 ĐỀ XUẤT TÊN
        // ==========================================
        const copyToClipboard = (text, toastId) => {
            navigator.clipboard.writeText(text).then(() => {
                const toast = document.getElementById(toastId);
                toast.classList.remove('opacity-0');
                setTimeout(() => toast.classList.add('opacity-0'), 1500);
            });
        };

        const mapCircled = {'a':'ⓐ','b':'ⓑ','c':'ⓒ','d':'ⓓ','e':'ⓔ','f':'ⓕ','g':'ⓖ','h':'ⓗ','i':'ⓘ','j':'ⓙ','k':'ⓚ','l':'ⓛ','m':'ⓜ','n':'ⓝ','o':'ⓞ','p':'ⓟ','q':'ⓠ','r':'ⓡ','s':'ⓢ','t':'ⓣ','u':'ⓤ','v':'ⓥ','w':'ⓦ','x':'ⓧ','y':'ⓨ','z':'ⓩ','A':'Ⓐ','B':'Ⓑ','C':'Ⓒ','D':'Ⓓ','E':'Ⓔ','F':'Ⓕ','G':'Ⓖ','H':'Ⓗ','I':'Ⓘ','J':'Ⓙ','K':'Ⓚ','L':'Ⓛ','M':'Ⓜ','N':'Ⓝ','O':'Ⓞ','P':'Ⓟ','Q':'Ⓠ','R':'Ⓡ','S':'Ⓢ','T':'Ⓣ','U':'Ⓤ','V':'Ⓥ','W':'Ⓦ','X':'Ⓧ','Y':'Ⓨ','Z':'Ⓩ'};
        const mapSmallCaps = {'a':'ᴀ','b':'ʙ','c':'ᴄ','d':'ᴅ','e':'ᴇ','f':'ғ','g':'ɢ','h':'ʜ','i':'ɪ','j':'ᴊ','k':'ᴋ','l':'ʟ','m':'ᴍ','n':'ɴ','o':'ᴏ','p':'ᴘ','q':'ǫ','r':'ʀ','s':'s','t':'ᴛ','u':'ᴜ','v':'ᴠ','w':'ᴡ','x':'x','y':'ʏ','z':'ᴢ'};
        const mapThai = {'a':'ค','b':'๒','c':'८','d':'๔','e':'є','f':'Ŧ','g':'g','h':'ђ','i':'เ','j':'ן','k':'к','l':'ɭ','m':'๓','n':'ภ','o':'๏','p':'ק','q':'ף','r':'г','s':'ร','t':'т','u':'ย','v':'ש','w':'ฬ','x':'א','y':'ץ','z':'z'};
        const mapAsian = {'a':'卂','b':'乃','c':'匚','d':'刀','e':'乇','f':'千','g':'Ꮆ','h':'卄','i':'丨','j':'ﾌ','k':'Ҝ','l':'ㄥ','m':'爪','n':'几','o':'ㄖ','p':'卩','q':'Ɋ','r':'尺','s':'丂','t':'ㄒ','u':'ㄩ','v':'ᐯ','w':'ᗯ','x':'乂','y':'ㄚ','z':'乙'};
        const mapBold = {'a':'𝗮','b':'𝗯','c':'𝗰','d':'𝗱','e':'𝗲','f':'𝗳','g':'𝗴','h':'𝗵','i':'𝗶','j':'𝗷','k':'𝗸','l':'𝗹','m':'𝗺','n':'𝗻','o':'𝗼','p':'𝗽','q':'𝗾','r':'𝗿','s':'𝘀','t':'𝘁','u':'𝘂','v':'𝘃','w':'𝘄','x':'𝘅','y':'𝘆','z':'𝘇','A':'𝗔','B':'𝗕','C':'𝗖','D':'𝗗','E':'𝗘','F':'𝗙','G':'𝗚','H':'𝗛','I':'𝗜','J':'𝗝','K':'𝗞','L':'𝗟','M':'𝗠','N':'𝗡','O':'𝗢','P':'𝗣','Q':'𝗤','R':'𝗥','S':'𝗦','T':'𝗧','U':'𝗨','V':'𝗩','W':'𝗪','X':'𝗫','Y':'𝗬','Z':'𝗭'};
        const mapItalic = {'a':'𝘢','b':'𝘣','c':'𝘤','d':'𝘥','e':'𝘦','f':'𝘧','g':'𝘨','h':'𝘩','i':'𝘪','j':'𝘫','k':'𝘬','l':'𝘭','m':'𝘮','n':'𝘯','o':'𝘰','p':'𝘱','q':'𝘲','r':'𝘳','s':'𝘴','t':'𝘵','u':'𝘶','v':'𝘷','w':'𝘸','x':'𝘹','y':'𝘺','z':'𝘻','A':'𝘈','B':'𝘉','C':'𝘊','D':'𝘋','E':'𝘌','F':'𝘍','G':'𝘎','H':'𝘏','I':'𝘐','J':'𝘑','K':'𝘒','L':'𝘓','M':'𝘔','N':'𝘕','O':'𝘖','P':'𝘗','Q':'𝘘','R':'𝘙','S':'𝘚','T':'𝘛','U':'𝘜','V':'𝘝','W':'𝘞','X':'𝘟','Y':'𝘠','Z':'𝘡'};
        const mapDoubleStruck = {'a':'𝕒','b':'𝕓','c':'𝕔','d':'𝕕','e':'𝕖','f':'𝕗','g':'𝕘','h':'𝕙','i':'𝕚','j':'𝕛','k':'𝕜','l':'𝕝','m':'𝕞','n':'𝕟','o':'𝕠','p':'𝕡','q':'𝕢','r':'𝕣','s':'𝕤','t':'𝕥','u':'𝕦','v':'𝕧','w':'𝕨','x':'𝕩','y':'𝕪','z':'𝕫','A':'𝔸','B':'𝔹','C':'ℂ','D':'𝔻','E':'𝔼','F':'𝔽','G':'𝔾','H':'ℍ','I':'𝕀','J':'𝕁','K':'𝕂','L':'𝕃','M':'𝕄','N':'ℕ','O':'𝕆','P':'ℙ','Q':'ℚ','R':'ℝ','S':'𝕊','T':'𝕋','U':'𝕌','V':'𝕍','W':'𝕎','X':'𝕏','Y':'𝕐','Z':'ℤ'};
        const mapScript = {'a':'𝒶','b':'𝒷','c':'𝒸','d':'𝒹','e':'ℯ','f':'𝒻','g':'ℊ','h':'𝒽','i':'𝒾','j':'𝒿','k':'𝓀','l':'𝓁','m':'𝓂','n':'𝓃','o':'ℴ','p':'𝓅','q':'𝓆','r':'𝓇','s':'𝓈','t':'𝓉','u':'𝓊','v':'𝓋','w':'𝓌','x':'𝓍','y':'𝓎','z':'𝓏','A':'𝒜','B':'ℬ','C':'𝒞','D':'𝒟','E':'ℰ','F':'ℱ','G':'𝒢','H':'ℋ','I':'ℐ','J':'𝒿','K':'𝒦','L':'ℒ','M':'ℳ','N':'𝒩','O':'𝒪','P':'𝒫','Q':'𝒬','R':'ℛ','S':'𝒮','T':'𝒯','U':'𝒰','V':'𝒱','W':'𝒲','X':'𝒳','Y':'𝒴','Z':'𝒵'};

        const convertMap = (text, mapObj) => text.split('').map(c => mapObj[c] || mapObj[c.toLowerCase()] || c).join('');

        const generate100Names = () => {
            const rawName = document.getElementById('nick-input').value.trim();
            const resultsDiv = document.getElementById('nick-results');
            
            if(!rawName) {
                resultsDiv.innerHTML = '<div class="text-center p-4 text-sm text-red-400 italic w-full col-span-full">Vui lòng nhập tên trước nhé!</div>';
                return;
            }

            let results = [];
            
            results.push({ label: "Giai điệu", val: convertMap(rawName, mapCircled) });
            results.push({ label: "Mẫu 127", val: rawName.split('').join('\u0330') + '\u0330' });
            results.push({ label: "Mẫu 150", val: '꧁ ' + rawName + ' ꧂' });
            results.push({ label: "Âm nhạc", val: convertMap(rawName.toLowerCase(), mapThai) });
            results.push({ label: "Thịnh hành", val: convertMap(rawName.toLowerCase(), mapSmallCaps) });
            results.push({ label: "Khoảng trống", val: rawName.toUpperCase().split('').join(' ') });
            results.push({ label: "Sao + Hoa", val: rawName.split('').join('✿') });
            results.push({ label: "Tia sét", val: rawName.split('').join('ϟ') });
            results.push({ label: "Thánh giá", val: rawName.toUpperCase().split('').join('✞') });
            results.push({ label: "In đậm", val: convertMap(rawName, mapBold) });

            const fonts = [
                {n:"Chuẩn", m:null}, {n:"Nghiêng", m:mapItalic}, {n:"Script", m:mapScript},
                {n:"Double", m:mapDoubleStruck}, {n:"Á Đông", m:mapAsian}
            ];
            const decos = [
                ["༺ ", " ༻"], ["【 ", " 】"], ["⫷ ", " ⫸"], ["-`ღ'- ", " -`ღ'-"],
                ["♡ ", " ♡"], ["★ ", " ★"], ["« ", " »"], ["👑 ", " 👑"], 
                ["🔥 ", " 🔥"], ["❄️ ", " ❄️"], ["♔ ", " ♔"], ["✿ ", " ツ"],
                ["╰‿╯", "╰‿╯"], ["★彡 ", " 彡★"], ["◥꧁ ", " ꧂◤"], ["(¬‿¬) ", " (¬‿¬)"],
                ["『 ", " 』"], ["♜ ", " ♜"], ["♪ ", " ♪"], ["✦ ", " ✦"], 
                ["☠ ", " ☠"], ["☽ ", " ☾"], ["⚡ ", " ⚡"]
            ];

            let count = 11;
            for (let d of decos) {
                for (let f of fonts) {
                    if (results.length >= 100) break;
                    let txt = f.m ? convertMap(rawName, f.m) : rawName;
                    results.push({ label: `Mẫu ${count++}`, val: d[0] + txt + d[1] });
                }
                if (results.length >= 100) break;
            }

            resultsDiv.innerHTML = '';
            results.forEach(item => {
                const div = document.createElement('div');
                div.className = 'flex items-center justify-between bg-white border border-purple-100 p-2 md:p-3 rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer';
                div.onclick = () => copyToClipboard(item.val, 'copy-toast-nick');
                
                div.innerHTML = `
                    <div class="flex items-center gap-3 overflow-hidden flex-1">
                        <span class="text-[10px] md:text-xs text-gray-500 font-medium w-16 md:w-20 shrink-0 truncate">${item.label}</span>
                        <span class="font-bold text-gray-800 text-sm md:text-base group-hover:text-purple-600 transition truncate flex-1">${item.val}</span>
                    </div>
                    <button class="text-[10px] md:text-xs bg-purple-50 text-purple-600 font-bold px-3 py-1.5 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition shrink-0 ml-2">Copy</button>
                `;
                resultsDiv.appendChild(div);
            });
        };

        document.getElementById('btn-gen-nick').addEventListener('click', generate100Names);
        document.getElementById('nick-input').addEventListener('keypress', (e) => {
            if(e.key === 'Enter') generate100Names();
        });

        // ==========================================
        // 3. KHO KÍ TỰ TỔNG HỢP
        // ==========================================
        const symbolsVIP = "࿐ 亗 ツ ✿ -`ღ'- ༉ ༊ Ლ Ღ ౘ ༒ ☻ ☹ ༄ ༆ ༇ ༈ ༊ ҉ 𓅂 ༂ ༃ ⚚ ๖ ؄ ఴ 𐩔 𐩘 𐰒 𐰑 ᚕ ᚖ ᚗ ᚘ ᚙ ፠ ፨ ᴥ ᠁ ꔚ ᪤ ద ⫷ ⫸ ʕ˖͜͡˖ʔ ꧁ ꧂ 𐑧 𐑨 𐑩 𐑪 ‿ ⁀ ⁔ ⁐ ⟅ ⟆ ༼ ༽ ༺ ༻ ઈ ઉ ⟡ ⟢ ⟣ 𐑥 𐑯 ꒰ ꒱ ʚ ɞ ꔻ ꔼ ꕢ ꕣ ꕤ ꕥ ᱦ ᱬ ద ధ ర ಠ ఠ ★ ๛ 𒀱 〠 ֍ ֎ ஜ ෴ 🍾 ✌ ✍ ✎ ♆ ۩ ⬳ 乄 ཉྀ ߹ ꧃ 𐩕 థ • ٭ ⋆ ˖ ﾟ°° ﾟ ⁺ ஃ ༚ ༛ ۵ ༔ ⁒ ‼ ‽ ᚘ ᚕ ᚖ ៚ ٭ ༀ ␥ ␦ ᚌ ᚍ ᚎ ᚏ ఢ 〓 〄 ๑ ⊰ ⊱ ⁋ ⁑ ௵ ᚙ ɷߡ ߥ ߦ ‎ߧ ࿂ ࿃ ࿄ ࿅ ࿆ ࿇ ࿈ ࿉ ࿊ ࿋ ࿌ ᴭ ߷ ཉིཾ ᙛ ᙜ ᙝ ᙞ ༕ ༖ ༗ ణ త Ꙩ ᭄ ఠ ◌ͧ ꙰ ꙲ ༜ ꮸ 𐐝 𐑅 𑁍 🝮 ؄ ㍍ Ƀ ͢Ƀ ㉺ ҂ ✰ 𒅒 ⫷ ⫸ 𒁂 𒈒 𒈞 هز ههههه ஓ ଐ ۝ ۞ ⁂ ⁎ ᱦ ᱬ 𒋨 Ꙭ ꙭ ꙮ ஐ ഋ ൠ ⎛ ⎞ ⎝ ⎠ Ӕ Ǣ Ǽ ℄ ɶ ʣ ʤ ʥ Ԙ Ѥ ǣ ѥ ȸ ȹ ѩ ␡ ␟ ␖ ␙ ␜ ␝ ℠ ℡ ™ ℻ ʬ Ξ 🅏 ᴭ Ԙ 웃 유 ℬ ℰ ℯ ℱ ℊ ℋ ℎ ℐ ℒ ℓ ℳ ℴ ℘ ℛ ℭ ℮ ℌ ℑ ℜ ℨ";
        const hearts = "♥ ❤ ❥ 💖 💕 💞 ❣ 🖤 ღ";
        const bows = "˚˖𓍢ִ໋🌷͙֒✧˚.🎀༘⋆ 🩰˚˖𓍢✨໋🎧✧˚.🎀༘⋆ ♰💗♰N̆ơ♰X̆ĬN̆H̆♰╰(°▽°)╯♰ ☝💗𝙣ơ𝙭𝙞𝙣𝙝╰(°▽°)╯✌ ツ💔╰‿╯иơ╰‿╯⒳ιղн╰‿╯🍻";
        const abcUpper = "Ａ Ｂ Ｃ Ｄ Ｅ Ｆ Ｇ Ｈ Ｉ Ｊ Ｋ Ｌ Ｍ Ｎ Ｏ Ｐ Ｑ Ｒ Ｓ Ｔ Ｕ Ｖ Ｗ Ｘ Ｙ Ｚ";
        const abcLower = "ａ ｂ ｃ ｄ ｅ ｆ ｇ ｈ ｉ ｊ ｋ ｌ ｍ ｎ ｏ ｐ ｑ ｒ ｓ ｔ ｕ ｖ ｗ ｘ ｙ ｚ";

        const libraryData = [
            { title: "Kí Tự VIP & Ngầu", data: symbolsVIP.split(' ') },
            { title: "Trái Tim Các Loại", data: hearts.split(' ') },
            { title: "Chiếc Nơ Cute", data: bows.split(' ') },
            { title: "Bảng Chữ To", data: abcUpper.split(' ').concat(abcLower.split(' ')) }
        ];

        const libContainer = document.getElementById('char-library');
        libraryData.forEach(section => {
            const secDiv = document.createElement('div');
            secDiv.className = 'mb-4';
            const title = document.createElement('h4');
            title.className = 'text-sm font-bold text-pink-600 mb-2 border-b border-pink-100 pb-1';
            title.innerText = section.title;
            secDiv.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'flex flex-wrap gap-2';

            section.data.forEach(char => {
                if(!char.trim()) return;
                const span = document.createElement('span');
                span.className = 'bg-white border border-pink-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm cursor-pointer hover:bg-pink-500 hover:text-white hover:-translate-y-0.5 transition active:scale-95 flex items-center justify-center font-medium';
                if(char.length > 5) span.classList.add('text-xs');
                span.innerText = char;
                span.onclick = () => copyToClipboard(char, 'copy-toast-lib');
                grid.appendChild(span);
            });
            secDiv.appendChild(grid);
            libContainer.appendChild(secDiv);
        });
    }
});