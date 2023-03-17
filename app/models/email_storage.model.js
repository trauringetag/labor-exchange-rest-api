module.exports = (sequelize, Sequelize) => {
    const EmailStorage = sequelize.define('email_storage', {
        email: { type: Sequelize.STRING }
    });
    return EmailStorage;
};