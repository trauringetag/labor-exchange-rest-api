module.exports = (sequelize, Sequelize) => {
    const WorkingMode = sequelize.define('working_mode', {
        day: {
            type: Sequelize.STRING
        },
        opening_hours: {
            type: Sequelize.STRING
        }
    });
    return WorkingMode;
};