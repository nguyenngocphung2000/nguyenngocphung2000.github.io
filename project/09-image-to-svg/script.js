export function init() {
  function loadExternalScripts(callback) {
    let loaded = 0;
    const scripts = [
      {
        id: "script-cropper",
        src: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js",
      },
      {
        id: "script-imagetracer",
        src: "https://cdn.jsdelivr.net/npm/imagetracerjs@1.2.6/imagetracer_v1.2.6.min.js",
      },
    ];

    scripts.forEach((s) => {
      if (document.getElementById(s.id)) {
        loaded++;
        if (loaded === scripts.length) callback();
      } else {
        let scriptEl = document.createElement("script");
        scriptEl.id = s.id;
        scriptEl.src = s.src;
        scriptEl.onload = () => {
          loaded++;
          if (loaded === scripts.length) callback();
        };
        document.head.appendChild(scriptEl);
      }
    });
  }

  loadExternalScripts(function () {
    const inputImg = document.getElementById("svg-tool-input");
    const imgWorkspace = document.getElementById("svg-tool-image");
    const placeholderWorkspace = document.getElementById("svg-tool-placeholder");
    const sliderColor = document.getElementById("svg-tool-slider");
    const sliderValTxt = document.getElementById("svg-tool-color-val");

    const chkSharp = document.getElementById("svg-tool-sharp-mode");

    const btnConvert = document.getElementById("svg-tool-btn-convert");
    const btnCopy = document.getElementById("svg-tool-btn-copy");
    const btnDownload = document.getElementById("svg-tool-btn-download");
    const dlText = document.getElementById("svg-tool-dl-text");
    const ratioBtns = document.querySelectorAll(".svg-tool-ratio");

    const loadingLayer = document.getElementById("svg-tool-loading");
    const previewImg = document.getElementById("svg-tool-preview-img");
    const previewPlaceholder = document.getElementById("svg-tool-preview-text");
    const textareaCode = document.getElementById("svg-tool-code");

    let cropper = null;
    let finalSvgString = "";
    let currentSvgBlobUrl = "";

    function updateActiveRatioBtn(clickedBtn) {
      ratioBtns.forEach((b) => {
        b.classList.remove("bg-blue-500", "text-white", "border-blue-500");
        b.classList.add("bg-slate-800/50", "text-slate-300", "border-slate-600/50");
      });
      clickedBtn.classList.remove(
        "bg-slate-800/50",
        "text-slate-300",
        "border-slate-600/50",
      );
      clickedBtn.classList.add("bg-blue-500", "text-white", "border-blue-500");
    }

    function formatBytes(bytes) {
      if (!+bytes) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    sliderColor.addEventListener("input", function (e) {
      sliderValTxt.innerText = e.target.value + " màu";
    });

    inputImg.addEventListener("change", function (e) {
      const files = e.target.files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
          if (cropper) cropper.destroy();

          imgWorkspace.src = event.target.result;
          imgWorkspace.style.display = "block";
          placeholderWorkspace.style.display = "none";

          let activeRatio = NaN;
          let isRound = false;
          ratioBtns.forEach((b) => {
            if (b.classList.contains("bg-blue-500")) {
              activeRatio = parseFloat(b.dataset.ratio);
              if (b.dataset.round === "true") isRound = true;
            }
          });

          if (isRound) {
            imgWorkspace.parentElement.classList.add("is-round");
          } else {
            imgWorkspace.parentElement.classList.remove("is-round");
          }

          cropper = new Cropper(imgWorkspace, {
            aspectRatio: activeRatio,
            viewMode: 1,
            autoCropArea: 0.8,
            responsive: true,
            background: false,
          });

          btnConvert.disabled = false;

          previewImg.style.display = "none";
          if (currentSvgBlobUrl) URL.revokeObjectURL(currentSvgBlobUrl);
          previewPlaceholder.style.display = "block";
          textareaCode.value = "";
          btnCopy.disabled = true;
          btnDownload.disabled = true;
          dlText.innerText = "Tải File SVG";
        };
        reader.readAsDataURL(files[0]);
      }
    });

    ratioBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        updateActiveRatioBtn(this);
        if (cropper) cropper.setAspectRatio(parseFloat(this.dataset.ratio));

        if (this.dataset.round === "true") {
          imgWorkspace.parentElement.classList.add("is-round");
        } else {
          imgWorkspace.parentElement.classList.remove("is-round");
        }
      });
    });

    btnConvert.addEventListener("click", function () {
      if (!cropper) return;

      loadingLayer.style.display = "flex";
      btnConvert.disabled = true;

      requestAnimationFrame(() => {
        setTimeout(() => {
          const originalCanvas = cropper.getCroppedCanvas({
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high",
          });

          const MAX_SIZE = 800;
          let width = originalCanvas.width;
          let height = originalCanvas.height;

          if (width > MAX_SIZE || height > MAX_SIZE) {
            const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const resizedCanvas = document.createElement("canvas");
          resizedCanvas.width = width;
          resizedCanvas.height = height;
          const ctx = resizedCanvas.getContext("2d");

          let isRound = false;
          ratioBtns.forEach((b) => {
            if (
              b.classList.contains("bg-blue-500") &&
              b.dataset.round === "true"
            )
              isRound = true;
          });

          if (isRound) {
            ctx.beginPath();
            ctx.arc(
              width / 2,
              height / 2,
              Math.min(width, height) / 2,
              0,
              2 * Math.PI,
            );
            ctx.clip();
          } else {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(originalCanvas, 0, 0, width, height);
          const processDataUrl = resizedCanvas.toDataURL("image/png");

          const numColors = parseInt(sliderColor.value);
          const isSharp = chkSharp.checked;

          const options = {
            numberofcolors: numColors,
            pathomit: isSharp ? 2 : 8,
            mincolorratio: isSharp ? 0 : 0.02,
            colorquantcycles: 3,
            scale: 1,
            roundcoords: 1,
            blurradius: isSharp ? 0 : 1,
            rightangleenhance: isSharp,
            ltres: isSharp ? 0.1 : 1,
            qtres: isSharp ? 0.1 : 1,
          };

          window.ImageTracer.imageToSVG(
            processDataUrl,
            function (svgstr) {
              finalSvgString = svgstr;
              textareaCode.value = svgstr;

              const blob = new Blob([svgstr], {
                type: "image/svg+xml;charset=utf-8",
              });
              const fileSizeString = formatBytes(blob.size);
              dlText.innerText = "Tải SVG (" + fileSizeString + ")";

              if (currentSvgBlobUrl) URL.revokeObjectURL(currentSvgBlobUrl);
              currentSvgBlobUrl = URL.createObjectURL(blob);

              previewImg.src = currentSvgBlobUrl;
              previewImg.style.display = "block";
              previewPlaceholder.style.display = "none";

              loadingLayer.style.display = "none";
              btnConvert.disabled = false;
              btnCopy.disabled = false;
              btnDownload.disabled = false;
            },
            options,
          );
        }, 100);
      });
    });

    btnCopy.addEventListener("click", function () {
      if (!finalSvgString) return;
      navigator.clipboard.writeText(finalSvgString).then(() => {
        const oldText = btnCopy.innerText;
        btnCopy.innerText = "✅ Đã Copy";
        btnCopy.classList.add(
          "bg-green-100",
          "text-green-600",
          "border-green-200",
        );
        btnCopy.classList.remove(
          "bg-blue-900/20",
          "text-blue-600",
          "border-blue-200",
        );
        setTimeout(() => {
          btnCopy.innerText = oldText;
          btnCopy.classList.remove(
            "bg-green-100",
            "text-green-600",
            "border-green-200",
          );
          btnCopy.classList.add(
            "bg-blue-900/20",
            "text-blue-600",
            "border-blue-200",
          );
        }, 2000);
      });
    });

    btnDownload.addEventListener("click", function () {
      if (!finalSvgString) return;
      const blob = new Blob([finalSvgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "vectorized-image.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  });
}
