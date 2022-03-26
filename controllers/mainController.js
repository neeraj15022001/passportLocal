const User = require('../models/User')
module.exports.root = (req, res) => {
    return res.render("index");
}
module.exports.login = (req, res) => {
    return res.render("login");
}
module.exports.register = (req, res) => {
    return res.render("register");
}

module.exports.createUser = async (req, res) => {
//Check if user already exist && if exist login user else create user and redirect to login page
    try {
        const userFromDb = await User.findOne(req.body);
        if (userFromDb) {
            return res.redirect('/');
        } else {
            //    User do not exist already
            const createdUser = await User.create(req.body);
            if (createdUser) {
                console.log(createdUser)
            }
            return res.redirect("/login");
        }
    } catch (e) {
        //Error while finding user or creating it
        console.log(e)
        return res.redirect("back");
    }
}

module.exports.logout = function (req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
}