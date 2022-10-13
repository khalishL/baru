"use strict";
const fs = require(`fs`);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const data = JSON.parse(fs.readFileSync(`./data/profile.json`, "utf-8"));
    const parsedData = data.map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    return queryInterface.bulkInsert("Profiles", parsedData);
  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.deleteInsert("Profiles", parsedData);
  },
};
