const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const seedDatabase = require('./app/seeders/seed');

const app = express();

const corsOptions = { origin: '*' };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        title: 'REST API Биржи Труда',
        endpoints: {
            roles: '/api/roles',
            accounts: '/api/accounts',
            departments: '/api/departments',
            services: '/api/services',
            working_mode: '/api/working_mode',
            situation_labor_market: '/api/situation_labor_market',
            articles: '/api/articles',
            email_storage: '/api/email_storage',
            categories: '/api/categories',
            social_statuses: '/api/social_statuses',
            reception: '/api/reception'
        }
    });
});

require('./app/routes/roles.routes')(app);
require('./app/routes/accounts.routes')(app);
require('./app/routes/departments.routes')(app);
require('./app/routes/services.routes')(app);
require('./app/routes/working_mode.routes')(app);
require('./app/routes/situation_labor_market.routes')(app);
require('./app/routes/articles.routes')(app);
require('./app/routes/email_storage.routes')(app);
require('./app/routes/categories.routes')(app);
require('./app/routes/social_statuses.routes')(app);
require('./app/routes/reception.routes')(app);

const PORT = process.env.PORT || 8080;

async function start() {
    try {
        await db.sequelize.sync({ alter: true });
        console.log('База данных синхронизирована');

        await seedDatabase(db);

        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Сервер работает по адресу: http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error(`Ошибка запуска: ${err.message}`);
        process.exit(1);
    }
}

start();