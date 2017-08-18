const express = require("express");
const authRoutes = express.Router();
const users = require("../users");

authRoutes.get("/signup", (req, res) => {
    res.render("signup");
});

authRoutes.post("/signup", (req, res) => {
    let newUser = req.body;
    console.log('newUser: ', newUser);
    users.push(newUser);
    console.log('users: ', users);
    res.redirect("/auth/login");
});


authRoutes.get("/login", (req, res) => {
    res.render("login");
});

authRoutes.post("/login", (req, res) => {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    let foundUser = users.find(user => user.username === reqUsername);
    if (!foundUser) {
        return res.render("login", { errors: ["User not found. Try again or click above on Sign Up to join the best website ever."] });
    }

    if (foundUser.password === reqPassword) {
        delete foundUser.password;
        req.session.user = foundUser;
        res.redirect("../user/user");
    } else {
        return res.render("login", { errors: ["Password does not match."] });
    }
});

module.exports = authRoutes;