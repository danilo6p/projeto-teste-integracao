const express = require('express');
const User = require('./user.schema');

const router = express.Router();

router.post('/', async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: { message: 'Email já cadastrado' } })
        }

        let user = await User.create(req.body);
        delete user.password

        return res.send({ user });
    } catch (error) {
        return res.status(400).send({ error: { message: `Falha no cadastro: ${error.message}` } })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email }).select('+password');

        if (!user)
            return res.status(400).send({ error: { message: 'Credenciais incorretas' } })

        if (password !== user.password)
            return res.status(400).send({ error: { message: 'Credenciais incorretas' } })

        delete user.password

        return res.send({ user });
    } catch (error) {
        return res.status(400).send({ error: { message: `Falha no cadastro: ${error.message}` } })
    }

})

module.exports = app => app.use('/user', router);