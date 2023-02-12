const db = require('../models');
const Services = db.services;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.description) {
        res.status(400).send({ message: 'Контент не может быть пустым!' });
        return;
    }
    const services = {
        description: req.body.description,
        cabinet: req.body.cabinet,
        phone: req.body.phone
    };
    Services.create(services).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при добавлении...'
        });
    });
};

exports.findAll = (req, res) => {
    const description = req.query.description;
    const condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
    Services.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при получении...'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Services.findByPk(id).then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `Не удаётся найти ID ${id}.`});
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при получении ID ${id}.` });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Services.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.send({ message: `Невозможно обновить ID ${id}. Возможно, req.body пуст!` });
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при обновлении ID ${id}` });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Services.destroy({ where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.send({ message: `Невозможно удалить ID ${id}. Возможно, ничего не найдено!` });
    }).catch(() => {
        res.status(500).send({ message: `Не удалось удалить ID ${id}` });
    });
};

exports.deleteAll = (req, res) => {
    Services.destroy({ where: {}, truncate: false }).then(nums => {
        res.status(200).send({ message: `Количество удалённых объектов: ${nums}.` });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при удалении...'
        });
    });
};