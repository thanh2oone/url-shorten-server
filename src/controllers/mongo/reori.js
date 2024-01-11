import Url from '../../models/Guest.js';
import User from '../../models/User.js';

const reori = async (req, res, next) =>  {
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

export default reori