const Blogpost = (sequelize, DataTypes) => {
  const Blogpost = sequelize.define('Blogpost', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  return Blogpost;
};

module.exports = Blogpost;