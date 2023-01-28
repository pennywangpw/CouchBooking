'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'Bookings';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate:"2023-05-19",
        endDate:"2023-05-22"
      },
      {
        spotId: 2,
        userId: 2,
        startDate:"2021-12-10",
        endDate:"2021-12-18"
      },
      {
        spotId: 2,
        userId: 2,
        startDate:"2023-12-10",
        endDate:"2023-12-18"
      },
      {
        spotId: 3,
        userId: 3,
        startDate:"2021-10-20",
        endDate:"2021-10-22"
      },
      {
        spotId: 3,
        userId: 2,
        startDate:"2021-07-20",
        endDate:"2021-07-22"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ["2021-10-19", "2021-12-10", "2021-10-20"] }
    }, {});
  }
};
