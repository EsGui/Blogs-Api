const authService = require('../services/authServices');

const validateTokenRegistration = (req, _res, next) => {
    const { authorization } = req.headers;
  
    authService.authToken(authorization);
  
    next();
  };

module.exports = {
    validateTokenRegistration,
};