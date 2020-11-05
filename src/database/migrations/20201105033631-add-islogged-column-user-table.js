'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn(
            'users',
            'isLogged', {
                type: Sequelize.BOOLEAN
            });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn(
            'users',
            'isLogged'
        );
    }
};