"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Queues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      imbd_code: {
        type: DataTypes.STRING
      },
      title: {
        type: DataTypes.STRING
      },
      year: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Queues").done(done);
  }
};