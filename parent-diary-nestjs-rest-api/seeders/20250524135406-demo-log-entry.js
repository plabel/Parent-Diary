'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('LogEntries', [
      {
        userId: 1,
        entry: 'This is a test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
