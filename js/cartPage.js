const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

function renderCart() {
  const cart = getCart();
  cartItemsEl.innerHTML = '';

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p>Корзина пуста</p>';
    cartTotalEl.textContent = '';
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement('div');
    div.style = 'display:flex; justify-content:space-between; margin-bottom:20px;';

    div.innerHTML = `
      <div>
        <strong>${item.title}</strong><br>
        ${item.price} ₽ × ${item.qty}
      </div>
      <button onclick="removeFromCart(${item.id})">✕</button>
    `;

    cartItemsEl.appendChild(div);
  });

  cartTotalEl.textContent = `Итого: ${total} ₽`;
}

renderCart();

function submitOrder() {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const comment = document.getElementById('comment').value;
  const address = deliveryType === 'delivery'
    ? document.getElementById('address').value
    : null;

  sendOrder(name, phone, date, time, comment, deliveryType, address);
}


let deliveryType = 'delivery';

const addressGroup = document.getElementById('address-group');
const addressInput = document.getElementById('address');

document.querySelectorAll('.delivery-option').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.delivery-option')
      .forEach(b => b.classList.remove('active'));

    btn.classList.add('active');
    deliveryType = btn.dataset.type;

    if (deliveryType === 'pickup') {
      addressGroup.classList.add('hidden');
      addressInput.value = '';
    } else {
      addressGroup.classList.remove('hidden');
    }
  });
});
