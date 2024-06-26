const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]

    if (!token ) return res.status(401).send('Access denied.');

    try {
        jwt.verify(token, process.env.JWT_SECRET, (error, result) => {
            req.user = result;
            next();
        });
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = {authMiddleware};