const express = require("express");
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const sessionConfig = require("./sessionConfig");
const users = require("./users");
const checkAuth = require("./middlewares/checkAuth");
const app = express();
const port = process.env.PORT || 7777;

// TEMPLATING ENGINE

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

// MIDDLEWARE

app.use(express.static(path.join(__dirname, "./public")));
// app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));

app.get("/", (req, res) => {
    // console.log(req.session);
    res.render("home");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", (req, res) => {
    let newUser = req.body;
    console.log('newUser: ', newUser);
    users.push(newUser);
    console.log('users: ', users);
    res.redirect("/login");
});


app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});