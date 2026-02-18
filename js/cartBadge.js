const badge = document.getElementById('cart-count');

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('chocobox_cart')) || [];
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  if (totalQty > 0) {
    badge.textContent = totalQty;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

updateCartBadge();
window.addEventListener('storage', updateCartBadge);
