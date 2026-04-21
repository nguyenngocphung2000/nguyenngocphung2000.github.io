export function init() {
  const PIECES = {
    R_G: { label: "帥", color: "red" }, R_A: { label: "仕", color: "red" }, R_E: { label: "相", color: "red" }, R_H: { label: "傌", color: "red" }, R_R: { label: "俥", color: "red" }, R_C: { label: "炮", color: "red" }, R_S: { label: "兵", color: "red" },
    B_G: { label: "將", color: "black" }, B_A: { label: "士", color: "black" }, B_E: { label: "象", color: "black" }, B_H: { label: "馬", color: "black" }, B_R: { label: "車", color: "black" }, B_C: { label: "砲", color: "black" }, B_S: { label: "卒", color: "black" }
  };

  const INIT_BOARD = [
    ["B_R", "B_H", "B_E", "B_A", "B_G", "B_A", "B_E", "B_H", "B_R"],
    [null, null, null, null, null, null, null, null, null],
    [null, "B_C", null, null, null, null, null, "B_C", null],
    ["B_S", null, "B_S", null, "B_S", null, "B_S", null, "B_S"],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    ["R_S", null, "R_S", null, "R_S", null, "R_S", null, "R_S"],
    [null, "R_C", null, null, null, null, null, "R_C", null],
    [null, null, null, null, null, null, null, null, null],
    ["R_R", "R_H", "R_E", "R_A", "R_G", "R_A", "R_E", "R_H", "R_R"]
  ];

  let board = [], turn = "red", selected = null, isFlipped = false, gameState = "SETUP";
  let times = { red: 600, black: 600 }, timerId = null, scores = { top: 0, bottom: 0 };

  const layer = document.getElementById("xq-pieces-layer");
  const overlay = document.getElementById("xq-overlay");
  const alertCheck = document.getElementById("xq-check-alert");
  const msgWinner = document.getElementById("xq-winner-msg");

  const drawBoardSVG = () => {
    let svg = `<svg viewBox="0 0 900 1000" class="xq-svg-board">`;
    const sc = "#94a3b8";
    for(let r=0; r<=9; r++) Object.assign(svg += `<line x1="50" y1="${50+r*100}" x2="850" y2="${50+r*100}" stroke="${sc}" stroke-width="1.5"/>`);
    for(let c=0; c<=8; c++) {
      if(c===0 || c===8) svg += `<line x1="${50+c*100}" y1="50" x2="${50+c*100}" y2="950" stroke="${sc}" stroke-width="1.5"/>`;
      else svg += `<line x1="${50+c*100}" y1="50" x2="${50+c*100}" y2="450" stroke="${sc}" stroke-width="1.5"/><line x1="${50+c*100}" y1="550" x2="${50+c*100}" y2="950" stroke="${sc}" stroke-width="1.5"/>`;
    }
    svg += `<line x1="350" y1="50" x2="550" y2="250" stroke="${sc}" stroke-width="1.5"/><line x1="550" y1="50" x2="350" y2="250" stroke="${sc}" stroke-width="1.5"/>`;
    svg += `<line x1="350" y1="950" x2="550" y2="750" stroke="${sc}" stroke-width="1.5"/><line x1="550" y1="950" x2="350" y2="750" stroke="${sc}" stroke-width="1.5"/>`;
    const drawCross = (r, c) => {
      let cx = 50+c*100, cy = 50+r*100, d = 6, l = 12, res = "";
      if(c>0) res += `<path d="M${cx-d},${cy-d-l} L${cx-d},${cy-d} L${cx-d-l},${cy-d} M${cx-d},${cy+d+l} L${cx-d},${cy+d} L${cx-d-l},${cy+d}" fill="none" stroke="${sc}" stroke-width="1.5"/>`;
      if(c<8) res += `<path d="M${cx+d},${cy-d-l} L${cx+d},${cy-d} L${cx+d+l},${cy-d} M${cx+d},${cy+d+l} L${cx+d},${cy+d} L${cx+d+l},${cy+d}" fill="none" stroke="${sc}" stroke-width="1.5"/>`;
      return res;
    };
    [[2,1],[2,7],[3,0],[3,2],[3,4],[3,6],[3,8],[7,1],[7,7],[6,0],[6,2],[6,4],[6,6],[6,8]].forEach(p => svg+=drawCross(p[0],p[1]));
    document.getElementById("xq-svg-container").innerHTML = svg + "</svg>";
  };

  const fmtTime = s => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`;

  window.xqToggleSurrender = (color, show) => {
    if (gameState !== "PLAYING") return;
    const el = document.getElementById(`xq-surrender-box-${color}`);
    if(el) {
      if(show) el.classList.remove("opacity-0", "pointer-events-none", "scale-95"), el.classList.add("opacity-100", "scale-100");
      else el.classList.add("opacity-0", "pointer-events-none", "scale-95"), el.classList.remove("opacity-100", "scale-100");
    }
  };

  window.xqConfirmSurrender = (color) => {
    window.xqToggleSurrender(color, false);
    endGame(color === "red" ? "black" : "red", `Phe ${color === "red" ? "Đỏ" : "Đen"} đã đầu hàng! ${color === "red" ? "Phe Đen" : "Phe Đỏ"} chiến thắng!`);
  };

  const updatePanelsUI = () => {
    const topColor = isFlipped ? "red" : "black";
    const botColor = isFlipped ? "black" : "red";
    const getHtml = (color, isTop, scoreVal) => {
      const isRed = color === "red";
      const bgCls = isRed ? "border-orange-500/30" : "border-slate-600/50";
      const txtColor = isRed ? "text-orange-400" : "text-slate-300";
      return `
        <div class="relative overflow-hidden flex justify-between items-center glass-card border p-4 rounded-2xl shadow-sm ${isTop ? "rotate-180" : ""}">
          <div class="flex flex-col">
            <span class="text-[10px] font-bold ${txtColor} uppercase tracking-widest">${isRed ? "Phe Đỏ" : "Phe Đen"} ${isTop ? "(Đối diện)" : "(Bạn)"}</span>
            <span class="text-xl font-black ${isRed ? "text-orange-500" : "text-slate-100"}">Điểm: ${scoreVal}</span>
          </div>
          <div class="flex items-center gap-3">
            ${isTop ? `<button onclick="window.xqToggleSurrender('${color}', true)" class="bg-slate-800/50 hover:bg-slate-800/40 border border-slate-600/50 text-slate-300 text-[10px] font-bold px-3 py-2 rounded-xl active:scale-95">Đầu hàng</button><div id="xq-time-${color}" class="text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center xq-timer">${fmtTime(times[color])}</div>` : `<div id="xq-time-${color}" class="text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center xq-timer">${fmtTime(times[color])}</div><button onclick="window.xqToggleSurrender('${color}', true)" class="bg-slate-800/50 hover:bg-slate-800/40 border border-slate-600/50 text-slate-300 text-[10px] font-bold px-3 py-2 rounded-xl active:scale-95">Đầu hàng</button>`}
          </div>
          <div id="xq-surrender-box-${color}" class="absolute inset-0 bg-slate-800/50 backdrop-blur-md flex items-center justify-between px-5 opacity-0 scale-95 pointer-events-none transition-all duration-200 z-20">
            <span class="text-sm font-bold text-slate-200">Xác nhận đầu hàng?</span>
            <div class="flex gap-2">
              <button onclick="window.xqToggleSurrender('${color}', false)" class="px-4 py-2 bg-slate-700 text-slate-300 text-xs font-bold rounded-xl active:scale-95">Hủy</button>
              <button onclick="window.xqConfirmSurrender('${color}')" class="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl border border-red-700">Đồng ý</button>
            </div>
          </div>
        </div>`;
    };
    document.getElementById("xq-top-panel").innerHTML = getHtml(topColor, true, scores.top);
    document.getElementById("xq-bottom-panel").innerHTML = getHtml(botColor, false, scores.bottom);
    updateTimeHighlight();
  };

  const updateTimeHighlight = () => {
    const tr = document.getElementById("xq-time-red"), tb = document.getElementById("xq-time-black");
    if(tr) tr.className = `text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 bg-slate-800/50 text-red-400 border border-red-200 shadow-inner`;
    if(tb) tb.className = `text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 bg-slate-800/50 text-slate-400 border border-slate-300 shadow-inner`;
    if (gameState === "PLAYING") {
      const active = document.getElementById(`xq-time-${turn}`);
      if(active) {
        active.className = `text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all bg-${turn==="red"?"orange":"slate"}-600 text-white border border-${turn==="red"?"orange":"slate"}-500 shadow-[0_0_15px_rgba(${turn==="red"?"249,115,22":"100,116,139"},0.8)] xq-timer-active`;
      }
    }
  };

  const renderPieces = () => {
    layer.innerHTML = "";
    for(let r=0; r<10; r++) for(let c=0; c<9; c++) {
      if(board[r][c]) {
        const p = PIECES[board[r][c]], div = document.createElement("div");
        div.style.left = `${(isFlipped ? 8-c : c)*100/9 + 5.55}%`, div.style.top = `${(isFlipped ? 9-r : r)*100/10 + 5}%`;
        div.className = `xq-piece ${p.color} ${(isFlipped ? p.color==="red" : p.color==="black") ? "rotated" : ""} ${selected && selected.r===r && selected.c===c ? "selected" : ""}`;
        div.innerText = p.label;
        div.onclick = (e) => { e.stopPropagation(); if(gameState==="PLAYING") handleSquareClick(r, c); };
        layer.appendChild(div);
      }
    }
    if(selected && gameState==="PLAYING") {
      getLegalMoves(selected.r, selected.c).forEach(m => {
        const dot = document.createElement("div"); dot.className = "xq-dot";
        dot.style.left = `${(isFlipped ? 8-m.c : m.c)*100/9 + 5.55}%`, dot.style.top = `${(isFlipped ? 9-m.r : m.r)*100/10 + 5}%`;
        dot.onclick = (e) => { e.stopPropagation(); handleSquareClick(m.r, m.c); };
        layer.appendChild(dot);
      });
    }
  };

  const getPseudoMoves = (b, r, c) => {
    let moves = [], isR = b[r][c].startsWith("R"), t = b[r][c].split("_")[1];
    for(let i=0; i<10; ++i) for(let j=0; j<9; ++j) {
      if(r===i && c===j) continue;
      if(b[i][j] && b[i][j].startsWith(isR?"R":"B")) continue;
      let dr = Math.abs(i-r), dc = Math.abs(j-c), v = false;
      if(t==="G") v = (dr+dc===1 && j>=3 && j<=5 && (isR ? i>=7 : i<=2));
      else if(t==="A") v = (dr===1 && dc===1 && j>=3 && j<=5 && (isR ? i>=7 : i<=2));
      else if(t==="E") v = (dr===2 && dc===2 && (isR ? i>=5 : i<=4) && !b[(r+i)/2][(c+j)/2]);
      else if(t==="H") v = (dr===2 && dc===1 && !b[r+Math.sign(i-r)][c]) || (dr===1 && dc===2 && !b[r][c+Math.sign(j-c)]);
      else if(t==="R") v = (dr===0 || dc===0) && !countObs(b, r, c, i, j);
      else if(t==="C") { let o = countObs(b, r, c, i, j); v = (dr===0 || dc===0) && (!b[i][j] ? o===0 : o===1); }
      else if(t==="S") v = isR ? (i===r-1 && dc===0) || (r<=4 && dr===0 && dc===1) : (i===r+1 && dc===0) || (r>=5 && dr===0 && dc===1);
      if(v) moves.push({r:i, c:j});
    }
    return moves;
  };

  const countObs = (b,r1,c1,r2,c2) => {
    let c = 0;
    if(r1===r2) for(let i=Math.min(c1,c2)+1; i<Math.max(c1,c2); i++) b[r1][i] && c++;
    else for(let i=Math.min(r1,r2)+1; i<Math.max(r1,r2); i++) b[i][c1] && c++;
    return c;
  };

  const isCheck = (b, col) => {
    let kr=-1, kc;
    for(let r=0; r<10; r++) for(let c=0; c<9; c++) if(b[r][c] === (col==="red"?"R_G":"B_G")) { kr=r; kc=c; break; }
    if(kr===-1) return false;
    let ekr=-1;
    for(let r=0; r<10; r++) if(b[r][kc] === (col==="red"?"B_G":"R_G")) { ekr=r; break; }
    if(ekr!==-1 && countObs(b,kr,kc,ekr,kc)===0) return true;
    for(let r=0; r<10; r++) for(let c=0; c<9; c++) if(b[r][c] && b[r][c].startsWith(col==="red"?"B":"R"))
      if(getPseudoMoves(b, r, c).some(m => m.r===kr && m.c===kc)) return true;
    return false;
  };

  const getLegalMoves = (r, c) => getPseudoMoves(board, r, c).filter(m => {
    let tp = board[m.r][m.c], p = board[r][c];
    board[m.r][m.c] = p; board[r][c] = null;
    let chk = isCheck(board, p.startsWith("R") ? "red" : "black");
    board[r][c] = p; board[m.r][m.c] = tp;
    return !chk;
  });

  const updateGameState = () => {
    const enemy = turn === "red" ? "black" : "red";
    const inChk = isCheck(board, enemy);
    if(inChk) { alertCheck.classList.remove("xq-anim-check"); void alertCheck.offsetWidth; alertCheck.classList.add("xq-anim-check"); }
    let hasMoves = false;
    for(let r=0; r<10; r++) for(let c=0; c<9; c++) {
      if(board[r][c] && board[r][c].startsWith(enemy==="red"?"R":"B") && getLegalMoves(r,c).length) { hasMoves = true; break; }
    }
    if(!hasMoves) endGame(turn, inChk ? `CHIẾU BÍ! Phe ${turn==="red"?"Đỏ":"Đen"} thắng!` : `HẾT NƯỚC ĐI! Phe ${turn==="red"?"Đỏ":"Đen"} thắng!`);
    else { turn = enemy; updateTimeHighlight(); }
  };

  const handleSquareClick = (r, c) => {
    const p = board[r][c];
    if(p && p.startsWith(turn==="red"?"R":"B")) { selected = {r, c, id: p}; renderPieces(); return; }
    if(selected && getLegalMoves(selected.r, selected.c).some(m => m.r===r && m.c===c)) {
      board[r][c] = selected.id; board[selected.r][selected.c] = null;
      selected = null; updateGameState(); renderPieces();
    } else { selected = null; renderPieces(); }
  };
  layer.onclick = () => { if(gameState==="PLAYING") { selected = null; renderPieces(); } };

  const timerTick = () => {
    if(gameState!=="PLAYING") return;
    times[turn]--; updateTimeUI();
    if(times[turn]<=0) endGame(turn==="red"?"black":"red", `HẾT GIỜ! Phe ${turn==="red"?"Đen":"Đỏ"} giành chiến thắng!`);
  };

  const updateTimeUI = () => {
    if(document.getElementById("xq-time-red")) document.getElementById("xq-time-red").innerText = fmtTime(times.red);
    if(document.getElementById("xq-time-black")) document.getElementById("xq-time-black").innerText = fmtTime(times.black);
  };

  const endGame = (wc, msg) => {
    gameState = "ENDED"; clearInterval(timerId);
    if(wc==="red") isFlipped ? scores.top++ : scores.bottom++; else isFlipped ? scores.bottom++ : scores.top++;
    updatePanelsUI(); msgWinner.innerText = msg; msgWinner.classList.remove("hidden");
    setTimeout(() => { overlay.style.opacity = "1"; overlay.style.pointerEvents = "auto"; document.getElementById("xq-btn-start").innerText = "CHƠI VÁN MỚI"; }, 1000);
  };

  const setupBoard = () => {
    board = INIT_BOARD.map(r => [...r]); turn = "red"; selected = null;
    let m = parseInt(document.getElementById("xq-time-input").value) || 10;
    times = { red: m*60, black: m*60 };
    updatePanelsUI(); renderPieces();
  };

  document.getElementById("xq-btn-start").onclick = () => {
    setupBoard(); gameState = "PLAYING"; overlay.style.opacity = "0"; overlay.style.pointerEvents = "none";
    msgWinner.classList.add("hidden"); clearInterval(timerId); timerId = setInterval(timerTick, 1000); updateTimeHighlight();
  };
  document.getElementById("xq-btn-reset").onclick = () => {
    scores = {top:0, bottom:0}; gameState = "SETUP"; clearInterval(timerId);
    msgWinner.innerText = "Đã làm mới tỷ số 0 - 0"; msgWinner.classList.remove("hidden");
    overlay.style.opacity = "1"; overlay.style.pointerEvents = "auto"; document.getElementById("xq-btn-start").innerText = "BẮT ĐẦU"; setupBoard();
  };
  document.getElementById("xq-btn-flip").onclick = () => { isFlipped = !isFlipped; updatePanelsUI(); renderPieces(); };

  drawBoardSVG();
  updatePanelsUI();
  setupBoard();
}
