export function init() {
  const safeSave = (key, val) => {
    try {
      window.localStorage.setItem(key, val);
    } catch (e) {}
  };
  const safeGet = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };
  const safeRemove = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {}
  };

  const canvas = document.getElementById("wheel-canvas");
  const ctx = canvas.getContext("2d");
  const inputArea = document.getElementById("wheel-input");
  const countDisplay = document.getElementById("wheel-count");
  const resultCountDisplay = document.getElementById("wheel-result-count");
  const btnSpin = document.getElementById("btn-spin-center");
  const resultListDiv = document.getElementById("wheel-results-list");

  const modal = document.getElementById("wheel-modal");
  const modalContent = document.getElementById("wheel-modal-content");
  const winnerNameDisplay = document.getElementById("wheel-winner-name");
  const btnClose = document.getElementById("btn-modal-close");
  const btnRemove = document.getElementById("btn-modal-remove");

  const tabListBtn = document.getElementById("tab-btn-list");
  const tabResBtn = document.getElementById("tab-btn-results");
  const tabListContent = document.getElementById("tab-content-list");
  const tabResContent = document.getElementById("tab-content-results");

  const colors = [
    "#ef4444",
    "#f59e0b",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#d946ef",
  ];

  let names = [];
  let results = [];
  let totalSpinsCounter = 0;
  let currentRotation = 0;
  let isSpinning = false;
  let currentWinner = "";

  const savedSpins = safeGet("wheel_spins");
  if (savedSpins) totalSpinsCounter = parseInt(savedSpins);

  const savedResults = safeGet("wheel_results");
  if (savedResults) {
    try {
      let parsed = JSON.parse(savedResults);
      if (parsed.length > 0 && typeof parsed[0] === "string") {
        results = parsed.map((name, idx) => ({
          text: name,
          label: "LẦN " + (parsed.length - idx),
        }));
      } else {
        results = parsed;
      }
      if (totalSpinsCounter === 0) totalSpinsCounter = results.length;
    } catch (e) {}
  }

  const savedData = safeGet("wheel_names");
  if (savedData !== null && savedData.trim() !== "") {
    inputArea.value = savedData;
  } else {
    inputArea.value = "Hà Nội\nHồ Chí Minh\nĐà Nẵng\nCần Thơ";
  }

  tabListBtn.addEventListener("click", () => {
    tabListBtn.className =
      "flex-1 py-4 text-sm font-black text-indigo-600 border-b-2 border-indigo-500 transition-colors uppercase tracking-wide";
    tabResBtn.className =
      "flex-1 py-4 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:bg-slate-800/40 transition-colors uppercase tracking-wide";
    tabListContent.classList.remove("hidden");
    tabResContent.classList.add("hidden");
  });

  tabResBtn.addEventListener("click", () => {
    tabResBtn.className =
      "flex-1 py-4 text-sm font-black text-indigo-600 border-b-2 border-indigo-500 transition-colors uppercase tracking-wide";
    tabListBtn.className =
      "flex-1 py-4 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:bg-slate-800/40 transition-colors uppercase tracking-wide";
    tabResContent.classList.remove("hidden");
    tabListContent.classList.add("hidden");
    renderResults();
  });

  const updateNames = () => {
    const rawText = inputArea.value;
    names = rawText
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n !== "");
    countDisplay.innerText = names.length;
    safeSave("wheel_names", rawText);
    drawWheel();
  };

  const renderResults = () => {
    resultCountDisplay.innerText = results.length;
    if (results.length === 0) {
      resultListDiv.innerHTML =
        '<div class="text-center text-slate-400 text-sm font-medium py-10 uppercase tracking-widest">Chưa có kết quả</div>';
      return;
    }
    resultListDiv.innerHTML = results
      .map(
        (res) => `
            <div class="flex items-center justify-between p-2 border-b border-slate-600/50 bg-slate-800/50 mb-0.5 rounded shadow-sm hover:bg-slate-800/40 transition">
                <span class="font-bold text-slate-200 text-xs truncate max-w-[80%] pl-1">${res.text}</span>
                <span class="text-[9px] font-bold text-slate-400 bg-slate-700/50 border border-slate-600/50 px-1.5 py-0.5 rounded whitespace-nowrap uppercase">${res.label}</span>
            </div>
        `,
      )
      .join("");
  };

  const drawWheel = () => {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const outerRadius = cx;
    const rimThickness = 45;
    const innerRadius = cx - rimThickness;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (names.length === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#f1f5f9";
      ctx.fill();
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "bold 50px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("TRỐNG", cx, cy);
    } else {
      const arcSize = (2 * Math.PI) / names.length;
      const offsetAngle = -arcSize / 2;

      for (let i = 0; i < names.length; i++) {
        const angle = offsetAngle + i * arcSize;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, innerRadius, angle, angle + arcSize);
        ctx.lineTo(cx, cy);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.stroke();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(255,255,255,0.6)";

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";

        let fontSize = Math.max(28, 70 - names.length * 1.8);
        ctx.font = `900 ${fontSize}px system-ui, sans-serif`;

        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        let text = names[i];
        if (text.length > 20) text = text.substring(0, 20) + "...";
        ctx.fillText(text, innerRadius - 50, 0);
        ctx.restore();
      }
    }

    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius - rimThickness / 2, 0, 2 * Math.PI);
    ctx.lineWidth = rimThickness;
    ctx.strokeStyle = "#1e293b";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#fbbf24";
    ctx.stroke();

    const pegCount = 24;
    const pegAngle = (2 * Math.PI) / pegCount;
    for (let i = 0; i < pegCount; i++) {
      let angle = i * pegAngle;
      let px = cx + Math.cos(angle) * (outerRadius - rimThickness / 2);
      let py = cy + Math.sin(angle) * (outerRadius - rimThickness / 2);

      ctx.beginPath();
      ctx.arc(px, py, 12, 0, 2 * Math.PI);

      let isGold = i % 2 === 0;
      ctx.fillStyle = isGold ? "#fef08a" : "#ffffff";
      ctx.fill();

      ctx.lineWidth = 4;
      ctx.strokeStyle = "#b45309";
      ctx.stroke();

      ctx.shadowColor = isGold ? "#eab308" : "#ffffff";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  };

  const getTrueRandom = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] / 4294967296;
  };

  const spinWheel = () => {
    if (isSpinning || names.length === 0) return;
    isSpinning = true;

    btnSpin.classList.remove("btn-spin-pulse");

    const randomFloat = getTrueRandom(); 
    const extraDegrees = randomFloat * 360; 
    const randomSpins = Math.floor(getTrueRandom() * 6) + 7;
    
    const totalDegrees = (360 * randomSpins) + extraDegrees;
    currentRotation += totalDegrees;

    canvas.style.transition = "transform 7s cubic-bezier(0.1, 0.9, 0.15, 1)";
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      isSpinning = false;
      btnSpin.classList.add("btn-spin-pulse");
      calculateWinner();
    }, 7000);
  };

  const calculateWinner = () => {
    const sliceAngle = 360 / names.length;
    const normalizedRotation = currentRotation % 360;

    let winningDegree = (360 - normalizedRotation) % 360;
    let index = Math.floor(
      ((winningDegree + sliceAngle / 2) % 360) / sliceAngle,
    );

    currentWinner = names[index];

    totalSpinsCounter++;
    safeSave("wheel_spins", totalSpinsCounter);

    results.unshift({ text: currentWinner, label: "LẦN " + totalSpinsCounter });
    safeSave("wheel_results", JSON.stringify(results));
    renderResults();

    winnerNameDisplay.innerText = currentWinner;
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    setTimeout(() => {
      modalContent.classList.remove("scale-0");
      modalContent.classList.add("wheel-modal-enter");
    }, 10);
  };

  const closeModal = () => {
    modalContent.classList.remove("wheel-modal-enter");
    modalContent.classList.add("scale-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }, 300);
  };

  const removeWinner = () => {
    let lines = inputArea.value.split("\n");
    const idx = lines.findIndex((l) => l.trim() === currentWinner);
    if (idx !== -1) {
      lines.splice(idx, 1);
      inputArea.value = lines.join("\n");
      updateNames();
    }
    closeModal();
  };

  inputArea.addEventListener("input", updateNames);
  btnSpin.addEventListener("click", spinWheel);
  btnClose.addEventListener("click", closeModal);
  btnRemove.addEventListener("click", removeWinner);

  document.getElementById("btn-wheel-shuffle").addEventListener("click", () => {
    if (names.length > 0) {
      names.sort(() => Math.random() - 0.5);
      inputArea.value = names.join("\n");
      updateNames();
    }
  });

  document.getElementById("btn-wheel-sort").addEventListener("click", () => {
    if (names.length > 0) {
      names.sort((a, b) => a.localeCompare(b, "vi"));
      inputArea.value = names.join("\n");
      updateNames();
    }
    if (results.length > 0) {
      results.sort((a, b) => a.text.localeCompare(b.text, "vi"));
      safeSave("wheel_results", JSON.stringify(results));
      renderResults();
    }
  });

  const btnResetAll = document.getElementById("btn-wheel-reset-all");
  let resetTimeout;

  btnResetAll.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      names.length === 0 &&
      results.length === 0 &&
      inputArea.value.trim() === ""
    )
      return;

    if (btnResetAll.dataset.confirm !== "true") {
      btnResetAll.dataset.confirm = "true";
      btnResetAll.innerHTML = "CHẮC CHƯA?";
      btnResetAll.className =
        "flex-1 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-md transition-colors flex justify-center items-center gap-1 active:scale-95 whitespace-nowrap uppercase tracking-wider";

      resetTimeout = setTimeout(() => {
        btnResetAll.dataset.confirm = "false";
        btnResetAll.innerHTML = "XÓA SẠCH";
        btnResetAll.className =
          "flex-1 bg-slate-800/50 hover:bg-red-900/20 text-red-600 text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-1 active:scale-95 border border-red-500/30 whitespace-nowrap uppercase tracking-wider";
      }, 3000);
    } else {
      clearTimeout(resetTimeout);

      btnResetAll.dataset.confirm = "false";
      btnResetAll.innerHTML = "XÓA SẠCH";
      btnResetAll.className =
        "flex-1 bg-slate-800/50 hover:bg-red-900/20 text-red-600 text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-1 active:scale-95 border border-red-500/30 whitespace-nowrap uppercase tracking-wider";

      inputArea.value = "";
      names = [];
      results = [];
      totalSpinsCounter = 0;
      countDisplay.innerText = "0";

      safeRemove("wheel_names");
      safeRemove("wheel_results");
      safeRemove("wheel_spins");

      currentRotation = 0;
      canvas.style.transition = "none";
      canvas.style.transform = "rotate(0deg)";

      drawWheel();
      renderResults();
    }
  });

  updateNames();
  renderResults();
}
