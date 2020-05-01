'use strict';
module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    location: DataTypes.STRING,
    content: DataTypes.TEXT, 
    userId: DataTypes.INTEGER
  }, {});
  event.associate = function(models) {
    // associations can be defined here
    models.event.belongsTo(models.user, {foreignKey: 'userId'})
  };
  return event;
};