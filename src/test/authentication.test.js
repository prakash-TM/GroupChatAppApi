const request = require('supertest');
const {app} = require('../app');
const mongoose = require('mongoose');
const UserModel = require('../models/user');
const {init} = require('../utilities/dataBase')
describe('API authentication test', () => {
    beforeAll(async () => {
        init();
        await UserModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Add admin user', async () => {
        const res = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
            .send({ username: 'test name', password: 'pass1234', role: 'admin', requesterRole: "admin" });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('username', 'test name');
    });

    it('login a user', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({ username: 'test name', password: 'pass1234' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
});
