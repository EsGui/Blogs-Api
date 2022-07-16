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
    postCategory.hasMany(db.BlogPost, { as: 'BlogPost', foreignKey: 'id' });
  };

  return postCategory
};

module.exports = postCategory