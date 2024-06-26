const express = require('express');
const router = express.Router();
const { createUser, updateUser } = require('../controllers/user');
const {adminMiddleware} = require('../utilities/adminAuthentication');

router.post('/users', adminMiddleware, createUser);
router.put('/users/:id', adminMiddleware, updateUser);

module.exports = router;
