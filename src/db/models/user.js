"use strict";
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define(
        "User",
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    );
    User.associate = function(models) {
        User.hasMany(models.List, {
            foreignKey: "userId",
            as: "lists"
        });
    };
    return User;
};
