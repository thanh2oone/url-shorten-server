import User from '../../models/User.js';

const del = (req, res, next) => {
    const cookies = req.cookies;

    if (cookies && cookies.access_token_shorten) {
        const shortId = req.params.shortId;
        User.findOne({ 'urls.shortId': shortId }, (err, user) => {
            if (err) console.error(err);
            else {
                user.urls.pull({ shortId: shortId });
                user.save((err) => {
                    if (err) console.error(err);
                    else {
                        console.log('>>>>> ID ' + '`' + shortId + '`' + ' deleted');
                        res.end();
                    }
                });
            }
        })
    }
}

export default del;