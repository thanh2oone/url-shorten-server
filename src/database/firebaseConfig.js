import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

import { initializeApp } from "firebase/app";

export const connectFireBase = () => {
    // Initialize Firebase
    initializeApp({
        databaseURL: process.env.FIREBASE_DB_URI,
    });
}