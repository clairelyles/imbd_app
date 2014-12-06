"use strict";

module.exports = function(sequelize, DataTypes) {
  var Queue = sequelize.define("Queue", {
    imbd_code: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Queue;
};