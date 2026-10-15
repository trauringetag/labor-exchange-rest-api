module.exports = (sequelize, Sequelize) => {
    const Reception = sequelize.define('reception', {
        full_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        text_appeal: {
            type: Sequelize.STRING(1000),
            allowNull: false
        },
        processed: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
    return Reception;
};