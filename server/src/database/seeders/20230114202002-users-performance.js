"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users_performance",
      [
        {
          id: 1,
          userId: 1,
          username: "Administrador",
          attemptHistory: JSON.stringify([
            {
              attemptId: 1,
              attempts: 15,
              correct: 10,
              incorrect: 5,
              createdAt: new Date(2022, 0, 1),
              updatedAt: new Date(2022, 0, 1),
            },
            {
              attemptId: 2,
              attempts: 8,
              correct: 5,
              incorrect: 3,
              createdAt: new Date(2022, 0, 2),
              updatedAt: new Date(2022, 0, 2),
            },
            {
              attemptId: 3,
              attempts: 17,
              correct: 15,
              incorrect: 2,
              createdAt: new Date(2022, 0, 3),
              updatedAt: new Date(2022, 0, 3),
            },
          ]),
          forumPosts: 79,
          forumReplies: 182,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          userId: 2,
          username: "Voluntário",
          attemptHistory: JSON.stringify([
            {
              attemptId: 1,
              attempts: 35,
              correct: 23,
              incorrect: 12,
              createdAt: new Date(2022, 0, 4),
              updatedAt: new Date(2022, 0, 4),
            },
            {
              attemptId: 2,
              attempts: 10,
              correct: 8,
              incorrect: 2,
              createdAt: new Date(2022, 0, 5),
              updatedAt: new Date(2022, 0, 5),
            },
            {
              attemptId: 3,
              attempts: 36,
              correct: 13,
              incorrect: 23,
              createdAt: new Date(2022, 0, 6),
              updatedAt: new Date(2022, 0, 6),
            },
          ]),
          forumPosts: 29,
          forumReplies: 75,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          userId: 3,
          username: "Aprendiz",
          attemptHistory: JSON.stringify([
            {
              attemptId: 1,
              attempts: 35,
              correct: 23,
              incorrect: 12,
              createdAt: new Date(2022, 0, 10),
              updatedAt: new Date(2022, 0, 10),
            },
            {
              attemptId: 2,
              attempts: 12,
              correct: 8,
              incorrect: 4,
              createdAt: new Date(2022, 0, 12),
              updatedAt: new Date(2022, 0, 12),
            },
            {
              attemptId: 3,
              attempts: 36,
              correct: 13,
              incorrect: 23,
              createdAt: new Date(2022, 0, 14),
              updatedAt: new Date(2022, 0, 14),
            },
            {
              attemptId: 4,
              attempts: 30,
              correct: 10,
              incorrect: 20,
              createdAt: new Date(2022, 0, 16),
              updatedAt: new Date(2022, 0, 16),
            },
            {
              attemptId: 5,
              attempts: 38,
              correct: 14,
              incorrect: 24,
              createdAt: new Date(2022, 0, 18),
              updatedAt: new Date(2022, 0, 18),
            },
            {
              attemptId: 6,
              attempts: 22,
              correct: 3,
              incorrect: 19,
              createdAt: new Date(2022, 0, 20),
              updatedAt: new Date(2022, 0, 20),
            },
          ]),
          forumPosts: 17,
          forumReplies: 32,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_performance", null, {})
  },
}
