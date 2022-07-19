const loginServices = require('../services/loginServices');
const generateToken = require('./jwtController');

const loginController = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    await loginServices.validCredentials(email, password);

    const create = generateToken.createToken({ email, password });

    return res.status(200).json({ token: create });
  },
};

module.exports = loginController;