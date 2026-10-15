const db_config = require('../config/db.config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    db_config.DATABASE,
    db_config.USER,
    db_config.PASSWORD,
    {
        host: db_config.HOST,
        port: db_config.PORT,
        dialect: db_config.dialect,
        operatorsAliases: false,
        pool: {
            max: db_config.pool.max,
            min: db_config.pool.min,
            acquire: db_config.pool.acquire,
            idle: db_config.pool.idle
        },
        logging: false
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require('./role.model')(sequelize, Sequelize);
db.accounts = require('./account.model')(sequelize, Sequelize);
db.departments = require('./department.model')(sequelize, Sequelize);
db.services = require('./service.model')(sequelize, Sequelize);
db.working_mode = require('./working_mode.model')(sequelize, Sequelize);
db.articles = require('./article.model')(sequelize, Sequelize);
db.email_storage = require('./email_storage.model')(sequelize, Sequelize);
db.categories = require('./category.model')(sequelize, Sequelize);
db.social_statuses = require('./social_status.model')(sequelize, Sequelize);
db.reception = require('./reception.model')(sequelize, Sequelize);
db.labor_market_indicators = require('./labor_market_indicator.model')(sequelize, Sequelize);

db.roles.hasMany(db.accounts, { foreignKey: 'role_id', as: 'accounts' });
db.accounts.belongsTo(db.roles, { foreignKey: 'role_id', as: 'role' });

db.departments.hasMany(db.services, { foreignKey: 'department_id', as: 'services' });
db.services.belongsTo(db.departments, { foreignKey: 'department_id', as: 'department' });

db.categories.hasMany(db.reception, { foreignKey: 'category_id', as: 'receptions' });
db.reception.belongsTo(db.categories, { foreignKey: 'category_id', as: 'category' });

db.social_statuses.hasMany(db.reception, { foreignKey: 'social_status_id', as: 'receptions' });
db.reception.belongsTo(db.social_statuses, { foreignKey: 'social_status_id', as: 'socialStatus' });

module.exports = db;