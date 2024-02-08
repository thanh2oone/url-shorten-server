import User from '../../models/User.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import emailValidator from "email-validator";

const login = async (req, res, next) => {
    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;

    if (emailValidator.validate(usernameOrEmail)) {
        const user = await User.findOne({ "account.email": usernameOrEmail });
        if (!user) res.send({ status: 401, message: 'User not found' });
        else {
            const passCorrect = await bcrypt.compare(password, user.account.password);
            if (!passCorrect) {
                res.send({ status: 401, message: 'Wrong password' });
            }
            else {
                const token = jwt.sign({ "userId": user._id }, process.env.JWT_SECRET);
                res.cookie('access_token_shorten', token, {
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + (30 * 24 * 60 * 60000)),
                })
                    .send({ status: 200, message: 'Login successfull' });
            }
        }
    } else {
        const user = await User.findOne({ "account.username": usernameOrEmail });
        if (!user) res.send({ status: 401, message: 'User not found' });
        else {
            const passCorrect = await bcrypt.compare(password, user.account.password);
            if (!passCorrect) {
                res.send({ status: 401, message: 'Wrong password' });
            }
            else {
                const token = jwt.sign({ "userId": user._id }, process.env.JWT_SECRET);
                res.cookie('access_token_shorten', token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + (30 * 24 * 60 * 60000))
                }).send({ status: 200, message: 'Login successfull' });
            }
        }
    }
}

export default login    