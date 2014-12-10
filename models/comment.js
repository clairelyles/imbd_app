"use strict";

module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define("comment", {
    content: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // comment BELONGS TO one watch list item
        
      }
    }
  });

  return comment;
};
