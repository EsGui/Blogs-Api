'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('Categories');
  },
};
