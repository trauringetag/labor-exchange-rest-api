const db = require('../models');
const Role = db.roles;

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: 'Название роли не может быть пустым!' });
    }
    Role.create(req.body).then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    Role.findAll().then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    Role.findByPk(req.params.id).then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `Роль с ID ${req.params.id} не найдена.` });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    Role.update(req.body, { where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: 'Невозможно обновить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    Role.destroy({ where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: 'Не удалось удалить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};