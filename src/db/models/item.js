"use strict";
module.exports = (sequelize, DataTypes) => {
    var Item = sequelize.define(
        "Item",
        {
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            purchased: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            listId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {}
    );
    Item.associate = function(models) {
        Item.belongsTo(models.List, {
            foreignKey: "listId",
            onDelete: "CASCADE"
        });
    };

    Item.prototype.isPurchased = function() {
        return this.purchased;
    };

    return Item;
};
