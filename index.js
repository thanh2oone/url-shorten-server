import express from 'express'
const app = express()
import { routeApp } from './src/Routes.js'
import { connectMongo } from './src/database/MongoConfig.js'
import { connectFireBase } from './src/database/FirebaseConfig.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' });

app.use(cookieParser());

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Connect database
connectMongo();
// connectFireBase();

routeApp(app);

const port = process.env.PORT || 1234

app.listen(port, () => {
    console.log(`Server is running on port ${port}, ${process.env.API_SERVER}`);
});