import mongoose from "mongoose";

const User = new mongoose.Schema({
    account: {
        email: { type: String, required: true },
        password: { type: String, required: true },
        timeSignUp: { type: String, required: true },
    },
    urls: [
        {
            original: { type: String },
            shortid: { type: String },
            timeCreate: { type: String },   
        }
    ]
});

export default mongoose.model('User', User);