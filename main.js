// main.js - full file
let currentPage = 1;
const articlesPerPage = 6;
let allArticles = [];
let activeCategory = "all";
let searchTerm = "";

const isIndex = /(?:^\/?$|\/index\.html$|\/index\.php$)/.test(location.pathname);

function initHeaderScripts() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    // close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  }
}

function showError(container, msg) {
  container.innerHTML = `<p style="color:red">${escapeHtml(msg)}</p>`;
}

/* PAGINATION */
function renderPagination(filtered) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.max(1, Math.ceil(filtered.length / articlesPerPage));
  if (totalPages <= 1) {
    pagination.style.display = "none";
    return;
  }
  pagination.style.display = "flex";

  const prev = document.createElement("button");
  prev.textContent = "← Prev";
  prev.className = "button pagination-button";
  prev.disabled = currentPage === 1;
  prev.onclick = () => { currentPage--; renderArticles(); };

  const next = document.createElement("button");
  next.textContent = "Next →";
  next.className = "button pagination-button";
  next.disabled = currentPage === totalPages;
  next.onclick = () => { currentPage++; renderArticles(); };

  const select = document.createElement("select");
  select.id = "pageJumpSelect";
  for (let i = 1; i <= totalPages; i++) {
    const o = document.createElement("option");
    o.value = i; o.textContent = `Page ${i}`;
    if (i === currentPage) o.selected = true;
    select.appendChild(o);
  }
  select.onchange = () => { currentPage = parseInt(select.value, 10); renderArticles(); };

  const pageText = document.createElement("span");
  pageText.textContent = `Page ${currentPage} of ${totalPages}`;
  pageText.className = "pagination-text";

  pagination.appendChild(prev);
  pagination.appendChild(pageText);
  pagination.appendChild(next);
  pagination.appendChild(select);

  // go to top on page change
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* INDEX (JSON) LOADING */
function loadIndex() {
  return fetch("index.json").then(res => {
    if (!res.ok) throw new Error("Failed to fetch index.json: " + res.status);
    return res.json();
  });
}

/* WELCOME.HTML loader (separate file) */
function loadWelcomeHtml() {
  const welcomeEl = document.getElementById("welcomeBox");
  if (!welcomeEl) return Promise.resolve();
  return fetch("welcome.html?v=" + Date.now())
    .then(r => {
      if (!r.ok) throw new Error("No welcome.html found");
      return r.text();
    })
    .then(html => {
      welcomeEl.innerHTML = html;
      welcomeEl.classList.remove("hidden");
    })
    .catch(() => {
      // hide if not present
      welcomeEl.classList.add("hidden");
    });
}

/* MAIN ARTICLE LIST LOADING */
function loadArticles() {
  const articlesEl = document.getElementById("articles");
  // load welcome separately
  loadWelcomeHtml().finally(() => {
    loadIndex().then(data => {
      if (!Array.isArray(data)) {
        // allow index.json to be an object with "articles" array or plain array
        if (data.articles && Array.isArray(data.articles)) {
          allArticles = data.articles;
        } else {
          throw new Error("index.json format invalid");
        }
      } else {
        allArticles = data;
      }

      renderCategories(allArticles);
      applyCategoryFromUrl();
      renderArticles();
      setupSearch();
    }).catch(err => {
      console.error("Failed to load index.json:", err);
      showError(articlesEl, "Failed to load articles.");
    });
  });
}

