import mongoose from "mongoose";

const User = new mongoose.Schema({
    account: {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        createAt: { type: String, required: true },
    },
    urls: [
        {
            longUrl: { type: String },
            shortId: { type: String },
            createAt: { type: String },
        }
    ]
});

export default mongoose.model('User', User);