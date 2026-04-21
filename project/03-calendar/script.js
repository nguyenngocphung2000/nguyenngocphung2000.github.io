/**
 * Script riêng cho Tool Lịch Vạn Niên
 */
export function init() {
  const loading = document.getElementById("cal-loading");
  const widget = document.getElementById("cal-widget");

  const clockEl = document.getElementById("live-clock");
  const dateEl = document.getElementById("live-date");
  const wdNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

  // Đồng hồ và ngày trực tiếp
  setInterval(function () {
    const now = new Date();
    const h = ("0" + now.getHours()).slice(-2);
    const m = ("0" + now.getMinutes()).slice(-2);
    const s = ("0" + now.getSeconds()).slice(-2);
    const d = ("0" + now.getDate()).slice(-2);
    const mo = ("0" + (now.getMonth() + 1)).slice(-2);
    const y = now.getFullYear();

    clockEl.innerText = h + ":" + m + ":" + s;
    dateEl.innerText = wdNames[now.getDay()] + ", " + d + "/" + mo + "/" + y;
  }, 1000);

  // Data sự kiện Dương Lịch
  const evSolar = {
    "01/01": ["Tết Dương Lịch"],
    "09/01": ["Ngày Học sinh, Sinh viên Việt Nam (1950)"],
    "03/02": ["Thành lập Đảng Cộng sản Việt Nam (1930)"],
    "09/02": ["Ngày sinh Tổng Bí thư Trường Chinh (1907)"],
    "14/02": ["Lễ Tình nhân (Valentine Đỏ)"],
    "27/02": ["Ngày Thầy thuốc Việt Nam (1955)"],
    "01/03": ["Ngày sinh Thủ tướng Phạm Văn Đồng (1906)"],
    "08/03": ["Ngày Quốc tế Phụ nữ"],
    "14/03": ["Valentine Trắng (White Valentine)"],
    "20/03": ["Ngày Quốc tế Hạnh phúc"],
    "24/03": ["Ngày truyền thống Bộ đội Biên phòng (1959)"],
    "26/03": ["Thành lập Đoàn TNCS Hồ Chí Minh (1931)"],
    "30/03": ["Ngày mất Chủ tịch Tôn Đức Thắng (1980)"],
    "01/04": ["Ngày Cá tháng Tư"],
    "07/04": ["Ngày sinh Tổng Bí thư Lê Duẩn (1907)"],
    "14/04": ["Valentine Đen (Black Valentine)", "Ngày sinh Tổng Bí thư Nguyễn Phú Trọng (1944)"],
    "21/04": ["Ngày Sách và Văn hóa đọc Việt Nam (2014)"],
    "22/04": ["Ngày Trái Đất"],
    "27/04": ["Ngày mất Tổng Bí thư Nguyễn Văn Linh (1998)"],
    "29/04": ["Ngày mất Thủ tướng Phạm Văn Đồng (2000)"],
    "30/04": ["Ngày Giải phóng Miền Nam (1975)"],
    "01/05": ["Quốc tế Lao động", "Ngày sinh TBT Trần Phú (1904)"],
    "07/05": ["Chiến thắng Điện Biên Phủ (1954)"],
    "15/05": ["Thành lập Đội TNTP Hồ Chí Minh (1941)"],
    "19/05": ["Ngày sinh Chủ tịch Hồ Chí Minh (1890)"],
    "01/06": ["Quốc tế Thiếu nhi"],
    "05/06": ["Ngày Môi trường Thế giới"],
    "11/06": ["Ngày mất Thủ tướng Võ Văn Kiệt (2008)"],
    "14/06": ["Ngày Thế giới tôn vinh người hiến máu"],
    "21/06": ["Ngày Báo chí Cách mạng Việt Nam (1925)"],
    "28/06": ["Ngày Gia đình Việt Nam"],
    "01/07": ["Ngày sinh Tổng Bí thư Nguyễn Văn Linh (1915)"],
    "10/07": ["Ngày mất Tổng Bí thư Lê Duẩn (1986)"],
    "11/07": ["Ngày Dân số Thế giới"],
    "19/07": ["Ngày mất Tổng Bí thư Nguyễn Phú Trọng (2024)"],
    "27/07": ["Ngày Thương binh - Liệt sĩ (1947)"],
    "28/07": ["Ngày thành lập Công đoàn Việt Nam (1929)"],
    "12/08": ["Ngày Quốc tế Thanh niên"],
    "19/08": ["Cách mạng tháng Tám (1945)", "Thành lập Công an Nhân dân (1945)"],
    "20/08": ["Ngày sinh Chủ tịch Tôn Đức Thắng (1888)"],
    "25/08": ["Ngày sinh Đại tướng Võ Nguyên Giáp (1911)"],
    "02/09": ["Quốc khánh Việt Nam (1945)", "Ngày mất Chủ tịch Hồ Chí Minh (1969)"],
    "06/09": ["Ngày sinh TBT Lê Hồng Phong (1902)", "Ngày mất TBT Trần Phú (1931)"],
    "30/09": ["Ngày mất Tổng Bí thư Trường Chinh (1988)"],
    "01/10": ["Ngày Quốc tế Người cao tuổi"],
    "04/10": ["Ngày mất Đại tướng Võ Nguyên Giáp (2013)"],
    "10/10": ["Ngày Giải phóng Thủ đô (1954)"],
    "13/10": ["Ngày Doanh nhân Việt Nam (2004)"],
    "14/10": ["Ngày thành lập Hội Nông dân Việt Nam (1930)"],
    "15/10": ["Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam (1956)"],
    "20/10": ["Thành lập Hội LHPN Việt Nam (1930)"],
    "31/10": ["Lễ hội Halloween"],
    "09/11": ["Ngày Pháp luật Việt Nam (2013)"],
    "18/11": ["Ngày truyền thống MTTQ Việt Nam (1930)", "Ngày Đại đoàn kết toàn dân tộc"],
    "19/11": ["Ngày Quốc tế Nam giới"],
    "20/11": ["Ngày Nhà giáo Việt Nam (1982)"],
    "23/11": ["Ngày sinh TT Võ Văn Kiệt (1922)", "Ngày Khởi nghĩa Nam Kỳ (1940)"],
    "19/12": ["Ngày Toàn quốc kháng chiến (1946)"],
    "22/12": ["Thành lập Quân đội Nhân dân Việt Nam (1944)"],
    "24/12": ["Đêm Giáng sinh"],
    "25/12": ["Lễ Giáng sinh (Noel)"],
    "31/12": ["Đêm Giao Thừa Dương lịch"],
  };

  // Data sự kiện Âm Lịch
  const evLunar = {
    "01/01": ["Tết Nguyên Đán (Mùng 1)"],
    "02/01": ["Mùng 2 Tết"],
    "03/01": ["Mùng 3 Tết"],
    "15/01": ["Tết Nguyên Tiêu (Rằm tháng Giêng)"],
    "03/03": ["Tết Hàn Thực"],
    "10/03": ["Giỗ Tổ Hùng Vương"],
    "15/04": ["Lễ Phật Đản"],
    "05/05": ["Tết Đoan Ngọ"],
    "07/07": ["Lễ Thất Tịch"],
    "15/07": ["Lễ Vu Lan (Rằm tháng Bảy)"],
    "15/08": ["Tết Trung Thu"],
    "09/09": ["Tết Trùng Cửu"],
    "10/10": ["Tết Trùng Thập"],
    "15/10": ["Tết Hạ Nguyên (Rằm tháng Mười)"],
    "23/12": ["Đưa Ông Táo về trời"],
    "29/12": ["Lễ Giao Thừa (Tháng thiếu)"],
    "30/12": ["Lễ Giao Thừa"],
  };

  // Hàm setup Calendar chính (được chạy sau khi load cdn)
  const initTool = function () {
    loading.classList.add("hidden");
    widget.classList.remove("hidden");

    const btnS = document.getElementById("cal-mode-solar");
    const btnL = document.getElementById("cal-mode-lunar");
    const selD = document.getElementById("sel-d");
    const selM = document.getElementById("sel-m");
    const selY = document.getElementById("sel-y");

    const gridSelM = document.getElementById("grid-sel-m");
    const gridSelY = document.getElementById("grid-sel-y");

    let isSolarMode = true;

    // Tự sửa cập nhật số lượng Ngày theo Tháng/Năm
    const updateDays = function () {
      let currentD = parseInt(selD.value) || new Date().getDate();
      const m = parseInt(selM.value) || new Date().getMonth() + 1;
      const y = parseInt(selY.value) || new Date().getFullYear();

      const maxD = isSolarMode ? new Date(y, m, 0).getDate() : 30; // Giả sử tháng âm lớn nhất 30
      if (currentD > maxD) currentD = maxD;

      let dOpts = "";
      for (let i = 1; i <= maxD; i++) {
        dOpts += `<option value="${i}" ${i === currentD ? "selected" : ""}>${i}</option>`;
      }
      selD.innerHTML = dOpts;
    };

    let mOpts = "";
    for (let i = 1; i <= 12; i++) {
      mOpts += `<option value="${i}">${i}</option>`;
    }
    selM.innerHTML = mOpts;
    gridSelM.innerHTML = mOpts;

    let yOpts = "";
    const curY = new Date().getFullYear();
    for (let i = curY - 100; i <= curY + 50; i++) {
      yOpts += `<option value="${i}">${i}</option>`;
    }
    selY.innerHTML = yOpts;
    gridSelY.innerHTML = yOpts;

    selM.addEventListener("change", updateDays);
    selY.addEventListener("change", updateDays);

    const handleGridSelectChange = function () {
      document.getElementById("cal-mode-solar").click();
      selM.value = gridSelM.value;
      selY.value = gridSelY.value;
      selD.value = 1;
      updateDays();
      document.getElementById("btn-lookup").click();
    };
    gridSelM.addEventListener("change", handleGridSelectChange);
    gridSelY.addEventListener("change", handleGridSelectChange);

    selM.value = new Date().getMonth() + 1;
    selY.value = curY;
    updateDays();
    selD.value = new Date().getDate();

    // Sinh ra câu quote
    const renderQuote = function () {
      if (window.quotesData && window.quotesData.length > 0) {
        const q = window.quotesData[Math.floor(Math.random() * window.quotesData.length)];
        document.getElementById("res-quote-text").innerText = "“" + q.quote + "”";
        document.getElementById("res-quote-author").innerText = "- " + q.author;
      }
    };

    if (!window.quotesParsed) {
      fetch("data/sent-to-you.json")
        .then(res => res.json())
        .then(data => {
          window.quotesData = data;
          window.quotesParsed = true;
          renderQuote();
        })
        .catch(e => {
          window.quotesData = [{ quote: "Đừng cảm thấy tiếc vì bụi hoa hồng có gai, mà hãy vui vì trong bụi gai có hoa hồng.", author: "Abraham Lincoln" }];
          window.quotesParsed = true;
          renderQuote();
        });
    }

    // Chuyển sang tính năng Âm Lịch
    btnL.onclick = function () {
      if (!isSolarMode) return;
      const d = parseInt(selD.value), m = parseInt(selM.value), y = parseInt(selY.value);
      try {
        const solar = Solar.fromYmd(y, m, d);
        const lunar = solar.getLunar();
        isSolarMode = false;
        selY.value = lunar.getYear();
        selM.value = Math.abs(lunar.getMonth());
        updateDays();
        selD.value = lunar.getDay();
      } catch (e) {}

      btnL.className = "flex-1 py-1.5 rounded-lg text-sm font-bold bg-slate-800/50 text-orange-500 shadow-sm transition";
      btnS.className = "flex-1 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition";
      document.getElementById("btn-lookup").click();
    };

    // Chuyển sang Dương Lịch
    btnS.onclick = function () {
      if (isSolarMode) return;
      const d = parseInt(selD.value), m = parseInt(selM.value), y = parseInt(selY.value);
      try {
        const lunar = Lunar.fromYmd(y, m, d);
        const solar = lunar.getSolar();
        isSolarMode = true;
        selY.value = solar.getYear();
        selM.value = solar.getMonth();
        updateDays();
        selD.value = solar.getDay();
      } catch (e) {}

      btnS.className = "flex-1 py-1.5 rounded-lg text-sm font-bold bg-slate-800/50 text-orange-500 shadow-sm transition";
      btnL.className = "flex-1 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition";
      document.getElementById("btn-lookup").click();
    };

    const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
    const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

    const getEventsForDate = function (sDay, sMonth, lDay, lMonth) {
      const sKey = ("0" + sDay).slice(-2) + "/" + ("0" + sMonth).slice(-2);
      const lKey = ("0" + lDay).slice(-2) + "/" + ("0" + lMonth).slice(-2);
      let events = [];
      if (evSolar[sKey]) events = events.concat(evSolar[sKey]);
      if (evLunar[lKey]) events = events.concat(evLunar[lKey].map(e => e + " (Âm lịch)"));
      return events;
    };

    const renderMonthGrid = function (targetSolar) {
      const y = targetSolar.getYear();
      const m = targetSolar.getMonth();
      const d = targetSolar.getDay();

      gridSelM.value = m;
      gridSelY.value = y;

      const firstDay = Solar.fromYmd(y, m, 1);
      const startWeekDay = firstDay.getWeek();
      const offset = startWeekDay === 0 ? 6 : startWeekDay - 1;

      const daysInMonth = new Date(y, m, 0).getDate();

      let gridHtml = "<div></div>".repeat(offset);

      for (let i = 1; i <= daysInMonth; i++) {
        const s = Solar.fromYmd(y, m, i);
        const l = s.getLunar();
        const lDay = l.getDay();
        const lMonth = Math.abs(l.getMonth());

        const lText = lDay === 1 ? lDay + "/" + lMonth : lDay;
        const isSelected = i === d;
        const isWeekend = s.getWeek() === 0 || s.getWeek() === 6;

        let bgClass = isSelected ? "bg-slate-900/50 border border-orange-200 shadow-sm" : "border border-transparent hover:bg-slate-800/40 dark:hover:bg-slate-800";
        let sColor = isWeekend ? "text-orange-500" : "text-slate-200";
        if (isSelected) sColor = "text-orange-600";

        const dayEvents = getEventsForDate(i, m, lDay, lMonth);
        let dotHtml = '<div class="h-1.5 mt-0.5 flex gap-0.5 justify-center">';
        if (dayEvents.length > 0) {
          const maxDots = Math.min(dayEvents.length, 3);
          for (let dt = 0; dt < maxDots; dt++) {
            dotHtml += '<div class="w-1.5 h-1.5 bg-red-500 rounded-full shadow-sm"></div>';
          }
        }
        dotHtml += "</div>";

        gridHtml += `<div class="cal-cell flex flex-col items-center justify-center py-1.5 rounded-xl cursor-pointer transition min-h-[52px] ${bgClass}" data-d="${i}" data-m="${m}" data-y="${y}">
            <span class="text-[15px] font-bold ${sColor}">${i}</span>
            <span class="text-[9px] text-slate-400">${lText}</span>${dotHtml}</div>`;
      }
      document.getElementById("cal-grid").innerHTML = gridHtml;
    };

    const renderWidget = function (solar, lunar) {
      const sYear = solar.getYear();

      const lDayStr = ("0" + lunar.getDay()).slice(-2);
      const lMonthAbs = Math.abs(lunar.getMonth());
      const lMonthStr = ("0" + lMonthAbs).slice(-2);

      let lYearText = CAN[lunar.getYearGanIndex()] + " " + CHI[lunar.getYearZhiIndex()];
      if (lunar.getMonth() < 0) lYearText += " (Nhuận)";

      document.getElementById("res-weekday").innerText = wdNames[solar.getWeek()];
      document.getElementById("res-main-d").innerText = solar.getDay();
      document.getElementById("res-main-my").innerText = "Tháng " + solar.getMonth() + ", " + sYear;
      document.getElementById("res-sub-date").innerText = lDayStr + "/" + lMonthStr + "/" + lunar.getYear() + " " + lYearText;

      let phaseText = "Trăng khuyết";
      let shadowTranslate = "100%";

      if (lunar.getDay() === 1 || lunar.getDay() >= 29) {
        phaseText = "Trăng non";
        shadowTranslate = "0%";
      } else if (lunar.getDay() > 1 && lunar.getDay() < 15) {
        phaseText = "Thượng huyền";
        shadowTranslate = (lunar.getDay() / 15) * 100 + "%";
      } else if (lunar.getDay() === 15 || lunar.getDay() === 16) {
        phaseText = "Trăng tròn";
        shadowTranslate = "100%";
      } else if (lunar.getDay() > 16 && lunar.getDay() < 29) {
        phaseText = "Hạ huyền";
        shadowTranslate = "-" + ((lunar.getDay() - 15) / 15) * 100 + "%";
      }

      document.getElementById("res-moon-text").innerText = phaseText;
      document.getElementById("moon-shadow").style.transform = `translateX(${shadowTranslate})`;

      renderMonthGrid(solar);

      const evContainer = document.getElementById("res-events");
      evContainer.innerHTML = "";

      const todaysEvents = getEventsForDate(solar.getDay(), solar.getMonth(), lunar.getDay(), Math.abs(lunar.getMonth()));

      if (todaysEvents.length === 0) {
        evContainer.innerHTML = '<div class="text-xs text-slate-400 italic">Không có dấu ấn lịch sử nào vào ngày này.</div>';
      } else {
        todaysEvents.forEach(e => {
          evContainer.innerHTML += `<div class="bg-slate-800/40 p-3 rounded-xl flex gap-3 items-start border border-slate-600/50 shadow-sm"><span class="text-orange-500 mt-0.5">📌</span><span class="font-bold text-slate-200 text-xs leading-relaxed">${e}</span></div>`;
        });
      }
    };

    document.getElementById("cal-grid").addEventListener("click", function (e) {
      const cell = e.target.closest(".cal-cell");
      if (cell) {
        const d = cell.getAttribute("data-d");
        const m = cell.getAttribute("data-m");
        const y = cell.getAttribute("data-y");

        document.getElementById("cal-mode-solar").click();
        selD.value = d;
        selM.value = m;
        selY.value = y;
        document.getElementById("btn-lookup").click();
      }
    });

    document.getElementById("btn-lookup").onclick = function () {
      const d = parseInt(selD.value), m = parseInt(selM.value), y = parseInt(selY.value);
      try {
        if (isSolarMode) {
          const solar = Solar.fromYmd(y, m, d);
          renderWidget(solar, solar.getLunar());
        } else {
          let lunar;
          try {
            lunar = Lunar.fromYmd(y, m, d);
          } catch (e) {
            lunar = Lunar.fromYmd(y, m, d - 1); // fix ngay 30 thanh 29
            selD.value = d - 1;
          }
          renderWidget(lunar.getSolar(), lunar);
        }
        if (window.quotesParsed) renderQuote(); // Đổi thông điệp khi lookup
      } catch (e) {}
    };

    setTimeout(() => document.getElementById("btn-lookup").click(), 200);
  };

  // Nạp thư viện nếu chưa có rồi init Tool
  if (typeof Solar !== "undefined" && typeof Lunar !== "undefined") {
    initTool();
  } else {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/lunar-javascript/lunar.js";
    script.onload = () => initTool();
    script.onerror = () => {
      loading.innerHTML = '<span class="text-red-500">Lỗi mạng! Không tải được thư viện tính lịch.</span>';
    };
    document.head.appendChild(script);
  }
}
