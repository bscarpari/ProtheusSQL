const db = require('../database')
const Sequelize = require('sequelize')

const Query = db.define('queries', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  history: {
    type: Sequelize.JSON,
    defaultValue: [],
    allowNull: true,
  },
})

module.exports = Query
