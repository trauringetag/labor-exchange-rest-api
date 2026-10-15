module.exports = (sequelize, Sequelize) => {
    const SocialStatus = sequelize.define('social_statuses', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });
    return SocialStatus;
};