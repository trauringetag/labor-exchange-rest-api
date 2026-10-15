module.exports = (sequelize, Sequelize) => {
    const EmailStorage = sequelize.define('email_storage', {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    return EmailStorage;
};