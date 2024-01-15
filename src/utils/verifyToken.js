import jwt from 'jsonwebtoken'
import { notifyError } from './notifyError.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(notifyError(401, 'Not authenticate'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(notifyError(403, 'Token invalid'));
        req.user = user;
        next();
    })
}