/* ============================================================
   ASCASE — cart logic (localStorage)
   Works once the site is hosted/opened normally in a browser.
   Note: inside an in-chat preview sandbox, localStorage may be
   blocked — test after uploading the files to real hosting.
   ============================================================ */

const CART_KEY = "ascase_cart_v1";

function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){ return []; }
}

function saveCart(cart){
  try{ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }catch(e){}
  updateCartCount();
}

function addToCart(productId, qty){
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if(existing){ existing.qty += qty; }
  else{ cart.push({ id: productId, qty: qty }); }
  saveCart(cart);
  showToast("به سبد خرید اضافه شد");
}

function removeFromCart(productId){
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}

function setQty(productId, qty){
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if(!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function cartCount(){
  return getCart().reduce((sum,i) => sum + i.qty, 0);
}

function cartTotal(){
  const cart = getCart();
  let total = 0;
  cart.forEach(i => {
    const p = PRODUCTS.find(p => p.id === i.id);
    if(p) total += p.price * i.qty;
  });
  return total;
}

function updateCartCount(){
  document.querySelectorAll(".cart-count").forEach(el => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
  });
}

function showToast(msg){
  let toast = document.querySelector(".toast");
  if(!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="dot"></span><span class="msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector(".msg").textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("DOMContentLoaded", updateCartCount);
