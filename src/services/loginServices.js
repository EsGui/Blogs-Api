const { User } = require('../database/models');

const loginServices = {
  findSpecific: async (object) => {
    const find = await User.findOne(object);
    return find;
  },

  validCredentials: async (email, password) => {
    const user = await loginServices.findSpecific({ where: { email } });

    if (!email || !password) {
      const error = new Error('Some required fields are missing');
      error.name = 'ValidationError';
      throw error;
    }

    if (!user) {
      const error = new Error('Invalid fields');
      error.name = 'ValidationError';
      throw error;
    }
  },
};

module.exports = loginServices;
