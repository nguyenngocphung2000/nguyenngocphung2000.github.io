export function init() {
  const capitalize = function (str) {
    return str
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map(function (word) {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const removeAccents = function (str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const randItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const isValidSyllable = function (word) {
    const w = word.toLowerCase();
    const vowels = "aàáảãạăằắẳẵặâầấẩẫậeèéẻẽẹêềếểễệiìíỉĩịoòóỏõọôồốổỗộơờớởỡợuùúủũụưừứửữựyỳýỷỹỵ";
    let hasVowel = false;
    for (let i = 0; i < w.length; i++) {
      if (vowels.indexOf(w[i]) !== -1) {
        hasVowel = true;
        break;
      }
    }
    if (!hasVowel) return false;

    if (w.length === 1) {
      const validOneChar = [
        "a", "á", "à", "ả", "ã", "ạ", "ý", "ỳ", "ỷ", "ỹ", "ỵ",
        "ê", "ề", "ế", "ể", "ễ", "ệ", "ô", "ồ", "ố", "ổ", "ỗ", "ộ",
      ];
      if (validOneChar.indexOf(w) === -1) return false;
    }
    return true;
  };

  const btnGen = document.getElementById("bn-btn-gen");
  const btnCopyGen = document.getElementById("bn-btn-copy-gen");
  const resList = document.getElementById("bn-res-list");
  let currentResults = [];

  btnCopyGen.onclick = function () {
    if (currentResults.length === 0) {
      alert("Chưa có danh sách tên nào để Copy!");
      return;
    }
    const textToCopy = currentResults.join("\n");
    navigator.clipboard.writeText(textToCopy).then(function () {
      const oldHtml = btnCopyGen.innerHTML;
      btnCopyGen.innerHTML = "ĐÃ COPY";
      btnCopyGen.classList.add("bg-green-100", "text-green-600", "border-green-200");
      setTimeout(function () {
        btnCopyGen.innerHTML = oldHtml;
        btnCopyGen.classList.remove("bg-green-100", "text-green-600", "border-green-200");
      }, 2000);
    });
  };

  btnGen.onclick = async function () {
    if (!window.nameParsed) {
      btnGen.innerHTML = "ĐANG TẢI DỮ LIỆU...";
      try {
        const response = await fetch("data/name.json");
        if (!response.ok) throw new Error("Không thể tải file dữ liệu.");

        const allData = await response.json();

        const namDataArr = allData.nam || [];
        const nuDataArr = allData.nu || [];

        window.nameData = {
          nam: { ho: [], demFull: [], demWords: [], ten: [] },
          nu: { ho: [], demFull: [], demWords: [], ten: [] },
        };

        const parsePool = function (arr, gender) {
          arr.forEach(function (n) {
            const cleanName = n.trim().replace(/\s+/g, " ");
            let w = cleanName.split(" ");
            w = w.filter(isValidSyllable);
            if (w.length >= 2) {
              window.nameData[gender].ho.push(w[0]);
              window.nameData[gender].ten.push(w[w.length - 1]);
              if (w.length > 2) {
                const d = w.slice(1, -1);
                window.nameData[gender].demFull.push(d.join(" "));
                d.forEach(function (dw) {
                  window.nameData[gender].demWords.push(dw);
                });
              }
            }
          });
          window.nameData[gender].ho = [...new Set(window.nameData[gender].ho)];
          window.nameData[gender].ten = [...new Set(window.nameData[gender].ten)];
          window.nameData[gender].demFull = [...new Set(window.nameData[gender].demFull)];
          window.nameData[gender].demWords = [...new Set(window.nameData[gender].demWords)];
        };

        parsePool(namDataArr, "nam");
        parsePool(nuDataArr, "nu");
        window.nameParsed = true;
        btnGen.innerHTML = "ĐỀ XUẤT TÊN";
      } catch (error) {
        alert("Lỗi: Không tìm thấy file dữ liệu (data/name.json). Hãy kiểm tra lại cấu trúc thư mục và tên file!");
        btnGen.innerHTML = "ĐỀ XUẤT TÊN";
        return;
      }
    }

    let count = parseInt(document.getElementById("bn-count").value) || 100;
    if (count <= 0 || count > 200) count = 100;
    const gender = document.getElementById("bn-gender").value;
    const lengthOpt = document.getElementById("bn-length").value;

    const inputHo = document.getElementById("bn-ho").value.trim();
    const inputDem = document.getElementById("bn-dem").value.trim();
    const inputTen = document.getElementById("bn-ten").value.trim();

    if (lengthOpt === "2" && inputDem !== "") {
      alert("Tên 2 chữ thì không có Chữ lót nhé! Vui lòng xóa 'Chữ lót' hoặc đổi độ dài thành 3-4-5 chữ.");
      return;
    }

    const resultsMap = new Map();
    let attempts = 0;
    const maxAttempts = count * 100;

    while (resultsMap.size < count && attempts < maxAttempts) {
      attempts++;
      const g = gender === "all" ? (Math.random() < 0.5 ? "nam" : "nu") : gender;
      const data = window.nameData[g];

      let targetL;
      if (lengthOpt === "all") {
        const lengthWeights = [2, 3, 3, 3, 4, 4, 4, 5];
        targetL = randItem(lengthWeights);
      } else {
        targetL = parseInt(lengthOpt);
      }

      const hoStr = inputHo !== "" ? capitalize(inputHo) : randItem(data.ho);
      const demInStr = inputDem !== "" ? capitalize(inputDem) : "";
      const tenStr = inputTen !== "" ? capitalize(inputTen) : randItem(data.ten);

      const c_ho = hoStr.split(" ").length;
      const c_ten = tenStr.split(" ").length;
      const c_dem_in = demInStr === "" ? 0 : demInStr.split(" ").length;

      const needed_dem = targetL - c_ho - c_ten - c_dem_in;
      let dem_final = demInStr;

      if (needed_dem > 0) {
        let addedDem = "";
        const exactDems = data.demFull.filter((d) => d.split(" ").length === needed_dem);
        if (exactDems.length > 0 && Math.random() < 0.5) {
          addedDem = randItem(exactDems);
        } else {
          const tempDemArr = [];
          let lastWord = dem_final.split(" ").pop();
          for (let j = 0; j < needed_dem; j++) {
            let w = randItem(data.demWords);
            let localTries = 0;
            while (w === lastWord && localTries < 15) {
              w = randItem(data.demWords);
              localTries++;
            }
            tempDemArr.push(w);
            lastWord = w;
          }
          addedDem = tempDemArr.join(" ");
        }
        dem_final = dem_final === "" ? addedDem : dem_final + " " + addedDem;
      } else if (lengthOpt === "2") {
        dem_final = "";
      }

      const nameParts = [];
      if (hoStr) nameParts.push(hoStr);
      if (dem_final) nameParts.push(dem_final);
      if (tenStr) nameParts.push(tenStr);

      const finalName = nameParts.join(" ").replace(/\s+/g, " ").trim();
      const finalWordCount = finalName.split(" ").length;

      if (lengthOpt !== "all" && finalWordCount !== parseInt(lengthOpt)) {
        if (c_ho + c_dem_in + c_ten < parseInt(lengthOpt)) continue;
      }

      if (!resultsMap.has(finalName)) {
        resultsMap.set(finalName, g);
      }
    }

    let generatedHTML = "";
    currentResults = [];
    resultsMap.forEach(function (g, finalName) {
      currentResults.push(finalName);
      const colorClass =
        g === "nam"
          ? "bn-name-nam bg-blue-900/30 text-blue-300 border-blue-500/30"
          : "bn-name-nu bg-pink-900/30 text-pink-300 border-pink-500/30";
      generatedHTML +=
        '<div class="p-3.5 rounded-xl border shadow-sm text-center ' + colorClass + '">';
      generatedHTML += '<span class="font-bold text-[15px]">' + finalName + "</span></div>";
    });

    if (resultsMap.size === 0) {
      generatedHTML =
        '<div class="col-span-1 sm:col-span-2 text-center text-slate-500 italic py-4 text-[11px]">Không tìm thấy tổ hợp tên nào phù hợp!</div>';
    }

    resList.innerHTML = generatedHTML;
  };

  const inputArea = document.getElementById("flt-input");
  inputArea.addEventListener("input", function () {
    const lines = inputArea.value.split("\n");
    document.getElementById("flt-cnt-in").innerText = inputArea.value === "" ? 0 : lines.length;
  });

  const btnPaste = document.getElementById("flt-btn-paste");
  if (btnPaste) {
    btnPaste.onclick = function () {
      navigator.clipboard.readText()
        .then(function (clipText) {
          if (clipText) {
            inputArea.value = clipText;
            inputArea.dispatchEvent(new Event("input"));
            const oldHtml = btnPaste.innerHTML;
            btnPaste.innerHTML = "ĐÃ DÁN";
            setTimeout(function () {
              btnPaste.innerHTML = oldHtml;
            }, 2000);
          }
        })
        .catch(function () {
          alert("Trình duyệt chặn quyền truy cập Clipboard hoặc không hỗ trợ tự động dán!");
        });
    };
  }

  const btnClearIn = document.getElementById("flt-btn-clear-in");
  if (btnClearIn) {
    btnClearIn.onclick = function () {
      inputArea.value = "";
      document.getElementById("flt-cnt-in").innerText = "0";
    };
  }

  document.getElementById("flt-btn-process").onclick = function () {
    const text = document.getElementById("flt-input").value;
    if (text === "") {
      document.getElementById("flt-output").value = "";
      document.getElementById("flt-cnt-out").innerText = "0";
      return;
    }

    let lines = text.split("\n");

    if (document.getElementById("chk-empty").checked) {
      lines = lines.filter((l) => l.trim() !== "");
    }
    if (document.getElementById("chk-rem-num").checked) {
      lines = lines.map((l) => l.replace(/^\s*\d+[\.\-\)]?\s*/, ""));
    }
    if (document.getElementById("chk-space").checked) {
      lines = lines.map((l) => l.replace(/\s+/g, " ").trim());
    }

    const caseOpt = document.getElementById("sel-case").value;
    if (caseOpt === "title") {
      lines = lines.map((l) => capitalize(l));
    } else if (caseOpt === "lower") {
      lines = lines.map((l) => l.toLowerCase());
    } else if (caseOpt === "upper") {
      lines = lines.map((l) => l.toUpperCase());
    }

    if (document.getElementById("chk-accent").checked) {
      lines = lines.map((l) => removeAccents(l));
    }

    if (document.getElementById("chk-wc").checked) {
      const op = document.getElementById("sel-wc-op").value;
      const num = parseInt(document.getElementById("inp-wc-num").value) || 0;
      lines = lines.filter(function (l) {
        if (l.trim() === "") return false;
        const wc = l.trim().split(/\s+/).length;
        if (op === "less") return wc < num;
        if (op === "eq") return wc === num;
        if (op === "greater") return wc > num;
        return true;
      });
    }

    if (document.getElementById("chk-dup").checked) {
      lines = [...new Set(lines)];
    }

    const sortOpt = document.getElementById("sel-sort").value;
    if (sortOpt === "asc" || sortOpt === "desc") {
      lines.sort(function (a, b) {
        const aWords = a.trim().split(/\s+/);
        const bWords = b.trim().split(/\s+/);
        const aName = aWords[aWords.length - 1] || "";
        const bName = bWords[bWords.length - 1] || "";
        let cmp = aName.localeCompare(bName, "vi");
        if (cmp === 0) {
          cmp = a.localeCompare(b, "vi");
        }
        return sortOpt === "asc" ? cmp : -cmp;
      });
    }

    if (document.getElementById("chk-reverse").checked) {
      lines.reverse();
    }
    if (document.getElementById("chk-shuffle").checked) {
      lines.sort(() => 0.5 - Math.random());
    }
    if (document.getElementById("chk-add-num").checked) {
      lines = lines.map((l, i) => (i + 1) + ". " + l);
    }

    document.getElementById("flt-output").value = lines.join("\n");
    document.getElementById("flt-cnt-out").innerText = lines.length;
  };

  document.getElementById("flt-btn-clear").onclick = function () {
    document.getElementById("flt-input").value = "";
    document.getElementById("flt-output").value = "";
    document.getElementById("flt-cnt-in").innerText = "0";
    document.getElementById("flt-cnt-out").innerText = "0";
  };

  document.getElementById("flt-btn-copy").onclick = function () {
    const outText = document.getElementById("flt-output").value;
    if (outText === "") {
      alert("Không có kết quả để copy!");
      return;
    }
    navigator.clipboard.writeText(outText).then(function () {
      const btn = document.getElementById("flt-btn-copy");
      const oldHtml = btn.innerHTML;
      btn.innerHTML = "ĐÃ COPY";
      btn.classList.add("bg-green-100", "text-green-600", "border-green-200");
      btn.classList.remove("bg-indigo-900/20", "text-indigo-600", "border-indigo-200");
      setTimeout(function () {
        btn.innerHTML = oldHtml;
        btn.classList.remove("bg-green-100", "text-green-600", "border-green-200");
        btn.classList.add("bg-indigo-900/20", "text-indigo-600", "border-indigo-200");
      }, 2000);
    });
  };

  document.getElementById("flt-btn-down").onclick = function () {
    const outText = document.getElementById("flt-output").value;
    if (outText === "") {
      alert("Không có dữ liệu để tải xuống!");
      return;
    }
    const blob = new Blob([outText], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Danh_Sach_Ten_Da_Loc.txt";
    link.click();
  };
}
