'use strict';
module.exports = (sequelize, DataTypes) => {
  const wishlist = sequelize.define('wishlist', {
    userId: DataTypes.INTEGER,
    plantId: DataTypes.INTEGER
  }, {});
  wishlist.associate = function(models) {
    // associations can be defined here
  };
  return wishlist;
};