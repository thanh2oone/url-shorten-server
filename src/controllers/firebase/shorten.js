import shortid from 'shortid'
import { getDatabase, ref, set, get, push, update } from "firebase/database";

const shorten = async (req, res, next) => {
    const shortID = shortid.generate();
    const db = getDatabase();

    const newUrl = {
        original: req.body.original,
        shortid: shortID,
        timeCreate: new Date().toLocaleDateString('vi-VN', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
    };

    if (req.session.User) {
        get(ref(db, 'users')).then((data) => {
            const user = data.val();

            for (let userId in user) {
                if (userId === req.session.User.userId) {
                    const userData = user[userId];
                    // Check if the user hasn't the 'urls' array
                    if (!userData.urls) {
                        userData.urls = [];
                    }

                    // Push the new URL to the 'urls' array
                    userData.urls.push(newUrl);

                    // Update data to db
                    set(ref(db, 'users/' + userId), userData).then(() => {
                        console.log(">>>>> User: Save successfully");
                        res.send(process.env.BASE_BACK + '/' + shortID)
                    });

                    break;
                }
            }
        });
    } else { // Guest, not login
        const guestData = (await get(ref(db, 'guests'))).val();

        if (guestData !== undefined) {
            guestData.push(newUrl);
        }
        else guestData.push([])

        // Array
        set(ref(db, 'guests'),  guestData).then((err) => {
            if (err) res.send(err)
            else {
                console.log(">>>>> Guest: Save successfully");
                res.send(process.env.BASE_BACK + '/' + shortID)
            }
        })

        // Object 
        // const newPost = push(child(ref(db), 'guests'))
        // update(newPost, newUrl).then(() => {
        //     console.log(">>>>> Guest: Save successfully");
        //     res.send(process.env.BASE_BACK + '/' + shortID)
        // });
    }
}

export default shorten;
