const db = require('../models');
const SituationLaborMarket = db.db_situation_labor_market;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.period) {
        res.status(400).send({ message: 'Контент не может быть пустым!' });
        return;
    }
    if (!req.body.unemployed) {
        res.status(400).send({ message: 'Контент не может быть пустым!' });
        return;
    }
    if (!req.body.are_registered) {
        res.status(400).send({ message: 'Контент не может быть пустым!' });
        return;
    }
    if (!req.body.number_of_vacancies) {
        res.status(400).send({ message: 'Контент не может быть пустым!' });
        return;
    }
    const situation_labor_market = {
        period: req.body.period,
        unemployed: req.body.unemployed,
        are_registered: req.body.are_registered,
        number_of_vacancies: req.body.number_of_vacancies
    };
    SituationLaborMarket.create(situation_labor_market).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при добавлении...'
        });
    });
};

exports.findAll = (req, res) => {
    const period = req.query.period;
    const condition = period ? { period: { [Op.like]: `%${period}%` } } : null;
    SituationLaborMarket.findAll({ where: condition }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при получении...'
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    SituationLaborMarket.findByPk(id).then(data => {
        if (data) res.status(200).send(data);
        else res.status(404).send({ message: `Не удаётся найти ID ${id}.`});
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при получении ID ${id}.` });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    SituationLaborMarket.update(req.body, { where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: `Невозможно обновить ID ${id}. Возможно, req.body пуст!` });
    }).catch(() => {
        res.status(500).send({ message: `Ошибка при обновлении ID ${id}` });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    SituationLaborMarket.destroy({ where: { id: id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: `Невозможно удалить ID ${id}. Возможно, ничего не найдено!` });
    }).catch(() => {
        res.status(500).send({ message: `Не удалось удалить ID ${id}` });
    });
};

exports.deleteAll = (req, res) => {
    SituationLaborMarket.destroy({ where: {}, truncate: false }).then(nums => {
        res.status(200).send({ message: `Количество удалённых объектов: ${nums}.` });
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Произошла ошибка при удалении...'
        });
    });
};