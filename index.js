const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const store = new session.MemoryStore();

const User = require('./src/models/User');
const Url = require('./src/models/Url');

app.use(cookieParser());

app.use(session({
    secret: 'edwjihugbhcsnadslmk',
    resave: false,
    saveUninitialized: true,
    store
}))

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

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

app.get('/', (req, res) => {
    res.send('Welcome');
})

app.get('/api/url', (req, res, next) => {
    Url.find({})
        .then((data) => {
            res.send({
                urls: data
            })
        })
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
        else console.error();
    })
    res.send(process.env.BASE_BACK + '/' + shortID)
});

app.get('/:shortid', async (req, res) => {
    const url = await Url.findOne({ shortid: req.params.shortid })
    if (!url) res.send('Not Found ID');
    else res.redirect(url.original);
})

app.delete('/api/delete/:_id', (req, res, next) => {
    const id = req.params._id;
    Url.findByIdAndRemove({ _id: id })
        .then(() => {
            console.log('ID ' + '`' + id + '`' + ' deleted');
            res.send({ status: 'Deleted' });
        })
        .catch(next)
})

const saltRounds = 10;
app.post('/api/signup', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
        if (req.body.password === req.body.cfPassword) {
            new User({
                account: {
                    email: req.body.email,
                    password: hash,
                    timeSignUp: new Date().toLocaleDateString('vi-VN', {
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    })
                }
            }).save((err, data) => {
                if (!err) {
                    console.log(">>>>> User created");
                    res.send('Account creates successfull')
                } else res.send(err)
            })
        }
        else res.send('Passwords are not same')
    });
})

app.post('/api/login', async (req, res, next) => {
    const user = await User.findOne({ "account.email": req.body.email });
    if (!user) res.send('User not found');
    else {
        const passCorrect = await bcrypt.compare(req.body.password, user.account.password);
        if (!passCorrect) {
            res.send('Password is incorrect');
        }
        else {
            res.send('Login successfull');
        }
    }
})

const validateAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization) next();
    else res.status(403).send({ error: 'Incorrect credentials' });
}

const validateCookies = (req, res, next) => {
    const { cookies } = req;
    if (cookies.sessionID) {
        console.log('>>>>> BACK: Session ID existed');
        if (cookies.sessionID === '123456') next();
        else res.status(403).send({ error: 'Not authenticated' });
    } else res.status(403).send({ error: 'Not authenticated' });

    next();
}

app.listen(process.env.PORT || 5001, () => {
    console.log('Listening on ' + process.env.BASE_BACK)
});