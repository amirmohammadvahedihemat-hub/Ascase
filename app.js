/* ASCASE PRO - Production Ready JS */

const PRODUCTS_DATA = [
  { id: 1, name: 'کاور آرمور', cat: 'کاور', price: 289000, old: 349000, badge: 'پرفروش', specs: ['DROP 2.4m', '1.1mm'] },
  { id: 2, name: 'کاور شفاف', cat: 'کاور', price: 129000, specs: ['DROP 1.5m', '0.9mm'] },
  { id: 3, name: 'کاور چرمی', cat: 'کاور', price: 349000, badge: 'جدید', specs: ['DROP 1.8m', '1.0mm'] },
  { id: 4, name: 'گوشی X12', cat: 'موبایل', price: 48900000, badge: 'پرفروش', specs: ['8GB', '256GB'] },
  { id: 5, name: 'گوشی Nova', cat: 'موبایل', price: 21900000, specs: ['6GB', '128GB'] },
  { id: 6, name: 'محافظ صفحه', cat: 'محافظ', price: 99000, specs: ['9H', '99.9%'] },
  { id: 7, name: 'شارژر 30W', cat: 'شارژر', price: 289000, badge: 'پرفروش', specs: ['PD', '100W'] },
  { id: 8, name: 'ایرپاد', cat: 'صوت', price: 1290000, specs: ['ANC', '28h'] },
  { id: 9, name: 'پاوربانک 20000', cat: 'پاوربانک', price: 990000, badge: 'جدید', specs: ['20000mA', '22.5W'] },
  { id: 10, name: 'کاور استند', cat: 'کاور', price: 319000, specs: ['STAND', 'MAGNET'] },
  { id: 11, name: 'کاور رنگی', cat: 'کاور', price: 179000, specs: ['رنگی', 'سیلیکون'] },
  { id: 12, name: 'گلاس 9H', cat: 'محافظ', price: 79000, specs: ['9H', 'EDGE'] },
];

// DOM Elements
const header = document.querySelector('.header');
const darkToggle = document.querySelector('.dark-toggle');
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');
const cartBtn = document.querySelector('[data-cart-btn]');
const cartBadge = document.querySelector('.icon-btn .badge');

// Dark Mode
function initDarkMode() {
  const isDark = localStorage.getItem('ascase-dark') === 'true';
  if (isDark) document.documentElement.classList.add('dark');
}

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('ascase-dark', isDark);
  });
}

// Header Scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Cart Management
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('ascase-cart')) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem('ascase-cart', JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {}
}

function addToCart(id, qty = 1) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += qty;
  } else {
    cart.push({ id, qty });
  }
  saveCart(cart);
  showToast('به سبد اضافه شد ✓');
}

function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.qty, 0);
  if (cartBadge) {
    cartBadge.textContent = count;
    cartBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

// Live Search
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 2) {
      searchResults.classList.remove('active');
      return;
    }
    
    const matches = PRODUCTS_DATA.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    ).slice(0, 6);
    
    if (matches.length) {
      searchResults.innerHTML = matches.map(p => `
        <a href="#product-${p.id}" class="search-item">
          <div style="font-weight: 600; font-size: 14px;">${p.name}</div>
          <div style="font-size: 12px; color: var(--text-light);">${p.cat} — ${(p.price).toLocaleString('fa-IR')}</div>
        </a>
      `).join('');
      searchResults.classList.add('active');
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) {
      searchResults.classList.remove('active');
    }
  });
}

// Toast Notification
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 2500);
}

// Wishlist
function toggleWishlist(id) {
  const wishlist = JSON.parse(localStorage.getItem('ascase-wishlist') || '[]');
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem('ascase-wishlist', JSON.stringify(wishlist));
  updateWishlistUI(id);
}

function isWishlisted(id) {
  const wishlist = JSON.parse(localStorage.getItem('ascase-wishlist') || '[]');
  return wishlist.includes(id);
}

function updateWishlistUI(id) {
  const btn = document.querySelector(`[data-like-btn="${id}"]`);
  if (btn) {
    btn.textContent = isWishlisted(id) ? '❤️' : '🤍';
  }
}

// Render Product Card
function renderProductCard(p) {
  const wishlisted = isWishlisted(p.id);
  const oldPrice = p.old ? `<span class="price-old">${(p.old).toLocaleString('fa-IR')}</span>` : '';
  const badge = p.badge ? `<div class="product-badge">${p.badge}</div>` : '';
  const specs = p.specs.map(s => `<span class="spec">${s}</span>`).join('');
  
  return `
  <div class="product" id="product-${p.id}">
    <div class="product-image">
      ${badge}
      <button class="product-like" data-like-btn="${p.id}" onclick="toggleWishlist(${p.id})">
        ${wishlisted ? '❤️' : '🤍'}
      </button>
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="6" width="92" height="108" rx="16" stroke="var(--primary)" stroke-width="2" fill="none"/>
      </svg>
    </div>
    <div class="product-info">
      <span class="product-cat">${p.cat}</span>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-specs">${specs}</div>
      <div class="product-footer">
        <span class="price">${oldPrice}${(p.price).toLocaleString('fa-IR')}</span>
        <button class="cart-btn" onclick="addToCart(${p.id})" title="افزودن به سبد">
          +
        </button>
      </div>
    </div>
  </div>`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  updateCartBadge();
});
