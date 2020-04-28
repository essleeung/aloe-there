'use strict';
module.exports = (sequelize, DataTypes) => {
  const plant = sequelize.define('plant', {
    commonName: DataTypes.STRING,
    sciName: DataTypes.STRING,
    category: DataTypes.STRING,
    link: DataTypes.STRING,
    pic: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    care: DataTypes.TEXT
  }, {});
  plant.associate = function(models) {
    // associations can be defined here
    // models.plant.belongsToMany(models.category, {through: 'plant_category'})

  };
  return plant;
};