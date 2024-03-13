'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = 'SpotImages';

module.exports = {
  async up(queryInterface, Sequelize) {
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
        url: "https://a0.muscache.com/im/pictures/110080351/a46b0f10_original.jpg?im_w=960",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-605124565051004661/original/339339b2-4b65-4987-9717-df4973979eb1.jpeg?im_w=960",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49618152/original/4d314a57-c42d-4ee1-9593-2bbc0bfe1583.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/4b89b7f4-6413-4f15-9f71-839c6f181a0f.jpg?im_w=960",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-54105603/original/df8ddc39-ebed-4094-a69b-ee26985bb700.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/9cf02d20-9538-4619-96ac-ea76d65c0898.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-24463/original/b2f90d72-1aed-4b01-917f-ed5543771c2d.jpeg?im_w=1200",
        preview: true
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-679108972241372683/original/c2ec8d12-867c-4a79-b4f6-6cc4a73dc3c2.jpeg?im_w=720",
        preview: true
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/f7b14845-1c89-450b-83f0-40f17eab3df0.jpg?im_w=1200",
        preview: true
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/3c76f067-3535-41ca-bac2-5273f9ff6c3b.jpg?im_w=720",
        preview: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image url1', 'image url2', 'image url3'] }
    }, {});
  }
};
