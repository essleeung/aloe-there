'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    time: DataTypes.TIME,
    content: DataTypes.TEXT
  }, {});
  event.associate = function(models) {
    // associations can be defined here
  };
  return event;
};