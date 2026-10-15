module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('roles', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        access_level: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    });
    return Role;
};