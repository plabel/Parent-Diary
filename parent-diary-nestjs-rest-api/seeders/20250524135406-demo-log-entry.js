'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('LogEntries', [
      {
        userId: 1,
        entry: 'We celebrated our 15 years wedding anniversary together as a couple while the children stayed at their granny\'s house. We went to the restaurant and then went to see a movie.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        entry: 'This is another test log entry',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'I brought the kids to disneyland this weekend. Dodo loved it and we had a lot of fun, unfortunately Jojo had a tougher time because he felt sick and had a cold.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'Dodo is going to highschool this month. It will be the start of a new adventure for him. We hope that he will learn a lot of things and have good friends.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        entry: 'Today it was Jojo\'s birthday, he turned 8. We went at the park and he had a chocolate chip cookie birthday cake which he really liked.',
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
