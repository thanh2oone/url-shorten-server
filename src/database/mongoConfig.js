import mongoose from "mongoose";

export const connectMongo = () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('>>>>> ' + new Date().toLocaleDateString("vi-vn", {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric'
        }) + ': Connected to MongoDB');
        console.log('>>>>> Server is running')
    } catch (e) {
        console.log(">>>>> Connect Failed !")
        process.exit(1)
    }
}