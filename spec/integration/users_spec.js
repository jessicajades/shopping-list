const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : users", () => {
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

    describe("GET /users/signup", () => {
        it("should render a view with a sign up form", done => {
            request.get(`${base}signup`, (err, res, body) => {
                expect(err).toBeNull;
                expect(body).toContain("Sign up");
                done();
            });
        });
    });

    describe("POST /users", () => {
        it("should create a new user with valid values and redirect", done => {
            const options = {
                url: base,
                form: {
                    username: "exampleuser",
                    password: "123456"
                }
            };

            request.post(options, (err, res, body) => {
                User.findOne({ where: { username: "exampleuser" } })
                    .then(user => {
                        expect(user).not.toBeNull();
                        expect(user.username).toBe("exampleuser");
                        expect(user.id).toBe(1);
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            });
        });
    });

    describe("GET /users/signin", () => {
        it("should render a view with a sign in form", done => {
            request.get(`${base}signin`, (err, res, body) => {
                expect(err).toBeNull();
                expect(body).toContain("Sign in");
                done();
            });
        });
    });

    describe("POST /users/signin", () => {
        it("should sign user in and redirect", done => {
            const options = {
                url: base,
                form: {
                    username: "exampleuser",
                    password: "123456"
                }
            };

            request.post(options, (err, res, body) => {
                User.findOne({ where: { username: "exampleuser" } })
                    .then(user => {
                        expect(user).not.toBeNull();
                        expect(user.username).toBe("exampleuser");
                        expect(user.id).toBe(1);
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            });
        });
    });
});
