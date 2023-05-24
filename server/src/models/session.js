const db = require('../database')
const Sequelize = require('sequelize')

const Session = db.define('sessions', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  token: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
})

module.exports = Session
