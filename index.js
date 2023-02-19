const express = require('express');
const app = express();

const route = require('./src/routes');
const connectDB = require('./src/database/db');
const setCors = require('./src/middlewares/cors');
const setSession = require('./src/middlewares/session');

require('dotenv').config({ path: './.env' });
const shortid = require('shortid');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

setCors(app);
setSession(app);

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

route(app);
connectDB();

const validateCookies = (req, res, next) => {
    const { cookies } = req;
    if (cookies.sessionID) {
        console.log('>>>>> BACK: Session ID existed');
        if (cookies.sessionID === '123456') next();
        else res.status(403).send({ error: 'Not authenticated' });
    } else res.status(403).send({ error: 'Not authenticated' });
    next();
}

app.listen(process.env.PORT || 5001, () => {
    console.log('Listening on ' + process.env.BASE_BACK)
});