'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Nice experience',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 2,
        review: 'I love it',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'bad',
        stars: 3,
      },
      {
        spotId: 2,
        userId: 1,
        review: 'noisy',
        stars: 3.8,
      },
      {
        spotId: 1,
        userId: 2,
        review: 'convenient',
        stars: 4,
      },
      {
        spotId: 4,
        userId: 1,
        review: 'convenient',
        stars: 4,
      },
      {
        spotId: 5,
        userId: 1,
        review: 'bad',
        stars: 2,
      },
      {
        spotId: 5,
        userId: 2,
        review: 'not recommended',
        stars: 2,
      },
      {
        spotId: 6,
        userId: 2,
        review: 'cozy',
        stars: 4.5,
      },
      {
        spotId: 7,
        userId: 2,
        review: 'the host is nice',
        stars: 4.8,
      },
      {
        spotId: 8,
        userId: 2,
        review: 'it is close to the metro, nice!',
        stars: 4.3,
      },
      {
        spotId: 9,
        userId: 2,
        review: 'I would love to stay here again!',
        stars: 5,
      },
      {
        spotId: 9,
        userId: 2,
        review: 'love the design and staffs are wonderful !',
        stars: 4.7,
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
