import cors from 'cors'

export const setCors = (app) => {
    app.use(cors({
        origin: process.env.BASE_FRONT,
        methods: ["GET", "POST", "DELETE", "PUT"],
        credentials: true
    }))
}