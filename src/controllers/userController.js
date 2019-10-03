const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    signUp(req, res, next) {
        res.render("users/signup");
    },

    create(req, res, next) {
        let newUser = {
            username: req.body.username,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };

        console.log("newUser from sign up", newUser);

        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/signup");
            } else {
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've successfully signed in");
                    res.redirect("/lists/index");
                });
            }
        });
    },

    signInForm(req, res, next) {
        res.render("users/signin");
    },

    signIn(req, res, next) {
        passport.authenticate("local")(req, res, function() {
            if (!req.user) {
                console.log("sign in error", req);
                req.flash("notice", "sign in failed. please try again.");
                res.redirect("/users/signin");
            } else {
                console.log("sign in success", req);
                req.flash("notice", "you have successfully signed in");
                res.redirect("/lists/index");
            }
        });
    },

    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "you have successfully logged out");
        res.redirect("/");
    }
};
