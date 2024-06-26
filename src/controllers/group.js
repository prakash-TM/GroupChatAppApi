const GroupModel = require('../models/group');
const UserModel = require('../models/user');

const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const group = new GroupModel({ name });
        await group.save();
        res.send(group);
    } catch (error) {
        throw (error)
    }

};

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        await GroupModel.findByIdAndDelete(id);
        res.send('Group deleted');
    } catch (error) {
        throw (error)
    }

};

const addMember = async (req, res) => {
    try {
        const { groupId, userId } = req.body;
        const group = await GroupModel.findById(groupId);
        if (!group) return res.status(404).send('Group not found');

        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).send('User not found');

        group.members.push(user);
        await group.save();
        res.send(group);
    } catch (error) {
        throw (error)
    }

};

const searchGroups = async (req, res) => {
    try {
        const { name } = req.query;
        const groups = await GroupModel.find({ name: new RegExp(name, 'i') });
        res.send(groups);
    } catch (error) {
        throw (error)
    }

};

module.exports = { createGroup, deleteGroup, addMember, searchGroups }