const userRouter = require('./routes/userRouter');

const route = (app) => {
    app.use('/', userRouter);
}

module.exports = route;