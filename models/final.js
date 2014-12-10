"use strict";

module.exports = function(sequelize, DataTypes) {
  var final = sequelize.define("final", {
    content: DataTypes.STRING,
    queueId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.final.belongsTo(models.queue)
      }
    }
  });

  return final;
};
