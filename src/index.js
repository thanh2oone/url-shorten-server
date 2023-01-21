const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
const Cookies = require('js-cookie');

const User = require('./models/User');
const Url = require('./models/Url');

/* Session
Be careful when setting this to true, as compliant clients will not send the cookie back to the server
in the future if the browser does not have an HTTPS connection.
Please note that secure: true is a recommended option. 
However, it requires an https-enabled website, i.e., HTTPS is necessary for secure cookies. 
If secure is set, and you access your site over HTTP, the cookie will not be set. 
If you have your node.js behind a proxy and are using secure: true, you need to set “trust proxy” in express:
*/
app.use(cookieParser())

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

app.use('*', (req, res, next) => {
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

// const requireAuth = async (req, res, next) => {
//     if (!req.cookie.id) {
//         res.redirect('/');
//         return;
//     }
//     const user = await User.findOne({_id: req.cookie.id});
//     if (!user) {
//         res.redirect('/');
//         return;
//     }
//     next();
// }

app.get('/', (req, res) => {
    res.send('Welcome')
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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            Cookies.set("access_token", token, {
                httpOnly: true,
                expires: 1, 
                path: ''
            });
            res
                // .cookie("access_token", token, {
                //     httpOnly: true
                // })
                // .status(200)
                .send('Login successfull');
        }
    }
})

app.listen(process.env.PORT || 5001, () => {
    console.log('Listening on ' + process.env.BASE_BACK)
});