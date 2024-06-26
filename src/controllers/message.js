const MessageModel = require('../models/message');

const postMessage = async (req, res) => {

    try {
        const { groupId, content } = req.body;
        const userId = req.user.id;
        const message = new MessageModel({ group: groupId, sender: userId, content });
        await message.save();
        res.send(message);
    } catch (error) {
        throw (error)
    }
};

const likeMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const userId = req.user.id;
        const message = await MessageModel.findById(messageId);
        if (!message) return res.status(404).send('Message not found');

        message.likes.push(userId);
        await message.save();
        res.send(message);
    } catch (error) {
        throw (error)
    }

};

module.exports = { postMessage, likeMessage }