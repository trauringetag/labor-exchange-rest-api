const express = require('express');
const cors = require('cors');

const app = express();
const corsOptions = { origin: '*' };

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
    res.json({
        title: 'REST API',
        db_services: '/api/services',
        db_working_mode: '/api/working_mode',
        db_situation_labor_market: '/api/situation_labor_market',
        db_articles: '/api/articles',
        db_email_storage: '/api/email_storage',
        db_reception: '/api/reception',
        db_accounts: '/api/accounts'
    });
});

require('./app/routes/services.routes')(app);
require('./app/routes/working_mode.routes')(app);
require('./app/routes/situation_labor_market.routes')(app);
require('./app/routes/articles.routes')(app);
require('./app/routes/email_storage.routes')(app);
require('./app/routes/reception.routes')(app);
require('./app/routes/accounts.routes')(app);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Сервер работает по адресу: http://localhost:${PORT}`);
});