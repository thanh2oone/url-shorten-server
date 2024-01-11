import userRouter from './routes/UserRouter.js'

export const routeApp = (app) => {
    app.use('/', userRouter);
}