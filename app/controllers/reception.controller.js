const db = require('../models');
const Reception = db.reception;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const PHONE_REGEXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!req.body.full_name || !req.body.email || !req.body.address || !req.body.phone || !req.body.text_appeal) {
        res.status(400).send({ message: 'Поле не может быть пустым!' });
        return;
    }
    if (!EMAIL_REGEXP.test(req.body.email)) {
        res.status(400).send({ message: 'Неверная запись электронной почты!' });
        return;
    }
    if (!PHONE_REGEXP.test(req.body.phone)) {
        res.status(400).send({ message: 'Неверная запись номера телефона!' });
        return;
    }
    const reception = {
        full_name: req.body.full_name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        category: req.body.category,
        social_status: req.body.social_status,
        text_appeal: req.body.text_appeal
    };
    Reception.create(reception).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при добавлении...'
        });
    });
};

exports.findAll = (req, res) => {
    const full_name = req.query.full_name;
    const condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null;
    Reception.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при получении...'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Reception.findByPk(id).then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `Не удаётся найти ID ${id}.`});
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при получении ID ${id}.` });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Reception.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: `Невозможно обновить ID ${id}. Возможно, req.body пуст!` });
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при обновлении ID ${id}` });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Reception.destroy({ where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: `Невозможно удалить ID ${id}. Возможно, ничего не найдено!` });
    }).catch(() => {
        res.status(500).send({ message: `Не удалось удалить ID ${id}` });
    });
};

exports.deleteAll = (req, res) => {
    Reception.destroy({ where: {}, truncate: false }).then(nums => {
        res.status(200).send({ message: `Количество удалённых объектов: ${nums}.` });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при удалении...'
        });
    });
};