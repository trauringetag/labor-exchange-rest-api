const db = require('../models');
const Category = db.categories;

exports.create = (req, res) => {
    if (!req.body.name) return res.status(400).send({ message: 'Название обязательно!' });
    Category.create(req.body).then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    Category.findAll().then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    Category.findByPk(req.params.id).then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `ID ${req.params.id} не найден.` });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    Category.update(req.body, { where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: 'Невозможно обновить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    Category.destroy({ where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: 'Не удалось удалить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};