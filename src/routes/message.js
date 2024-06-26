const express = require('express');
const router = express.Router();
const { postMessage, likeMessage } = require('../controllers/message');
const {authMiddleware} = require('../utilities/authenticationMiddleware');

router.post('/messages', authMiddleware, postMessage);
router.post('/messages/:messageId/like',authMiddleware, likeMessage);

module.exports = router;
