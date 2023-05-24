const db = require('../database')
const Sequelize = require('sequelize')

const File = db.define('files', {
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
  filename: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.BLOB,
    allowNull: false,
  },
})

module.exports = File
