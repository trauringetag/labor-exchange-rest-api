const db = require('../models');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: 'Контент не может быть пустым!' });
        return;
    }
    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };
    Tutorial.create(tutorial).then(data => { res.send(data); }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при добавлении...'
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Tutorial.findAll({ where: condition }).then(data => { res.send(data); }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при получении...'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findByPk(id).then(data => {
        if (data) res.send(data);
        else res.status(404).send({ message: `Не удаётся найти ID ${id}.`});
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при получении ID ${id}` });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Tutorial.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) res.send({ message: 'Успешно обновлено!' });
        else res.send({ message: `Невозможно обновить ID ${id}. Возможно, req.body пуст!` });
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при обновлении ID ${id}` });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.destroy({ where: { id: id } }).then(num => {
        if (num == 1) res.send({ message: 'Успешно удалено!' });
        else res.send({ message: `Невозможно удалить ID ${id}. Возможно, ничего не найдено!` });
    }).catch(() => {
        res.status(500).send({ message: `Не удалось удалить ID ${id}` });
    });
};

exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where: {}, truncate: false
    }).then(nums => {
        res.send({ message: `Количество удалённых объектов: ${nums}.` });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при удалении...'
        });
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.findAll({ where: { published: true } }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при получении...'
        });
    });
};