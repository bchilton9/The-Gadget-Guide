/* main.js */
let currentPage = 1;
const articlesPerPage = 6;
let allArticles = [];
let activeCategory = "all";
let searchTerm = "";

const isIndex = /(?:^\/?$|\/index\.html|\/index\.php|\/)$/i.test(location.pathname) || location.pathname.endsWith('/');
const articlesIndexPath = "articles/index.html";

/* ---------- header scripts ---------- */
function initHeaderScripts() {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("open");
      }
    });
  }
}

/* ---------- helpers ---------- */
function parseFrontMatter(mdText) {
  // supports simple YAML front-matter between --- lines
  const fm = {};
  const fmMatch = mdText.match(/^---\n([\s\S]*?)\n---\n?/);
  let content = mdText;
  if (fmMatch) {
    const block = fmMatch[1];
    content = mdText.slice(fmMatch[0].length);
    block.split(/\r?\n/).forEach(line => {
      const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
      if (m) {
        const key = m[1].trim();
        let val = m[2].trim();
        // strip surrounding quotes
        val = val.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
        // allow comma-separated lists
        if (val.includes(',')) val = val.split(',').map(s => s.trim());
        fm[key] = val;
      }
    });
  }
  return {fm, content};
}

function slugFromFilename(fn) {
  return fn.replace(/\.md$/i, '');
}

/* ---------- load article list (from articles/index.html) ---------- */
async function loadArticlesIndex() {
  try {
    const res = await fetch(articlesIndexPath);
    if (!res.ok) throw new Error("Couldn't fetch articles index");
    const html = await res.text();
    // parse anchors: href="slug.md"
    const anchorRegex = /<a\s+href=["']([^"']+\.md)["'][^>]*>([^<]+)<\/a>/gi;
    const files = [];
    let m;
    while ((m = anchorRegex.exec(html)) !== null) {
      files.push({file: m[1], text: m[2]});
    }
    return files;
  } catch (err) {
    console.error("Failed to load articles index:", err);
    return [];
  }
}

/* ---------- fetch individual markdown and build metadata ---------- */
async function loadAllArticles() {
  const list = await loadArticlesIndex();
  const results = [];
  for (const item of list) {
    try {
      const res = await fetch(item.file);
      if (!res.ok) throw new Error(`Failed ${item.file}`);
      const md = await res.text();
      const {fm, content} = parseFrontMatter(md);
      // set fallback values
      const title = fm.title || item.text || (slugFromFilename(item.file)).replace(/[-_]/g, ' ');
      const summary = fm.summary || (content.split(/\n/).find(l => l.trim()) || '').slice(0, 200);
      const image = fm.image || '';
      const categories = Array.isArray(fm.categories) ? fm.categories : (fm.categories ? String(fm.categories).split(',').map(s => s.trim()) : []);
      const author = fm.author || '';
      const views = parseInt(fm.views || '0', 10) || 0;
      results.push({
        id: slugFromFilename(item.file),
        title,
        summary,
        image,
        categories,
        author,
        rawContent: content
      });
    } catch (err) {
      console.warn("Skipping article", item.file, err);
    }
  }
  // store globally
  allArticles = results;
}

