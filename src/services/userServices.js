const userConditions = require('../conditions/userConditions');
const { User } = require('../database/models');

const userServices = {
  validUserData: (displayName, email, password) => {
    const { displayNameC, emailC, passwordC } = userConditions
      .conditions(displayName, email, password);

    if (displayNameC) {
      const error = new Error('"displayName" length must be at least 8 characters long');
      error.name = 'ValidationError';
      throw error;
    }

    if (!emailC) {
      const error = new Error('"email" must be a valid email');
      error.name = 'ValidationError';
      throw error;
    }

    if (passwordC) {
      const error = new Error('"password" length must be at least 6 characters long');
      error.name = 'ValidationError';
      throw error;
    }
  },

  validEmailExist: async (email) => {
    const users = await User.findAll();

    users.forEach((user) => {
      if (user.email === email) {
        const error = new Error('User already registered');
        error.name = 'ConflictError';
        throw error;
      }
    });
  },
};

module.exports = userServices;
