module.exports = (sequelize, Sequelize) => {
    const LaborMarketIndicator = sequelize.define('labor_market_indicators', {
        period: {
            type: Sequelize.STRING,
            allowNull: false
        },
        unemployed: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        are_registered: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        number_of_vacancies: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    });
    return LaborMarketIndicator;
};