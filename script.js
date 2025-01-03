/* Основные стили */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

header {
    background-color: #333;
    color: #fff;
    padding: 15px 20px;
    text-align: center;
}

header h1 {
    margin: 0;
    font-size: 24px;
}

nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    font-size: 16px;
}

nav a:hover {
    text-decoration: underline;
}

main {
    padding: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

table th,
table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

table th {
    background-color: #f4f4f4;
    font-weight: bold;
}

input[type="number"] {
    width: 80%;
    padding: 5px;
    font-size: 14px;
}

button {
    padding: 15px 20px;
    margin-top: 20px;   /* Увеличен отступ сверху */
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #0056b3;
}

footer {
    text-align: center;
    padding: 10px;
    background-color: #f4f4f4;
    margin-top: 20px;
}

/* Адаптация для Android-устройств и небольших экранов */
@media (max-width: 768px) {
    header {
        text-align: left;
        padding: 15px;
    }

    nav {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }

    main {
        padding: 10px;
    }

    table th,
    table td {
        font-size: 12px;
        padding: 5px;
    }

    input[type="number"] {
        width: 90%;
        font-size: 12px;
    }

    button {
        width: 100%;
        font-size: 14px;
    }

    footer {
        font-size: 12px;
    }
}

/* Адаптация для очень маленьких экранов */
@media (max-width: 480px) {
    header h1 {
        font-size: 20px;
    }

    nav a {
        font-size: 14px;
    }

    table th,
    table td {
        font-size: 10px;
    }

    button {
        font-size: 12px;
    }
    }
