"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("Items", "purchased", {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("Items", "purchased");
    }
};
