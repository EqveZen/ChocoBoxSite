fetch('data/news.json')
  .then(res => res.json())
  .then(data => renderNews(data.news))
  .catch(err => console.error('Ошибка загрузки новостей:', err));

function renderNews(news) {
  const grid = document.getElementById('news-grid');
  if (!grid) return;

  news.forEach(item => {
    const card = document.createElement('div');
    card.className = 'news-card fade-up';

    card.innerHTML = `
      <img src="${item.image}" alt="news">
    `;

    card.addEventListener('click', () => {
      window.location.href = item.link;
    });

    grid.appendChild(card);

    setTimeout(() => {
      card.classList.add('visible');
    }, 100);
  });
}
