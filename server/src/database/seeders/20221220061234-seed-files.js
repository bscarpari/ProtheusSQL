'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('files', [
      {
        id: 1,
        userId: 1,
        filename: 'file1.txt',
        size: 100,
        type: 'text/plain',
        path: 'uploads/file1.txt',
        data: 'Hello World 1!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        filename: 'file2.txt',
        size: 200,
        type: 'text/plain',
        path: 'uploads/file2.txt',
        data: 'Hello World 2!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 3,
        filename: 'file3.txt',
        size: 200,
        type: 'text/plain',
        path: 'uploads/file3.txt',
        data: 'Hello World 3!',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('files', null, {})
  },
}
