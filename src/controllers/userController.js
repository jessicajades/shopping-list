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

        userQueries.createUser(newUser, (err, user) => {
            if (err) {
                req.flash("error", err);
                res.redirect("/users/signup");
            } else {
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've successfully signed in!");
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
                req.flash("notice", "sign in failed. please try again.");
                res.redirect("/users/signin");
            } else {
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
