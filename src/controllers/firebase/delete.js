import { getDatabase, set, ref, get } from "firebase/database";

const del = (req, res, next) => {
    const db = getDatabase();
    const shortid = req.params.shortid

    if (req.session.User) {
        get(ref(db, 'users')).then((data) => {
            const user = data.val();

            for (let userId in user) {
                if (userId === req.session.User.userId) {
                    const userData = user[userId];
                    for (let i in userData.urls) {
                        if (userData.urls[i].shortid === shortid) {
                            userData.urls.splice(i, 1);
                            break;
                        }
                    }

                    set(ref(db, 'users/' + userId), userData).then(() => {
                        console.log('>>>>> ID ' + '`' + shortid + '`' + ' deleted');
                        res.send('Deleted');
                    });

                    break;
                }
            }
        })
    }
}

export default del