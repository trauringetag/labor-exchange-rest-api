const articles = require('../controllers/articles.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", articles.create);
    router.get("/", articles.findAll);
    router.get("/:id", articles.findOne);
    router.put("/:id", articles.update);
    router.delete("/:id", articles.delete);
    router.delete("/", articles.deleteAll);
    app.use('/api/articles', router);
};