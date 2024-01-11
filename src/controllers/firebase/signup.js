import bcrypt from "bcrypt";
import { getDatabase, ref, set, get } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

const signup = (req, res, next) => {
    const db = getDatabase(); // Get database

    const saltRounds = 10;
    const userId = uuidv4();

    get(ref(db, 'users')).then((data) => {
        const user = data.val();

        for (let userId in user) {
            if (user[userId].account.email === req.body.email) {
                res.send('Account existed')
            }
            break;
        }

        bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
            if (req.body.password === req.body.cfPassword) {
                set(
                    ref(db, 'users/' + userId), {
                    account: {
                        email: req.body.email,
                        password: hash,
                        timeSignUp: new Date().toLocaleDateString('vi-VN', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric'
                        })
                    }
                }).then((err, data) => {
                    if (!err) {
                        console.log(">>>>> User created");
                        res.send('Account creates successfull')
                    } else res.send(err)
                })
            }
            else res.send('Passwords are not same')
        });
    })
        .catch((err) => {
            return res.status(500).send(err);
        })
}

export default signup