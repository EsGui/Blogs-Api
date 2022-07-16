const vToken = require('../controllers/jwtController');

const authService = {
  authToken: (token) => {
    const data = vToken.validateToken(token);

    return data;
  },
};

module.exports = authService;