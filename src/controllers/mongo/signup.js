import User from '../../models/User.js';
import bcrypt from "bcrypt";

const signup = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;

    const saltRounds = 10;
    bcrypt.hash(password1, saltRounds, (error, hash) => {
        if (password1 === password2) {
            const newUser = new User({
                account: {  
                    username: username,
                    email: email,
                    password: hash,
                    createAt: new Date().toLocaleDateString("vi-vn", {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: 'numeric', minute: 'numeric', second: 'numeric'
                    })
                },
                urls: []
            })
            
            newUser.save((err, data) => {
                if (!err) {
                    res.send({ status: 200, message: 'Account creates successfull' })
                } else res.send(err);
            })
        }
        else res.send({ status: 401, message: 'Passwords are not same' })
    })
}

export default signup;