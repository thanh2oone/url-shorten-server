import { getDatabase, ref, get } from "firebase/database";

const reori = async (req, res, next) => {
    const db = getDatabase();

    let original = "";

    let user = (await get(ref(db, 'users'))).val();
    for (let userId in user) {
        const urlUser = user[userId].urls // Array
        for (let i in urlUser) {
            if (urlUser[i].shortid === req.params.shortid) {
                original = urlUser[i].original;
                break;
            }
        }
    }

    if (original === "") {
        let guest = (await get(ref(db, 'guests'))).val();

        for (let i in guest) {
            if (guest[i].shortid === req.params.shortid) {
                original = guest[i].original;
                break;
            }
        }
    }

    res.redirect(original);
}

export default reori