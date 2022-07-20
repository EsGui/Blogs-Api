const userServices = require('../services/userServices');
const generateToken = require('./jwtController');
const { User } = require('../database/models');
const authService = require('../services/authServices');

const userController = {
  validDataUser: async (req, res) => {
    const { displayName, email, password } = req.body;

    userServices.validUserData(displayName, email, password);

    await userServices.validEmailExist(email);

    await User.create(req.body);

    const token = generateToken.createToken(req.body);

    return res.status(201).json({ token });
  },

  listAllUser: async (req, res) => {
    const { authorization } = req.headers;

    userServices.validToken(authorization);

    authService.authToken(authorization);

    const allUser = await User
      .findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json(allUser);
  },

  userSpecific: async (req, res) => {
    const { id } = req.params;

    const { authorization } = req.headers;

    userServices.validToken(authorization);

    authService.authToken(authorization);

    const user = await userServices.validUserSpecific(id, authorization);

    res.status(200).json(user);
  },
};

module.exports = userController;
