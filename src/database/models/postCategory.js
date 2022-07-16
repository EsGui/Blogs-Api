const BlogPost = require("./blogPost");
const Category = require("./category");

const postCategory = (sequilize, DataTypes) => {
  const postCategory = sequilize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER, 
    }
  });

  postCategory.associate = (db) => {
    db.Category.belongsToMany(db.BlogPost, {
      as: 'category',
      through: postCategory,
      foreignKey: 'id',
      otherKey: 'id'
    });
    db.BlogPost.belongsToMany(db.Category, {
      as: 'blogpost',
      through: postCategory,
      foreignKey: 'id',
      otherKey: 'id'
    })
  };

  return postCategory
};

module.exports = postCategory