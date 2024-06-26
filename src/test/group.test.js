const request = require('supertest');
const mongoose = require('mongoose');
const {app} = require('../app');
const userModel = require('../models/user');
const Group = require('../models/group');
const { init } = require('../utilities/dataBase')

let userId;

beforeAll(async () => {
  init();
  await userModel.deleteMany({});
  await Group.deleteMany({});


  const userRes = await request(app)
    .post('/api/users')
    .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
    .send({ username: 'test name', password: 'pass1234', role: 'admin', requesterRole: "admin" });

  userId = userRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test group apis', () => {
  it('Create group', async () => {
    const res = await request(app)
      .post('/api/groups')
      .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
      .send({ name: 'Test group' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Test group');
  });

  it('Add member to the group', async () => {
    const group = await Group.findOne({ name: 'Test group' });

    const res = await request(app)
      .post('/api/groups/addMember')
      .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
      .send({ groupId: group._id, userId });

    expect(res.status).toBe(200);
    expect(res.body.members[0]._id).toContain(userId);
  });

  it('Search group name', async () => {
    const res = await request(app)
      .get('/api/groups')
      .set('Authorization', `Bearer ${process.env.JWT_SECRET}`)
      .query({ name: 'Test group' });

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('Deleted group', async () => {
    const group = await Group.findOne({ name: 'Test group' });

    const res = await request(app)
      .delete(`/api/groups/${group._id}`)
      .set('Authorization', `Bearer ${process.env.JWT_SECRET}`);

    expect(res.status).toBe(200);
    const deletedGroup = await Group.findById(group._id);
    expect(deletedGroup).toBeNull();
  });
});
