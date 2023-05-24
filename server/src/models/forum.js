const db = require('../database')
const Sequelize = require('sequelize')

const Forum = db.define(
  'forum',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      defaultValue: 'Anônimo',
      allowNull: true,
    },
    role: {
      type: Sequelize.ENUM,
      values: ['admin', 'voluntary', 'learner'],
      defaultValue: 'learner',
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'resolved', 'canceled'],
      defaultValue: 'pending',
    },
    category: {
      type: Sequelize.ENUM,
      values: ['general', 'problems', 'suggestions'],
    },
    likes: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: true,
    },
    replies: {
      type: Sequelize.JSON,
      defaultValue: [],
      allowNull: true,
    },
    likedBy: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: [],
      allowNull: true,
    },
  },
  {
    tableName: 'forum',
  }
)

module.exports = Forum
