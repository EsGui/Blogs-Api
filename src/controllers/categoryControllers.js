const authService = require('../services/authServices');
const categoryService = require('../services/categoryService');
const userServices = require('../services/userServices');

const categoryController = {
  listCategorySpecific: async (req, res) => {
    const { name } = req.body;

    const { authorization } = req.headers;

    userServices.validToken(authorization);

    authService.authToken(authorization);

    categoryService.validName(name);

    const category = await categoryService.createCategory(name);

    return res.status(201).json(category);
  },

  listAllCategory: async (req, res) => {
    const { authorization } = req.headers;

    userServices.validToken(authorization);

    authService.authToken(authorization);

    const allCategory = await categoryService
      .findAllCategory({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
    
    return res.status(200).json(allCategory);
  },
};

module.exports = categoryController;