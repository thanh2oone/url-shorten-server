const mongoose = require('mongoose')

const Url = new mongoose.Schema({
        original: { type: String, required: true },
        shortid: { type: String, required: true },
        timeCreate: { type: String, required: true },
});

module.exports = mongoose.model('Url', Url);