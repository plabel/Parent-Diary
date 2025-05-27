'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('FamilyMembers', [
      {
        firstName: 'Jane',
        lastName: 'Doe',
        petName: 'Love',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Alice',
        lastName: 'Doe',
        petName: 'Pumpkin',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Josh',
        lastName: 'Doe',
        petName: 'Jojo',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Dorian',
        lastName: 'Doe',
        petName: 'Dodo',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Alice',
        lastName: 'Doe',
        petName: 'Pumpkin',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        petName: 'Honey',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('FamilyMembers', null, {});
  }
};
