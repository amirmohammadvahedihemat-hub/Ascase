/* ============================================================
   ASCASE — shared site behavior
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if(toggle && nav){
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  // mark active nav link
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(a => {
    if(a.getAttribute("href") === path) a.classList.add("active");
  });

  // reveal-on-scroll for elements marked .reveal
  const revealEls = document.querySelectorAll(".reveal");
  if(revealEls.length && "IntersectionObserver" in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .14 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }
});

/* ---------- render a grid of product cards into a container ---------- */
function renderProductCard(p){
  const oldPriceHtml = p.oldPrice ? `<del class="mono">${fmtPrice(p.oldPrice)}</del>` : "";
  const badgeHtml = p.badge ? `<span class="badge">${p.badge}</span>` : "";
  const specsHtml = p.specs.map(s => `<span>${s[0]} ${s[1]}</span>`).join("");
  return `
  <article class="product-card reveal">
    <a href="product.html?id=${p.id}" class="product-media">
      ${badgeHtml}
      ${svgIcon(p.icon, p.accent)}
    </a>
    <div class="product-body">
      <span class="product-cat mono">${categoryTitle(p.cat)}</span>
      <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
      <div class="product-specs">${specsHtml}</div>
      <div class="product-foot">
        <span class="price mono">${oldPriceHtml}${fmtPrice(p.price)}<small>تومان</small></span>
        <button class="add-btn" aria-label="افزودن به سبد" onclick="addToCart('${p.id}',1)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

function renderProducts(list, containerSelector){
  const el = document.querySelector(containerSelector);
  if(!el) return;
  if(!list.length){
    el.innerHTML = `<div class="empty-state">
      <p>محصولی در این دسته پیدا نشد.</p>
      <p class="mono">NO_RESULTS</p>
    </div>`;
    return;
  }
  el.innerHTML = list.map(renderProductCard).join("");
}
