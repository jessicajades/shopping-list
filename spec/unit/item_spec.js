const sequelize = require("../../src/db/models/index").sequelize;
const List = require("../../src/db/models").List;
const Item = require("../../src/db/models").Item;

describe("Item", () => {
    beforeEach(done => {
        this.list;
        this.item;
        sequelize.sync({ force: true }).then(res => {
            List.create({
                name: "Grocery"
            })
                .then(list => {
                    this.list = list;

                    Item.create({
                        description: "bananas",
                        quantity: 5,
                        listId: this.list.id
                    }).then(item => {
                        this.item = item;
                        done();
                    });
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });
    });

    describe("#create()", () => {
        it("should create a new item with description and assigned list", done => {
            Item.create({
                description: "avocados",
                quantity: 3,
                listId: this.list.id
            })
                .then(item => {
                    expect(item.description).toBe("avocados");
                    expect(item.quantity).toBe(3);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });

        it("should not create an item with missing description, quantity, or assigned list", done => {
            Item.create({
                description: "lemons"
            })
                .then(item => {
                    done();
                })
                .catch(err => {
                    expect(err.message).toContain(
                        "Item.quantity cannot be null"
                    );
                    expect(err.message).toContain("Item.listId cannot be null");
                    done();
                });
        });
    });

    describe("#setList()", () => {
        it("should associate a list and an item together", done => {
            List.create({
                name: "Grocery"
            }).then(newList => {
                expect(this.item.listId).toBe(this.list.id);
                this.item.setList(newList).then(item => {
                    expect(item.listId).toBe(newList.id);
                    done();
                });
            });
        });
    });

    describe("#getList()", () => {
        it("should return the associated list", done => {
            this.item.getList().then(associatedList => {
                expect(associatedList.name).toBe("Grocery");
                done();
            });
        });
    });
});
