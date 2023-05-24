const db = require("../database")
const Sequelize = require("sequelize")

const UsersPerformance = db.define(
  "users_performance",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    username: {
      type: Sequelize.STRING,
      defaultValue: "Anônimo",
      allowNull: false,
    },
    attemptHistory: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    forumPosts: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    forumReplies: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "users_performance",
  }
)

module.exports = UsersPerformance
