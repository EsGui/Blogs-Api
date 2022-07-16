'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostCategories', {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'postId',
        references: {
          model: 'BlogPosts',
          key: 'id',
        }
      },
      categoryId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'categoryId',
        references: {
          model: 'Categories',
          key: 'id',
        }
      }
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('PostCategories')
  }
};
