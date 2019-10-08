const itemQueries = require("../db/queries.items.js");

module.exports = {
    new(req, res, next) {
        res.render("items/new", { listId: req.params.listId });
    },

    create(req, res, next) {
        let newItem = {
            description: req.body.description,
            quantity: req.body.quantity,
            listId: req.params.listId
        };

        itemQueries.addItem(newItem, (err, item) => {
            if (err) {
                res.redirect(500, "/items/new");
            } else {
                res.redirect(303, `/lists/${newItem.listId}/items/${item.id}`);
            }
        });
    },

    show(req, res, next) {
        itemQueries.getItem(req.params.id, (err, item) => {
            if (err || item == null) {
                res.redirect(404, "/");
            } else {
                res.render("items/show", { item });
            }
        });
    },

    destroy(req, res, next) {
        itemQueries.deleteItem(req.params.id, (err, deletedRecordsCount) => {
            if (err) {
                res.redirect(
                    500,
                    `/lists/${req.params.listId}/items/${req.params.id}`
                );
            } else {
                res.redirect(303, `/lists/${req.params.listId}`);
            }
        });
    },

    edit(req, res, next) {
        itemQueries.getItem(req.params.id, (err, item) => {
            if (err || item == null) {
                res.redirect(404, "/");
            } else {
                res.render("items/edit", { item });
            }
        });
    },

    update(req, res, next) {
        itemQueries.updateItem(req.params.id, req.body, (err, item) => {
            if (err || item == null) {
                res.redirect(
                    404,
                    `/lists/${req.params.listId}/items/${req.params.id}/edit`
                );
            } else {
                res.redirect(
                    `/lists/${req.params.listId}/items/${req.params.id}`
                );
            }
        });
    },

    purchased(req, res, next) {
        itemQueries.updateStatus(req.params.id, (err, item) => {
            console.log(item);
        });
    }
};
