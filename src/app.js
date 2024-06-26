const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authentication');
const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group');
const messageRoutes = require('./routes/message');
const {init} = require('./utilities/dataBase')

init();
const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', groupRoutes);
app.use('/api', messageRoutes);
module.exports = {app}
