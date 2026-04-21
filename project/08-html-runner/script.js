export function init() {
  var codeInput   = document.getElementById("cb-input");
  var lineNumbers = document.getElementById("cb-lines");
  var runBtn      = document.getElementById("cb-run");
  var clearBtn    = document.getElementById("cb-clear");
  var copyBtn     = document.getElementById("cb-copy");
  var pasteBtn    = document.getElementById("cb-paste");

  if (!codeInput) return;

  function updateLines() {
    lineNumbers.innerHTML = codeInput.value.split("\n").map(function(_, i){ return (i+1)+"<br>"; }).join("");
  }

  codeInput.addEventListener("input", updateLines);
  codeInput.addEventListener("scroll", function(){ lineNumbers.scrollTop = codeInput.scrollTop; });

  clearBtn.addEventListener("click", function() {
    codeInput.value = "";
    codeInput.dispatchEvent(new Event("input"));
    codeInput.focus();
  });

  copyBtn.addEventListener("click", function() {
    if (!codeInput.value) return;
    navigator.clipboard.writeText(codeInput.value);
    var sp = copyBtn.querySelector("span"), orig = sp.innerText;
    sp.innerText = "Da copy!"; copyBtn.style.color = "#10b981";
    setTimeout(function(){ sp.innerText = orig; copyBtn.style.color = "#f4f4f5"; }, 1500);
  });

  pasteBtn.addEventListener("click", async function() {
    try {
      var text = await navigator.clipboard.readText();
      if (text) {
        var s = codeInput.selectionStart, e = codeInput.selectionEnd;
        codeInput.value = codeInput.value.substring(0,s) + text + codeInput.value.substring(e);
        codeInput.selectionStart = codeInput.selectionEnd = s + text.length;
        codeInput.dispatchEvent(new Event("input"));
      }
      codeInput.focus();
    } catch(err) { alert("Trinh duyet chan Clipboard. Dung Ctrl+V nhe!"); }
  });

  var PREPEND = "<script>\n  window.__dL=[];\n  var oL=console.log,oE=console.error,oW=console.warn;\n  function _f(a){return Array.from(a).map(function(x){return typeof x===\"object\"?JSON.stringify(x):String(x);}).join(\" \");}\n  console.log=function(){oL.apply(console,arguments);window.__dL.push({m:_f(arguments),t:\"log\"});};\n  console.error=function(){oE.apply(console,arguments);window.__dL.push({m:_f(arguments),t:\"err\"});};\n  console.warn=function(){oW.apply(console,arguments);window.__dL.push({m:_f(arguments),t:\"warn\"});};\n  window.onerror=function(msg,u,line){window.__dL.push({m:msg+\" (line \"+line+\")\",t:\"err\"});return false;};\n</script>";
  var APPEND  = "<div id=\"_cn\" style=\"position:fixed;bottom:0;left:0;width:100%;height:22vh;min-height:160px;background:rgba(24,24,27,.97);backdrop-filter:blur(10px);border-top:1px solid #3f3f46;color:#e4e4e7;font-family:monospace;z-index:2147483645;display:flex;flex-direction:column;\">\n  <div style=\"background:#27272a;padding:8px 15px;font-size:12px;font-weight:bold;color:#a1a1aa;border-bottom:1px solid #3f3f46;display:flex;justify-content:space-between;align-items:center;\">\n    <span><span style=\"display:inline-block;width:8px;height:8px;background:#10b981;border-radius:50%;margin-right:6px;\"></span>Terminal Logs</span>\n    <div style=\"display:flex;gap:8px;\">\n      <span id=\"_tg\" style=\"cursor:pointer;color:#60a5fa;padding:4px 8px;border-radius:4px;background:rgba(59,130,246,.1);\" onclick=\"_tc()\">&#11015; Thu gon</span>\n      <span style=\"cursor:pointer;color:#ef4444;padding:4px 8px;border-radius:4px;background:rgba(239,68,68,.1);\" onclick=\"document.getElementById('_cn').style.display='none'\">&#10005; Dong</span>\n    </div>\n  </div>\n  <div id=\"_cb\" style=\"flex:1;overflow-y:auto;padding:12px;font-size:13px;line-height:1.6;\"></div>\n</div>\n<script>\n  var _ex=true;\n  function _tc(){\n    var c=document.getElementById(\"_cn\"),b=document.getElementById(\"_cb\"),t=document.getElementById(\"_tg\");\n    _ex=!_ex;c.style.height=_ex?\"22vh\":\"35px\";c.style.minHeight=_ex?\"160px\":\"0\";\n    b.style.display=_ex?\"block\":\"none\";t.innerHTML=_ex?\"&#11015; Thu gon\":\"&#11014; Mo rong\";\n  }\n  var _b=document.getElementById(\"_cb\");\n  function _p(item){\n    var d=document.createElement(\"div\");\n    d.style.cssText=\"border-bottom:1px dashed rgba(255,255,255,.05);padding:6px 0;word-break:break-all;\";\n    d.style.color=item.t===\"err\"?\"#f87171\":item.t===\"warn\"?\"#fbe331\":\"#e4e4e7\";\n    d.innerHTML=\"<b style=\\\"opacity:.5;margin-right:5px\\\">&#10162;</b>\"+item.m;\n    if(_b){_b.appendChild(d);_b.scrollTop=_b.scrollHeight;}\n  }\n  window.__dL.forEach(_p);\n  console.log=function(){oL.apply(console,arguments);_p({m:_f(arguments),t:\"log\"});};\n  console.error=function(){oE.apply(console,arguments);_p({m:_f(arguments),t:\"err\"});};\n  console.warn=function(){oW.apply(console,arguments);_p({m:_f(arguments),t:\"warn\"});};\n</script>";

  runBtn.addEventListener("click", function() {
    var code = codeInput.value.trim();
    if (!code) { alert("Vui long go code truoc khi chay!"); return; }
    var full = PREPEND + "\n" + code + "\n" + APPEND;
    var blob = new Blob([full], { type: "text/html;charset=utf-8" });
    window.open(URL.createObjectURL(blob), "_blank");
  });

  codeInput.value = "<!DOCTYPE html>\n<html>\n<head>\n<style>\n  body{font-family:system-ui;display:grid;place-items:center;height:80vh;background:#18181b;color:#fff;margin:0}\n  .box{text-align:center;padding:2.5rem;border-radius:1.5rem;background:#27272a;box-shadow:0 20px 50px rgba(0,0,0,.5);border:1px solid #3f3f46;transition:transform .3s}\n  .box:hover{transform:translateY(-5px)}\n  h2{margin:0 0 10px;font-size:1.8rem;font-weight:800}\n  #num{font-size:4rem;font-weight:900;color:#60a5fa;margin:20px 0;text-shadow:0 0 15px rgba(96,165,250,.5)}\n  button{padding:12px 24px;border:none;border-radius:10px;font-weight:700;font-size:15px;cursor:pointer;background:#3b82f6;color:#fff;transition:all .2s}\n  button:hover{background:#2563eb}\n  button:active{transform:scale(.95)}\n</style>\n</head>\n<body>\n  <div class=\"box\">\n    <h2>Random Spinner</h2>\n    <div id=\"num\">00</div>\n    <button onclick=\"spin()\">Quay So</button>\n  </div>\n  <script>\n    function spin(){\n      console.log(\"Dang quay so...\");\n      var d=document.getElementById(\"num\");\n      setTimeout(function(){\n        var n=Math.floor(Math.random()*100).toString().padStart(2,\"0\");\n        d.textContent=n;\n        console.log(\"So may man: \"+n);\n      },800);\n    }\n  </script>\n</body>\n</html>";
  codeInput.dispatchEvent(new Event("input"));
}