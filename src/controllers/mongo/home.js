const home = (req, res, next) => {
    const cookies = req.cookies;
    
    if (cookies && cookies.access_token) {
        res.send({
            role: 'User',
            logged: true,
            username: req.User.account.email
        })
    }
    else {
        res.send({
            role: 'Guest',
            logged: false,
            username: 'Guest'
        });
    }
}

export default home