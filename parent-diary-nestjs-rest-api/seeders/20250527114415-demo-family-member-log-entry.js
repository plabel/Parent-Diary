'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('FamilyMemberLogEntries', [
      {
        familyMemberId: 1,
        logEntryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        familyMemberId: 3,
        logEntryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        familyMemberId: 4,
        logEntryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        familyMemberId: 4,
        logEntryId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        familyMemberId: 3,
        logEntryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        familyMemberId: 1,
        logEntryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FamilyMemberLogEntries', null, {});
  },
};
