const logout = (req, res) => {
    const cookies = req.cookies;
    
    if (cookies && cookies.access_token) {
        res.clearCookie("access_token");
        res.end();
    }
}

export default logout