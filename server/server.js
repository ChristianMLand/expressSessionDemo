import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dbConnect from './config/mongoose.config.js';
import sessionRouter from './routes/session.routes.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

dbConnect(process.env.DB_URI, process.env.DB_NAME);

const app = express();

app.use(
    cors({ credentials: true, origin: process.env.CLIENT_URI }),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        resave: false,
        saveUninitialized: false,
        name: "AuthCookie",
        secret: process.env.COOKIE_SECRET,
        cookie: { secure: process.env.MODE === "production" },
    })
);

app.use("/api/session", sessionRouter);
app.use("/api/users", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("Listening on port:", PORT));