'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Categories', [
    {
      name: 'Art',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Ceramic',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Wood',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Electronic',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Silver',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
