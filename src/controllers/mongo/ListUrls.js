const listUrls = (req, res, next) => {
    const cookies = req.cookies;

    if (cookies && cookies.access_token_shorten) {
        res.send({
            status: 200,
            urls: req.User.urls
        })
    } else {
        res.send({
            status: 401,
            logged: false,
            message: "Unauthorized"
        })
    }
}

export default listUrls;