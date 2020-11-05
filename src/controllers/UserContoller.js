const db = require('../database/models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300,
    });
}
module.exports = {
    async login(req, res) {
        const { email, password, islogged } = req.body;

        const user = await db.User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!'
            })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!'
            })
        }

        const user_id = user.id;

        await db.User.update({
            islogged
        }, {
            where: {
                id: user_id
            }
        })

        user.password = undefined;

        const token = generateToken({ id: user.id });

        return res.status(200).send({
            status: 1,
            message: 'usuário logado com sucesso!',
            user,
            token
        });
    },

    async index(req, res) {

        const users = await db.User.findAll();

        if (users == "" || users == null) {
            return res.status(200).send({
                message: "Nenhum usuário cadastrado"
            });
        }

        return res.status(200).send({
            users
        });

    },

    async store(req, res) {

        const { name, email, password } = req.body;

        const user = await db.User.create({ name, email, password });

        const token = generateToken({ id: user.id });

        return res.status(200).send({
            status: 1,
            message: 'usuário cadastrado com sucesso',
            user,
            token
        });

    },

    async update(req, res) {

        const { name, email, password } = req.body;
        const { user_id } = req.params;

        await db.User.update({
            name,
            email,
            password
        }, {
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'usuário atualizado com sucesso'
        });

    },

    async delete(req, res) {

        const { user_id } = req.params;

        await db.User.destroy({
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: 'usuário excluído com sucesso'
        });

    }
}