import session from 'express-session'
import cookieParser from 'cookie-parser'

export const setSession = (app) => {
    app.use(cookieParser());
    app.use(session({
        secret: 'edwjihugbhcsnadsadafcsgsdfsdslmk',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000 * 60 * 24 // 1 day
        },
    }))
}