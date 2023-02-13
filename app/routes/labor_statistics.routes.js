const labor_statistics = require('../controllers/labor_statistics.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", labor_statistics.create);
    router.get("/", labor_statistics.findAll);
    router.get("/:id", labor_statistics.findOne);
    router.put("/:id", labor_statistics.update);
    router.delete("/:id", labor_statistics.delete);
    router.delete("/", labor_statistics.deleteAll);
    app.use('/api/labor_statistics', router);
};