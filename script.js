// Функция для получения текущей цены Биткойна
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const btcPrice = data.bitcoin.usd; // Текущая цена BTC в USD

        // Обновление данных в таблице
        const btcQuantity = 0.5; // Количество BTC
        const btcPurchasePrice = 30000; // Цена покупки одного BTC

        const currentTotal = btcQuantity * btcPrice;
        const purchaseTotal = btcQuantity * btcPurchasePrice;
        const profit = currentTotal - purchaseTotal;

        // Обновление DOM
        document.getElementById('btcCurrentPrice').textContent = btcPrice.toFixed(2);
        document.getElementById('btcTotal').textContent = currentTotal.toFixed(2);
        document.getElementById('btcProfit').textContent = profit.toFixed(2);

        // Обновляем цену покупки для наглядности
        document.getElementById('btcPurchasePrice').textContent = btcPurchasePrice.toFixed(2);
    } catch (error) {
        console.error('Ошибка получения данных о криптовалюте:', error);
    }
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

// Инициализация данных портфеля
window.onload = fetchCryptoPrices;
