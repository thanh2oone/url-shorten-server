import Url from '../../models/Guest.js'
import User from '../../models/User.js';
import shortid from 'shortid';

const shorten = (req, res, next) => {
    const cookies = req.cookies;
    const shortId = shortid.generate();

    if (cookies && cookies.access_token_shorten) {
        const newUrl = ({
            longUrl: req.body.longUrl,
            shortId: shortId,
            createAt: new Date().toLocaleDateString("vi-vn", {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric'
            })
        })

        User.findOne({ "account.username": req.User.account.username }, (err, user) => {
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
            longUrl: req.body.longUrl,
            shortId: shortId,
            createAt: new Date().toLocaleDateString("vi-vn", {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: 'numeric', minute: 'numeric', second: 'numeric'
            })
        }).save((err) => {
            if (!err) console.log(">>>>> Guest: Save successfully");
            else console.error();
        })
    }
    res.send(process.env.API_SERVER + '/' + shortId);
}

export default shorten;