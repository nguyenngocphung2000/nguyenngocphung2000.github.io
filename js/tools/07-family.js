// --- 7. Tool Hệ Sinh Thái Gia Phả ---
registerTool({
    id: 'tab-family-pro',
    name: 'Gia Phả',
    icon: '🌳',
    html: `
        <style>
            .ft-tab-btn { padding: 0.5rem 1rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; color: #6b7280; transition: all 0.2s; background: transparent; }
            .ft-tab-btn.active { background: #fffaf5; color: #f97316; box-shadow: 0 1px 3px rgba(249, 115, 22, 0.1); border: 1px solid #ffedd5; }
            
            .css-tree ul { padding-top: 20px; position: relative; transition: all 0.5s; display: flex; justify-content: center; gap: 20px; padding-left: 0; }
            .css-tree li { float: left; text-align: center; list-style-type: none; position: relative; padding: 20px 5px 0 5px; transition: all 0.5s; }
            .css-tree li::before, .css-tree li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 2px solid #fdba74; width: 50%; height: 20px; }
            .css-tree li::after { right: auto; left: 50%; border-left: 2px solid #fdba74; }
            .css-tree li:only-child::after, .css-tree li:only-child::before { display: none; }
            .css-tree li:only-child { padding-top: 0; }
            .css-tree li:first-child::before, .css-tree li:last-child::after { border: 0 none; }
            .css-tree li:last-child::before { border-right: 2px solid #fdba74; border-radius: 0 5px 0 0; }
            .css-tree li:first-child::after { border-radius: 5px 0 0 0; }
            .css-tree ul ul::before { content: ''; position: absolute; top: 0; left: 50%; border-left: 2px solid #fdba74; width: 0; height: 20px; }

            .ft-node-box { width: 110px; height: 54px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: white; border: 1px solid #fed7aa; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); cursor: pointer; transition: all 0.2s; padding: 4px; z-index: 10; position: relative; overflow: hidden; }
            .ft-node-box:hover { box-shadow: 0 4px 8px rgba(249,115,22,0.15); border-color: #f97316; transform: translateY(-2px); }
            .ft-node-text { font-size: 0.75rem; font-weight: 700; text-align: center; white-space: normal; line-height: 1.2; word-wrap: break-word; }
            .ft-node-male { color: #1d4ed8; }
            .ft-node-female { color: #be185d; }
            .ft-node-dead { text-decoration: line-through; color: #9ca3af; }
            
            .ft-bridge { width: 16px; height: 2px; background: #fdba74; align-self: center; position: relative; z-index: 0; }
        </style>

        <div class="text-center mb-6">
            <span class="bg-orange-100 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Hệ thống gia tộc</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Quản Lý <span class="text-orange-500">Gia Phả</span> 🌳</h2>
             <p class="text-sm text-gray-500 mt-2 italic">Hướng về gia đình, tìm mình trong đấy!</p>
        </div>

        <div class="flex flex-wrap justify-center gap-2 mb-6 bg-white/60 p-2 rounded-2xl border border-orange-50 shadow-sm backdrop-blur-md">
            <button onclick="ftSwitch('stats')" id="ft-nav-stats" class="ft-tab-btn active">📊 Thống Kê</button>
            <button onclick="ftSwitch('events')" id="ft-nav-events" class="ft-tab-btn">📅 Sự Kiện</button>
            <button onclick="ftSwitch('list')" id="ft-nav-list" class="ft-tab-btn">📇 Danh Sách</button>
            <button onclick="ftSwitch('tree')" id="ft-nav-tree" class="ft-tab-btn">🕸️ Sơ Đồ</button>
            <button onclick="ftSwitch('lookup')" id="ft-nav-lookup" class="ft-tab-btn">🔍 Danh Xưng</button>
        </div>

        <div id="ft-view-stats" class="space-y-6 block">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-orange-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Tổng thành viên</div>
                    <div class="text-3xl font-black text-gray-800" id="ft-s-total">0</div>
                </div>
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-blue-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Nam</div>
                    <div class="text-3xl font-black text-blue-600" id="ft-s-male">0</div>
                </div>
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-pink-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Nữ</div>
                    <div class="text-3xl font-black text-pink-600" id="ft-s-female">0</div>
                </div>
                <div class="glass-card p-5 rounded-2xl text-center border-b-4 border-b-gray-400">
                    <div class="text-gray-400 text-xs font-bold uppercase mb-1">Đã mất</div>
                    <div class="text-3xl font-black text-gray-600" id="ft-s-dead">0</div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Con trưởng 👑</span>
                    <span class="text-xl font-black text-yellow-500" id="ft-s-firstborn">0</span>
                </div>
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Đã kết hôn 💍</span>
                    <span class="text-xl font-black text-red-400" id="ft-s-married">0</span>
                </div>
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Dâu / Rể 🌸</span>
                    <span class="text-xl font-black text-emerald-500" id="ft-s-inlaw">0</span>
                </div>
                <div class="glass-card p-4 rounded-2xl flex justify-between items-center">
                    <span class="text-sm font-bold text-gray-600">Số đời 🌿</span>
                    <span class="text-xl font-black text-orange-500" id="ft-s-gen">0</span>
                </div>
            </div>
        </div>

        <div id="ft-view-events" class="hidden space-y-4">
            <div class="glass-card p-6 md:p-8 rounded-[2rem] border-t-4 border-t-red-400">
                <h3 class="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2"><span>🎂</span> Sự kiện sắp tới (30 ngày)</h3>
                <div id="ft-event-list" class="space-y-3"></div>
            </div>
        </div>

        <div id="ft-view-list" class="hidden space-y-4">
            <div class="flex flex-wrap gap-2 justify-between">
                <input type="text" id="ft-search" class="bg-white/80 backdrop-blur-sm border border-orange-100 rounded-xl px-4 py-2 outline-none focus:ring-2 ring-orange-200 text-sm w-full md:w-64" placeholder="🔍 Tìm tên...">
                <div class="flex gap-2">
                    <button class="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-xl text-sm" onclick="ftExport()">📥 Xuất JSON</button>
                    <label class="bg-purple-50 text-purple-600 font-bold px-4 py-2 rounded-xl text-sm cursor-pointer">
                        📂 Nhập <input type="file" id="ft-import" accept=".json" class="hidden">
                    </label>
                    <button class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition" onclick="ftOpenModal()">+ Thêm</button>
                </div>
            </div>
            <div id="ft-list-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2"></div>
        </div>

        <div id="ft-view-tree" class="hidden space-y-4">
            <div class="flex justify-end">
                <button id="ft-btn-export-pdf" onclick="ftExportPDF()" class="bg-rose-500 hover:bg-rose-600 text-white font-bold px-4 py-2 rounded-xl text-sm shadow-md transition flex items-center gap-2">
                    📄 Xuất PDF (Bản in)
                </button>
            </div>
            <div class="glass-card rounded-[2rem] p-8 overflow-auto min-h-[500px] flex justify-center items-start custom-scrollbar bg-white" id="ft-tree-print-area">
                <div id="ft-tree-container" class="css-tree">
                    <div class="text-gray-400 italic text-sm text-center mt-10">Cây gia phả đang trống.</div>
                </div>
            </div>
        </div>

        <div id="ft-view-lookup" class="hidden space-y-6">
            <div class="glass-card p-6 md:p-8 rounded-[2rem] border-t-4 border-t-yellow-400">
                <h3 class="font-bold text-gray-800 text-xl mb-4">Tra cứu quan hệ & Danh xưng</h3>
                
                <div class="flex flex-col md:flex-row items-center gap-4 mb-6">
                    <div class="flex-1 w-full">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Người A</label>
                        <select id="ft-lu-a" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-bold text-gray-700"></select>
                    </div>
                    <div class="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm">↔</div>
                    <div class="flex-1 w-full">
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Người B</label>
                        <select id="ft-lu-b" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-bold text-gray-700"></select>
                    </div>
                </div>

                <button onclick="ftCalculateRelation()" class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow-md transition hover:scale-[1.01] mb-6">✨ TÍNH TOÁN QUAN HỆ</button>

                <div id="ft-lu-result" class="hidden space-y-4">
                    <div class="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-center text-sm font-medium text-yellow-800" id="ft-lu-common"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="bg-white border border-orange-100 p-4 rounded-xl text-center shadow-sm">
                            <div class="text-xs text-gray-400 font-bold uppercase mb-2">Người A gọi Người B là</div>
                            <div class="text-2xl font-black text-orange-600" id="ft-lu-res-a">...</div>
                        </div>
                        <div class="bg-white border border-orange-100 p-4 rounded-xl text-center shadow-sm">
                            <div class="text-xs text-gray-400 font-bold uppercase mb-2">Người B gọi Người A là</div>
                            <div class="text-2xl font-black text-orange-600" id="ft-lu-res-b">...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="ft-modal" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[100] hidden flex items-center justify-center p-4 opacity-0 transition-opacity duration-300">
            <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden transform scale-95 transition-transform duration-300 relative border border-orange-100">
                <div class="absolute top-0 right-0 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                <div class="p-6 border-b border-orange-50 flex justify-between items-center relative z-10">
                    <h3 id="ft-modal-title" class="font-bold text-xl text-gray-800">Thông tin thành viên</h3>
                    <button onclick="ftCloseModal()" class="text-gray-400 hover:text-red-500 font-bold text-xl w-8 h-8 rounded-full bg-gray-50 flex justify-center items-center transition">&times;</button>
                </div>
                
                <div class="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar relative z-10">
                    <input type="hidden" id="ft-m-id">
                    
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Họ và Tên</label>
                        <input type="text" id="ft-m-name" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-bold text-gray-700">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giới tính</label>
                            <select id="ft-m-gender" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-medium">
                                <option value="male">Nam 👨</option><option value="female">Nữ 👩</option>
                            </select>
                        </div>
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Trạng thái</label>
                            <select id="ft-m-status" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 font-medium">
                                <option value="alive">Còn sống</option><option value="deceased">Đã mất</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Năm / Ngày sinh</label>
                            <input type="text" id="ft-m-birth" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200" placeholder="VD: 1990">
                        </div>
                        <div>
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Ngày mất (Tùy chọn)</label>
                            <input type="text" id="ft-m-death" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200" placeholder="VD: 10/03/2020">
                        </div>
                    </div>

                    <div class="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Là con của</label>
                                <select id="ft-m-parent" class="w-full bg-white border border-gray-200 rounded-xl p-2 outline-none focus:border-orange-300 text-sm">
                                    <option value="">-- Cụ Tổ (Không có) --</option>
                                </select>
                            </div>
                            <div>
                                <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phân loại con</label>
                                <select id="ft-m-childtype" class="w-full bg-white border border-gray-200 rounded-xl p-2 outline-none focus:border-orange-300 text-sm">
                                    <option value="chung">Con chung</option>
                                    <option value="rieng">Con riêng</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex items-center gap-2 px-2">
                            <input type="checkbox" id="ft-m-firstborn" class="w-4 h-4 text-orange-500 rounded focus:ring-orange-400">
                            <label class="text-sm font-bold text-gray-700">Là con trưởng</label>
                        </div>
                        
                        <div class="border-t border-gray-200 pt-3">
                            <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Vợ / Chồng của</label>
                            <select id="ft-m-spouse" class="w-full bg-white border border-gray-200 rounded-xl p-2 outline-none focus:border-orange-300 text-sm">
                                <option value="">-- Độc thân / Chưa rõ --</option>
                            </select>
                            <p class="text-[10px] text-gray-400 mt-1 ml-2 italic">* Chọn mục này nếu người này là Dâu/Rể ngoại tộc</p>
                        </div>
                    </div>

                    <button id="ft-btn-save" class="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md">LƯU THÀNH VIÊN</button>
                    
                    <div id="ft-edit-actions" class="hidden mt-2 text-center pt-2">
                        <button class="text-red-400 hover:text-red-600 text-xs font-bold" onclick="ftDelete()">🗑️ Xóa thành viên</button>
                    </div>
                </div>
            </div>
        </div>
    `,
    logic: function() {
        const STORAGE_KEY = 'my_family_tree_pro';
        let data = []; 

        const genId = () => 'id_' + Math.random().toString(36).substr(2, 9);
        const load = () => { try { data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ data = []; } };
        const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        
        window.ftSwitch = (tab) => {
            ['stats', 'events', 'list', 'tree', 'lookup'].forEach(t => {
                document.getElementById('ft-view-' + t).classList.add('hidden');
                document.getElementById('ft-nav-' + t).classList.remove('active');
            });
            document.getElementById('ft-view-' + tab).classList.remove('hidden');
            document.getElementById('ft-nav-' + tab).classList.add('active');
            
            if(tab === 'stats') renderStats();
            if(tab === 'list') renderList();
            if(tab === 'tree') renderTree();
            if(tab === 'events') renderEvents();
            if(tab === 'lookup') renderLookupOptions();
        };

        const getGen = (id, visited = new Set()) => {
            if(visited.has(id)) return 1; 
            visited.add(id);
            const node = data.find(n => n.id === id);
            if(!node) return 0;
            if(node.spouseId && !node.parentId) return getGen(node.spouseId, visited);
            if(!node.parentId) return 1;
            return getGen(node.parentId, visited) + 1;
        };

        const getYear = (str) => {
            if(!str) return 9999;
            const match = str.match(/\d{4}/);
            return match ? parseInt(match[0]) : 9999;
        };

        const renderStats = () => {
            const tot = data.length;
            document.getElementById('ft-s-total').innerText = tot;
            document.getElementById('ft-s-male').innerText = data.filter(n => n.gender === 'male').length;
            document.getElementById('ft-s-female').innerText = data.filter(n => n.gender === 'female').length;
            document.getElementById('ft-s-dead').innerText = data.filter(n => n.status === 'deceased').length;
            document.getElementById('ft-s-firstborn').innerText = data.filter(n => n.isFirstBorn).length;
            document.getElementById('ft-s-inlaw').innerText = data.filter(n => n.spouseId && !n.parentId).length;
            
            let married = new Set();
            data.forEach(n => { if(n.spouseId) { married.add(n.id); married.add(n.spouseId); } });
            document.getElementById('ft-s-married').innerText = married.size;

            let maxGen = 0;
            data.forEach(n => { const g = getGen(n.id); if(g > maxGen) maxGen = g; });
            document.getElementById('ft-s-gen').innerText = maxGen;
        };

        const renderList = (filter = '') => {
            const container = document.getElementById('ft-list-container');
            container.innerHTML = '';
            const filtered = data.filter(n => n.name.toLowerCase().includes(filter.toLowerCase()));

            filtered.forEach(node => {
                const gen = getGen(node.id);
                const isInlaw = node.spouseId && !node.parentId;
                let badges = '';
                if(node.status === 'deceased') badges += '<span class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Đã mất</span> ';
                if(isInlaw) badges += '<span class="bg-pink-50 text-pink-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Dâu/Rể</span> ';
                if(node.isFirstBorn) badges += '<span class="bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Con trưởng</span> ';
                if(node.childType === 'rieng') badges += '<span class="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Con riêng</span> ';
                if(gen > 0) badges += `<span class="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Đời ${gen}</span>`;

                container.innerHTML += `
                    <div class="glass-card rounded-2xl p-4 flex flex-col hover:shadow-md hover:border-orange-300 transition cursor-pointer" onclick="ftOpenModal('${node.id}')">
                        <div class="font-bold text-gray-800 text-base truncate ${node.gender==='male'?'text-blue-600':'text-pink-600'}">${node.name}</div>
                        <div class="text-xs text-gray-400 mt-1">${node.birth || '?'} ${node.death ? '→ ' + node.death : ''}</div>
                        <div class="mt-2 flex flex-wrap gap-1">${badges}</div>
                    </div>
                `;
            });
        };

        document.getElementById('ft-search').addEventListener('input', e => renderList(e.target.value));

        const parseDate = (str) => {
            if(!str) return null;
            const parts = str.split('/');
            if(parts.length >= 2) return { d: parseInt(parts[0]), m: parseInt(parts[1]) };
            return null;
        };
        const getDaysLeft = (dateObj) => {
            if(!dateObj) return Infinity;
            const today = new Date(); 
            let target = new Date(today.getFullYear(), dateObj.m - 1, dateObj.d);
            if(today > target) target.setFullYear(target.getFullYear() + 1);
            return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
        };

        const renderEvents = () => {
            const list = document.getElementById('ft-event-list');
            list.innerHTML = '';
            let events = [];

            data.forEach(n => {
                if(n.status === 'alive' && n.birth) {
                    const parsed = parseDate(n.birth);
                    const days = getDaysLeft(parsed);
                    if(days <= 30) events.push({ node: n, type: 'Sinh nhật', days, dateStr: n.birth });
                }
                if(n.status === 'deceased' && n.death) {
                    const parsed = parseDate(n.death);
                    const days = getDaysLeft(parsed);
                    if(days <= 30) events.push({ node: n, type: 'Ngày giỗ', days, dateStr: n.death });
                }
            });
            events.sort((a,b) => a.days - b.days);

            if(events.length === 0) {
                list.innerHTML = '<div class="text-center text-gray-400 italic text-sm">Không có sự kiện nào trong 30 ngày tới.</div>';
                return;
            }

            events.forEach(ev => {
                let badge = ev.days === 0 ? '<span class="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">Hôm nay!</span>' 
                          : `<span class="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">${ev.days} ngày nữa</span>`;
                list.innerHTML += `
                    <div class="bg-white border border-orange-50 p-3 rounded-xl shadow-sm flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full ${ev.type === 'Sinh nhật' ? 'bg-pink-50' : 'bg-gray-100'} flex items-center justify-center text-lg">
                                ${ev.type === 'Sinh nhật' ? '🎂' : '🕯️'}
                            </div>
                            <div>
                                <div class="font-bold text-gray-800 text-sm">${ev.node.name}</div>
                                <div class="text-xs text-gray-400">${ev.type} - ${ev.dateStr}</div>
                            </div>
                        </div>
                        ${badge}
                    </div>
                `;
            });
        };

        // --- 5. LÕI TRA CỨU DANH XƯNG (BẢN CHUẨN 100%) ---
        const renderLookupOptions = () => {
            const selA = document.getElementById('ft-lu-a');
            const selB = document.getElementById('ft-lu-b');
            let opts = '<option value="">-- Chọn thành viên --</option>';
            data.forEach(n => opts += `<option value="${n.id}">${n.name} (Đời ${getGen(n.id)})</option>`);
            selA.innerHTML = selB.innerHTML = opts;
        };

        window.ftCalculateRelation = () => {
            const idA = document.getElementById('ft-lu-a').value;
            const idB = document.getElementById('ft-lu-b').value;
            if(!idA || !idB || idA === idB) return alert("Vui lòng chọn 2 người khác nhau!");

            const nodeA = data.find(n => n.id === idA);
            const nodeB = data.find(n => n.id === idB);
            
            if (nodeA.spouseId === nodeB.id || nodeB.spouseId === nodeA.id) {
                document.getElementById('ft-lu-result').classList.remove('hidden');
                document.getElementById('ft-lu-common').innerHTML = "✨ <b>Quan hệ:</b> Vợ chồng";
                document.getElementById('ft-lu-res-a').innerText = nodeB.gender === 'male' ? "Chồng" : "Vợ";
                document.getElementById('ft-lu-res-b').innerText = nodeA.gender === 'male' ? "Chồng" : "Vợ";
                return;
            }

            // Tìm đường dẫn máu mủ (Bỏ qua Dâu/Rể ở bước đầu)
            const getBloodPath = (id) => {
                let p = [];
                let curr = data.find(n => n.id === id);
                let visited = new Set();
                let isLaw = false;
                
                if (curr && !curr.parentId && curr.spouseId) {
                    isLaw = true;
                    curr = data.find(n => n.id === curr.spouseId);
                }
                
                while(curr && !visited.has(curr.id)) {
                    visited.add(curr.id);
                    p.push(curr);
                    curr = data.find(n => n.id === curr.parentId);
                }
                return { path: p.reverse(), isLaw }; 
            };

            const traceA = getBloodPath(nodeA.id);
            const traceB = getBloodPath(nodeB.id);
            const pathA = traceA.path;
            const pathB = traceB.path;

            let lcaNode = null;
            let i = 0;
            while(i < pathA.length && i < pathB.length && pathA[i].id === pathB[i].id) {
                lcaNode = pathA[i]; 
                i++;
            }

            const resDiv = document.getElementById('ft-lu-result');
            resDiv.classList.remove('hidden');

            if(!lcaNode) {
                document.getElementById('ft-lu-common').innerHTML = "Không tìm thấy liên kết huyết thống / họ hàng trực tiếp.";
                document.getElementById('ft-lu-res-a').innerText = "Chưa rõ";
                document.getElementById('ft-lu-res-b').innerText = "Chưa rõ";
                return;
            }

            const dA = pathA.length - i; 
            const dB = pathB.length - i; 

            // Xác định nhánh Nội hay Ngoại dựa vào giới tính của đứa con trực tiếp từ Tổ tiên chung
            let sideA = 'noi';
            if (dA > 0 && pathA[i]) sideA = pathA[i].gender === 'female' ? 'ngoai' : 'noi';
            
            let sideB = 'noi';
            if (dB > 0 && pathB[i]) sideB = pathB[i].gender === 'female' ? 'ngoai' : 'noi';

            // Phân định tuổi tác (bậc đàn anh/đàn em)
            let isOlderB = false;
            let isOlderA = false;
            if (dA >= 1 && dB >= 1) {
                const bloodNodeA = pathA[i]; 
                const bloodNodeB = pathB[i]; 
                
                let yA = getYear(bloodNodeA.birth);
                let yB = getYear(bloodNodeB.birth);
                
                if (yA === 9999 || yB === 9999) {
                    const indexA = data.findIndex(n => n.id === bloodNodeA.id);
                    const indexB = data.findIndex(n => n.id === bloodNodeB.id);
                    isOlderB = indexB < indexA;
                    isOlderA = indexA < indexB;
                } else {
                    isOlderB = yB < yA;
                    isOlderA = yA < yB;
                }
            }

            document.getElementById('ft-lu-common').innerHTML = `✨ <b>Tổ tiên chung:</b> ${lcaNode.name} (Cách A ${dA} đời, cách B ${dB} đời)`;

            // SIÊU THUẬT TOÁN TÍNH DANH XƯNG
            const getTitle = (distMe, distThem, gMe, gThem, sideMe, sideThem, isOlderThem, lawMe, lawThem, nodeMe, nodeThem) => {
                
                // Vai vế: Bề dưới gọi Bề trên (Ví dụ: Con gọi Cha, Cháu gọi Ông)
                if (distMe > 0 && distThem === 0) {
                    if (distMe === 1) {
                        if (lawThem && nodeMe.childType === 'rieng' && nodeMe.parentId !== nodeThem.id) {
                            return gThem === 'male' ? "Cha dượng" : "Mẹ kế";
                        }
                        if (lawMe) return gThem === 'male' ? "Cha (vợ/chồng)" : "Mẹ (vợ/chồng)";
                        return gThem === 'male' ? "Cha / Ba" : "Mẹ / Má";
                    }
                    if (distMe === 2) return gThem === 'male' ? `Ông ${sideMe==='noi'?'nội':'ngoại'}` : `Bà ${sideMe==='noi'?'nội':'ngoại'}`;
                    if (distMe === 3) return gThem === 'male' ? "Cụ / Cố ông" : "Cụ / Cố bà";
                    if (distMe >= 4) return gThem === 'male' ? "Kị / Sơ ông" : "Kị / Sơ bà";
                }
                
                // Vai vế: Bề trên gọi Bề dưới (Ví dụ: Cha gọi Con, Ông gọi Cháu)
                if (distMe === 0 && distThem > 0) {
                    if (distThem === 1) {
                        if (nodeThem.childType === 'rieng' && nodeThem.parentId !== nodeMe.id) return "Con riêng";
                        return lawThem ? (gThem === 'male' ? "Con rể" : "Con dâu") : "Con";
                    }
                    if (distThem === 2) return lawThem ? (gThem === 'male' ? "Cháu rể" : "Cháu dâu") : (sideThem === 'noi' ? "Cháu nội" : "Cháu ngoại");
                    if (distThem === 3) return lawThem ? (gThem === 'male' ? "Chắt rể" : "Chắt dâu") : "Chắt";
                    if (distThem >= 4) return "Chút / Chít";
                }

                // Cùng thế hệ 1 (Anh chị em ruột)
                if (distMe === 1 && distThem === 1) {
                    if (lawMe) { // Đang tính từ góc nhìn Dâu/Rể
                        if (isOlderThem) return gThem === 'male' ? "Anh (vợ/chồng)" : "Chị (vợ/chồng)";
                        return gThem === 'male' ? "Em trai (vợ/chồng)" : "Em gái (vợ/chồng)";
                    }
                    if (isOlderThem) return lawThem ? (gThem === 'male' ? "Anh rể" : "Chị dâu") : (gThem === 'male' ? "Anh ruột" : "Chị ruột");
                    return lawThem ? (gThem === 'male' ? "Em rể" : "Em dâu") : (gThem === 'male' ? "Em trai" : "Em gái");
                }

                // Cô dì chú bác (Mình nhỏ hơn 1 bậc)
                if (distMe === 2 && distThem === 1) {
                    if (sideMe === 'noi') { // Phía đằng nội
                        if (isOlderThem) return lawThem ? (gThem === 'male' ? "Bác trai (Dượng)" : "Bác dâu") : (gThem === 'male' ? "Bác trai" : "Bác gái");
                        return lawThem ? (gThem === 'male' ? "Chú / Dượng" : "Thím") : (gThem === 'male' ? "Chú" : "Cô");
                    } else { // Phía đằng ngoại
                        if (isOlderThem) return lawThem ? (gThem === 'male' ? "Bác trai / Dượng" : "Bác dâu / Mợ") : (gThem === 'male' ? "Cậu / Bác trai" : "Dì / Bác gái");
                        return lawThem ? (gThem === 'male' ? "Dượng" : "Mợ") : (gThem === 'male' ? "Cậu" : "Dì");
                    }
                }

                // Gọi cháu (Mình lớn hơn 1 bậc)
                if (distMe === 1 && distThem === 2) {
                    return lawThem ? (gThem === 'male' ? "Cháu rể" : "Cháu dâu") : "Cháu"; 
                }

                // Anh chị em họ (Đời 2 trở đi)
                if (distMe === distThem && distMe >= 2) {
                    if (isOlderThem) return lawThem ? (gThem === 'male' ? "Anh rể họ" : "Chị dâu họ") : (gThem === 'male' ? "Anh họ" : "Chị họ");
                    return lawThem ? (gThem === 'male' ? "Em rể họ" : "Em dâu họ") : (gThem === 'male' ? "Em họ" : "Em họ");
                }

                if (distMe > distThem) return lawThem ? "Bề trên (Họ hàng/Dâu rể)" : "Bề trên (Họ hàng)";
                return lawThem ? "Con cháu (Họ hàng/Dâu rể)" : "Con cháu (Họ hàng)";
            };

            // Gán đúng góc nhìn: A gọi B -> Lấy thông số từ góc độ A
            document.getElementById('ft-lu-res-a').innerText = getTitle(dA, dB, nodeA.gender, nodeB.gender, sideA, sideB, isOlderB, traceA.isLaw, traceB.isLaw, nodeA, nodeB); 
            // Gán đúng góc nhìn: B gọi A -> Lấy thông số từ góc độ B
            document.getElementById('ft-lu-res-b').innerText = getTitle(dB, dA, nodeB.gender, nodeA.gender, sideB, sideA, isOlderA, traceB.isLaw, traceA.isLaw, nodeB, nodeA); 
        };

        // --- 6. SƠ ĐỒ CÂY ---
        const buildTreeHTML = (nodeId) => {
            const node = data.find(n => n.id === nodeId);
            if(!node) return '';
            const children = data.filter(n => n.parentId === nodeId);
            const spouses = data.filter(n => (n.spouseId === nodeId || node.spouseId === n.id) && n.id !== nodeId);

            let html = '<li>';
            html += `<div class="inline-flex items-center z-10 relative">`;
            
            let sClassA = node.status === 'deceased' ? 'ft-node-dead' : (node.gender === 'male' ? 'ft-node-male' : 'ft-node-female');
            let childBadgeA = node.childType === 'rieng' ? `<div class="text-[9px] text-red-500 font-bold mt-1 leading-none">(Con riêng)</div>` : '';
            html += `
                <div class="ft-node-box" onclick="ftOpenModal('${node.id}')">
                    <span class="ft-node-text ${sClassA}">${node.name}</span>
                    ${childBadgeA}
                </div>
            `;
            
            spouses.forEach(sp => {
                if(sp.id !== node.parentId) { 
                    let sClassB = sp.status === 'deceased' ? 'ft-node-dead' : (sp.gender === 'male' ? 'ft-node-male' : 'ft-node-female');
                    html += `<div class="ft-bridge"></div>`;
                    html += `
                        <div class="ft-node-box bg-orange-50/30 border-dashed border-orange-300" onclick="ftOpenModal('${sp.id}')">
                            <span class="ft-node-text ${sClassB}">${sp.name}</span>
                        </div>
                    `;
                }
            });
            html += `</div>`;

            if(children.length > 0) {
                html += '<ul>' + children.map(c => buildTreeHTML(c.id)).join('') + '</ul>';
            }
            html += '</li>';
            return html;
        };

        const renderTree = () => {
            const container = document.getElementById('ft-tree-container');
            const roots = data.filter(n => {
                if (n.parentId) return false; 
                if (!n.spouseId) return true; 
                const spouse = data.find(s => s.id === n.spouseId);
                if (!spouse) return true; 
                if (spouse.parentId) return false; 
                return n.id > spouse.id;
            });
            
            if(roots.length === 0) {
                container.innerHTML = '<div class="text-gray-400 italic text-sm text-center mt-10">Sơ đồ trống. Chuyển sang Danh Sách để thêm người.</div>';
                return;
            }
            container.innerHTML = '<ul>' + roots.map(r => buildTreeHTML(r.id)).join('') + '</ul>';
        };

        // --- XUẤT PDF ---
        window.ftExportPDF = () => {
            const btn = document.getElementById('ft-btn-export-pdf');
            const originalText = btn.innerHTML;
            btn.innerHTML = '⏳ Đang tạo PDF...';
            
            const doExport = () => {
                const el = document.getElementById('ft-tree-print-area');
                
                const oldW = el.style.width; const oldH = el.style.height; const oldOverflow = el.style.overflow;
                el.style.width = 'max-content'; el.style.height = 'max-content'; el.style.overflow = 'visible';
                
                const opt = {
                  margin:       10,
                  filename:     'So-Do-Gia-Pha-' + Date.now() + '.pdf',
                  image:        { type: 'jpeg', quality: 1 },
                  html2canvas:  { scale: 2, useCORS: true },
                  jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
                };
                
                html2pdf().set(opt).from(el).save().then(() => {
                    el.style.width = oldW; el.style.height = oldH; el.style.overflow = oldOverflow;
                    btn.innerHTML = originalText;
                }).catch(err => {
                    alert("Lỗi khi tạo PDF!");
                    btn.innerHTML = originalText;
                });
            };

            if (typeof html2pdf === 'undefined') {
                const script = document.createElement('script');
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
                script.onload = () => doExport();
                document.head.appendChild(script);
            } else {
                doExport();
            }
        };

        // --- 7. MODAL QUẢN LÝ ---
        const modal = document.getElementById('ft-modal');
        window.ftOpenModal = (id = null) => {
            let opts = '<option value="">-- Cụ Tổ / Không có --</option>';
            data.forEach(n => { if(n.id !== id) opts += `<option value="${n.id}">${n.name}</option>`; });
            document.getElementById('ft-m-parent').innerHTML = opts;
            
            let spouseOpts = '<option value="">-- Độc thân / Chưa rõ --</option>';
            data.forEach(n => { if(n.id !== id) spouseOpts += `<option value="${n.id}">${n.name}</option>`; });
            document.getElementById('ft-m-spouse').innerHTML = spouseOpts;

            if(id) {
                const node = data.find(n => n.id === id);
                document.getElementById('ft-m-id').value = node.id;
                document.getElementById('ft-m-name').value = node.name;
                document.getElementById('ft-m-gender').value = node.gender;
                document.getElementById('ft-m-status').value = node.status;
                document.getElementById('ft-m-birth').value = node.birth || '';
                document.getElementById('ft-m-death').value = node.death || '';
                document.getElementById('ft-m-parent').value = node.parentId || '';
                document.getElementById('ft-m-childtype').value = node.childType || 'chung';
                document.getElementById('ft-m-spouse').value = node.spouseId || '';
                document.getElementById('ft-m-firstborn').checked = node.isFirstBorn || false;
                
                document.getElementById('ft-modal-title').innerText = "Chỉnh sửa thành viên";
                document.getElementById('ft-edit-actions').classList.remove('hidden');
            } else {
                ['ft-m-id','ft-m-name','ft-m-birth','ft-m-death','ft-m-parent','ft-m-spouse'].forEach(i => document.getElementById(i).value = '');
                document.getElementById('ft-m-status').value = 'alive';
                document.getElementById('ft-m-childtype').value = 'chung';
                document.getElementById('ft-m-firstborn').checked = false;
                document.getElementById('ft-modal-title').innerText = "Thêm thành viên mới";
                document.getElementById('ft-edit-actions').classList.add('hidden');
            }
            modal.classList.remove('hidden');
            setTimeout(() => { modal.classList.remove('opacity-0'); modal.firstElementChild.classList.remove('scale-95'); }, 10);
        };

        window.ftCloseModal = () => {
            modal.classList.add('opacity-0'); modal.firstElementChild.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 300);
        };

        document.getElementById('ft-btn-save').onclick = () => {
            const name = document.getElementById('ft-m-name').value.trim();
            if(!name) return alert("Vui lòng nhập tên!");
            const id = document.getElementById('ft-m-id').value || genId();
            
            const node = {
                id, name,
                gender: document.getElementById('ft-m-gender').value,
                status: document.getElementById('ft-m-status').value,
                birth: document.getElementById('ft-m-birth').value.trim(),
                death: document.getElementById('ft-m-death').value.trim(),
                parentId: document.getElementById('ft-m-parent').value || null,
                childType: document.getElementById('ft-m-childtype').value,
                spouseId: document.getElementById('ft-m-spouse').value || null,
                isFirstBorn: document.getElementById('ft-m-firstborn').checked
            };

            const idx = data.findIndex(n => n.id === id);
            if(idx > -1) data[idx] = node; else data.push(node);

            save(); renderList(); renderTree(); renderStats(); ftCloseModal();
        };

        window.ftDelete = () => {
            const id = document.getElementById('ft-m-id').value;
            if(data.some(n => n.parentId === id)) return alert("Không thể xóa người đang có dữ liệu con cái!");
            if(confirm("Xóa vĩnh viễn thành viên này?")) {
                data = data.filter(n => n.id !== id);
                data.forEach(n => { if (n.spouseId === id) n.spouseId = null; });
                save(); renderList(); renderTree(); renderStats(); ftCloseModal();
            }
        };

        window.ftExport = () => {
            const a = document.createElement('a');
            a.href = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
            a.download = "Gia_Pha_Sync_" + Date.now() + ".json";
            a.click();
        };
        document.getElementById('ft-import').addEventListener('change', e => {
            const f = e.target.files[0]; if(!f) return;
            const r = new FileReader();
            r.onload = ev => {
                try { data = JSON.parse(ev.target.result); save(); ftSwitch('list'); alert("Nhập thành công!"); } 
                catch(err) { alert("Lỗi file JSON!"); }
            };
            r.readAsText(f);
        });

        // Init
        load();
        ftSwitch('stats');
    }
});
