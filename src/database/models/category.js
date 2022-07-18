const Category = (Sequilize, DataTypes) => {
  const Category = Sequilize.define('Category', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  return Category;
};

module.exports = Category