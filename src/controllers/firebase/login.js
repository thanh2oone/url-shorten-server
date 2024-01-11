import { getDatabase, ref, get } from "firebase/database";
import bcrypt from "bcrypt";

const login = (req, res, next) => {
    const db = getDatabase();

    get(ref(db, 'users')).then(async (data) => {
        const user = data.val();
        if (user) {

            for (let userId in user) {
                if (user[userId].account.email === req.body.email) {
                    const passCorrect = await bcrypt.compare(req.body.password, user[userId].account.password);

                    if (!passCorrect) {
                        res.send({ logged: false, detail: 'Password is incorrect' });
                    } else {
                        req.session.User = {
                            userId: userId,
                            email: user[userId].account.email,
                            urls: user[userId].urls,
                        };

                        res.send({
                            logged: true,
                            detail: 'Login successful',
                            userId: req.session.User.userId,
                            username: req.session.User.email,
                        });
                    }
                    break;
                }
            }
        }
        else res.send({ logged: false, detail: 'User not found' });
    })
};

export default login;
