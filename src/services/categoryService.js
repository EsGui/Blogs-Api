const { Category } = require('../database/models');

const categoryService = {
  validName: (name) => {
    if (!name) {
      const error = new Error('"name" is required');
      error.name = 'ValidationError';
      throw error;
    }
  },

  createCategory: async (name) => {
    await Category.create({ name });

    const idCategory = await Category.findAll();

    return idCategory[idCategory.length - 1];
  },

  findAllCategory: async (object) => {
    const listCategory = await Category.findAll(object);

    return listCategory;
  },
};

module.exports = categoryService;