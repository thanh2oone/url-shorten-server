const mongoose = require('mongoose'); 

const connectDB = () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('>>>>> ' + new Date().toLocaleDateString('vi-VN', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }) + ': Connected to MongoDB');
        console.log('>>>>> Server is running')
    } catch (e) {
        console.log(">>>>> Connect Failed !")
        process.exit(1)
    }
}

module.exports = connectDB;