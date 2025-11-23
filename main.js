
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
    menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) navLinks.classList.remove("open");
    });
  }
}

function showError(container, msg) {
  container.innerHTML = `<p style="color:red">${msg}</p>`;
}

function renderPagination(filtered) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(filtered.length / articlesPerPage);
  if (totalPages <= 1) return;

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
  for (let i=1;i<=totalPages;i++){
    const o = document.createElement("option");
    o.value = i; o.textContent = `Page ${i}`;
    if (i===currentPage) o.selected = true;
    select.appendChild(o);
  }
  select.onchange = () => { currentPage = parseInt(select.value); renderArticles(); };

  const pageText = document.createElement("span");
  pageText.textContent = `Page ${currentPage} of ${totalPages}`;
  pageText.className = "pagination-text";

  pagination.appendChild(prev);
  pagination.appendChild(pageText);
  pagination.appendChild(next);
  pagination.appendChild(select);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function loadIndex() {
  return fetch("index.json").then(r=>{
    if (!r.ok) throw new Error("Failed to fetch index.json");
    return r.json();
  });
}

function loadArticles() {
  const articlesEl = document.getElementById("articles");
  loadIndex().then(data => {
    allArticles = data; // expected array of {id,title,summary,image,categories,author,file}
    renderCategories(allArticles);
    applyCategoryFromUrl();
    renderArticles();
    setupSearch();
    // show welcome if present in index.json root
    const welcomeEl = document.getElementById("welcomeBox");
    if (data.welcome_html) {
      welcomeEl.innerHTML = data.welcome_html;
      welcomeEl.classList.remove("hidden");
    } else {
      welcomeEl.classList.add("hidden");
    }
  }).catch(err=>{
    console.error(err);
    showError(articlesEl, "Failed to load articles.");
  });
}

function renderArticles() {
  const container = document.getElementById("articles");
  const articleContent = document.getElementById("articleContent");
  const pagination = document.getElementById("pagination");
  const backButton = document.getElementById("backButton");
  const searchBox = document.getElementById("searchBox");
  const welcomeBox = document.getElementById("welcomeBox");

  container.style.display = "block";
  searchBox.style.display = "block";
  pagination.style.display = "flex";
  articleContent.style.display = "none";
  if (backButton) backButton.style.display = "none";
  if (welcomeBox) welcomeBox.classList.remove("hidden");

  const filtered = allArticles.filter(article => {
    const inCategory = activeCategory === "all" || (article.categories||[]).includes(activeCategory);
    const inSearch = !searchTerm || (article.title + " " + (article.summary||"")).toLowerCase().includes(searchTerm);
    return inCategory && inSearch;
  });

  const start = (currentPage-1) * articlesPerPage;
  const pageArticles = filtered.slice(start, start + articlesPerPage);

  container.innerHTML = "";
  pageArticles.forEach(article => {
    const a = document.createElement("article");
    a.className = "article-card";
    a.setAttribute("data-id", article.id);
    a.innerHTML = `
      <h2>${escapeHtml(article.title)}</h2>
      ${article.image ? `<img src="${article.image}" alt="${escapeHtml(article.title)}">` : ""}
      <p>${escapeHtml(article.summary||"")}</p>
      <div class="card-buttons">
        <button data-id="${article.id}" class="readMore">Read more →</button>
        <button data-id="${article.id}" class="shareLink">🔗 Share</button>
      </div>
    `;
    a.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        loadMarkdown(article.id, article.file);
        document.getElementById("navLinks")?.classList.remove("open");
      }
    });
    container.appendChild(a);
  });

  container.querySelectorAll(".readMore").forEach(btn => btn.onclick = (e)=> {
    e.stopPropagation();
    const id = btn.dataset.id;
    const art = allArticles.find(x=>x.id==id);
    loadMarkdown(id, art && art.file);
  });

  container.querySelectorAll(".shareLink").forEach(btn => btn.onclick = (e)=> {
    e.stopPropagation();
    showSharePopup(btn.dataset.id);
  });

  renderPagination(filtered);
}

