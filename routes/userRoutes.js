const express = require("express");
const userRoutes = express.Router();
const users = require("../users");

userRoutes.get("/profile", (req, res) => {

    if (req.session.user) {
        return res.render("profile", { user: req.session.user });
    } else {
        res.redirect("/login")
    }
});

userRoutes.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send("Error logging out");
        } else {
            res.redirect("/");
        }
    });
});

module.exports = userRoutes;