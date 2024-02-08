const auth = (req, res, next) => {
    const cookies = req.cookies;

    if (cookies && cookies.access_token_shorten) {
        res.send({
            status: 200,
            logged: true,
            username: req.User.account.username,
        })
    }
    else {
        res.send({
            status: 200,
            logged: false,
            username: 'Guest',
        });
    }
}

export default auth;