// Функция для получения текущей цены Биткойна
async function fetchCurrentPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const btcPrice = data.bitcoin.usd; // Текущая цена BTC в USD

        // Обновление текущей цены в DOM
        document.getElementById('btcCurrentPrice').textContent = btcPrice.toFixed(2);
        return btcPrice;
    } catch (error) {
        console.error('Ошибка получения текущей цены:', error);
        alert('Не удалось загрузить текущую цену. Попробуйте позже.');
        return null;
    }
}

// Функция для обновления данных портфеля
async function updatePortfolio() {
    const quantity = parseFloat(document.getElementById('btcQuantity').value);
    const purchasePrice = parseFloat(document.getElementById('btcPurchasePrice').value);
    const currentPrice = await fetchCurrentPrice();

    if (isNaN(quantity) || isNaN(purchasePrice) || currentPrice === null) {
        alert('Пожалуйста, введите корректные данные.');
        return;
    }

    const total = quantity * currentPrice;
    const profit = total - (quantity * purchasePrice);

    document.getElementById('btcTotal').textContent = total.toFixed(2);
    document.getElementById('btcProfit').textContent = profit.toFixed(2);
}

// Калькулятор Биткойна
function calculateBTC() {
    const btcAmount = parseFloat(document.getElementById('btcAmount').value);
    const btcRate = parseFloat(document.getElementById('btcRate').value);

    if (isNaN(btcAmount) || isNaN(btcRate)) {
        document.getElementById('calcResult').textContent = 'Введите корректные данные.';
        return;
    }

    const result = btcAmount * btcRate;
    document.getElementById('calcResult').textContent = `Результат: ${result.toFixed(2)} USD`;
}

// Инициализация: обновляем портфель при загрузке страницы
window.onload = updatePortfolio;
