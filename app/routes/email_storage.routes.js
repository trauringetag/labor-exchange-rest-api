const controller = require('../controllers/email_storage.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findOne);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    router.delete("/", controller.deleteAll);
    app.use('/api/email_storage', router);
};