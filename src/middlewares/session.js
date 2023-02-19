const session = require('express-session')
const cookieParser = require('cookie-parser');

const setSession = (app) => {
    app.use(cookieParser());
    app.use(session({
        secret: 'edwjihugbhcsnadsadafcsgsdfsdslmk',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60000 * 60 * 24 // 1 day
        },
    }))
}

module.exports = setSession;