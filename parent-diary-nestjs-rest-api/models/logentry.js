'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LogEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define many-to-many relationship with FamilyMember
      LogEntry.belongsToMany(models.FamilyMember, {
        through: models.FamilyMemberLogEntries,
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      });
    }
  }
  LogEntry.init({
    userId: DataTypes.INTEGER,
    entry: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'LogEntry',
  });
  return LogEntry;
};