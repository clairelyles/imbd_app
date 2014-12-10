"use strict";

module.exports = function(sequelize, DataTypes) {
  var queue = sequelize.define("queue", {
    imbd_code: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // queue item HAS MANY comments
        models.queue.hasMany(models.final)
      }
    }
  });

  return queue;
};
