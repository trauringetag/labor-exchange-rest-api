module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define('accounts', {
        privilege: { type: Sequelize.STRING },
        access_level: { type: Sequelize.INTEGER },
        hashed_password: { type: Sequelize.STRING }
    });
    return Accounts;
};