import User from '../../models/User.js';

const allurls = (req, res, next) => {
    const cookies = req.cookies;

    if (cookies && cookies.access_token) {
        res.send({
            logged: true,
            urls: req.User.urls
        })
    } else {
        res.send({
            logger: false
        })
    }
}

export default allurls