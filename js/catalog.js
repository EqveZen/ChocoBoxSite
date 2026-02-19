fetch('data/catalog.json')
  .then(res => res.json())
  .then(data => {
    renderCategories(data.categories);
    renderProducts(data.products);
  })
  .catch(err => console.error('Ошибка каталога:', err));

const categoriesEl = document.getElementById('categories');
const productsEl = document.getElementById('products');

let allProducts = [];

/* ===== КАТЕГОРИИ ===== */
function renderCategories(categories) {
  categoriesEl.innerHTML = '';

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

/* ===== ТОВАРЫ ===== */
function renderProducts(products) {
  allProducts = products;
  productsEl.innerHTML = '';
  products.forEach(createCard);
}

/* ===== КАРТОЧКА ===== */
function createCard(product) {
  const card = document.createElement('div');
  card.className = 'dessert-card fade-up';

  const mainImage = product.images?.[0] || '';

  let badgesHTML = '';
  if (product.badges?.includes('hit')) {
    badgesHTML += `<span class="badge hit">ХИТ</span>`;
  }
  if (product.badges?.includes('new')) {
    badgesHTML += `<span class="badge new">NEW</span>`;
  }

  let priceHTML = `<span class="price">${product.price} ₽</span>`;
  if (product.oldPrice) {
    priceHTML = `
      <span class="price old">${product.oldPrice} ₽</span>
      <span class="price new">${product.price} ₽</span>
    `;
  }

  card.innerHTML = `
    ${badgesHTML}
    <img src="${mainImage}" alt="${product.title}">
    <div class="card-info">
      <h3>${product.title}</h3>
      ${product.description ? `<p class="card-desc">${product.description}</p>` : ``}
      ${priceHTML}
      <button class="btn-neon add-to-cart">В корзину</button>
    </div>
  `;

  if (product.images && product.images.length > 1) {
    card.addEventListener('mouseenter', () => {
      card.querySelector('img').src = product.images[1];
    });
    card.addEventListener('mouseleave', () => {
      card.querySelector('img').src = product.images[0];
    });
  }

  card.querySelector('.add-to-cart').onclick = () => addToCart(product);

  productsEl.appendChild(card);
  setTimeout(() => card.classList.add('visible'), 100);
}

/* ===== ФИЛЬТР ===== */
function filterProducts(category) {
  productsEl.innerHTML = '';
  const filtered = category === 'all'
    ? allProducts
    : allProducts.filter(p => p.category === category);
  filtered.forEach(createCard);
}
