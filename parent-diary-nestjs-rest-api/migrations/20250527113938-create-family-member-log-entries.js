'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FamilyMemberLogEntries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      familyMemberId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        references: {
          model: "FamilyMembers",
          key: 'id',
        },
      },
      logEntryId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        references: {
          model: "LogEntries", 
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FamilyMemberLogEntries');
  }
};