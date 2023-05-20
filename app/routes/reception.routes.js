const reception = require('../controllers/reception.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", reception.create);
    router.get("/", reception.findAll);
    router.get("/:id", reception.findOne);
    router.put("/:id", reception.update);
    router.delete("/:id", reception.delete);
    router.delete("/", reception.deleteAll);
    app.use('/api/reception', router);
};