const userServices = require('../services/userServices');
const generateToken = require('./jwtController');
const { User } = require('../database/models');

const userController = {
  validData: async (req, res) => {
    const { displayName, email, password } = req.body;

    userServices.validUserData(displayName, email, password);
    await userServices.validEmailExist(email);
    await User.create(req.body);

    const token = generateToken.createToken();

    return res.status(201).json({ token });
  },
};

module.exports = userController;
