'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('forum', [
      {
        id: 1,
        userId: 1,
        role: 'admin',
        username: 'Administrador',
        title: 'Problema com a foto de perfil',
        description: 'Estou com problemas para fazer trocar de foto de perfil no sistema',
        status: 'pending',
        category: 'problems',
        likes: 2,
        replies: JSON.stringify([
          {
            id: 1,
            userId: 2,
            role: 'voluntary',
            username: 'Voluntário',
            comment: 'Também estou com o mesmo problema',
            createdAt: new Date(),
            updatedAt: new Date(),
            replies: [],
          },
          {
            id: 2,
            userId: 3,
            role: 'learner',
            username: 'Aprendiz',
            comment: 'Também estou com o mesmo problema',
            createdAt: new Date(),
            updatedAt: new Date(),
            replies: [],
          },
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        role: 'voluntary',
        username: 'Voluntário',
        title: 'Sugestão de melhorias',
        description: 'Gostaria de sugerir melhorias no sistema',
        status: 'canceled',
        category: 'suggestions',
        likes: 14,
        replies: JSON.stringify([
          {
            id: 1,
            userId: 1,
            role: 'admin',
            username: 'Administrador',
            comment: 'Também estou com o mesmo problema',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            userId: 1,
            role: 'admin',
            username: 'Administrador',
            comment: 'Recomendo que você faça isso e aquilo',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 3,
        role: 'learner',
        username: 'Aprendiz',
        title: 'Contar os registros de cada tabela no SQL',
        description: 'Gostaria de saber como contar os registros de cada tabela no SQL',
        status: 'resolved',
        category: 'general',
        likes: 4,
        replies: JSON.stringify([
          {
            id: 1,
            userId: 2,
            role: 'voluntary',
            username: 'Voluntário',
            comment: 'Talvez se você fizer isso e aquilo',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            userId: 1,
            role: 'admin',
            username: 'Administrador',
            comment: 'Claro que sim, você pode fazer isso e aquilo',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('forum', null, {});
  }
};
