const PORT = 3000;
const DOCROOT = '../dist';

// 1. Подключить нужные модули http, express, path
const http = require('http');
const path = require('path');
const express = require('express');
const sockets = require('./sockets');

// 2. Создать серевер, используя express и http
const app = express();
const server = http.createServer(app);

// 3. Настроить отдачу игры при запросе к серверу

const documentRoot = path.join(__dirname, DOCROOT);
staticContent = express.static(documentRoot);
app.use(staticContent);

// 4. Инициализируем сокеты
sockets.init(server);

// 5. Запускаем сервер
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
