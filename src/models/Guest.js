import mongoose from "mongoose";

const Guest = new mongoose.Schema({
        longUrl: { type: String, required: true },
        shortId: { type: String, required: true },
        createAt: { type: String, required: true },
});

export default mongoose.model('Guest', Guest);