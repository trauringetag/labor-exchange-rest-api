module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('departments', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        building: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Department;
};