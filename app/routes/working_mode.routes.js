const working_mode = require('../controllers/working_mode.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", working_mode.create);
    router.get("/", working_mode.findAll);
    router.get("/:id", working_mode.findOne);
    router.put("/:id", working_mode.update);
    router.delete("/:id", working_mode.delete);
    router.delete("/", working_mode.deleteAll);
    app.use('/api/working_mode', router);
};