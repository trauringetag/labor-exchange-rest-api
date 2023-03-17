const email_storage = require('../controllers/email_storage.controller');
const router = require('express').Router();

module.exports = app => {
    router.post("/", email_storage.create);
    router.get("/", email_storage.findAll);
    router.get("/:id", email_storage.findOne);
    router.put("/:id", email_storage.update);
    router.delete("/:id", email_storage.delete);
    router.delete("/", email_storage.deleteAll);
    app.use('/api/email_storage', router);
};