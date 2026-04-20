export function setupTool() {
  const tabId = "tab-about";
  let panel = document.getElementById(tabId);
  if (!panel) {
    panel = document.createElement("div");
    panel.id = tabId;
    panel.className = "tab-panel active";
    document.getElementById("app-container").appendChild(panel);
  }

  const renderContent = async () => {
    try {
      const response = await fetch("data/about.md");
      if (!response.ok) throw new Error("File not found");
      const text = await response.text();
      
      panel.innerHTML = `
        <div class="w-full max-w-3xl mx-auto px-4 py-8 md:py-12 relative">
            <div class="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] invisible md:visible pointer-events-none"></div>
            
            <div class="glass-card relative z-10 p-8 md:p-12 rounded-[2rem] border border-orange-500/20 shadow-2xl backdrop-blur-2xl bg-slate-900/80">
                <div class="prose prose-custom max-w-none text-slate-300 mx-auto">
                    ${marked.parse(text)}
                </div>
            </div>
        </div>
      `;
    } catch(err) {
      panel.innerHTML = `<div class="text-center text-red-500 p-10 font-bold glass-card">Lỗi tải dữ liệu About.</div>`;
    }
  };

  renderContent();
}
