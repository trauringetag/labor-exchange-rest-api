module.exports = (sequelize, Sequelize) => {
    const Articles = sequelize.define('articles', {
        cover: { type: Sequelize.STRING },
        head: { type: Sequelize.STRING(500) },
        preview: { type: Sequelize.STRING(1000) },
        body: { type: Sequelize.STRING(5000) }
    });
    return Articles;
};