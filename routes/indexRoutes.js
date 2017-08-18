const express = require("express");
const indexRoutes = express.Router();


indexRoutes.get("/", (req, res) => {
    console.log(req.session);
    res.render("home", { user: req.session.user });
});

module.exports = indexRoutes;