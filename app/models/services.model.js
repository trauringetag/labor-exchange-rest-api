module.exports = (sequelize, Sequelize) => {
    const Services = sequelize.define('services', {
        description: {
            type: Sequelize.TEXT
        },
        cabinet: {
            type: Sequelize.INTEGER
        },
        phone: {
            type: Sequelize.STRING
        }
    });
    return Services;
};