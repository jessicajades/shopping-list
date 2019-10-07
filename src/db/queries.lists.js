const List = require("./models").List;
const Item = require("./models").Item;

module.exports = {
    getAllLists(callback) {
        return List.findAll()
            .then(lists => {
                callback(null, lists);
            })
            .catch(err => {
                callback(err);
            });
    },

    getList(id, callback) {
        return List.findById(id, {
            include: [
                {
                    model: Item,
                    as: "items"
                }
            ]
        })
            .then(list => {
                callback(null, list);
            })
            .catch(err => {
                callback(err);
            });
    },

    addList(newList, callback) {
        return List.create({
            name: newList.name
        })
            .then(list => {
                callback(null, list);
            })
            .catch(err => {
                callback(err);
            });
    },

    deleteList(id, callback) {
        return List.destroy({
            where: { id }
        })
            .then(list => {
                callback(null, list);
            })
            .catch(err => {
                callback(err);
            });
    },

    updateList(id, updatedList, callback) {
        return List.findById(id).then(list => {
            if (!list) {
                return callback("list not found");
            }

            list.update(updatedList, {
                fields: Object.keys(updatedList)
            })
                .then(() => {
                    callback(null, list);
                })
                .catch(err => {
                    callback(err);
                });
        });
    }
};
