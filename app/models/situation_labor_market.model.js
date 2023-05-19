module.exports = (sequelize, Sequelize) => {
    const SituationLaborMarket = sequelize.define('situation_labor_market', {
        period: { type: Sequelize.STRING },
        unemployed: { type: Sequelize.INTEGER },
        are_registered: { type: Sequelize.INTEGER },
        number_of_vacancies: { type: Sequelize.INTEGER }
    });
    return SituationLaborMarket;
};