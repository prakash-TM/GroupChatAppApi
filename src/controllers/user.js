const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');
const createUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const passwordEncrypt = await bcrypt.hash(password, 10)
        const user = new UserModel({ username, password: passwordEncrypt, role });
        await user.save();
        res.send(user);
    } catch (error) {
        throw (error)
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, role } = req.body;
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send('User not found');

        if (username) user.username = username;
        if (password) {
            const passwordEncrypt = await bcrypt.hash(password, 10)
            user.password = passwordEncrypt
        }
        if (role) user.role = role;
        await user.save();
        res.send(user);
    } catch (error) {
        throw (error)
    }
};

module.exports = { createUser, updateUser }