export function init() {
  const sD = document.getElementById("tc-start-d"),
    sM = document.getElementById("tc-start-m"),
    sY = document.getElementById("tc-start-y");
  const eD = document.getElementById("tc-end-d"),
    eM = document.getElementById("tc-end-m"),
    eY = document.getElementById("tc-end-y");
  const btnConv = document.getElementById("tc-btn-conv"),
    btnReal = document.getElementById("tc-btn-real");

  const m2sD = document.getElementById("m2-start-d"),
    m2sM = document.getElementById("m2-start-m"),
    m2sY = document.getElementById("m2-start-y");
  const m2eD = document.getElementById("m2-end-d"),
    m2eM = document.getElementById("m2-end-m"),
    m2eY = document.getElementById("m2-end-y");
  const m2wY = document.getElementById("m2-wait-y"),
    m2wM = document.getElementById("m2-wait-m"),
    m2wD = document.getElementById("m2-wait-d");
  const m2rNum = document.getElementById("m2-ratio-num"),
    m2rDen = document.getElementById("m2-ratio-den");
  const btnMod2 = document.getElementById("mod2-btn-calc");

  const tcEmptyState = document.getElementById("tc-empty-state");
  const mod2EmptyState = document.getElementById("mod2-empty-state");
  const resDiv1 = document.getElementById("tc-result");
  const resDiv2 = document.getElementById("mod2-result");

  const btnClear = document.getElementById("tc-btn-clear"),
    historyList = document.getElementById("tc-history-list");

  let tcHistory = [];
  try {
    const stored = localStorage.getItem("nothing_tc_history");
    if (stored) tcHistory = JSON.parse(stored);
  } catch (e) {
    tcHistory = [];
  }
  const saveHistory = function () {
    localStorage.setItem("nothing_tc_history", JSON.stringify(tcHistory));
  };

  const renderHistory = function () {
    historyList.innerHTML = "";
    if (tcHistory.length === 0) {
      historyList.innerHTML =
        '<div class="text-[11px] text-slate-400 italic text-center py-4">Chưa có lịch sử tính toán nào.</div>';
      return;
    }
    for (let i = 0; i < tcHistory.length; i++) {
      const h = tcHistory[i];
      let colorType = "text-orange-500";
      if (h.typeLabel === "Thực tế (Theo Lịch)") colorType = "text-slate-300";
      if (h.typeLabel === "Thời Gian Đa Chiều") colorType = "text-orange-400";

      let itemHtml =
        '<div class="tc-history-item bg-slate-800/60 p-3 rounded-xl border border-slate-600/50 flex flex-col gap-1 shadow-sm">';
      itemHtml +=
        '<div class="flex justify-between items-center"><div class="text-[10px] font-bold text-slate-400">' +
        h.dateStart +
        '</div><div class="text-[9px] font-bold ' +
        colorType +
        ' uppercase bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-600/50">' +
        h.typeLabel +
        "</div></div>";
      itemHtml +=
        '<div class="text-sm font-black text-slate-200 mt-1">' +
        h.resText1 +
        "</div>";
      itemHtml +=
        '<div class="text-[11px] font-medium text-slate-500">' +
        h.resText4 +
        "</div></div>";
      historyList.innerHTML += itemHtml;
    }
  };

  renderHistory();
  btnClear.onclick = function () {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      tcHistory = [];
      saveHistory();
      renderHistory();
    }
  };

  const updateDays = function (dElem, mElem, yElem) {
    let currentD = parseInt(dElem.value) || new Date().getDate();
    const m = parseInt(mElem.value) || new Date().getMonth() + 1;
    const y = parseInt(yElem.value) || new Date().getFullYear();
    const maxD = new Date(y, m, 0).getDate();
    if (currentD > maxD) currentD = maxD;
    let dOpts = "";
    for (let i = 1; i <= maxD; i++)
      dOpts +=
        '<option value="' +
        i +
        '" ' +
        (i === currentD ? "selected" : "") +
        ">" +
        i +
        "</option>";
    dElem.innerHTML = dOpts;
  };

  let mOpts = "";
  for (let i = 1; i <= 12; i++)
    mOpts += '<option value="' + i + '">' + i + "</option>";
  sM.innerHTML = mOpts;
  eM.innerHTML = mOpts;

  let yOpts = "";
  const curY = new Date().getFullYear();
  for (let i = curY - 50; i <= curY + 50; i++)
    yOpts += '<option value="' + i + '">' + i + "</option>";
  sY.innerHTML = yOpts;
  eY.innerHTML = yOpts;

  const updateDaysM2Start = function () {
    const currentD = m2sD.value;
    const m = parseInt(m2sM.value);
    const y = parseInt(m2sY.value);
    let dOpts = '<option value=""># Ngày</option>';
    const maxD = !isNaN(m) && !isNaN(y) ? new Date(y, m, 0).getDate() : 31;
    for (let i = 1; i <= maxD; i++)
      dOpts +=
        '<option value="' +
        i +
        '" ' +
        (i == currentD ? "selected" : "") +
        ">" +
        i +
        "</option>";
    m2sD.innerHTML = dOpts;
  };

  let mOptsM2S = '<option value=""># Tháng</option>';
  for (let i = 1; i <= 12; i++)
    mOptsM2S += '<option value="' + i + '">' + i + "</option>";
  m2sM.innerHTML = mOptsM2S;

  let yOptsM2S = '<option value=""># Năm</option>';
  for (let i = curY - 50; i <= curY + 50; i++)
    yOptsM2S += '<option value="' + i + '">' + i + "</option>";
  m2sY.innerHTML = yOptsM2S;

  const setupDateListeners = function (d, m, y) {
    m.addEventListener("change", function () {
      updateDays(d, m, y);
    });
    y.addEventListener("change", function () {
      updateDays(d, m, y);
    });
  };
  setupDateListeners(sD, sM, sY);
  setupDateListeners(eD, eM, eY);
  m2sM.addEventListener("change", updateDaysM2Start);
  m2sY.addEventListener("change", updateDaysM2Start);

  const today = new Date();
  sM.value = today.getMonth() + 1;
  sY.value = today.getFullYear();
  updateDays(sD, sM, sY);
  sD.value = today.getDate();
  eM.value = today.getMonth() + 1;
  eY.value = today.getFullYear();
  updateDays(eD, eM, eY);
  eD.value = today.getDate();
  m2sM.value = today.getMonth() + 1;
  m2sY.value = today.getFullYear();
  updateDaysM2Start();
  m2sD.value = today.getDate();

  const updateEndDays = function () {
    const currentD = m2eD.value;
    const m = parseInt(m2eM.value);
    const y = parseInt(m2eY.value);
    let dOpts = '<option value=""># Ngày</option>';
    const maxD = !isNaN(m) && !isNaN(y) ? new Date(y, m, 0).getDate() : 31;
    for (let i = 1; i <= maxD; i++)
      dOpts +=
        '<option value="' +
        i +
        '" ' +
        (i == currentD ? "selected" : "") +
        ">" +
        i +
        "</option>";
    m2eD.innerHTML = dOpts;
  };
  let mOptsE = '<option value=""># Tháng</option>';
  for (let i = 1; i <= 12; i++)
    mOptsE += '<option value="' + i + '">' + i + "</option>";
  m2eM.innerHTML = mOptsE;
  let yOptsE = '<option value=""># Năm</option>';
  for (let i = curY - 50; i <= curY + 50; i++)
    yOptsE += '<option value="' + i + '">' + i + "</option>";
  m2eY.innerHTML = yOptsE;
  updateEndDays();
  m2eM.addEventListener("change", updateEndDays);
  m2eY.addEventListener("change", updateEndDays);

  m2eM.value = today.getMonth() + 1;
  m2eY.value = today.getFullYear();
  updateEndDays();
  m2eD.value = today.getDate();

  document.getElementById("m2-btn-clear-start").onclick = function () {
    m2sD.value = "";
    m2sM.value = "";
    m2sY.value = "";
    updateDaysM2Start();
  };
  document.getElementById("m2-btn-clear-end").onclick = function () {
    m2eD.value = "";
    m2eM.value = "";
    m2eY.value = "";
    updateEndDays();
  };
  document.getElementById("m2-btn-clear-wait").onclick = function () {
    m2wY.value = "";
    m2wM.value = "";
    m2wD.value = "";
  };
  document.getElementById("m2-btn-clear-ratio").onclick = function () {
    m2rNum.value = "";
    m2rDen.value = "";
  };

  document.getElementById("mod2-btn-reset").onclick = function () {
    const td = new Date();
    m2sM.value = td.getMonth() + 1;
    m2sY.value = td.getFullYear();
    updateDaysM2Start();
    m2sD.value = td.getDate();
    m2eM.value = td.getMonth() + 1;
    m2eY.value = td.getFullYear();
    updateEndDays();
    m2eD.value = td.getDate();
    m2wY.value = "";
    m2wM.value = "";
    m2wD.value = "";
    m2rNum.value = "";
    m2rDen.value = "";

    resDiv2.classList.add("hidden");
    mod2EmptyState.classList.remove("hidden");
  };

  const ratioBtns = document.querySelectorAll(".m2-quick-ratio");
  for (let k = 0; k < ratioBtns.length; k++) {
    ratioBtns[k].onclick = function () {
      m2rNum.value = this.getAttribute("data-num");
      m2rDen.value = this.getAttribute("data-den");
    };
  }

  const processCalcModule1 = function (isReal) {
    const d1 = parseInt(sD.value),
      m1 = parseInt(sM.value),
      y1 = parseInt(sY.value);
    const d2 = parseInt(eD.value),
      m2 = parseInt(eM.value),
      y2 = parseInt(eY.value);
    const startDate = new Date(y1, m1 - 1, d1),
      endDate = new Date(y2, m2 - 1, d2);
    if (endDate < startDate) {
      alert("Lỗi: Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    let str1 = "",
      str2 = "",
      str3 = "",
      str4 = "",
      typeLabel = "";
    if (!isReal) {
      typeLabel = "Công thức (30đ/tháng)";
      let yearRes = 0,
        monthRes = 0,
        dayRes = 0,
        tempD2 = d2,
        tempM2 = m2,
        tempY2 = y2;
      if (tempD2 >= d1) {
        dayRes = tempD2 - d1;
      } else {
        dayRes = tempD2 + 30 - d1;
        tempM2 = tempM2 - 1;
      }
      if (tempM2 >= m1) {
        monthRes = tempM2 - m1;
      } else {
        monthRes = tempM2 + 12 - m1;
        tempY2 = tempY2 - 1;
      }
      yearRes = tempY2 - y1;
      str1 = yearRes + " năm " + monthRes + " tháng " + dayRes + " ngày";
      const totalMonths = yearRes * 12 + monthRes;
      str2 =
        Math.floor(totalMonths / 3) +
        " quý " +
        ((totalMonths % 3) * 30 + dayRes) +
        " ngày";
      str3 = totalMonths + " tháng " + dayRes + " ngày";
      str4 = yearRes * 360 + monthRes * 30 + dayRes + " ngày";
    } else {
      typeLabel = "Thực tế (Theo Lịch)";
      const totalDaysReal = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      let totalMonthsReal = (y2 - y1) * 12 + (m2 - m1);
      if (d2 < d1) totalMonthsReal--;
      const yearResReal = Math.floor(totalMonthsReal / 12),
        monthResReal = totalMonthsReal % 12;
      const tempDate = new Date(y1, m1 - 1, d1);
      const originalDay = tempDate.getDate();
      tempDate.setMonth(tempDate.getMonth() + totalMonthsReal);
      if (tempDate.getDate() !== originalDay) {
        tempDate.setDate(0);
      }
      const dayResReal = Math.round(
        (endDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      str1 =
        yearResReal + " năm " + monthResReal + " tháng " + dayResReal + " ngày";
      str2 =
        Math.floor(totalMonthsReal / 3) +
        " quý " +
        (totalMonthsReal % 3) +
        " tháng " +
        dayResReal +
        " ngày";
      str3 = totalMonthsReal + " tháng " + dayResReal + " ngày";
      str4 = totalDaysReal + " ngày";
    }

    document.getElementById("tc-res-1").innerText = str1;
    document.getElementById("tc-res-2").innerText = str2;
    document.getElementById("tc-res-3").innerText = str3;
    document.getElementById("tc-res-4").innerText = str4;
    document.getElementById("tc-res-type").innerText = typeLabel;

    tcEmptyState.classList.add("hidden");
    resDiv1.classList.remove("hidden");

    const startStr = ("0" + d1).slice(-2) + "/" + ("0" + m1).slice(-2) + "/" + y1;
    const endStr = ("0" + d2).slice(-2) + "/" + ("0" + m2).slice(-2) + "/" + y2;
    const isDup =
      tcHistory.length > 0 &&
      tcHistory[0].dateStart === startStr + " ➔ " + endStr &&
      tcHistory[0].typeLabel === typeLabel;
    if (!isDup) {
      tcHistory.unshift({
        dateStart: startStr + " ➔ " + endStr,
        resText1: str1,
        resText4: "Tổng: " + str4,
        typeLabel: typeLabel,
      });
      if (tcHistory.length > 30) tcHistory.pop();
      saveHistory();
      renderHistory();
    }
  };

  btnConv.onclick = function () {
    processCalcModule1(false);
  };
  btnReal.onclick = function () {
    processCalcModule1(true);
  };

  const getDays360 = function (d1, m1, y1, d2, m2, y2) {
    return (y2 - y1) * 360 + (m2 - m1) * 30 + (d2 - d1);
  };
  const daysToYMD = function (days) {
    return {
      y: Math.floor(days / 360),
      m: Math.floor((days % 360) / 30),
      d: (days % 360) % 30,
    };
  };
  const gcd = function (a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  const makeRow = function (label, value, isHighlight) {
    if (isHighlight) {
      return (
        '<div class="flex flex-col items-center bg-orange-500/20 p-4 mt-2 rounded-xl border border-orange-500/50 shadow-inner"><span class="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">' +
        label +
        '</span><span class="font-black text-orange-500 text-xl md:text-2xl text-center shadow-orange-500" style="text-shadow: 0 0 10px rgba(249,115,22,0.5);">' +
        value +
        "</span></div>"
      );
    }
    return (
      '<div class="flex flex-col bg-slate-800/70 p-3 rounded-lg border border-slate-600/50 shadow-sm mt-3"><span class="text-[9px] font-bold text-slate-400 uppercase">' +
      label +
      '</span><span class="font-black text-slate-200 text-sm mt-0.5">' +
      value +
      "</span></div>"
    );
  };

  btnMod2.onclick = function () {
    const sD = parseInt(m2sD.value),
      sM = parseInt(m2sM.value),
      sY = parseInt(m2sY.value);
    if (isNaN(sD) || isNaN(sM) || isNaN(sY)) {
      alert(
        "Lỗi: Vui lòng nhập đầy đủ Ngày Bắt Đầu (Được dùng làm mốc quy chiếu).",
      );
      return;
    }

    const eD = m2eD.value,
      eM = m2eM.value,
      eY = m2eY.value;
    const wYv = parseInt(m2wY.value) || 0,
      wMv = parseInt(m2wM.value) || 0,
      wDv = parseInt(m2wD.value) || 0;
    const rNv = parseInt(m2rNum.value) || 0,
      rDv = parseInt(m2rDen.value) || 0;

    const hasEnd = eD !== "" && eM !== "" && eY !== "";
    const hasWait = m2wY.value !== "" || m2wM.value !== "" || m2wD.value !== "";
    const hasRatio = m2rNum.value !== "" && m2rDen.value !== "";

    const waitDays = wYv * 360 + wMv * 30 + wDv;
    let resPassed = "",
      historyMain = "",
      historySub = "",
      dynamicHtml = "";

    if (hasEnd && !hasWait && !hasRatio) {
      const passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }

      const p = daysToYMD(passDays);
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml = makeRow("Tổng thời gian quy đổi", resPassed, true);
      historyMain = "Tổng: " + resPassed;
      historySub = "Đã tính khoảng cách";
    } else if (hasWait && hasRatio && !hasEnd) {
      const passDays = Math.floor((waitDays * rNv) / rDv);
      const p = daysToYMD(passDays);
      const temp = new Date(sY + p.y, sM - 1 + p.m, sD + p.d);
      const resEnd =
        ("0" + temp.getDate()).slice(-2) +
        "/" +
        ("0" + (temp.getMonth() + 1)).slice(-2) +
        "/" +
        temp.getFullYear();
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml =
        makeRow("Ngày Đích Đến (Chạm mốc)", resEnd, true) +
        makeRow("Thời gian quy đổi (Cộng thêm)", resPassed, false);
      historyMain = "Đích: " + resEnd;
      historySub = "Cộng thêm: " + resPassed;
    } else if (hasEnd && hasRatio && !hasWait) {
      const passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }

      const calcWaitDays = Math.floor((passDays * rDv) / rNv);
      const w = daysToYMD(calcWaitDays);
      const p = daysToYMD(passDays);
      const resWait = w.y + " năm " + w.m + " tháng " + w.d + " ngày";
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml =
        makeRow("Tổng thời gian", resWait, true) +
        makeRow("Thời gian đã quy đổi", resPassed, false);
      historyMain = "Tổng: " + resWait;
      historySub = "Đã qua: " + resPassed;
    } else if (hasEnd && hasWait && !hasRatio) {
      const passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }

      const divisor = gcd(passDays, waitDays);
      const simpNum = passDays / divisor;
      const simpDen = waitDays / divisor;
      const p = daysToYMD(passDays);
      const resRatio = simpNum + " / " + simpDen;
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml =
        makeRow("Tỷ lệ đạt được", resRatio, true) +
        makeRow("Thời gian đã quy đổi", resPassed, false);
      historyMain = "Tỷ lệ: " + resRatio;
      historySub = "Đã qua: " + resPassed;
    } else if (hasEnd && hasWait && hasRatio) {
      const passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }
      const p = daysToYMD(passDays);
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml = makeRow("Thời gian thực tế đã qua", resPassed, true);
      historyMain = "Đã qua: " + resPassed;
      historySub = "Số liệu đầy đủ";
    } else {
      alert(
        "Vui lòng cung cấp đủ thông tin. VD: (Ngày Bắt Đầu + Đích) HOẶC (2 trong 3 dữ kiện còn lại).",
      );
      return;
    }

    document.getElementById("mod2-dynamic-res").innerHTML = dynamicHtml;

    mod2EmptyState.classList.add("hidden");
    resDiv2.classList.remove("hidden");

    const resStart = ("0" + sD).slice(-2) + "/" + ("0" + sM).slice(-2) + "/" + sY;
    const isDup =
      tcHistory.length > 0 &&
      tcHistory[0].dateStart === "Từ: " + resStart &&
      tcHistory[0].resText1 === historyMain &&
      tcHistory[0].typeLabel === "Thời Gian Đa Chiều";
    if (!isDup) {
      tcHistory.unshift({
        dateStart: "Từ: " + resStart,
        resText1: historyMain,
        resText4: historySub,
        typeLabel: "Thời Gian Đa Chiều",
      });
      if (tcHistory.length > 30) tcHistory.pop();
      saveHistory();
      renderHistory();
    }
  };
}
