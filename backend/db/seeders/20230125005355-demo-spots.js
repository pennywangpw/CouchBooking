'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';
/** @type {import('sequelize-cli').Migration} */
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
      ownerId: 2,
      address: "123 Disney Lane",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 37.7645358,
      lng: -122.4730327,
      name: "App Academy",
      description: "Place where web developers are created",
      price: 123,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",

      },
      {
      ownerId: 2,
      address: "150 Happy Street",
      city: "Seattle",
      state: "Washington",
      country: "United States of America",
      lat: 80.7645358,
      lng: -170.4730327,
      name: "Nice sunset",
      description: "asdfjkfl",
      price: 155,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",

      },
      {
      ownerId: 1,
      address: "2500 Disney Lane",
      city: "Tokyo",
      state: "n/a",
      country: "Japan",
      lat: 99.7645358,
      lng: -100.4730327,
      name: "Disney",
      description: "Magical palce",
      price: 200,
      createdAt: "2021-11-19 20:39:36",
      updatedAt: "2021-11-19 20:39:36",

        },


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
      city: { [Op.in]: ['San Jose', 'New York'] }
    }, {});
  }
};
