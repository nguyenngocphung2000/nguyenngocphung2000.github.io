// --- 4. Tool Thống kê văn bản ---
registerTool({
    id: 'tab-text-stat',
    name: 'Thống Kê Chữ',
    icon: '📊',
    html: `
        <div class="text-center mb-6">
            <span class="bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Tiện ích chữ</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Thống Kê <span class="text-emerald-500">Văn Bản</span> 📊</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Dán văn bản vào đây để xem chi tiết thông số.</p>
        </div>

        <div class="glass-card p-4 md:p-6 rounded-[2rem] max-w-4xl mx-auto border-t-4 border-t-emerald-400 shadow-xl">
            
            <div class="relative w-full">
                <textarea id="ts-input" class="w-full h-48 bg-emerald-50/30 rounded-2xl p-4 font-sans text-sm border border-emerald-100 focus:outline-none focus:ring-2 ring-emerald-300 resize-y shadow-inner text-gray-700 placeholder-gray-400" placeholder="Hãy gõ hoặc dán nội dung vào đây..."></textarea>
                <button id="ts-clear" class="absolute top-4 right-4 text-xs font-bold text-gray-400 hover:text-red-500 bg-white px-2 py-1 rounded shadow-sm border border-gray-100 transition">Xóa trắng</button>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600" id="ts-chars">0</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Ký tự</span>
                </div>
                
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600" id="ts-words">0</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Số từ</span>
                </div>
                
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600" id="ts-lines">0</span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Số dòng</span>
                </div>
                
                <div class="bg-white p-4 rounded-2xl text-center shadow-sm border border-emerald-50">
                    <span class="block text-3xl font-black text-emerald-600 flex justify-center items-end gap-1">
                        <span id="ts-bytes">0</span> 
                        <span class="text-sm pb-1 text-emerald-400">KB</span>
                    </span>
                    <span class="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Dung lượng</span>
                </div>
            </div>
            
            <div class="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-500 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                <div class="mr-4">Không tính dấu cách: <span id="ts-chars-nospace" class="text-emerald-700 font-bold">0</span></div>
                <div>Thời gian đọc (~200 từ/phút): <span id="ts-read-time" class="text-emerald-700 font-bold">0 giây</span></div>
            </div>
        </div>
    `,
    logic: function() {
        const input = document.getElementById('ts-input');
        const outChars = document.getElementById('ts-chars');
        const outWords = document.getElementById('ts-words');
        const outLines = document.getElementById('ts-lines');
        const outBytes = document.getElementById('ts-bytes');
        const outCharsNoSpace = document.getElementById('ts-chars-nospace');
        const outReadTime = document.getElementById('ts-read-time');
        const btnClear = document.getElementById('ts-clear');

        const calculateStats = () => {
            const text = input.value;
            outChars.innerText = text.length;
            outCharsNoSpace.innerText = text.replace(/\s/g, '').length;

            const words = text.trim().split(/\s+/).filter(w => w.length > 0);
            outWords.innerText = words.length;

            outLines.innerText = text.length === 0 ? 0 : text.split('\n').length;

            // Tính KB làm tròn 2 chữ số thập phân
            const byteSize = new Blob([text]).size;
            outBytes.innerText = (byteSize / 1024).toFixed(2);

            const minutes = words.length / 200;
            if (minutes === 0) {
                outReadTime.innerText = "0 giây";
            } else if (minutes < 1) {
                outReadTime.innerText = Math.ceil(minutes * 60) + " giây";
            } else {
                const m = Math.floor(minutes);
                const s = Math.ceil((minutes - m) * 60);
                outReadTime.innerText = `${m} phút ${s} giây`;
            }
        };

        input.addEventListener('input', calculateStats);

        btnClear.addEventListener('click', () => {
            input.value = '';
            calculateStats();
            input.focus();
        });
    }
});