const Categorie = (Sequilize, DataTypes) => {
  const Categorie = Sequilize.define('Categorie', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    categoryId: DataTypes.INTEGER,
    name: DataTypes.STRING
  });

  return Categorie;
};

module.exports = Categorie