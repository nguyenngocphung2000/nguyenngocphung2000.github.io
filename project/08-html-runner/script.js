export function init() {
  const codeInput   = document.getElementById("cb-input");
  const lineNumbers = document.getElementById("cb-lines");
  const runBtn      = document.getElementById("cb-run");
  const clearBtn    = document.getElementById("cb-clear");
  const copyBtn     = document.getElementById("cb-copy");
  const pasteBtn    = document.getElementById("cb-paste");

  if (!codeInput) return;

  function updateLines() {
    const lines = codeInput.value.split("\n").length;
    lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => i + 1).join("<br>");
  }

  // Hỗ trợ phím Tab trong ô soạn thảo
  codeInput.addEventListener("keydown", function(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = this.selectionStart, e_pos = this.selectionEnd;
      this.value = this.value.substring(0, s) + "  " + this.value.substring(e_pos);
      this.selectionStart = this.selectionEnd = s + 2;
    }
  });

  codeInput.addEventListener("input", updateLines);
  codeInput.addEventListener("scroll", function(){ lineNumbers.scrollTop = codeInput.scrollTop; });

  clearBtn.addEventListener("click", () => {
    codeInput.value = "";
    updateLines();
    codeInput.focus();
  });

  copyBtn.addEventListener("click", () => {
    if (!codeInput.value) return;
    navigator.clipboard.writeText(codeInput.value);
    const sp = copyBtn.querySelector("span"), orig = sp.innerText;
    sp.innerText = "Đã copy!";
    setTimeout(() => sp.innerText = orig, 1500);
  });

  pasteBtn.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const s = codeInput.selectionStart, e_pos = codeInput.selectionEnd;
        codeInput.value = codeInput.value.substring(0,s) + text + codeInput.value.substring(e_pos);
        codeInput.selectionStart = codeInput.selectionEnd = s + text.length;
        updateLines();
      }
      codeInput.focus();
    } catch(err) { alert("Dùng Ctrl+V để dán mã!"); }
  });

  // Safe JSON Stringify cho Terminal
  const _f_body = `function _f(a){
    const cache = new Set();
    return Array.from(a).map(x => {
      if (typeof x === "object" && x !== null) {
        try {
          return JSON.stringify(x, (k, v) => {
            if (typeof v === "object" && v !== null) {
              if (cache.has(v)) return "[Circular]";
              cache.add(v);
            }
            return v;
          });
        } catch(e) { return String(x); }
      }
      return String(x);
    }).join(" ");
  }`;

  const PREPEND = `<script>
    window.__dL=[];
    const oL=console.log, oE=console.error, oW=console.warn;
    ${_f_body}
    console.log=function(){oL.apply(console,arguments);window.__dL.push({m:_f(arguments),t:"log"});};
    console.error=function(){oE.apply(console,arguments);window.__dL.push({m:_f(arguments),t:"err"});};
    console.warn=function(){oW.apply(console,arguments);window.__dL.push({m:_f(arguments),t:"warn"});};
    window.onerror=function(m,u,l){window.__dL.push({m:m+" (line "+l+")",t:"err"});return false;};
  </script>`;

    const APPEND = `<div id="_cn" style="position:fixed;bottom:0;left:0;width:100%;height:22vh;min-height:160px;background:rgba(24,24,27,.98);border-top:1px solid #3f3f46;color:#e4e4e7;font-family:monospace;z-index:2147483645;display:flex;flex-direction:column;">
    <div style="background:#27272a;padding:8px 15px;font-size:12px;font-weight:bold;color:#a1a1aa;border-bottom:1px solid #3f3f46;display:flex;justify-content:space-between;align-items:center;height:34px;box-sizing:border-box;">
      <span>Terminal Logs</span>
      <div style="display:flex;gap:8px;">
        <span id="_tg" style="cursor:pointer;color:#60a5fa;" onclick="_tc()">Thu gon</span>
      </div>
    </div>
    <div id="_cb" style="flex:1;overflow-y:auto;padding:12px;font-size:13px;line-height:1.6;"></div>
  </div>
  <script>
    let _ex=true;
    function _tc(){
      const c=document.getElementById("_cn"),b=document.getElementById("_cb"),t=document.getElementById("_tg");
      _ex=!_ex;
      c.style.height=_ex?"22vh":"34px";
      c.style.minHeight=_ex?"160px":"34px";
      b.style.display=_ex?"block":"none";
      t.innerHTML=_ex?"Thu gon":"Mo rong";
    }
    const _b=document.getElementById("_cb");
    function _p(item){
      const d=document.createElement("div");
      d.style.cssText="border-bottom:1px dashed rgba(255,255,255,.05);padding:6px 0;word-break:break-all;";
      d.style.color=item.t==="err"?"#f87171":item.t==="warn"?"#fbe331":"#e4e4e7";
      d.innerHTML=item.m;
      if(_b){_b.appendChild(d);_b.scrollTop=_b.scrollHeight;}
    }
    window.__dL.forEach(_p);
    console.log=function(){oL.apply(console,arguments);_p({m:_f(arguments),t:"log"});};
    console.error=function(){oE.apply(console,arguments);_p({m:_f(arguments),t:"err"});};
    console.warn=function(){oW.apply(console,arguments);_p({m:_f(arguments),t:"warn"});};
  </script>`;

  runBtn.addEventListener("click", () => {
    const code = codeInput.value.trim();
    if (!code) return;
    const full = PREPEND + "\n" + code + "\n" + APPEND;
    const blob = new Blob([full], { type: "text/html;charset=utf-8" });
    window.open(URL.createObjectURL(blob), "_blank");
  });
  codeInput.value = "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body{font-family:system-ui;display:grid;place-items:center;height:80vh;background:#18181b;color:#fff;margin:0}\n  .box{text-align:center;padding:2.5rem;border-radius:1.5rem;background:#27272a;box-shadow:0 20px 50px rgba(0,0,0,.5);border:1px solid #3f3f46;transition:transform .3s}\n  .box:hover{transform:translateY(-5px)}\n  h2{margin:0 0 10px;font-size:1.8rem;font-weight:800}\n  #num{font-size:4rem;font-weight:900;color:#60a5fa;margin:20px 0;text-shadow:0 0 15px rgba(96,165,250,.5)}\n  button{padding:12px 24px;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;background:#3b82f6;color:#fff;transition:all .2s}\n  button:hover{background:#2563eb}\n  button:active{transform:scale(.95)}\n</style>\n</head>\n<body>\n  <div class=\"box\">\n    <h2>Random Spinner</h2>\n    <div id=\"num\">00</div>\n    <button onclick=\"spin()\">Quay So</button>\n  </div>\n  <script>\n    function spin(){\n      console.log(\"Dang quay so...\");\n      var d=document.getElementById(\"num\");\n      setTimeout(function(){\n        var n=Math.floor(Math.random()*100).toString().padStart(2,\"0\");\n        d.textContent=n;\n        console.log(\"So may man: \"+n);\n      },800);\n    }\n  </script>\n</body>\n</html>";
  codeInput.dispatchEvent(new Event("input"));

  updateLines();
}
