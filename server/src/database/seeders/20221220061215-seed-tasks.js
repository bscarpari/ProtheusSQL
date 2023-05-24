'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        id: 1,
        uid: 'ce91ec1d-c0fd-4808-8c90-b54bc59f92bd',
        userId: 1,
        title: 'Aprender SQL',
        description: 'Exemplo de desc 01',
        priority: 'low',
        status: 'pending',
        startAt: new Date(),
        finishAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        uid: '116d7725-1f9a-4423-8f1f-b6bb2947c79e',
        userId: 1,
        title: 'Aprender Javascript',
        description: 'Exemplo de desc 02',
        priority: 'medium',
        status: 'inProgress',
        startAt: new Date(),
        finishAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        uid: '7eea8600-c26e-46e1-8622-460bcb198ad0',
        userId: 1,
        title: 'Aprender HTML',
        description: 'Exemplo de desc 03',
        priority: 'high',
        status: 'done',
        startAt: new Date(),
        finishAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        uid: '00c1ad4b-677a-4d58-8b7d-03a2e978362e',
        userId: 2,
        title: 'Aprender Javascript',
        description: 'Exemplo de desc',
        priority: 'medium',
        status: 'pending',
        startAt: new Date(),
        finishAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {})
  },
}