/* RENDER ARTICLES (main page) */
function renderArticles() {
  const container = document.getElementById("articles");
  const articleContent = document.getElementById("articleContent");
  const pagination = document.getElementById("pagination");
  const backButton = document.getElementById("backButton");
  const searchBox = document.getElementById("searchBox");
  const welcomeBox = document.getElementById("welcomeBox");

  container.style.display = "block";
  if (searchBox) searchBox.style.display = "block";
  if (pagination) pagination.style.display = "flex";
  if (articleContent) articleContent.style.display = "none";
  if (backButton) backButton.style.display = "none";
  if (welcomeBox) welcomeBox.classList.remove("hidden");

  // filter
  const filtered = allArticles.filter(article => {
    const cats = article.categories || [];
    const inCategory = activeCategory === "all" || (cats && cats.includes && cats.includes(activeCategory));
    const combined = (article.title || "") + " " + (article.summary || "");
    const inSearch = !searchTerm || combined.toLowerCase().includes(searchTerm);
    return inCategory && inSearch;
  });

  const start = (currentPage - 1) * articlesPerPage;
  const pageArticles = filtered.slice(start, start + articlesPerPage);

  container.innerHTML = "";
  pageArticles.forEach(article => {
    const a = document.createElement("article");
    a.className = "article-card fade-in";
    a.setAttribute("data-id", article.id);
    a.innerHTML = `
      <h2>${escapeHtml(article.title)}</h2>
      ${article.image ? `<img src="${article.image}" alt="${escapeHtml(article.title)}">` : ""}
      <p>${escapeHtml(article.summary || "")}</p>
      <div class="card-buttons">
        <button data-id="${article.id}" class="readMore">Read more →</button>
        <button data-id="${article.id}" class="shareLink">🔗 Share</button>
      </div>
    `;

    // clicking card opens article unless you clicked a button (read/share)
    a.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        loadMarkdown(article.id, article.file);
        document.getElementById("navLinks")?.classList.remove("open");
      }
    });

    container.appendChild(a);
  });

  // read buttons
  container.querySelectorAll(".readMore").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const art = allArticles.find(x => x.id == id);
      loadMarkdown(id, art && art.file);
    };
  });

  // share buttons - show popup
  container.querySelectorAll(".shareLink").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      showSharePopup(btn.dataset.id);
    };
  });

  renderPagination(filtered);
}

/* CATEGORIES */
function renderCategories(data) {
  const menuList = document.getElementById("articleList");
  if (!menuList) return;
  const allCategories = new Set();
  data.forEach(a => (a.categories || []).forEach(c => { if (c) allCategories.add(c); }));
  menuList.innerHTML = "";

  const allLink = document.createElement("a");
  allLink.href = "index.html?cat=all";
  allLink.textContent = "All";
  allLink.className = activeCategory === "all" ? "active" : "";
  allLink.onclick = (e) => { e.preventDefault(); activeCategory = "all"; currentPage = 1; renderArticles(); document.getElementById("navLinks")?.classList.remove("open"); };
  menuList.appendChild(allLink);

  Array.from(allCategories).sort().forEach(cat => {
    const link = document.createElement("a");
    link.href = "index.html?cat=" + encodeURIComponent(cat);
    link.textContent = cat;
    if (activeCategory === cat) link.classList.add("active");
    link.onclick = (e) => {
      e.preventDefault();
      activeCategory = cat;
      currentPage = 1;
      renderArticles();
      document.getElementById("navLinks")?.classList.remove("open");
    };
    menuList.appendChild(link);
  });
}

