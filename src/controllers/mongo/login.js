import User from '../../models/User.js';
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
    const user = await User.findOne({ "account.email": req.body.email });

    if (!user) res.send({ logged: false, detail: 'User not found' });
    else {
        const passCorrect = await bcrypt.compare(req.body.password, user.account.password);
        if (!passCorrect) {
            res.send({ logged: false, detail: 'Password is incorrect' });
        }
        else {
            // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            // res.cookie('access_token', token, {
            //     httpOnly: true
            // }).status(200).send({ logged: true, detail: 'Login successfull', username: user.account.email });
            req.session.User = user;
            res.send({ logged: true, detail: 'Login successfull', username: req.session.User.account.email });
        }
    }
}

export default login