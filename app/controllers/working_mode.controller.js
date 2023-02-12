const db = require('../models');
const WorkingMode = db.working_mode;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.day) {
        res.status(400).send({ message: 'Контент не может быть пустым!' });
        return;
    }
    const working_mode = {
        day: req.body.day,
        opening_hours: req.body.opening_hours
    };
    WorkingMode.create(working_mode).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при добавлении...'
        });
    });
};

exports.findAll = (req, res) => {
    const day = req.query.day;
    const condition = day ? { day: { [Op.like]: `%${day}%` } } : null;
    WorkingMode.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при получении...'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    WorkingMode.findByPk(id).then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `Не удаётся найти ID ${id}.`});
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при получении ID ${id}.` });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    WorkingMode.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: `Невозможно обновить ID ${id}. Возможно, req.body пуст!` });
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при обновлении ID ${id}` });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    WorkingMode.destroy({ where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: `Невозможно удалить ID ${id}. Возможно, ничего не найдено!` });
    }).catch(() => {
        res.status(500).send({ message: `Не удалось удалить ID ${id}` });
    });
};

exports.deleteAll = (req, res) => {
    WorkingMode.destroy({ where: {}, truncate: false }).then(nums => {
        res.status(200).send({ message: `Количество удалённых объектов: ${nums}.` });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при удалении...'
        });
    });
};