fetch('data/catalog.json')
  .then(res => res.json())
  .then(data => {
    renderCategories(data.categories);
    renderProducts(data.products);
  });

const categoriesEl = document.getElementById('categories');
const productsEl = document.getElementById('products');

function renderCategories(categories) {
  const allBtn = document.createElement('button');
  allBtn.textContent = 'Все';
  allBtn.className = 'btn-neon';
  allBtn.onclick = () => filterProducts('all');
  categoriesEl.appendChild(allBtn);

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat.title;
    btn.className = 'btn-neon';
    btn.onclick = () => filterProducts(cat.id);
    categoriesEl.appendChild(btn);
  });
}

let allProducts = [];

function renderProducts(products) {
  allProducts = products;
  productsEl.innerHTML = '';
  products.forEach(createCard);
}

function createCard(product) {
  const card = document.createElement('div');
  card.className = 'dessert-card fade-up';

  let priceHTML = `<span class="price">${product.price} ₽</span>`;
  let badgeHTML = '';

  if (product.oldPrice) {
    priceHTML = `
      <span class="price old">${product.oldPrice} ₽</span>
      <span class="price new">${product.price} ₽</span>
    `;
    badgeHTML = `<span class="badge">SALE</span>`;
  }

  card.innerHTML = `
    ${badgeHTML}
    <img src="${product.image}">
    <div class="card-info">
      <h3>${product.title}</h3>
      ${priceHTML}
      <button class="btn-neon" style="margin-top:16px;">В корзину</button>
    </div>
  `;

  card.querySelector('button').onclick = () => addToCart(product);

  productsEl.appendChild(card);
  setTimeout(() => card.classList.add('visible'), 100);
}


function filterProducts(category) {
  productsEl.innerHTML = '';
  const filtered = category === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === category);

  filtered.forEach(createCard);
}
