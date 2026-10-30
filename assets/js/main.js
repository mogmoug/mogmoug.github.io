/* Mogmoug Blog — vanilla JS, no dependencies */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;
  var scriptEl =
    doc.currentScript ||
    doc.querySelector('script[src$="assets/js/main.js"]');
  var siteRoot =
    scriptEl && scriptEl.src
      ? scriptEl.src.replace(/assets\/js\/main\.js.*$/, "")
      : new URL("./", window.location.href).href;

  /* ---------- theme toggle ---------- */
  var themeBtn = doc.querySelector("[data-theme-toggle]");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    if (themeBtn) {
      themeBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "切换到浅色模式" : "切换到深色模式"
      );
      themeBtn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  if (themeBtn) {
    setTheme(currentTheme());
    themeBtn.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* follow system changes only when user has not chosen */
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onScheme = function (e) {
      var stored = null;
      try {
        stored = localStorage.getItem("theme");
      } catch (err) {}
      if (!stored) setTheme(e.matches ? "dark" : "light");
    };
    if (mq.addEventListener) mq.addEventListener("change", onScheme);
    else if (mq.addListener) mq.addListener(onScheme);
  }

  /* ---------- mobile nav ---------- */
  var navToggle = doc.querySelector("[data-nav-toggle]");
  var nav = doc.querySelector("[data-nav]");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- reading progress + back to top ---------- */
  var progress = doc.querySelector("[data-progress]");
  var backTop = doc.querySelector("[data-back-top]");

  function onScroll() {
    var h = doc.documentElement;
    if (progress) {
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
    }
    if (backTop) backTop.classList.toggle("show", h.scrollTop > 600);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- copy code ---------- */
  doc.querySelectorAll(".prose pre").forEach(function (pre) {
    var btn = doc.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "复制";
    btn.addEventListener("click", function () {
      var code = pre.querySelector("code");
      var text = code ? code.innerText : pre.innerText;
      var done = function () {
        btn.textContent = "已复制";
        setTimeout(function () {
          btn.textContent = "复制";
        }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }
      function fallback() {
        var ta = doc.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        doc.body.appendChild(ta);
        ta.select();
        try {
          doc.execCommand("copy");
          done();
        } catch (e) {}
        doc.body.removeChild(ta);
      }
    });
    pre.appendChild(btn);
  });

  /* ---------- TOC from article headings ---------- */
  var toc = doc.querySelector("[data-toc]");
  var prose = doc.querySelector(".prose");
  if (toc && prose) {
    var heads = prose.querySelectorAll("h2, h3");
    if (heads.length) {
      var list = doc.createElement("ul");
      var links = [];
      heads.forEach(function (h, i) {
        if (!h.id) {
          h.id = "section-" + (i + 1);
        }
        var li = doc.createElement("li");
        if (h.tagName === "H3") li.className = "sub";
        var a = doc.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        a.addEventListener("click", function () {
          links.forEach(function (x) {
            x.classList.remove("active");
          });
          a.classList.add("active");
        });
        li.appendChild(a);
        list.appendChild(li);
        links.push(a);
      });
      toc.appendChild(list);

      if ("IntersectionObserver" in window) {
        var map = {};
        links.forEach(function (a) {
          map[a.getAttribute("href").slice(1)] = a;
        });
        var visible = {};
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              visible[entry.target.id] = entry.isIntersecting;
            });
            for (var i = 0; i < heads.length; i++) {
              var id = heads[i].id;
              if (visible[id]) {
                links.forEach(function (x) {
                  x.classList.remove("active");
                });
                if (map[id]) map[id].classList.add("active");
                break;
              }
            }
          },
          { rootMargin: "-80px 0px -65% 0px", threshold: 0 }
        );
        heads.forEach(function (h) {
          io.observe(h);
        });
      }
    } else {
      var wrap = toc.closest(".toc");
      if (wrap) wrap.style.display = "none";
    }
  }

  /* ---------- search ---------- */
  var modal = doc.querySelector("[data-search-modal]");
  var searchInput = modal ? modal.querySelector("[data-search-input]") : null;
  var resultsBox = modal ? modal.querySelector("[data-search-results]") : null;
  var searchData = null;
  var activeIdx = -1;

  function openSearch() {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    doc.body.style.overflow = "hidden";
    if (searchInput) {
      searchInput.value = "";
      searchInput.focus();
    }
    renderResults("");
    if (!searchData) {
      fetch(siteRoot + "assets/search.json")
        .then(function (r) {
          return r.json();
        })
        .then(function (data) {
          searchData = data;
          renderResults(searchInput ? searchInput.value : "");
        })
        .catch(function () {
          searchData = [];
          if (resultsBox) {
            resultsBox.innerHTML =
              '<li class="search-empty">file:// 下无法读取搜索索引，请用本地服务器打开（python3 -m http.server）。</li>';
          }
        });
    }
  }

  function closeSearch() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    doc.body.style.overflow = "";
  }

  function renderResults(query) {
    if (!resultsBox) return;
    var q = query.trim().toLowerCase();
    var items = (searchData || []).filter(function (item) {
      if (!q) return true;
      var hay = (
        item.title +
        " " +
        (item.description || "") +
        " " +
        (item.tags || []).join(" ") +
        " " +
        (item.text || "")
      ).toLowerCase();
      return hay.indexOf(q) !== -1;
    });
    activeIdx = -1;
    resultsBox.innerHTML = "";
    if (!items.length) {
      var empty = doc.createElement("li");
      empty.className = "search-empty";
      empty.textContent = searchData ? "没有找到相关内容" : "正在加载…";
      resultsBox.appendChild(empty);
      return;
    }
    items.slice(0, 12).forEach(function (item) {
      var li = doc.createElement("li");
      var a = doc.createElement("a");
      a.href = new URL(item.url.replace(/^\//, ""), siteRoot).href;
      var t = doc.createElement("div");
      t.className = "r-title";
      t.textContent = item.title;
      var d = doc.createElement("div");
      d.className = "r-desc";
      d.textContent = item.description || (item.tags || []).join(" · ");
      a.appendChild(t);
      a.appendChild(d);
      li.appendChild(a);
      resultsBox.appendChild(li);
    });
  }

  doc.querySelectorAll("[data-search-open]").forEach(function (el) {
    el.addEventListener("click", openSearch);
  });
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeSearch();
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      renderResults(searchInput.value);
    });
    searchInput.addEventListener("keydown", function (e) {
      var links = resultsBox
        ? resultsBox.querySelectorAll("li a")
        : [];
      if (e.key === "ArrowDown") {
        e.preventDefault();
        activeIdx = Math.min(links.length - 1, activeIdx + 1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        activeIdx = Math.max(0, activeIdx - 1);
      } else if (e.key === "Enter") {
        if (links[activeIdx]) {
          window.location.href = links[activeIdx].href;
          return;
        }
      } else if (e.key === "Escape") {
        closeSearch();
        return;
      } else {
        return;
      }
      links.forEach(function (l) {
        l.classList.remove("active");
      });
      if (links[activeIdx]) {
        links[activeIdx].classList.add("active");
        links[activeIdx].scrollIntoView({ block: "nearest" });
      }
    });
  }

  doc.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    var typing = tag === "input" || tag === "textarea" || e.target.isContentEditable;
    if ((e.key === "/" && !typing) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
      e.preventDefault();
      openSearch();
    } else if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeSearch();
    }
  });

  /* ---------- active nav ---------- */
  var here = window.location.pathname.replace(/\/index\.html$/, "/");
  doc.querySelectorAll(".site-nav a[href]").forEach(function (a) {
    try {
      var resolved = new URL(a.getAttribute("href"), window.location.href);
      var target = resolved.pathname.replace(/\/index\.html$/, "/");
      if (target === here) a.setAttribute("aria-current", "page");
    } catch (e) {}
  });
})();
