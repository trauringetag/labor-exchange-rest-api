const accounts = require('../controllers/accounts.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", accounts.create);
    router.get("/", accounts.findAll);
    router.get("/:id", accounts.findOne);
    router.put("/:id", accounts.update);
    router.delete("/:id", accounts.delete);
    router.delete("/", accounts.deleteAll);
    app.use('/api/accounts', router);
};