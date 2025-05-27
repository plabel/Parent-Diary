'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FamilyMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define many-to-many relationship with LogEntry
      FamilyMember.belongsToMany(models.LogEntry, {
        through: models.FamilyMemberLogEntries,
      });
    }
  }
  FamilyMember.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    petName: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'FamilyMember',
  });
  return FamilyMember;
};