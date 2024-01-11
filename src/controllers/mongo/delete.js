import User from '../../models/User.js';

const del = (req, res, next) => {
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

export default del