/* ARTICLE LOADING (markdown) */
function loadMarkdown(id, filePath) {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const viewer = document.getElementById("articleContent");
  if (!viewer) return;

  const meta = allArticles.find(a => a.id == id);
  if (!meta) {
    alert("Article metadata not found.");
    console.error("metadata not found for id:", id);
    return;
  }
  // cache-buster param to avoid stale content
  // FIX: Add leading slash for absolute path
let path;
if (filePath) {
  path = filePath.startsWith('/') ? filePath : '/' + filePath;
} else {
  path = `/articles/${id}.md`;
}
const fullPath = path + "?v=" + Date.now();

  fetch(fullPath).then(r => {
    if (!r.ok) throw new Error("Failed to fetch article file: " + r.status);
    return r.text();
  }).then(md => {
    const parsed = parseFrontmatter(md);
    const html = (window.marked) ? marked(parsed.content || md) : (parsed.content || md);

    document.getElementById("articles").style.display = "none";
    document.getElementById("searchBox").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById("welcomeBox")?.classList.add("hidden");

    viewer.innerHTML = `
      <div class="article-card">
        <h1>${escapeHtml(parsed.meta.title || meta.title)}</h1>
        ${parsed.meta.image ? `<img src="${parsed.meta.image}" alt="${escapeHtml(parsed.meta.title || meta.title)}">` : (meta.image ? `<img src="${meta.image}" alt="">` : "")}
        <div class="article-body">${html}</div>
        <div class="view-buttons">
          <button id="backButton" class="button">← Return to Home</button>
          <button id="shareButton" class="button" data-id="${id}">🔗 Share</button>
        </div>
      </div>
      <div id="relatedBox"></div>
    `;
    viewer.style.display = "block";
    viewer.classList.add("fade-in");
    setTimeout(() => viewer.classList.remove("fade-in"), 400);

    // back button
    const backButton = document.getElementById("backButton");
    if (backButton) backButton.onclick = () => { window.location.hash = ""; renderArticles(); };

    // share button
    const shareButton = document.getElementById("shareButton");
    if (shareButton) shareButton.onclick = (e) => { e.stopPropagation(); showSharePopup(id); };

    // images clickable
    viewer.querySelectorAll(".article-body img").forEach(img => {
      img.style.cursor = "pointer";
      img.onclick = () => window.open(img.src, "_blank");
    });

    // allow in-content links to work normally
    viewer.querySelectorAll(".article-body a").forEach(a => {
      a.target = a.target || "_blank";
    });

    // related articles
    loadRelated(parsed.meta.categories || meta.categories || []);

    // set hash
    window.location.hash = id;
  }).catch(err => {
    console.error("loadMarkdown error:", err);
    alert("Failed to load article content.");
  });
}

/* RELATED ARTICLES (as cards like main page) */
function loadRelated(categories) {
  const relatedBox = document.getElementById("relatedBox");
  if (!relatedBox) return;
  relatedBox.innerHTML = "";
  if (!categories || !categories.length) return;

  // find related - share at least one category
  const related = allArticles.filter(a => {
    if (!a.categories) return false;
    if (!Array.isArray(a.categories)) return false;
    return a.categories.some(c => categories.includes(c));
  }).filter(r => r && r.id !== window.location.hash.substring(1)).slice(0, 6);

  if (!related.length) return;

  const container = document.createElement("div");
  container.id = "relatedBoxContainer";

  const heading = document.createElement("h3");
  heading.className = "related-title";
  heading.textContent = "🔗 Related Articles";
  container.appendChild(heading);

  related.forEach(a => {
    const card = document.createElement("article");
    card.className = "article-card related-card";
    card.setAttribute("data-id", a.id);
    card.innerHTML = `
      <h2>${escapeHtml(a.title)}</h2>
      ${a.image ? `<img src="${a.image}" alt="${escapeHtml(a.title)}">` : ""}
      <p>${escapeHtml(a.summary || "")}</p>
      <div class="card-buttons">
        <button class="readMore button" data-id="${a.id}">Read more →</button>
        <button class="shareLink button" data-id="${a.id}">🔗 Share</button>
      </div>
    `;
    // clicking card opens article (unless button clicked)
    card.addEventListener("click", (e) => {
      if (!e.target.closest("button")) loadMarkdown(a.id, a.file);
    });
    container.appendChild(card);
  });

  relatedBox.appendChild(container);

  // wire up read/share inside related
  container.querySelectorAll(".readMore").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      loadMarkdown(btn.dataset.id);
    });
  });
  container.querySelectorAll(".shareLink").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      showSharePopup(btn.dataset.id);
    });
  });
}

