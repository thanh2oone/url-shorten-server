const home = (req, res, next) => {
    if (req.session.User) {
        res.send({
            role: 'User',
            logged: true,
            username: req.session.User.email
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