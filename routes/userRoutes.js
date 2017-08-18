const express = require("express");
const userRoutes = express.Router();
const users = require("../users");

userRoutes.get("/user", (req, res) => {
    res.render("user", { user: req.session.user });
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