const db = require('../database')
const Sequelize = require('sequelize')

const Task = db.define('tasks', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  uid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
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
    type: Sequelize.STRING,
    allowNull: true,
  },
  priority: {
    type: Sequelize.ENUM,
    values: ['high', 'medium', 'low', 'none'],
  },
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'inProgress', 'done'],
  },
  startAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  finishAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
})

module.exports = Task
