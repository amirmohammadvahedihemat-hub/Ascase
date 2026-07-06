/* ============================================================
   ASCASE V2 — Advanced Features
   Dark Mode, Live Search, Wishlist, Animations, Smart Cart
   ============================================================ */

/* Dark Mode Toggle */
const darkModeToggle = document.querySelector('.dark-toggle');
const html = document.documentElement;

function initDarkMode(){
  const saved = localStorage.getItem('ascase-dark-mode');
  if(saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    html.classList.add('dark-mode');
  }
}

if(darkModeToggle){
  darkModeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    localStorage.setItem('ascase-dark-mode', html.classList.contains('dark-mode'));
  });
}

/* Intersection Observer for reveal animations */
const observerOptions = { threshold: .15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in-view');
      observer.unobserve(e.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* Live Search */
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');

if(searchInput && PRODUCTS){
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if(query.length < 2){
      searchResults?.classList.remove('open');
      return;
    }
    const matches = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.cat.toLowerCase().includes(query)
    ).slice(0, 6);

    if(matches.length){
      searchResults.innerHTML = matches.map(p => `
        <a href="product.html?id=${p.id}" class="search-item">
          <div style="font-weight:600;font-size:.9rem;">${p.name}</div>
          <div style="font-size:.75rem;color:var(--text-secondary);">
            ${categoryTitle(p.cat)} — ${fmtPrice(p.price)}
          </div>
        </a>
      `).join('');
      searchResults?.classList.add('open');
    }
  });

  document.addEventListener('click', (e) => {
    if(!e.target.closest('.search-container')){
      searchResults?.classList.remove('open');
    }
  });
}

/* Wishlist (LocalStorage) */
const WISHLIST_KEY = 'ascase-wishlist';

function getWishlist(){
  try{ return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || []; }
  catch{ return []; }
}

function saveWishlist(list){
  try{ localStorage.setItem(WISHLIST_KEY, JSON.stringify(list)); }catch(e){}
}

function toggleWishlist(productId){
  const list = getWishlist();
  const idx = list.indexOf(productId);
  if(idx > -1) list.splice(idx, 1);
  else list.push(productId);
  saveWishlist(list);
  updateWishlistUI();
}

function isWishlisted(productId){
  return getWishlist().includes(productId);
}

function updateWishlistUI(){
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    const id = btn.dataset.productId;
    if(isWishlisted(id)){
      btn.classList.add('liked');
      btn.innerHTML = '❤️';
    } else {
      btn.classList.remove('liked');
      btn.innerHTML = '🤍';
    }
  });
}

/* Header scroll effect */
const header = document.querySelector('.site-header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  lastScroll = window.scrollY;
  if(lastScroll > 50){
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

/* Toast notification */
function showToast(msg){
  let toast = document.querySelector('.toast');
  if(!toast){
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-dot"></span><span>${msg}</span>`;
    document.body.appendChild(toast);
  } else {
    toast.querySelector('span:last-child').textContent = msg;
  }
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* Cart */
const CART_KEY = 'ascase-cart-v2';

function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch{ return []; }
}

function saveCart(cart){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){}
  updateCartBadge();
}

function addToCart(productId, qty = 1){
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if(existing) existing.qty += qty;
  else cart.push({ id: productId, qty });
  saveCart(cart);
  showToast(`${qty} محصول به سبد اضافه شد`);
}

function updateCartBadge(){
  const badge = document.querySelector('.badge');
  if(badge){
    const count = getCart().reduce((s,i) => s + i.qty, 0);
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

/* Initialize on load */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  updateWishlistUI();
  updateCartBadge();
});

/* Product card rendering */
function renderProductCard(p){
  const wishlisted = isWishlisted(p.id);
  const oldPrice = p.oldPrice ? `<span class="price-old">${fmtPrice(p.oldPrice)}</span>` : '';
  const badge = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
  const specs = p.specs.map(s => `<span class="spec-tag">${s[0]}</span>`).join('');
  
  return `
  <article class="product-card reveal">
    <a href="product.html?id=${p.id}" class="product-media">
      ${badge}
      <button class="wishlist-btn" data-product-id="${p.id}" onclick="event.preventDefault(); event.stopPropagation(); toggleWishlist('${p.id}')">
        ${wishlisted ? '❤️' : '🤍'}
      </button>
      ${svgIcon(p.icon, p.accent)}
    </a>
    <div class="product-body">
      <span class="product-cat">${categoryTitle(p.cat)}</span>
      <a href="product.html?id=${p.id}"><h3 class="product-name">${p.name}</h3></a>
      <div class="product-specs">${specs}</div>
      <div class="product-footer">
        <span class="price">${oldPrice}${fmtPrice(p.price)}</span>
        <button class="add-to-cart-btn" onclick="addToCart('${p.id}',1); return false;" aria-label="افزودن به سبد">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </article>`;
}

function renderProducts(list, selector){
  const el = document.querySelector(selector);
  if(!el) return;
  if(!list.length){
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;">
      <p style="color:var(--text-secondary);margin:0;">محصولی پیدا نشد</p>
    </div>`;
    return;
  }
  el.innerHTML = list.map(renderProductCard).join('');
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* Auto-update cart badge on visibility change */
document.addEventListener('visibilitychange', updateCartBadge);
