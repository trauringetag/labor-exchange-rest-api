const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = { origin: 'http://localhost:8081' };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models');

db.sequelize.sync().then(() => {
    console.log('База данных синхронизирована');
}).catch(err => {
    console.log(`Не удалось синхронизировать базу данных: ${err.message}`);
});

app.get('/', (req, res) => {
    res.json({ response: "REST API для веб-сервиса биржи труда" });
});

require('./app/routes/tutorial.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Сервер работает по адресу: http://localhost:${PORT}`);
});