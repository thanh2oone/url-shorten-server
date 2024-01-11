import Url from '../../models/Guest.js'
import User from '../../models/User.js';
import shortid from 'shortid'

const shorten = (req, res, next) => {
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

export default shorten;