/* SHARE POPUP - cross-device + iOS fallback */
function showSharePopup(articleId) {
  const url = `${location.origin}${location.pathname}#${articleId}`;
  const popup = document.getElementById("sharePopup");
  if (!popup) {
    // fallback simple prompt if no popup in DOM
    if (navigator.share) {
      navigator.share({ title: document.title, url }).catch(()=>{});
    } else {
      prompt("Share link (copy):", url);
    }
    return;
  }
  const input = document.getElementById("shareUrl");
  const fb = document.getElementById("facebookShare");
  const tw = document.getElementById("twitterShare");
  const rd = document.getElementById("redditShare");
  const copyBtn = document.getElementById("copyShareUrl");
  const closeBtn = document.getElementById("popupClose");

  if (input) {
    input.value = url;
  }
  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  if (tw) tw.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
  if (rd) rd.href = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`;

  popup.style.display = "block";
  popup.setAttribute("aria-hidden", "false");

  // close button
  if (closeBtn) closeBtn.onclick = () => { popup.style.display = "none"; popup.setAttribute("aria-hidden", "true"); };

  // copy action with fallback for iOS older Safari
  if (copyBtn) {
    // remove previous handlers to avoid duplicates
    copyBtn.onclick = null;
    copyBtn.onclick = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(url);
        } else {
          // fallback: temporarily enable selection and execCommand
          if (input) {
            input.removeAttribute("readonly");
            input.focus();
            input.select();
            input.setSelectionRange(0, 99999); // iOS
            document.execCommand("copy");
            input.setAttribute("readonly", true);
          } else {
            throw new Error("No input to copy from");
          }
        }
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => copyBtn.textContent = "Copy", 1500);
      } catch (err) {
        console.warn("Copy failed:", err);
        alert("Copy failed -- please copy the link manually.");
      }
    };
  }

  // clicking outside closes popup - attach once per show
  const onDocClick = (e) => {
    if (!popup.contains(e.target) && !e.target.classList.contains("shareLink")) {
      popup.style.display = "none";
      popup.setAttribute("aria-hidden", "true");
      document.removeEventListener("click", onDocClick);
    }
  };
  // slight delay so the click that opened the popup doesn't immediately close it
  setTimeout(() => document.addEventListener("click", onDocClick), 10);
}

/* HELPERS */
function escapeHtml(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/[&<>"']/g, function (ch) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]; });
}

/* Minimal frontmatter parser (--- ... ---) */
function parseFrontmatter(text) {
  if (!text || !text.startsWith("---")) return { meta: {}, content: text };
  const endMarkerIndex = text.indexOf("\n---", 3);
  if (endMarkerIndex === -1) return { meta: {}, content: text };
  const raw = text.substring(3, endMarkerIndex + 1);
  const rest = text.substring(endMarkerIndex + 4).trim();
  const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const meta = {};
  lines.forEach(line => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.substring(0, idx).trim();
    let value = line.substring(idx + 1).trim();
    if (!value) {
      meta[key] = "";
      return;
    }
    // list: [a,b] or comma separated
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.substring(1, value.length - 1).split(",").map(s => s.trim().replace(/^"|"$/g, "").replace(/^'|'$/g, ""));
    } else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.substring(1, value.length - 1);
    } else if (value.includes(",") && !value.includes('"')) {
      value = value.split(",").map(s => s.trim());
    }
    meta[key] = value;
  });
  return { meta, content: rest };
}

/* SEARCH */
function setupSearch() {
  const searchBox = document.getElementById("searchBox");
  if (!searchBox) return;
  searchBox.addEventListener("input", () => {
    searchTerm = searchBox.value.toLowerCase();
    currentPage = 1;
    renderArticles();
  });
}

/* URL category param */
function applyCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat) activeCategory = cat;
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScripts();

  // inject header/footer HTML if placeholders present
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    fetch("header.html").then(r => r.text()).then(html => { headerPlaceholder.innerHTML = html; initHeaderScripts(); }).catch(() => {});
  }
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("footer.html").then(r => r.text()).then(html => { footerPlaceholder.innerHTML = html; }).catch(() => {});
  }

  if (isIndex) {
    loadArticles();
    // open hash after index loads (works with the small polling loop)
    const hash = window.location.hash.substring(1);
    if (hash) {
      const waitForIndex = setInterval(() => {
        if (allArticles && allArticles.length) {
          clearInterval(waitForIndex);
          const meta = allArticles.find(a => a.id == hash);
          loadMarkdown(hash, meta && meta.file);
        }
      }, 200);
      setTimeout(() => clearInterval(waitForIndex), 6000);
    }
  }
});