/* ---------- rendering (list view) ---------- */
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
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `Page ${i}`;
    if (i===currentPage) opt.selected = true;
    select.appendChild(opt);
  }
  select.onchange = () => { currentPage = parseInt(select.value); renderArticles(); };

  const pageText = document.createElement("span");
  pageText.className = "pagination-text";
  pageText.textContent = `Page ${currentPage} of ${totalPages}`;

  pagination.appendChild(prev);
  pagination.appendChild(pageText);
  pagination.appendChild(next);
  pagination.appendChild(select);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderArticles() {
  const container = document.getElementById("articles");
  const articleContent = document.getElementById("articleContent");
  const pagination = document.getElementById("pagination");
  const searchBox = document.getElementById("searchBox");
  const welcomeBox = document.getElementById("welcomeBox");
  const backButton = document.getElementById("backButton");

  container.style.display = "block";
  articleContent.style.display = "none";
  if (searchBox) searchBox.style.display = "block";
  if (pagination) pagination.style.display = "flex";
  if (backButton) backButton.style.display = "none";
  if (welcomeBox) welcomeBox.style.display = "block";

  const filtered = allArticles.filter(a => {
    const inCategory = activeCategory === "all" || (a.categories || []).includes(activeCategory);
    const inSearch = !searchTerm || (a.title.toLowerCase().includes(searchTerm) || (a.summary||'').toLowerCase().includes(searchTerm));
    return inCategory && inSearch;
  });

  const start = (currentPage-1)*articlesPerPage;
  const pageArticles = filtered.slice(start, start+articlesPerPage);

  container.innerHTML = "";
  pageArticles.forEach(a => {
    const card = document.createElement("article");
    card.className = "article-card";
    card.setAttribute("data-id", a.id);
    card.setAttribute("data-categories", (a.categories||[]).join(','));
    card.innerHTML = `
      <h2>${a.title}</h2>
      ${a.image ? `<img src="${a.image}" alt="${a.title}">` : ''}
      <p>${a.summary}</p>
      <div class="card-buttons">
        <button data-id="${a.id}" class="readMore">Read more →</button>
        <button data-id="${a.id}" class="shareLink">🔗 Share</button>
      </div>
    `;
    // clicking the whole card opens article (except when clicking button)
    card.addEventListener("click", (e) => {
      if (!e.target.closest("button")) openArticle(a.id);
    });
    // read more
    card.querySelector(".readMore").addEventListener("click", (e)=> {
      e.stopPropagation();
      openArticle(a.id);
    });
    // share
    card.querySelector(".shareLink").addEventListener("click", (e) => {
      e.stopPropagation();
      showSharePopup(a.id);
    });

    container.appendChild(card);
  });

  renderPagination(filtered);
}

/* ---------- categories menu ---------- */
function renderCategoriesFromArticles() {
  const menuList = document.getElementById("articleList");
  if (!menuList) return;
  const allCats = new Set();
  allArticles.forEach(a => (a.categories||[]).forEach(c => allCats.add(c)));
  menuList.innerHTML = "";
  const allA = document.createElement("a");
  allA.href = "index.html?cat=all";
  allA.textContent = "All";
  allA.classList.toggle("active", activeCategory === "all");
  allA.addEventListener("click", (e)=> { e.preventDefault(); activeCategory = "all"; currentPage=1; renderArticles(); document.getElementById("navLinks")?.classList.remove("open"); });
  menuList.appendChild(allA);
  Array.from(allCats).sort().forEach(cat => {
    const a = document.createElement("a");
    a.href = `index.html?cat=${encodeURIComponent(cat)}`;
    a.textContent = cat;
    a.classList.toggle("active", activeCategory === cat);
    a.addEventListener("click", (e)=> { e.preventDefault(); activeCategory = cat; currentPage=1; renderArticles(); document.getElementById("navLinks")?.classList.remove("open"); });
    menuList.appendChild(a);
  });
}

/* ---------- open article (viewer) ---------- */
function openArticle(id) {
  // same as loadMarkdown but decoupled
  loadArticleById(id);
}

function loadArticleById(id) {
  const article = allArticles.find(a => a.id === id);
  if (!article) {
    alert("Article not found.");
    return;
  }
  // hide list
  document.getElementById("articles").style.display = "none";
  document.getElementById("searchBox").style.display = "none";
  document.getElementById("pagination").style.display = "none";
  document.getElementById("welcomeBox")?.style.setProperty("display", "none");

  const viewer = document.getElementById("articleContent");
  const mdHtml = marked(article.rawContent || '');
  viewer.innerHTML = `
    <div class="article-card">
      <h1>${article.title}</h1>
      ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ''}
      <div class="article-body">${mdHtml}</div>
      <div class="view-buttons">
        <button id="backButton" class="button">← Return to Home</button>
        <button id="shareButton" class="button" data-id="${article.id}">🔗 Share</button>
      </div>
    </div>
    <div id="relatedBox"></div>
  `;
  viewer.style.display = "block";
  viewer.classList.add("fade-in");
  setTimeout(()=> viewer.classList.remove("fade-in"), 400);

  // back
  document.getElementById("backButton").onclick = () => {
    window.location.hash = "";
    renderArticles();
  };
  // share
  document.getElementById("shareButton").addEventListener("click", (e)=> {
    e.stopPropagation();
    showSharePopup(article.id);
  });

  // related articles: find articles that share categories, exclude current
  const related = allArticles.filter(a => a.id !== id && (a.categories||[]).some(c => (article.categories||[]).includes(c)));
  if (related.length) {
    const box = document.getElementById("relatedBox");
    box.innerHTML = ''; // clear
    const container = document.createElement("div");
    container.id = "relatedBoxContainer";
    container.innerHTML = `<h3 class="related-title">🔗 Related Articles</h3>`;
    // render each as same article-card look
    related.slice(0,6).forEach(r => {
      const card = document.createElement("article");
      card.className = "article-card";
      card.setAttribute("data-id", r.id);
      card.innerHTML = `
        <h2>${r.title}</h2>
        ${r.image ? `<img src="${r.image}" alt="${r.title}">` : ''}
        <p>${r.summary}</p>
        <div class="card-buttons">
          <button class="readMore">Read more →</button>
          <button class="shareLink">🔗 Share</button>
        </div>
      `;
      // clicking card opens
      card.addEventListener("click", (e) => {
        if (!e.target.closest("button")) loadArticleById(r.id);
      });
      // read more button
      card.querySelector('.readMore').addEventListener('click', (e)=> { e.stopPropagation(); loadArticleById(r.id); });
      // share button
      card.querySelector('.shareLink').addEventListener('click', (e)=> { e.stopPropagation(); showSharePopup(r.id); });
      container.appendChild(card);
    });
    box.appendChild(container);
  }
  window.location.hash = id;
}

