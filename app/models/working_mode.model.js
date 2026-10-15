module.exports = (sequelize, Sequelize) => {
    const WorkingMode = sequelize.define('working_mode', {
        day: {
            type: Sequelize.STRING,
            allowNull: false
        },
        opening_hours: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return WorkingMode;
};