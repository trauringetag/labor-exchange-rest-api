const db = require('../models');
const Reception = db.reception;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    const PHONE_REGEXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    if (!req.body.full_name || !req.body.email || !req.body.address || !req.body.phone || !req.body.text_appeal) {
        return res.status(400).send({ message: 'Обязательные поля отсутствуют!' });
    }
    if (!EMAIL_REGEXP.test(req.body.email)) {
        return res.status(400).send({ message: 'Неверный формат email!' });
    }
    if (!PHONE_REGEXP.test(req.body.phone)) {
        return res.status(400).send({ message: 'Неверный формат телефона!' });
    }

    Reception.create(req.body).then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    const full_name = req.query.full_name;
    const condition = full_name ? { full_name: { [Op.like]: `%${full_name}%` } } : null;

    Reception.findAll({
        where: condition,
        include: [
            { model: db.categories, as: 'category' },
            { model: db.social_statuses, as: 'socialStatus' }
        ]
    })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    Reception.findByPk(req.params.id, {
        include: [
            { model: db.categories, as: 'category' },
            { model: db.social_statuses, as: 'socialStatus' }
        ]
    })
    .then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `ID ${req.params.id} не найден.` });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    Reception.update(req.body, { where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: 'Невозможно обновить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    Reception.destroy({ where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: 'Не удалось удалить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
    Reception.destroy({ where: {}, truncate: false }).then(nums => {
        res.status(200).send({ message: `Удалено: ${nums}` });
    }).catch(err => res.status(500).send({ message: err.message }));
};