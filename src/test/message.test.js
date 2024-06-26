const request = require('supertest');
const mongoose = require('mongoose');
const { app } = require('../app');
const UserModel = require('../models/user');
const GroupModel = require('../models/group');
const MessageModel = require('../models/message');
const { init } = require('../utilities/dataBase')

let groupId;
let userId;
beforeAll(async () => {
  init();
  await UserModel.deleteMany({});
  await GroupModel.deleteMany({});
  await MessageModel.deleteMany({});


  const userRes = await request(app).post('/api/users').set('Authorization', `Bearer ${process.env.JWT_SECRET}`).send({ username: 'test user', password: 'pass1234', role: 'admin', requesterRole: "admin" });
  userId = userRes.body._id;

  const groupRes = await request(app).post('/api/groups').set('Authorization', `Bearer ${process.env.JWT_SECRET}`).send({ name: 'test group' });
  groupId = groupRes.body._id;

});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Teat message Apis', () => {
  let messageId;

  it('Add message to the group', async () => {
    const res = await request(app)
      .post('/api/messages')
      .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
      .send({ groupId, content: 'Test message' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('content', 'Test message');
    messageId = res.body._id;
  });

  it('Add like to the message', async () => {
    const res = await request(app)
      .post(`/api/messages/${messageId}/like`)
      .set('Authorization', `Bearer ${process.env.JWT_SECRET}`);

    expect(res.status).toBe(200);
    const message = await MessageModel.findById(messageId);
    expect(message.likes).toContain(userId);
  });
});
