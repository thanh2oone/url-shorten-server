const logout = (req, res) => {
    const cookies = req.cookies;

    if (cookies && cookies.access_token_shorten) {
        res.clearCookie("access_token_shorten");
        res.end();
    }
}

export default logout;