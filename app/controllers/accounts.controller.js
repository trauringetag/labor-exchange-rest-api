const db = require('../models');
const bcrypt = require('bcryptjs');
const Account = db.accounts;

exports.create = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: 'Поля username и password обязательны!' });
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const account = {
            username: req.body.username,
            hashed_password: hashedPassword,
            role_id: req.body.role_id || 1
        };
        const data = await Account.create(account);
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAll = (req, res) => {
    Account.findAll({ include: [{ model: db.roles, as: 'role' }] })
        .then(data => res.status(200).send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    Account.findByPk(req.params.id, { include: [{ model: db.roles, as: 'role' }] })
        .then(data => {
            if (data) res.status(200).send(data);
            else res.status(404).send({ message: `ID ${req.params.id} не найден.` });
        }).catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
    Account.update(req.body, { where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно обновлено!' });
        else res.status(404).send({ message: 'Невозможно обновить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
    Account.destroy({ where: { id: req.params.id } }).then(num => {
        if (num == 1) res.status(200).send({ message: 'Успешно удалено!' });
        else res.status(404).send({ message: 'Не удалось удалить.' });
    }).catch(err => res.status(500).send({ message: err.message }));
};

exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: 'Введите логин и пароль' });
    }

    try {
        const account = await Account.findOne({
            where: { username: req.body.username },
            include: [{ model: db.roles, as: 'role' }]
        });

        if (!account) {
            return res.status(401).send({ message: 'Неверный логин или пароль' });
        }

        const passwordIsValid = await require('bcryptjs').compare(req.body.password, account.hashed_password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Неверный логин или пароль' });
        }

        const { hashed_password, ...accountWithoutPassword } = account.toJSON();

        res.status(200).send({
            message: 'Авторизация успешна',
            user: accountWithoutPassword
        });
    } catch (err) {
        res.status(500).send({ message: 'Ошибка сервера при авторизации: ' + err.message });
    }
};