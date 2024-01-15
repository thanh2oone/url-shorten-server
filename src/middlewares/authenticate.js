import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const authenticateUser = async (req, res, next) => {
    const cookies = req.cookies;

    if (cookies && cookies.access_token) {
        try {
            const decoded = jwt.verify(cookies.access_token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded.userId });
            if (user) {
                req.User = user;
            }
        } catch (error) {
            console.error('Error decoding token:', error.message);
        }
    }

    next();
}

export default authenticateUser;