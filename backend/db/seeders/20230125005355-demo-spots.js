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
      {
      ownerId: 1,
      address: "5500 Queen Street ",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 38.7645358,
      lng: -123.4730327,
      name: "Palace",
      description: "Wonderland",
      price: 450,
      createdAt: "2022-01-19 20:39:36",
      updatedAt: "2022-01-19 20:39:36",

        },
      {
      ownerId: 3,
      address: "230 Lilakuma",
      city: "Tokyo",
      state: "n/a",
      country: "Japan",
      lat: 91.2245358,
      lng: -97.4730327,
      name: "Lilakuma",
      description: "Cutiest place in the world",
      price: 380,
      createdAt: "2022-05-12 20:39:36",
      updatedAt: "2022-05-12 20:39:36",

      },
      {
      ownerId: 3,
      address: "2700 King Street ",
      city: "San Francisco",
      state: "California",
      country: "United States of America",
      lat: 40.7645358,
      lng: -115.4730327,
      name: "Palace",
      description: "Hidden gem",
      price: 399,
      createdAt: "2022-05-16 20:39:36",
      updatedAt: "2022-05-16 20:39:36",

      },
      {
        ownerId: 1,
        address: "3120 Pine Lane ",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 38.6665358,
        lng: -100.4730327,
        name: "Green place",
        description: "natural",
        price: 375,
        createdAt: "2022-05-18 20:39:36",
        updatedAt: "2022-05-18 20:39:36",

      },
      {
        ownerId: 1,
        address: "8888 Oak Street ",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 40.5555358,
        lng: -125.4730327,
        name: "nuts place",
        description: "Kids will love this place",
        price: 450,
        createdAt: "2022-05-20 20:39:36",
        updatedAt: "2022-05-20 20:39:36",

      },
      {
        ownerId: 2,
        address: "6530 Puppy Street ",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 38.7645123,
        lng: -100.4730066,
        name: "Puppy wonderland",
        description: "human friendly",
        price: 154,
        createdAt: "2022-01-22 20:39:36",
        updatedAt: "2022-01-22 20:39:36",

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
