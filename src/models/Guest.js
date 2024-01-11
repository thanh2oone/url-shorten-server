import mongoose from "mongoose";

const Guest = new mongoose.Schema({
        original: { type: String, required: true },
        shortid: { type: String, required: true },
        timeCreate: { type: String, required: true },
});

export default mongoose.model('Guest', Guest);