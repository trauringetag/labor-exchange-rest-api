const db = require('../models');
const Department = db.departments;

exports.create = (req, res) => {
    if (!req.body.name) return res.status(400).send({ message: 'Имя не может быть пустым!' });
    Department.create(req.body).then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    Department.findAll({ include: [{ model: db.services, as: 'services' }] })
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    Department.findByPk(req.params.id, { include: [{ model: db.services, as: 'services' }] })
        .then(data => {
            if (data) res.status(200).send(data);
            else res.status(404).send({ message: `ID ${req.params.id} не найден.` });
        }).catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    Department.update(req.body, { where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: 'Невозможно обновить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    Department.destroy({ where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: 'Не удалось удалить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};