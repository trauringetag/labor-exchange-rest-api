module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define('services', {
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        cabinet: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
    return Service;
};