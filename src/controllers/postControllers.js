const authService = require('../services/authServices');
const postService = require('../services/postServices');
const userServices = require('../services/userServices');

const postControllers = {
  listPost: async (req, res) => {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    userServices.validToken(authorization);

    authService.authToken(authorization);

    await postService.validData(title, content, categoryIds);

    const register = await postService
      .registrationCategory(authorization, title, content, categoryIds);

    return res.status(201).json(register[0]);
  },

  listAllInformation: async (req, res) => {
    const { authorization } = req.headers;

    userServices.validToken(authorization);

    authService.authToken(authorization);

    const allInformation = await postService.listBlogPostAllInformation();

    res.status(200).json(allInformation);
  },
};

module.exports = postControllers;