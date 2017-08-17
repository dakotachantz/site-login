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
    console.log(req.session);
    res.render("home", { user: req.session.user });
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
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    let foundUser = users.find(user => user.username === reqUsername);
    if (!foundUser) {
        return res.render("login", { errors: ["User not found. Try again or click above on Sign Up to join the best website ever."] });
    }

    if (foundUser.password === reqPassword) {
        delete foundUser.password;
        req.session.user = foundUser;
        res.redirect("/user");
    } else {
        return res.render("login", { errors: ["Password does not match."] });
    }
});

app.get("/user", checkAuth, (req, res) => {
    res.render("user", { user: req.session.user });
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.send("Error logging out");
        } else {
            res.redirect("/");
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});