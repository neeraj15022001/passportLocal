const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const passport = require("passport");
//GET
router.get("/", passport.checkAuthentication, mainController.root);
router.get("/login", mainController.login);
router.get("/register",passport.checkLogin,  mainController.register);
//POST
router.post("/createSession", passport.authenticate('local', {successRedirect: '/',failureRedirect: "/login"}));
router.post("/createUser", mainController.createUser);
router.get('/logout', mainController.logout)
module.exports = router;