const request = require('supertest');
const {app} = require('../app');
const mongoose = require('mongoose');
const UserModel = require('../models/user');
const {init} = require('../utilities/dataBase')

describe('Test user apis', () => {
    beforeAll(async () => {
       init();
        await UserModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Create user', async () => {
        const res = await request(app)
            .post('/api/users')
            .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
            .send({ username: 'test name 1', password: 'pass1234', role: 'admin', requesterRole: "admin" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('username', 'test name 1');
    });

    it('Update user', async () => {
        const user = await UserModel.findOne({ username: 'test name 1' });

        const res = await request(app)
            .put(`/api/users/${user._id}`)
            .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
            .send({ username: 'test name 2', requesterRole: "admin" });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('username', 'test name 2');
    });
});
