const db_config = require('../config/db.config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(db_config.DATABASE, db_config.USER, db_config.PASSWORD, {
    host: db_config.HOST,
    dialect: db_config.dialect,
    operatorsAliases: false,
    pool: {
        max: db_config.pool.max,
        min: db_config.pool.min,
        acquire: db_config.pool.acquire,
        idle: db_config.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.services = require('./services.model')(sequelize, Sequelize);
db.working_mode = require('./working_mode.model')(sequelize, Sequelize);
db.db_situation_labor_market = require('./situation_labor_market.model')(sequelize, Sequelize);
db.articles = require('./articles.model')(sequelize, Sequelize);
db.email_storage = require('./email_storage.model')(sequelize, Sequelize);

module.exports = db;