const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const Url = require('./src/models/model');
const shortid = require('shortid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Connect database
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

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.get('/api/url', (req, res, next) => {
    Url.find({})
        .then((data) => res.send({
            urls: data
        }))
        .catch(next);
});

app.post('/api/shorten', (req, res, next) => {
    const data = req.body;
    const shortID = shortid.generate();
    new Url({
        original: data.original,
        shortid: shortID,
        timeCreate: new Date().toLocaleDateString('vi-VN', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
    }).save((err) => {
        if (!err) console.log(">>>>> Save successfully");
        else throw err;
    })
    res.send(process.env.BASE_BACK + '/' + shortID)
});

app.get('/:shortid', async (req, res) => {
    const url = await Url.findOne({ shortid: req.params.shortid })
    if (!url) res.send('Not Found ID');
    else res.redirect(url.original);
})

app.delete('/delete/:_id', (req, res, next) => {
    const id = req.params._id;
    Url.findByIdAndRemove({ _id: id })
        .then(() => {
            console.log('ID ' + '`' + id + '`' + ' deleted');
            res.send({ status: 'Deleted' });
        })
        .catch(next)
})

app.listen(process.env.PORT || 5001, () => {
    console.log('Listening on ' + process.env.BASE_BACK)
});