const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
  });

  return User;
};

module.exports = User;