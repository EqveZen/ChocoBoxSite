const BOT_TOKEN = '8458450154:AAFYKHTl3OLmG8dYo65SgLkmuzQMXypSa_Q';
const CHAT_ID = '511815061';

function sendOrder(name, phone, date, time, comment, deliveryType, address) {
  const cart = getCart();
  if (cart.length === 0) return;

  let message = `🛒 *Новый заказ ChocoBox*\n\n`;
  message += `👤 Имя: ${name}\n`;
  message += `📞 Телефон: ${phone}\n`;
  message += `📅 Дата: ${date}\n`;
  message += `⏰ Время: ${time}\n`;
  message += `📦 Получение: ${deliveryType === 'delivery' ? 'Доставка' : 'Самовывоз'}\n`;

  if (deliveryType === 'delivery' && address) {
    message += `📍 Адрес: ${address}\n`;
  }

  if (comment.trim()) {
    message += `💬 Комментарий: ${comment}\n`;
  }

  message += `\n🍫 *Заказ:*\n`;

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    message += `• ${item.title} × ${item.qty} — ${item.price * item.qty} ₽\n`;
  });

  message += `\n💰 *Итого:* ${total} ₽`;

  fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  }).then(() => {
    localStorage.removeItem('chocobox_cart');
    alert('Заявка отправлена!');
    window.location.href = 'index.html';
  });
}
