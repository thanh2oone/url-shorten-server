const logout = (req, res, next) => {
    if (req.session.User) {
        req.session.destroy();
        res.send({ logged: false });
    }
}

export default logout