const express = require("express");
const app = express();
const PORT = 3000;
var logger = require('morgan');
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local");
const MongoStore = require('connect-mongo');
const path = require("path");

const indexRouter = require("./routes/index");
const User = require("./models/User");
app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
    secret: "neeraj",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/authLocal', autoRemove: "disabled"})
}))

app.use(passport.initialize())
app.use(passport.authenticate('session'));
app.use(passport.setAuthenticatedUser);

app.use("/", indexRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while running server");
        return;
    }
    console.log("Server up and running on ", PORT);
})