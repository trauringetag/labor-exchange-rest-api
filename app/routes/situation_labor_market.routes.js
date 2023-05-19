const situation_labor_market = require('../controllers/situation_labor_market.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", situation_labor_market.create);
    router.get("/", situation_labor_market.findAll);
    router.get("/:id", situation_labor_market.findOne);
    router.put("/:id", situation_labor_market.update);
    router.delete("/:id", situation_labor_market.delete);
    router.delete("/", situation_labor_market.deleteAll);
    app.use('/api/situation_labor_market', router);
};