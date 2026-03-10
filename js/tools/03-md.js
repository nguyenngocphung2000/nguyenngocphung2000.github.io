// --- 3. Tool Markdown ---
registerTool({
    id: 'tab-md',
    name: 'Đọc Markdown',
    icon: '📝',
    html: `
        <div class="text-center mb-6">
           <span class="bg-gray-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Giải mã</span>
            <h2 class="text-3xl font-bold mt-2">Trình đọc <span class="text-orange-500">Markdown 📝</span></h2>
             <p class="text-sm text-gray-500 mt-2 italic">Nhập ngôn ngữ markdown hoặc chọn file .md.</p>
        </div>
        <div class="glass-card p-6 md:p-8 rounded-[2rem]">
            
            <div class="flex justify-center mb-4">
                <label class="cursor-pointer bg-orange-100 text-orange-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-200 transition shadow-sm">
                    📁 Chọn File(.md)
                    <input type="file" id="md-file" accept=".md" class="hidden">
                </label>
            </div>
            
            <textarea id="md-input" class="w-full h-40 bg-gray-50 rounded-xl p-4 font-mono text-sm border border-gray-100 focus:outline-none focus:ring-2 ring-orange-200" placeholder="# Gõ Markdown vào đây hoặc chọn file..."></textarea>
            
            <div id="md-preview" class="prose-custom mt-6 p-6 bg-white rounded-2xl shadow-inner min-h-[150px] border border-gray-100"></div>
        </div>
    `,
    logic: function() {
        const mdIn = document.getElementById('md-input');
        const mdPre = document.getElementById('md-preview');
        const mdFile = document.getElementById('md-file');

        const renderMD = () => {
            if(window.marked) mdPre.innerHTML = marked.parse(mdIn.value);
        };

        mdIn.addEventListener('input', renderMD);

        if (mdFile) {
            mdFile.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = function(e) {
                    mdIn.value = e.target.result; 
                    renderMD();                   
                };
                reader.readAsText(file);
            });
        }
    }
});
