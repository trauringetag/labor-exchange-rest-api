module.exports = (sequelize, Sequelize) => {
    const Reception = sequelize.define('reception', {
        full_name: { type: Sequelize.STRING },
        email: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        phone: { type: Sequelize.STRING },
        category: { type: Sequelize.STRING },
        social_status: { type: Sequelize.STRING },
        text_appeal: { type: Sequelize.STRING(1000) },
        processed: { type: Sequelize.BOOLEAN, defaultValue: false }
    });
    return Reception;
};