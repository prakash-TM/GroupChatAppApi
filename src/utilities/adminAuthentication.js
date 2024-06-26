const {authMiddleware} = require('./authenticationMiddleware');

const adminMiddleware = [authMiddleware, (req, res, next) => {
    if (req.body.requesterRole !== 'admin') return res.status(403).send('Access denied.');
    next();
}];

module.exports = {adminMiddleware}