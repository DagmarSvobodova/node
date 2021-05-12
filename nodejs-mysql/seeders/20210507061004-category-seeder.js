'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [{
                name: 'NodeJs'
            }, {
                name: 'VueJs'
            }, {
                name: 'Reactjs'
            },
            {
                name: 'Laravel'
            }
        ]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', {}, null)
    }
};