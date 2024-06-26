const express = require('express');
const router = express.Router();
const { createGroup, deleteGroup, addMember, searchGroups } = require('../controllers/group');

router.post('/groups', createGroup);
router.delete('/groups/:id', deleteGroup);
router.post('/groups/addMember', addMember);
router.get('/groups', searchGroups);

module.exports = router;
