module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define('accounts', {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        hashed_password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Account;
};