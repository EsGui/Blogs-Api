const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
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

  BlogPost.associate = (db) => {
    BlogPost.belongsTo(db.User, { as: 'User', foreignKey: 'id' })
  }

  return BlogPost;
};

module.exports = BlogPost;