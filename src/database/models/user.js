const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  });

  User.associate = (db) => {
    User.hasMany(db.BlogPost, { as: 'BlogPost', foreignKey: 'id' })
  }

  return User;
};

module.exports = User;