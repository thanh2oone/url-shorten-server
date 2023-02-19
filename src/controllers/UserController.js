const User = require('../models/User');
const Url = require('../models/Url');
const shortid = require('shortid');
const bcrypt = require('bcrypt');

class UserController {
    home(req, res, next) {
        if (req.session.User) {
            res.send({
                role: 'User',
                logged: true,
                username: req.session.User.account.email
            })
        }
        else {
            res.send({
                role: 'Guest',
                logged: false,
                username: 'Guest'
            });
        }
    }

    allurls(req, res, next) {
        if (req.session.User) {
            User.findOne({ "account.email": req.session.User.account.email }, (err, user) => {
                if (err) console.log(err);
                else {
                    res.send({
                        logged: true,
                        urls: user.urls
                    })
                }
            })
        } else {
            res.send({
                logger: false // redirect '/login' in frontend
            })
        }
    }

    async reori(req, res, next) {
        const urlGuest = await Url.findOne({ shortid: req.params.shortid });
        const urlUser = await User.findOne({ 'urls.shortid': req.params.shortid });

        if (urlGuest === null && urlUser !== null) {
            var index = 0;

            for (var i = 0; i < urlUser.urls.length; i++) {
                if (urlUser.urls[i].shortid === req.params.shortid) {
                    index = i;
                    break;
                }
            }
            res.redirect(urlUser.urls[index].original);
        }
        else if (urlGuest !== null && urlUser === null) res.redirect(urlGuest.original);
        else res.send('Not Found ID');
    }

    delete(req, res, next) {
        if (req.session.User) {
            const shortid = req.params.shortid;
            User.findOne({ 'urls.shortid': shortid }, (err, user) => {
                if (err) console.error(err);
                else {
                    user.urls.pull({ shortid: shortid });
                    user.save((err) => {
                        if (err) console.error(err);
                        else {
                            console.log('>>>>> ID ' + '`' + shortid + '`' + ' deleted');
                            res.send('Deleted');
                        }
                    });
                }
            })
        }
    }

    shorten(req, res, next) {
        const shortID = shortid.generate();
        if (req.session.User) {
            const newUrl = ({
                original: req.body.original,
                shortid: shortID,
                timeCreate: new Date().toLocaleDateString('vi-VN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                })
            })

            User.findOne({ "account.email": req.session.User.account.email }, (err, user) => {
                if (err) console.error(err);
                else {
                    user.urls.push(newUrl);
                    user.save((err) => {
                        if (err) console.error(err);
                        else console.log(">>>>> User: Save successfully");
                    })
                }
            })
        } else {
            new Url({
                original: req.body.original,
                shortid: shortID,
                timeCreate: new Date().toLocaleDateString('vi-VN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                })
            }).save((err) => {
                if (!err) console.log(">>>>> Guest: Save successfully");
                else console.error();
            })
        }
        res.send(process.env.BASE_BACK + '/' + shortID)
    }

    async login(req, res, next) {
        const user = await User.findOne({ "account.email": req.body.email });

        if (!user) res.send({ logged: false, detail: 'User not found' });
        else {
            const passCorrect = await bcrypt.compare(req.body.password, user.account.password);
            if (!passCorrect) {
                res.send({ logged: false, detail: 'Password is incorrect' });
            }
            else {
                if (req.cookie) {
                    console.log('Cookie existed');
                    res.send({ logged: true, detail: 'Login successfull', username: req.session.User.account.email });
                }
                else {
                    console.log('Set-Cookie');
                    req.session.User = user;
                    res.send({ logged: true, detail: 'Login successfull', username: req.session.User.account.email });
                }
            }
        }
    }

    signup(req, res, next) {
        const saltRounds = 10;
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
    }

    logout(req, res, next) {
        if (req.session.User) {
            req.session.destroy();
            res.send({ logged: false });
        }
    }
}

module.exports = new UserController;