function renderCategories(data) {
  const menuList = document.getElementById("articleList");
  const allCategories = new Set();
  data.forEach(a => (a.categories||[]).forEach(c=>allCategories.add(c)));
  menuList.innerHTML = "";

  const allLink = document.createElement("a");
  allLink.href = "index.html?cat=all";
  allLink.textContent = "All";
  allLink.className = activeCategory==="all" ? "active": "";
  allLink.onclick = (e)=> { e.preventDefault(); activeCategory="all"; currentPage=1; renderArticles(); document.getElementById("navLinks")?.classList.remove("open"); };
  menuList.appendChild(allLink);

  Array.from(allCategories).sort().forEach(cat => {
    const link = document.createElement("a");
    link.href = "index.html?cat="+encodeURIComponent(cat);
    link.textContent = cat;
    if (activeCategory===cat) link.classList.add("active");
    link.onclick = (e) => { e.preventDefault(); activeCategory = cat; currentPage=1; renderArticles(); document.getElementById("navLinks")?.classList.remove("open"); };
    menuList.appendChild(link);
  });
}

function loadMarkdown(id, filePath) {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const viewer = document.getElementById("articleContent");

  // find article metadata in allArticles
  const meta = allArticles.find(a => a.id == id);
  if (!meta) {
    alert("Article metadata not found.");
    return;
  }
  const path = filePath || (`articles/${id}.md`);

  fetch(path).then(r => {
    if (!r.ok) throw new Error("Failed to fetch article file");
    return r.text();
  }).then(md => {
    const parsed = parseFrontmatter(md);
    const html = marked(parsed.content || md);
    document.getElementById("articles").style.display = "none";
    document.getElementById("searchBox").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById("welcomeBox")?.classList.add("hidden");

    viewer.innerHTML = `
      <div class="article-card">
        <h1>${escapeHtml(parsed.meta.title || meta.title)}</h1>
        ${parsed.meta.image ? `<img src="${parsed.meta.image}" alt="${escapeHtml(parsed.meta.title || meta.title)}">` : (meta.image? `<img src="${meta.image}" alt="">` : "")}
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
    setTimeout(()=>viewer.classList.remove("fade-in"), 400);

    document.getElementById("backButton").onclick = ()=> { window.location.hash=""; renderArticles(); };

    document.getElementById("shareButton").onclick = (e)=> { e.stopPropagation(); showSharePopup(id); };

    // make images clickable to open in new tab
    viewer.querySelectorAll(".article-body img").forEach(img=>{
      img.style.cursor = "pointer";
      img.onclick = ()=> window.open(img.src,"_blank");
    });

    // load related articles based on category overlap
    loadRelated(parsed.meta.categories || meta.categories || []);

    // set hash
    window.location.hash = id;
  }).catch(err=>{
    console.error(err);
    alert("Failed to load article content.");
  });
}

function loadRelated(categories) {
  const relatedBox = document.getElementById("relatedBox");
  relatedBox.innerHTML = "";
  if (!categories || !categories.length) return;
  // simple related: share at least 1 category
  const related = allArticles.filter(a => {
    if (!a.categories) return false;
    if (Array.isArray(a.categories)) {
      return a.categories.some(c=>categories.includes(c));
    }
    return false;
  }).slice(0,6).filter(r => r); // limit
  if (!related.length) return;

  const container = document.createElement("div");
  container.id = "relatedBoxContainer";
  const heading = document.createElement("h3");
  heading.className = "related-title";
  heading.textContent = "🔗 Related Articles";
  container.appendChild(heading);

  related.forEach(a => {
    // avoid listing current article as related
    if (window.location.hash.substring(1) == a.id) return;
    const card = document.createElement("article");
    card.className = "related-card";
    card.setAttribute("data-id", a.id);
    card.innerHTML = `
      <h2>${escapeHtml(a.title)}</h2>
      ${a.image ? `<img src="${a.image}" alt="${escapeHtml(a.title)}">` : ""}
      <p>${escapeHtml(a.summary||"")}</p>
      <div class="card-buttons">
        <button class="readMore button" data-id="${a.id}">Read more →</button>
        <button class="shareLink button" data-id="${a.id}">🔗 Share</button>
      </div>
    `;
    card.addEventListener("click", (e) => {
      if (!e.target.closest("button")) loadMarkdown(a.id, a.file);
    });
    container.appendChild(card);
  });

  relatedBox.appendChild(container);

  container.querySelectorAll(".readMore").forEach(btn => btn.addEventListener("click", (e)=>{ e.stopPropagation(); loadMarkdown(btn.dataset.id); }));
  container.querySelectorAll(".shareLink").forEach(btn => btn.addEventListener("click", (e)=>{ e.stopPropagation(); showSharePopup(btn.dataset.id); }));
}

/* SHARE POPUP - cross device copy fallback for iOS included */
function showSharePopup(articleId) {
  const url = `${location.origin}${location.pathname}#${articleId}`;
  const popup = document.getElementById("sharePopup");
  const input = document.getElementById("shareUrl");
  const fb = document.getElementById("facebookShare");
  const tw = document.getElementById("twitterShare");
  const rd = document.getElementById("redditShare");
  const copyBtn = document.getElementById("copyShareUrl");
  const closeBtn = document.getElementById("popupClose");

  input.value = url;
  fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  tw.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
  rd.href = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`;

  popup.style.display = "block";
  popup.setAttribute("aria-hidden", "false");

  closeBtn.onclick = ()=> { popup.style.display = "none"; popup.setAttribute("aria-hidden","true"); };

  // copy fallback - try navigator.clipboard; on iOS use selection + execCommand
  copyBtn.onclick = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // iOS and older fallback
        input.removeAttribute("readonly");
        input.focus();
        input.select();
        input.setSelectionRange(0, 99999);
        document.execCommand("copy");
        input.setAttribute("readonly", true);
      }
      copyBtn.textContent = "✅ Copied!";
      setTimeout(()=> copyBtn.textContent = "Copy", 1500);
    } catch (e) {
      alert("Copy failed -- please copy the link manually.");
    }
  };

  // clicking outside closes
  const onDocClick = (e) => {
    if (!popup.contains(e.target) && !e.target.classList.contains("shareLink")) {
      popup.style.display = "none";
      popup.setAttribute("aria-hidden","true");
      document.removeEventListener("click", onDocClick);
    }
  };
  setTimeout(()=> document.addEventListener("click", onDocClick), 10);
}

/* HELPERS */
function escapeHtml(s) {
  if (!s) return "";
  return s.replace(/[&<>"']/g, function(ch){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch]; });
}

// Parse YAML-like frontmatter (--- ... ---) into {meta: {}, content: ""}
// Very small parser sufficient for our frontmatter format (simple scalars and arrays)
function parseFrontmatter(text) {
  if (!text.startsWith("---")) return { meta: {}, content: text };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, content: text };
  const raw = text.substring(3, end+1);
  const rest = text.substring(end+4).trim();
  const lines = raw.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
  const meta = {};
  lines.forEach(line=>{
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) return;
    const key = line.substring(0, colonIdx).trim();
    let value = line.substring(colonIdx+1).trim();
    // arrays like categories: "A, B, C" or categories: [a,b]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value.substring(1,value.length-1).split(",").map(s=>s.trim().replace(/^"|"$/g,"").replace(/^'|'$/g,""));
    } else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1,value.length-1);
    } else if (value.includes(",") && !value.includes('"')) {
      // treat as comma list
      value = value.split(",").map(s=>s.trim());
    }
    meta[key] = value;
  });
  return { meta, content: rest };
}

/* SEARCH & CATEGORIES */
function setupSearch() {
  const searchBox = document.getElementById("searchBox");
  searchBox.addEventListener("input", ()=> {
    searchTerm = searchBox.value.toLowerCase();
    currentPage = 1;
    renderArticles();
  });
}

function applyCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat) activeCategory = cat;
}

/* INIT */
document.addEventListener("DOMContentLoaded", ()=>{
  initHeaderScripts();
  if (isIndex) loadArticles();
  // if hash present on load, try open article after index loads
  const hash = window.location.hash.substring(1);
  if (hash) {
    // wait for index to load and then open
    const waitForIndex = setInterval(()=> {
      if (allArticles && allArticles.length) {
        clearInterval(waitForIndex);
        const meta = allArticles.find(a=>a.id==hash);
        loadMarkdown(hash, meta && meta.file);
      }
    }, 200);
    setTimeout(()=> clearInterval(waitForIndex), 5000);
  }
});