'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'Administrador',
        email: 'admin@protheus.com',
        password:
          '$2b$10$JJ6bI7hdf/alXSO6hcJ1TuZaEk5UljWWFOqELD4u.DENeFTa.PVmu', // Admin@2023
        role: 'admin',
        picture: 'https://randomuser.me/api/portraits/med/men/1.jpg',
        forumPosition: 1,
        online: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'voluntario',
        email: 'voluntario@protheus.com',
        password:
          '$2b$10$f1owr8vS4O59ahLfaltiFujYsHLOMtghOJ3DRnyjhIiXUj7kDsx2a', // Voluntario@2023
        role: 'voluntary',
        picture: 'https://randomuser.me/api/portraits/med/men/2.jpg',
        forumPosition: 2,
        online: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'aprendiz',
        email: 'aprendiz@protheus.com',
        password:
          '$2b$10$7Ddf8lLtIK.AEoWvXEwdXu2hniRnFhPDekHmW2MCdf/xrx7zfor3G', // Aprendiz@2023
        role: 'learner',
        picture: 'https://randomuser.me/api/portraits/med/men/3.jpg',
        forumPosition: 3,
        online: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
