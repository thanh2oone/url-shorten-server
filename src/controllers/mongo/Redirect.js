import Guest from '../../models/Guest.js';
import User from '../../models/User.js';

const redirect = async (req, res, next) => {
    const urlGuest = await Guest.findOne({ shortId: req.params.shortId });
    const urlUser = await User.findOne({ 'urls.shortId': req.params.shortId });

    if (urlGuest === null && urlUser !== null) {
        let index = 0;

        for (var i = 0; i < urlUser.urls.length; i++) {
            if (urlUser.urls[i].shortId === req.params.shortId) {
                index = i;
                break;
            }
        }
        res.redirect(urlUser.urls[index].longUrl);
    }
    else if (urlGuest !== null && urlUser === null) res.redirect(urlGuest.longUrl);
    else res.send({ stats: 404, message: 'Not Found ID' });
}

export default redirect;