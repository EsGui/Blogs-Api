const PostCategory = (sequilize, DataTypes) => {
  const PostCategory = sequilize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
  });

  PostCategory.associate = (db) => {
    db.Category.belongsToMany(db.BlogPost, {
      as: 'category',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
    db.BlogPost.belongsToMany(db.Category, {
      as: 'blogpost',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    })
  };

  return PostCategory
};

module.exports = PostCategory