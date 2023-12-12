const session = require("express-session");
const express = require("express");
const cors = require("cors");

require('dotenv').config();
require("./config/mongoose.config");

const PORT = process.env.PORT;
const app = express();

app.use(
    cors({credentials: true, origin: "http://localhost:5173"}), 
    express.urlencoded({ extended: true }), 
    express.json(),
    session({
        resave: false,
        saveUninitialized: true,
        name: "UserCookie",
        secret: process.env.COOKIE_SECRET,
        cookie: { secure: process.env.NODE_ENV === "production" }
    })
);

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));