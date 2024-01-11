import User from '../../models/User.js';

const allurls = (req, res, next) => {
    if (req.session.User) {
        User.findOne({ "account.email": req.session.User.account.email }, (err, user) => {
            if (err) console.log(err);
            else {
                res.send({
                    logged: true,
                    urls: user.urls
                })
            }
        })
    } else {
        res.send({
            logger: false // redirect '/login' in frontend
        })
    }
}

export default allurls