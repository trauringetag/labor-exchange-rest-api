module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define('articles', {
        cover: {
            type: Sequelize.STRING,
            allowNull: true
        },
        head: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        preview: {
            type: Sequelize.STRING(1000),
            allowNull: true
        },
        body: {
            type: Sequelize.STRING(5000),
            allowNull: false
        }
    });
    return Article;
};