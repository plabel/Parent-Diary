'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isEmailVerified: true,
        passwordHash: '7cf0d0ae84e7cc1f6667c59f92c11e09d9f12da389490502c39e7d5106ffb00f',
        salt: '2a5b56e548971eed76c65369f5e5a533e4fdded4',
        otpSecret: 'FV6AO53SDEQVEM3K',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'example2@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
        isEmailVerified: true,
        passwordHash: '7cf0d0ae84e7cc1f6667c59f92c11e09d9f12da389490502c39e7d5106ffb00f',
        salt: '2a5b56e548971eed76c65369f5e5a533e4fdded4',
        otpSecret: 'FV6AO53SDEQVEM3K',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
