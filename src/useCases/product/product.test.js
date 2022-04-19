const request = require("supertest");
const app = require('../../../app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(
            () => console.log("Database connected successfully."),
        ).catch(
            err => console.log("Error while connecting with database: " + err)
        )
})

describe("Product Use Case", () => {
    const mockProduct = {
        "name": "IPhone",
        "cod": 1,
        "amount": 10,
        "price": 13000
    }

    test('Should get hello world message', async () => {
        const response = await request(app).get('/product');
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toBe('Hello World!');
    })

    test('Should create a Product', async () => {
        const response = await request(app)
            .post('/product')
            .send(mockProduct);

        expect(response.statusCode).toBe(200);
        expect(response.body.product._id).not.toBe(null);
    });

    test('Should delete a Product', async () => {
        const response = await request(app)
            .post('/product')
            .send(mockProduct);

        const deleteResponse = await request(app).delete('/product')
            .send({ id: response.body.product._id })

        expect(deleteResponse.statusCode).toBe(200);
    })

    test('Should list all Products', async () => {
        const mockProductList = [
            {
                "name": "IPhone",
                "cod": 1,
                "amount": 10,
                "price": 13000
            },
            {
                "name": "Moto G",
                "cod": 2,
                "amount": 15,
                "price": 1500
            },
            {
                "name": "Xiaomi",
                "cod": 3,
                "amount": 8,
                "price": 1800
            },
        ]

        mockProductList.map(async (product) => await request.post('/product').send(product));

        const listResponse = await request.get('/');
        expect(listResponse.statusCode).toBe(200);
        expect(listResponse.body.length).toBe(3);
    })

    test('Should Update Product', async () => {
        const response = await request(app)
            .post('/product')
            .send(mockProduct);

        const updateResponse = await request(app)
            .post('/product/update')
            .send({
                id: response.body.product._id,
                name: "Apple"
            })

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.product.name).toBe("Apple")
    })
})

afterAll(async () => {
    await mongoose.connection.close();
})