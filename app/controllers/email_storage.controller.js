const db = require('../models');
const EmailStorage = db.email_storage;

exports.create = (req, res) => {
    if (!req.body.email) return res.status(400).send({ message: 'Email обязателен!' });
    EmailStorage.create(req.body).then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    EmailStorage.findAll().then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    EmailStorage.findByPk(req.params.id).then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `ID ${req.params.id} не найден.` });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    EmailStorage.update(req.body, { where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: 'Невозможно обновить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    EmailStorage.destroy({ where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: 'Не удалось удалить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
    EmailStorage.destroy({ where: {}, truncate: false }).then(nums => {
        res.status(200).send({ message: `Удалено: ${nums}` });
    }).catch(err => res.status(500).send({ message: err.message }));
};