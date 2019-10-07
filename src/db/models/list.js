"use strict";
module.exports = (sequelize, DataTypes) => {
    var List = sequelize.define(
        "List",
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "Users",
                    key: "id",
                    as: "userId"
                }
            }
        },
        {}
    );
    List.associate = function(models) {
        List.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });
        List.hasMany(models.Item, {
            foreignKey: "listId",
            as: "items"
        });
    };
    return List;
};
