require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  validateToken: (token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (e) {
      if (JSON.stringify(e).includes('provided')) {
        const error = new Error('Token not found');
        error.name = 'UnauthorizedError';
        throw error;
      } if (JSON.stringify(e).includes('malformed')) {
        const error = new Error('Expired or invalid token');
        error.name = 'UnauthorizedError';
        throw error;
      }
    }
  },
};

module.exports = jwtService;