import { getDatabase, ref, get } from "firebase/database";

const allurls = (req, res, next) => {
    if (req.session.User) {
        const db = getDatabase();

        get(ref(db, 'users')).then((data) => {
            const user = data.val();

            if (user === undefined) {
                res.send({
                    logged: true,
                    urls: []
                })
            }
            else {
                for (let userId in user) {
                    if (userId === req.session.User.userId) {
                        res.send({
                            logged: true,
                            urls: user[userId].urls
                        })
                    }
                }
            }
        })
    } else {
        res.send({
            logger: false // redirect '/login' in frontend
        })
    }
}

export default allurls