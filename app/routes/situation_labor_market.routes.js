const controller = require('../controllers/situation_labor_market.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", controller.create);
    router.get("/", controller.findAll);
    router.get("/:id", controller.findOne);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    app.use('/api/situation_labor_market', router);
};