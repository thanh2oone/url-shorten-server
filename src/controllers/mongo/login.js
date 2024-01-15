import User from '../../models/User.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const login = async (req, res, next) => {
    const user = await User.findOne({ "account.email": req.body.email });

    if (!user) res.send({ logged: false, detail: 'User not found' });
    else {
        const passCorrect = await bcrypt.compare(req.body.password, user.account.password);
        if (!passCorrect) {
            res.send({ logged: false, detail: 'Password is incorrect' });
        }
        else {
            const token = jwt.sign({ "userId": user._id }, process.env.JWT_SECRET);
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: new Date(Date.now() + (30 * 24 * 60 * 60000))
            }).status(200).send({ logged: true, detail: 'Login successfull', username: user.account.email });
        }
    }
}

export default login