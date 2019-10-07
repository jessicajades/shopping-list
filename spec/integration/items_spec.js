const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/lists";

const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("routes : items", () => {
    beforeEach(done => {
        this.list;
        this.item;
        sequelize.sync({ force: true }).then(res => {
            List.create({
                name: "Grocery"
            }).then(list => {
                this.list = list;

                Item.create({
                    description: "avocados",
                    quantity: 5,
                    listId: this.list.id
                })
                    .then(item => {
                        this.item = item;
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            });
        });
    });

    describe("GET /lists/:listId/items/new", () => {
        it("should render a new post form", done => {
            request.get(
                `${base}/${this.list.id}/items/new`,
                (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("New Item");
                    done();
                }
            );
        });
    });

    describe("POST /lists/:listId/items/create", () => {
        it("should create a new item and redirect", done => {
            const options = {
                url: `${base}/${this.list.id}/items/create`,
                form: {
                    description: "apples",
                    quantity: 4
                }
            };

            request.post(options, (err, res, body) => {
                Item.findOne({ where: { description: "apples" } })
                    .then(item => {
                        expect(item).not.toBeNull();
                        expect(item.description).toBe("apples");
                        expect(item.quantity).toBe(4);
                        expect(item.listId).not.toBeNull();
                        done();
                    })
                    .catch(err => {
                        console.log(err);
                        done();
                    });
            });
        });
    });

    describe("GET /lists/:listId/items/:id", () => {
        it("should render a view with the selected item", done => {
            request.get(
                `${base}/${this.list.id}/items/${this.item.id}`,
                (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("avocados");
                    done();
                }
            );
        });
    });

    describe("POST /lists/:listId/items/:id/destroy", () => {
        it("should delete the item with the associated id", done => {
            expect(this.item.id).toBe(1);
            request.post(
                `${base}/${this.list.id}/items/${this.item.id}/destroy`,
                (err, res, body) => {
                    Item.findById(1).then(item => {
                        expect(err).toBeNull();
                        expect(item).toBeNull();
                        done();
                    });
                }
            );
        });
    });

    describe("GET /lists/:listId/items/:id/edit", () => {
        it("should render a view with an edit item form", done => {
            request.get(
                `${base}/${this.list.id}/items/${this.item.id}/edit`,
                (err, res, body) => {
                    expect(err).toBeNull();
                    expect(body).toContain("Edit Item");
                    expect(body).toContain("avocados");
                    done();
                }
            );
        });
    });

    describe("POST /lists/:listId/items/:id/update", () => {
        it("should return a status code 302", done => {
            request.post(
                {
                    url: `${base}/${this.list.id}/items/${this.item.id}/update`,
                    form: {
                        description: "avocados",
                        quantity: 100
                    }
                },
                (err, res, body) => {
                    expect(res.statusCode).toBe(302);
                    done();
                }
            );
        });

        it("should update the item with the given values", done => {
            const options = {
                url: `${base}/${this.list.id}/items/${this.item.id}/update`,
                form: {
                    quantity: 105
                }
            };

            request.post(options, (err, res, body) => {
                expect(err).toBeNull();
                Item.findOne({
                    where: { id: this.item.id }
                }).then(item => {
                    expect(item.quantity).toBe(105);
                    done();
                });
            });
        });
    });
});
