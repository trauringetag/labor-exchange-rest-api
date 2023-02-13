module.exports = (sequelize, Sequelize) => {
    const LaborStatistics = sequelize.define('labor_statistics', {
        date: { type: Sequelize.DATE },
        unemployed: { type: Sequelize.STRING },
        unemployment_rate: { type: Sequelize.FLOAT },
        number_vacancies: { type: Sequelize.INTEGER },
        tension: { type: Sequelize.FLOAT }
    });
    return LaborStatistics;
};