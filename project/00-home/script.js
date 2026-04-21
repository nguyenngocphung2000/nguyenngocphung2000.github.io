export function init() {
  const guideList = document.getElementById("guide-list");
  const searchInput = document.getElementById("guide-search");
  const noResult = document.getElementById("guide-no-result");
  let cachedContent = {};

  const manifest = [
    {
      title: "Cách dùng các công cụ AI hiệu quả như một chuyên gia",
      date: "Nothing",
      path: "posts/guide-use-ai.md",
    },
    {
      title: "Tạo Bot Telegram quản lý tài chính với Google Sheet",
      date: "Nothing",
      path: "posts/bot-telegram.md",
    },
    {
      title: "Chặn quảng cáo Web, App, Zalo bằng NextDNS",
      date: "Thủ thuật IOS",
      path: "posts/nextdns.md",
    },
    {
      title: "Cài Lịch Âm & Bộ gõ tiếng Việt trên macOS, các ứng dụng khác",
      date: "Thủ thuật Mac",
      path: "posts/mac-apps.md",
    },
    {
      title: "Tổng hợp tài liệu học lập trình và công nghệ thông tin từ Freetuts",
      date: "Tài liệu học tập",
      path: "posts/tong-hop-tai-lieu-freetuts.md",
    },
    {
      title: "Tổng hợp các nhóm crack mod hack - apk,ipa(android/ios) trên Telegram",
      date: "Phần mềm/Ứng dụng",
      path: "posts/group-telegram.md",
    },
    {
      title: "Tổng hợp các trang web chia sẻ tài nguyên ứng dụng trên Mac",
      date: "Thủ thuật Mac",
      path: "posts/mac-webs.md",
    }
  ];

  // Render List
  const renderGuideList = () => {
    guideList.innerHTML = "";
    manifest.forEach((guide, index) => {
      const item = document.createElement("div");
      item.id = `guide-item-${index}`;
      item.className =
        "guide-item bg-slate-800/50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition hover:shadow-md hover:border-orange-100 duration-300";

      // Tối ưu Padding (px) cho phần đọc Markdown: Màn dọc (mobile) mở rộng viền tối đa (px-3 sm:px-4)
      item.innerHTML = `
                <button class="w-full text-left px-4 py-4 md:px-6 md:py-5 flex items-center justify-between focus:outline-none group" onclick="toggleGuide(${index})">
                    <div class="pr-4">
                        <h3 class="font-bold text-slate-200 group-hover:text-orange-500 transition text-[15px] md:text-lg leading-snug">${guide.title}</h3>
                        <p class="inline-block mt-2 bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors">${guide.date}</p>
                    </div>
                    <div id="icon-${index}" class="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-gray-50 rounded-full group-hover:bg-orange-100 group-hover:text-orange-500 shrink-0 transition-colors">XEM</div>
                </button>
                <div id="content-${index}" class="hidden border-t border-gray-100 bg-gray-50/50 transition-colors duration-300">
                    <div class="prose-custom max-w-none px-3 py-4 sm:px-4 md:px-6 md:py-6 text-[14.5px] md:text-base leading-relaxed" id="md-render-${index}"></div>
                </div>
            `;
      guideList.appendChild(item);
    });
  };
  renderGuideList();

  // Search Logic
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(".guide-item");
    let hasVisible = false;

    manifest.forEach((guide, index) => {
      const isMatch = guide.title.toLowerCase().includes(term);
      if (items[index]) {
        items[index].style.display = isMatch ? "block" : "none";
      }
      if (isMatch) hasVisible = true;
    });

    noResult.classList.toggle("hidden", hasVisible);
  });

  // Handle Deep Linking / Post UI
  window.toggleGuide = async function (index, skipUrlUpdate = false) {
    // Chỉ kích hoạt toggle nếu đang ở mục Home. Nếu ẩn (tab khác) thì thôi hoặc chuyển về home trước.
    if (window.currentTab && window.currentTab !== "tab-home") {
      await window.loadHomeTab();
    }

    const contentDiv = document.getElementById("content-" + index);
    const iconDiv = document.getElementById("icon-" + index);
    const renderDiv = document.getElementById("md-render-" + index);
    const parentItem = document.getElementById("guide-item-" + index);

    // Lấy tên file để tạo Link
    const currentSlug = manifest[index].path
      .split("/")
      .pop()
      .replace(".md", "");

    // Đóng tất cả các thẻ đang mở khác
    manifest.forEach((_, i) => {
      if (i !== index) {
        const otherContent = document.getElementById("content-" + i);
        const otherIcon = document.getElementById("icon-" + i);
        if (otherContent && !otherContent.classList.contains("hidden")) {
          otherContent.classList.add("hidden");
          otherIcon.innerText = "XEM";
          otherIcon.classList.remove("bg-orange-100", "text-orange-500");
          otherIcon.classList.add("bg-gray-50", "text-gray-400");
        }
      }
    });

    if (contentDiv.classList.contains("hidden")) {
      // MỞ THẺ
      contentDiv.classList.remove("hidden");
      iconDiv.innerText = "ĐÓNG";
      iconDiv.classList.remove("bg-gray-50", "text-gray-400");
      iconDiv.classList.add("bg-orange-100", "text-orange-500");

      // Cập nhật tham số URL
      if (!skipUrlUpdate) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("post", currentSlug);
        window.history.replaceState(null, null, newUrl);
      }

      // Tải & Render Markdown nếu chưa có trong Cache
      if (!cachedContent[index]) {
        renderDiv.innerHTML =
          '<div class="text-orange-500 font-bold animate-pulse text-center py-6">Đang nạp dữ liệu bài viết...</div>';
        try {
          const response = await fetch(manifest[index].path);
          if (!response.ok) throw new Error("Lỗi tải file");
          let text = await response.text();

          if (window.marked) {
            text = text.replace(
              /^@time\\[(.*?)\\] (.*)$/gm,
              '<div class="md-timeline-node"><span class="md-time-badge">$1</span><div class="md-time-text">$2</div></div>',
            );
            cachedContent[index] = marked.parse(text);
          } else {
            cachedContent[index] =
              "<p class='text-red-500 text-center py-4'>Lỗi thư viện Markdown.</p>";
          }
        } catch (error) {
          cachedContent[index] =
            `<div class="text-red-500 bg-red-50 p-4 text-center rounded-xl border border-red-100 my-4">Không thể tải nội dung file</div>`;
        }
      }

      renderDiv.innerHTML = cachedContent[index];
      renderDiv.querySelectorAll("a").forEach((link) => {
        link.setAttribute("target", "_blank");
        link.className = "text-orange-500 font-bold hover:underline";
      });

      // Cuộn mượt mà tới bài viết
      setTimeout(() => {
        if (parentItem) {
          // Bù padding header
          const y =
            parentItem.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      // ĐÓNG THẺ
      contentDiv.classList.add("hidden");
      iconDiv.innerText = "XEM";
      iconDiv.classList.remove("bg-orange-100", "text-orange-500");
      iconDiv.classList.add("bg-gray-50", "text-gray-400");

      // Gỡ tham số URL
      if (!skipUrlUpdate) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete("post");
        window.history.replaceState(null, null, newUrl);
      }
    }
  };

  // Mở post nếu có tham số
  window.checkUrlPost = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get("post");

    if (postSlug) {
      const targetIndex = manifest.findIndex((m) =>
        m.path.endsWith(`/${postSlug}.md`),
      );
      if (targetIndex !== -1) {
        setTimeout(() => {
          window.toggleGuide(targetIndex, true);
        }, 150);
      }
    }
  };

  window.checkUrlPost();
}
