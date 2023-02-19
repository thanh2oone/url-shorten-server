const cors = require('cors');

const setCors = (app) => {
    app.use(cors({
        origin: process.env.BASE_FRONT,
        methods: ["GET", "POST", "DELETE"],
        credentials: true
    }))
}

module.exports = setCors;