/* ---------- share popup behavior (works on iOS) ---------- */
function showSharePopup(articleId) {
  const url = `${location.origin}${location.pathname.replace(/(index|article)\.html$/i,'') || ''}#${articleId}`;
  const popup = document.getElementById("sharePopup");
  if (!popup) return;
  const input = document.getElementById("shareUrl");
  const fb = document.getElementById("facebookShare");
  const tw = document.getElementById("twitterShare");
  const rd = document.getElementById("redditShare");
  input.value = url;
  fb.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  tw.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
  rd.href = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}`;

  // show
  popup.style.display = 'block';

  // copy button (works on iOS -- uses selection + execCommand fallback)
  const copyBtn = document.getElementById("copyShareUrl");
  copyBtn.onclick = () => {
    // ensure input selectable
    input.removeAttribute('readonly');
    input.focus();
    input.select();
    try {
      const ok = document.execCommand('copy');
      if (ok) {
        copyBtn.textContent = "✅ Copied!";
        setTimeout(()=> copyBtn.textContent = "Copy", 1500);
      } else {
        // fallback alert
        alert("Copy failed -- please long-press the URL to copy on your device.");
      }
    } catch (err) {
      alert("Copy not supported -- please manually copy the URL.");
    }
    input.setAttribute('readonly', true);
    window.getSelection().removeAllRanges();
  };

  // close when clicking close button
  document.getElementById("popupClose").onclick = () => popup.style.display = 'none';

  // close when clicking outside
  function closeHandler(e) {
    if (!popup.contains(e.target) && !e.target.classList.contains('shareLink')) {
      popup.style.display = 'none';
      document.removeEventListener('click', closeHandler);
    }
  }
  setTimeout(()=> document.addEventListener('click', closeHandler), 50);
}

/* ---------- search and setup ---------- */
function setupSearch() {
  const searchBox = document.getElementById("searchBox");
  if (!searchBox) return;
  searchBox.addEventListener("input", () => {
    searchTerm = searchBox.value.toLowerCase();
    currentPage = 1;
    renderArticles();
  });
}

/* ---------- main init ---------- */
async function init() {
  // load header/footer
  try {
    const h = await fetch('header.html'); if (h.ok) document.getElementById('header-placeholder').innerHTML = await h.text();
    const f = await fetch('footer.html'); if (f.ok) document.getElementById('footer-placeholder').innerHTML = await f.text(); 
    initHeaderScripts();
  } catch (err) {
    console.warn("header/footer not loaded", err);
  }

  // fetch articles
  await loadAllArticles();
  renderCategoriesFromArticles();
  setupSearch();

  // show welcome message
  try {
    const res = await fetch('articles/welcome.md');
    if (res.ok) {
      const md = await res.text();
      const {fm, content} = parseFrontMatter(md);
      const el = document.getElementById('welcomeBox');
      if (el) el.innerHTML = marked(content);
    }
  } catch (e) { /* ignore */ }

  // route: direct slug ?slug=filename
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug') || window.location.hash.replace('#','');
  if (slug) {
    // delay slightly to allow render
    setTimeout(()=> loadArticleById(slug), 300);
    return;
  }

  // otherwise render list on index pages
  if (isIndex) renderArticles();
}

document.addEventListener("DOMContentLoaded", init);