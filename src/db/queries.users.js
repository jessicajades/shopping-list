const User = require("../db/models").User;
const bcrypt = require("bcryptjs");

module.exports = {
    createUser(newUser, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            username: newUser.username,
            password: hashedPassword
        })
            .then(user => {
                callback(null, user);
            })
            .catch(err => {
                callback(err);
            });
    }
};
