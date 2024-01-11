import User from '../../models/User.js';
import bcrypt from "bcrypt";

const signup = (req, res, next) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
        if (req.body.password === req.body.cfPassword) {
            new User({
                account: {
                    email: req.body.email,
                    password: hash,
                    timeSignUp: new Date().toLocaleDateString('vi-VN', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    })
                },
                urls: []
            }).save((err, data) => {
                if (!err) {
                    console.log(">>>>> User created");
                    res.send('Account creates successfull')
                } else res.send(err)
            })
        }
        else res.send('Passwords are not same')
    });
}

export default signup