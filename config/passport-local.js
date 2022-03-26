const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
passport.use(new LocalStrategy({usernameField: "email", passReqToCallback: true},
    function (req, email, password, done) {
        console.log("Using Local Strategy --------------->");
        User.findOne({email: email}, (err, user) => {
            if (err) {
                console.log("Error while retrieving user ----> Passport", err);
                return done(err, false);
            }
            if (!user || user.password !== password) {
                console.log("Invalid Username Password ---> Passport");
                return done(null, false, {message: "Invalid Username Password ---> Passport"});
            } else {
                console.log("Got User ----> Passport")
                return done(null, user, {message: "Got User ----> Passport"});
            }
        })
    }))

passport.serializeUser(function (user, cb) {
    console.log("start");
    process.nextTick(function () {
        console.log("next tick callback")
        cb(null, {id: user.id});
    });
});

passport.deserializeUser(function (id, cb) {
    console.log("start", id.id);
    process.nextTick(function () {
        console.log("next tick callback in deserializing")
        User.findById(id.id, function (err, user) {
            if (err) {
                console.log("Error in finding user", err);
                return cb(err);
            }
            console.log("Got User", user);
            return cb(null, user);
        })
    });
});

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login")
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next();
}
passport.checkLogin = function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

module.exports = passport;