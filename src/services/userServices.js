const userConditions = require('../conditions/userConditions');
const { User } = require('../database/models');

const userServices = {
  validUserData: (displayName, email, password) => {
    const { displayNameC, emailC, passwordC } = userConditions
      .conditionsAll(displayName, email, password);

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

  validToken: (token) => {
    if (!token) {
      const error = new Error('Token not found');
      error.name = 'UnauthorizedError';
      throw error;
    }
  },

  validUserSpecific: async (id, authorization) => {
    const user = await User
      .findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      const error = new Error('User does not exist');
      error.name = 'NotFoundError';
      throw error;
    } if (!authorization) {
      const error = new Error('Token not found');
      error.name = 'UnauthorizedError';
      throw error;
    }

    return user;
  },
};

module.exports = userServices;
