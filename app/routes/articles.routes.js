const controller = require('../controllers/articles.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findOne);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    app.use('/api/articles', router);
};