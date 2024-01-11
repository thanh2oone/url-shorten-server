import express from 'express'
const app = express()
import { routeApp } from './src/routes.js'
import { connectMongo } from './src/database/mongoConfig.js'
import { connectFireBase } from './src/database/firebaseConfig.js'
import { setCors } from './src/middlewares/cors.js'
import { setSession } from './src/middlewares/session.js'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' });

setCors(app);
setSession(app);

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Connect database
connectMongo();
// connectFireBase();

routeApp(app);

app.listen(process.env.PORT || 8080, () => {
    console.log('Listening on ' + process.env.BASE_BACK)
});