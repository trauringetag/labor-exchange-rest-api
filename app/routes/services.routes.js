const services = require('../controllers/services.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", services.create);
    router.get("/", services.findAll);
    router.get("/:id", services.findOne);
    router.put("/:id", services.update);
    router.delete("/:id", services.delete);
    router.delete("/", services.deleteAll);
    app.use('/api/services', router);
};