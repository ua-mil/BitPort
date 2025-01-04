// Firebase конфигурация (замените на свою из Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDVjmPF0S2FEqt2vr0YD5Yn3_WPtDc0NUQ",
  authDomain: "crypto-port-3ea0b.firebaseapp.com",
  projectId: "crypto-port-3ea0b",
  storageBucket: "crypto-port-3ea0b.firebasestorage.app",
  messagingSenderId: "183488303476",
  appId: "1:183488303476:web:e77c9b244bc1fb2c599c21",
  measurementId: "G-MXXERGB8T0"
};


// Инициализация Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// Регистрация пользователя
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('authMessage').textContent = 'Успешно зарегистрирован!';
            showPortfolio();
        })
        .catch(error => {
            document.getElementById('authMessage').textContent = `Ошибка: ${error.message}`;
        });
}

// Вход пользователя
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('authMessage').textContent = 'Успешный вход!';
            showPortfolio();
        })
        .catch(error => {
            document.getElementById('authMessage').textContent = `Ошибка: ${error.message}`;
        });
}

// Выход пользователя
function logout() {
    auth.signOut().then(() => {
        document.getElementById('portfolio').style.display = 'none';
        document.getElementById('auth').style.display = 'block';
        document.getElementById('authMessage').textContent = 'Вы вышли из системы.';
    });
}

// Отображение портфеля
function showPortfolio() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('portfolio').style.display = 'block';
    loadPortfolio();
}

// Сохранение данных портфеля
function savePortfolio() {
    const user = auth.currentUser;
    const quantity = document.getElementById('btcQuantity').value;
    const purchasePrice = document.getElementById('btcPurchasePrice').value;

    if (user) {
        const portfolioData = { quantity, purchasePrice };
        database.ref('users/' + user.uid + '/portfolio').set(portfolioData)
            .then(() => alert('Данные сохранены!'))
            .catch(error => alert('Ошибка сохранения данных: ' + error.message));
    }
}

// Загрузка данных портфеля
function loadPortfolio() {
    const user = auth.currentUser;

    if (user) {
        database.ref('users/' + user.uid + '/portfolio').once('value')
            .then(snapshot => {
                const data = snapshot.val();
                if (data) {
                    document.getElementById('btcQuantity').value = data.quantity;
                    document.getElementById('btcPurchasePrice').value = data.purchasePrice;
                    updatePortfolio();
                }
            })
            .catch(error => console.error('Ошибка загрузки данных: ', error));
    }
}

// Функция для обновления данных портфеля (с текущей ценой)
async function updatePortfolio() {
    const quantity = parseFloat(document.getElementById('btcQuantity').value);
    const purchasePrice = parseFloat(document.getElementById('btcPurchasePrice').value);
    const currentPrice = await fetchCurrentPrice();

    if (isNaN(quantity) || isNaN(purchasePrice) || !currentPrice) {
        return;
    }

    const total = quantity * currentPrice;
    const profit = total - (quantity * purchasePrice);

    document.getElementById('btcTotal').textContent = total.toFixed(2);
    document.getElementById('btcProfit').textContent = profit.toFixed(2);
}

// Получение текущей цены Биткойна
async function fetchCurrentPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        return data.bitcoin.usd;
    } catch (error) {
        console.error('Ошибка получения цены: ', error);
        return null;
    }
}

// Проверка авторизации при загрузке
auth.onAuthStateChanged(user => {
    if (user) {
        showPortfolio();
    }
});
