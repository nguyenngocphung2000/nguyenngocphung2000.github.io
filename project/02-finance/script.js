/**
 * Init logic cho Tool Lãi Suất (Tài chính - Vay và Gửi tiết kiệm)
 */
export function init() {
  // Format tiền tệ
  const fmt = (num) => Math.round(num).toLocaleString("vi-VN") + " ₫";

  // --- Chuyển đổi Tab (Tiết Kiệm / Vay Vốn) ---
  const btnSav = document.getElementById("btn-mode-saving");
  const btnLoan = document.getElementById("btn-mode-loan");
  const modeSav = document.getElementById("finance-saving-mode");
  const modeLoan = document.getElementById("finance-loan-mode");

  btnSav.addEventListener("click", () => {
    btnSav.className = "px-6 py-2 rounded-xl text-sm font-bold bg-slate-800/50 text-cyan-600 shadow-sm transition";
    btnLoan.className = "px-6 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-cyan-600 transition";
    modeSav.classList.remove("hidden");
    modeLoan.classList.add("hidden");
  });

  btnLoan.addEventListener("click", () => {
    btnLoan.className = "px-6 py-2 rounded-xl text-sm font-bold bg-slate-800/50 text-red-600 shadow-sm transition";
    btnSav.className = "px-6 py-2 rounded-xl text-sm font-bold text-slate-400 hover:text-cyan-600 transition";
    modeLoan.classList.remove("hidden");
    modeSav.classList.add("hidden");
  });

  // --- Xử lý tính toán Gửi Tiết Kiệm ---
  document.getElementById("btn-calc-sav").addEventListener("click", () => {
    let P = parseFloat(document.getElementById("sav-principal").value);
    let r_annual = parseFloat(document.getElementById("sav-rate").value) / 100;
    let time = parseFloat(document.getElementById("sav-time").value);
    let timeUnit = parseFloat(document.getElementById("sav-time-unit").value);
    let type = document.getElementById("sav-type").value;

    if (!P || !r_annual || !time) {
      alert("Vui lòng nhập đầy đủ thông tin gửi tiết kiệm!");
      return;
    }

    let t_years = time / timeUnit;
    let A = 0; // Tổng tiền = Gốc + Lãi

    if (type === "simple") {
      A = P * (1 + r_annual * t_years);
    } else {
      let n = 12; // Nhập gốc hàng tháng
      A = P * Math.pow(1 + r_annual / n, n * t_years);
    }

    let interest = A - P;

    document.getElementById("sav-result").classList.remove("hidden");
    document.getElementById("sav-res-interest").innerText = fmt(interest);
    document.getElementById("sav-res-total").innerText = fmt(A);
  });

  // --- Xử lý tính toán khoản vay (Loanh) ---
  const typeSelect = document.getElementById("loan-type");
  const warningDiv = document.getElementById("loan-warning");
  const realRateSpan = document.getElementById("loan-real-rate");

  typeSelect.addEventListener("change", () => {
    if (typeSelect.value === "flat") warningDiv.classList.remove("hidden");
    else warningDiv.classList.add("hidden");
  });

  document.getElementById("btn-calc-loan").addEventListener("click", () => {
    let P = parseFloat(document.getElementById("loan-principal").value);
    let r_annual = parseFloat(document.getElementById("loan-rate").value) / 100;
    let months = parseInt(document.getElementById("loan-time").value);
    let type = typeSelect.value;

    if (!P || !r_annual || !months) {
      alert("Vui lòng nhập đầy đủ thông tin vay vốn!");
      return;
    }

    let totalInterest = 0;
    let maxMonthly = 0;
    let r_monthly = r_annual / 12;
    let scheduleHTML = "";
    let remaining = P;

    // Cảnh báo khi tính dư nợ ban đầu (Flat rate)
    if (type === "flat") {
      // Công thức xấp xỉ chuyển Flat rate sang lãi suất hiệu dụng (EIR)
      let eir = (r_annual * 100 * 2 * months) / (months + 1);
      realRateSpan.innerText = eir.toFixed(1);
      warningDiv.classList.remove("hidden");
    }

    // Tính toán chi tiết lịch trả nợ từng tháng
    if (type === "flat") {
      let monthlyPrincipal = P / months;
      let monthlyInterest = P * r_monthly;
      totalInterest = monthlyInterest * months;
      maxMonthly = monthlyPrincipal + monthlyInterest;

      for (let i = 1; i <= months; i++) {
        remaining -= monthlyPrincipal;
        scheduleHTML += `
                    <tr class="hover:bg-slate-700/30 transition">
                        <td class="px-4 py-2 font-bold">\${i}</td>
                        <td class="px-4 py-2 text-slate-400">\${fmt(monthlyPrincipal)}</td>
                        <td class="px-4 py-2 text-red-400">\${fmt(monthlyInterest)}</td>
                        <td class="px-4 py-2 font-bold text-slate-200">\${fmt(maxMonthly)}</td>
                        <td class="px-4 py-2 text-slate-400">\${fmt(Math.max(0, remaining))}</td>
                    </tr>`;
      }
    } else if (type === "declining") {
      let monthlyPrincipal = P / months;

      for (let i = 1; i <= months; i++) {
        let interest = remaining * r_monthly;
        totalInterest += interest;
        let payment = monthlyPrincipal + interest;
        if (payment > maxMonthly) maxMonthly = payment;
        remaining -= monthlyPrincipal;

        scheduleHTML += `
                    <tr class="hover:bg-slate-700/30 transition">
                        <td class="px-4 py-2 font-bold">\${i}</td>
                        <td class="px-4 py-2 text-slate-400">\${fmt(monthlyPrincipal)}</td>
                        <td class="px-4 py-2 text-red-400">\${fmt(interest)}</td>
                        <td class="px-4 py-2 font-bold text-slate-200">\${fmt(payment)}</td>
                        <td class="px-4 py-2 text-slate-400">\${fmt(Math.max(0, remaining))}</td>
                    </tr>`;
      }
    } else if (type === "annuity") {
      let pmt = (P * r_monthly * Math.pow(1 + r_monthly, months)) / (Math.pow(1 + r_monthly, months) - 1);
      maxMonthly = pmt;

      for (let i = 1; i <= months; i++) {
        let interest = remaining * r_monthly;
        let principal = pmt - interest;
        totalInterest += interest;
        remaining -= principal;

        scheduleHTML += `
                    <tr class="hover:bg-slate-700/30 transition">
                        <td class="px-4 py-2 font-bold">\${i}</td>
                        <td class="px-4 py-2 text-slate-400">\${fmt(principal)}</td>
                        <td class="px-4 py-2 text-red-400">\${fmt(interest)}</td>
                        <td class="px-4 py-2 font-bold text-slate-200">\${fmt(pmt)}</td>
                        <td class="px-4 py-2 text-slate-400">\${fmt(Math.max(0, remaining))}</td>
                    </tr>`;
      }
    }

    // Hiển thị kết quả
    document.getElementById("loan-result").classList.remove("hidden");
    document.getElementById("loan-schedule-container").classList.remove("hidden");

    document.getElementById("loan-res-interest").innerText = fmt(totalInterest);
    document.getElementById("loan-res-total").innerText = fmt(P + totalInterest);
    document.getElementById("loan-res-monthly").innerText = fmt(maxMonthly);
    document.getElementById("loan-schedule-body").innerHTML = scheduleHTML;
  });
}
