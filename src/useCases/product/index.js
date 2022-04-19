const express = require('express');
const Product = require('./product.schema');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        return res.status(200).send({ data: 'Hello World!' })
    } catch (error) {
        return res.status(400).send({ error: { message: `Falha no cadastro: ${error.message}` } })
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, cod, amount, price } = req.body;

        let product = await Product.create(req.body);
        return res.status(200).send({ product })
    } catch (error) {
        return res.status(400).send({ error: { message: `Falha ao criar produto: ${error.message}` } })
    }
})

router.delete('/', async (req, res) => {
    const { id } = req.body

    try {
        /// deletar produto
    } catch (error) {
        return res.status(400).send({ error: { message: `Falha no cadastro: ${error.message}` } })
    }

})

module.exports = app => app.use('/product', router);