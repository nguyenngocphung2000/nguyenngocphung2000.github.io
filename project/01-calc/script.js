/**
 * Init logic cho Tool Tính Toán (Phần trăm & La Mã)
 */
export function init() {
  const btnM1 = document.getElementById("mode-1-btn");
  const btnM2 = document.getElementById("mode-2-btn");
  const btnM3 = document.getElementById("mode-3-btn");

  const secM1 = document.getElementById("calc-mode-1");
  const secM2 = document.getElementById("calc-mode-2");
  const secM3 = document.getElementById("calc-mode-3");

  const activeClass = "flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-bold bg-slate-800/50 text-orange-500 shadow-sm transition";
  const inactiveClass = "flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-bold text-slate-500 hover:text-orange-500 hover:bg-slate-800/50 transition";

  // Tab switching logic
  const switchMode = (mode) => {
    btnM1.className = mode === 1 ? activeClass : inactiveClass;
    btnM2.className = mode === 2 ? activeClass : inactiveClass;
    btnM3.className = mode === 3 ? activeClass : inactiveClass;

    secM1.classList.toggle("hidden", mode !== 1);
    secM2.classList.toggle("hidden", mode !== 2);
    secM3.classList.toggle("hidden", mode !== 3);
  };

  btnM1.onclick = () => switchMode(1);
  btnM2.onclick = () => switchMode(2);
  btnM3.onclick = () => switchMode(3);

  // Formatting utilities
  const fmt = (num) => Number.isInteger(num) ? num.toLocaleString("vi-VN") : Number(num.toFixed(2)).toLocaleString("vi-VN");
  const clean = (num) => parseFloat(num.toFixed(2));

  // Determine the target input to calculate automatically based on the oldest modification
  const getTarget = (i1, i2, i3) => {
    const arr = [i1, i2, i3].map((el) => ({
      el,
      time: parseInt(el.dataset.last || 0),
    }));
    arr.sort((a, b) => a.time - b.time);
    return arr[0].el; // Mảnh ghép bị sửa lâu nhất sẽ là mốc để tự động điền
  };

  const attachLogic = (inputs, calcFunc) => {
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        e.target.dataset.last = Date.now();
        calcFunc();
      });
    });
  };

  // --- Chức năng 1: X phần trăm của Y ---
  const c1P = document.getElementById("c1-p"),
        c1V = document.getElementById("c1-v"),
        c1Res = document.getElementById("c1-res");
  const calc1 = () => {
    const target = getTarget(c1P, c1V, c1Res);
    const p = parseFloat(c1P.value), v = parseFloat(c1V.value), r = parseFloat(c1Res.value);
    
    if (target === c1Res && !isNaN(p) && !isNaN(v)) c1Res.value = clean((p * v) / 100);
    else if (target === c1V && !isNaN(p) && !isNaN(r) && p !== 0) c1V.value = clean((r * 100) / p);
    else if (target === c1P && !isNaN(v) && !isNaN(r) && v !== 0) c1P.value = clean((r / v) * 100);
  };
  attachLogic([c1P, c1V, c1Res], calc1);

  // --- Chức năng 2: X là phần trăm của Y ---
  const c2X = document.getElementById("c2-x"),
        c2Y = document.getElementById("c2-y"),
        c2Res = document.getElementById("c2-res");
  const calc2 = () => {
    const target = getTarget(c2X, c2Y, c2Res);
    const x = parseFloat(c2X.value), y = parseFloat(c2Y.value), r = parseFloat(c2Res.value);
    
    if (target === c2Res && !isNaN(x) && !isNaN(y) && y !== 0) c2Res.value = clean((x / y) * 100);
    else if (target === c2X && !isNaN(r) && !isNaN(y)) c2X.value = clean((r * y) / 100);
    else if (target === c2Y && !isNaN(x) && !isNaN(r) && r !== 0) c2Y.value = clean((x / r) * 100);
  };
  attachLogic([c2X, c2Y, c2Res], calc2);

  // --- Chức năng 3: Tăng/Giảm phần trăm ---
  const c3Old = document.getElementById("c3-old"),
        c3New = document.getElementById("c3-new"),
        c3Res = document.getElementById("c3-res");
  const calc3 = () => {
    const target = getTarget(c3Old, c3New, c3Res);
    const o = parseFloat(c3Old.value), n = parseFloat(c3New.value), r = parseFloat(c3Res.value);
    
    if (target === c3Res && !isNaN(o) && !isNaN(n) && o !== 0) c3Res.value = clean(((n - o) / o) * 100);
    else if (target === c3New && !isNaN(o) && !isNaN(r)) c3New.value = clean(o * (1 + r / 100));
    else if (target === c3Old && !isNaN(n) && !isNaN(r) && r !== -100) c3Old.value = clean(n / (1 + r / 100));
  };
  attachLogic([c3Old, c3New, c3Res], calc3);

  // --- Lịch sử tính toán ---
  const historyList = document.getElementById("history-list");
  const STORAGE_KEY = "my_calc_history";

  const loadHistory = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    let historyArr = savedData ? JSON.parse(savedData) : [];
    historyList.innerHTML = "";

    if (historyArr.length > 0) {
      historyArr.forEach((item) => {
        const li = document.createElement("li");
        li.className = 'bg-slate-800/80 p-3 rounded-xl border border-slate-600/50 shadow-sm flex items-center before:content-["•"] before:text-orange-500 before:mr-2 before:font-bold before:text-lg text-slate-200 font-medium animate-[fadeIn_0.3s_ease]';
        li.innerHTML = item;
        historyList.appendChild(li);
      });
    } else {
      historyList.innerHTML = '<li class="italic text-gray-400 text-center py-10 empty-msg text-xs">Chưa có lịch sử nào.<br>Hãy bấm "Lưu KQ" ở các phần tính toán!</li>';
    }
  };

  const addHistory = (textHTML) => {
    let historyArr = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    historyArr.unshift(textHTML);
    if (historyArr.length > 30) historyArr.pop(); // Giữ tối đa 30 kết quả
    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyArr));
    loadHistory();
  };

  // Nút Save
  document.getElementById("c1-save").onclick = () => {
    if (c1P.value && c1V.value && c1Res.value)
      addHistory(`<span class="text-orange-500">${fmt(parseFloat(c1P.value))}%</span> của ${fmt(parseFloat(c1V.value))} = <span class="text-red-500">${fmt(parseFloat(c1Res.value))}</span>`);
  };
  document.getElementById("c2-save").onclick = () => {
    if (c2X.value && c2Y.value && c2Res.value)
      addHistory(`${fmt(parseFloat(c2X.value))} là <span class="text-orange-500">${fmt(parseFloat(c2Res.value))}%</span> của ${fmt(parseFloat(c2Y.value))}`);
  };
  document.getElementById("c3-save").onclick = () => {
    if (c3Old.value && c3New.value && c3Res.value) {
      const r = parseFloat(c3Res.value);
      const txt = r > 0 ? "Tăng" : "Giảm";
      addHistory(`Từ ${fmt(parseFloat(c3Old.value))} → ${fmt(parseFloat(c3New.value))} là <span class="text-${r > 0 ? "green" : "red"}-500">${txt} ${fmt(Math.abs(r))}%</span>`);
    }
  };

  // Nút Clear Input
  const clearInput = (el1, el2, el3) => {
    el1.value = el2.value = el3.value = "";
    el1.dataset.last = el2.dataset.last = el3.dataset.last = 0;
  };
  document.getElementById("c1-clear").onclick = () => clearInput(c1P, c1V, c1Res);
  document.getElementById("c2-clear").onclick = () => clearInput(c2X, c2Y, c2Res);
  document.getElementById("c3-clear").onclick = () => clearInput(c3Old, c3New, c3Res);

  // Xóa toàn bộ lịch sử
  document.getElementById("clear-history").onclick = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      localStorage.removeItem(STORAGE_KEY);
      loadHistory();
    }
  };

  // --- Chuyển đổi Số La Mã ---
  const inArabic = document.getElementById("ro-arabic");
  const inRoman = document.getElementById("ro-roman");

  const romanMap = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };

  const toRoman = (num) => {
    if (num < 1 || num > 3999) return "LỖI";
    let str = "";
    for (let i of Object.keys(romanMap)) {
      let q = Math.floor(num / romanMap[i]);
      num -= q * romanMap[i];
      str += i.repeat(q);
    }
    return str;
  };

  const toArabic = (str) => {
    str = str.toUpperCase();
    let num = 0;
    if (!/^[IVXLCDM]+$/.test(str)) return NaN;
    for (let i of Object.keys(romanMap)) {
      while (str.indexOf(i) === 0) {
        num += romanMap[i];
        str = str.replace(i, "");
      }
    }
    return num;
  };

  inArabic.addEventListener("input", () => {
    const val = parseInt(inArabic.value);
    if (!isNaN(val)) {
      const result = toRoman(val);
      inRoman.value = result === "LỖI" ? "" : result;
    } else {
      inRoman.value = "";
    }
  });

  inRoman.addEventListener("input", () => {
    const val = inRoman.value.trim().toUpperCase();
    if (val) {
      const result = toArabic(val);
      inArabic.value = isNaN(result) ? "" : result;
    } else {
      inArabic.value = "";
    }
  });

  document.getElementById("ro-save").onclick = () => {
    if (inArabic.value && inRoman.value && inRoman.value !== "LỖI") {
      addHistory(`Số <span class="text-orange-500 font-bold">${inArabic.value}</span> = La Mã <span class="text-red-500 font-bold">${inRoman.value}</span>`);
    }
  };

  document.getElementById("ro-clear").onclick = () => {
    inArabic.value = "";
    inRoman.value = "";
  };

  // Khởi chạy lịch sử khi vừa load xong
  loadHistory();
}
