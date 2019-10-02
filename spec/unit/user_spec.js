const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {
    beforeEach(done => {
        sequelize
            .sync({ force: true })
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
    });

    describe("#create()", () => {
        it("should create a User object with a valid username and password", done => {
            User.create({
                username: "exampleuser",
                password: "123456"
            })
                .then(user => {
                    expect(user.username).toBe("exampleuser");
                    expect(user.id).toBe(1);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });

        it("should not create a user with a username already in use", done => {
            User.create({
                username: "exampleuser",
                password: "123456"
            })
                .then(user => {
                    User.create({
                        username: "exampleuser",
                        password: "1234567"
                    })
                        .then(user => {
                            done();
                        })
                        .catch(err => {
                            expect(err.message).toContain("Validation error");
                            done();
                        });
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });
    });
});
