const Sequelize = require('sequelize')
const { database, username, dialect, host, password } = require('../config/db')

// Connection with the general database GERAL
const connection = new Sequelize(database, username, password, {
  dialect,
  host,
  define: {
    timestamps: true,
  },
  logging: false,
})

// Create the models at the database and synchonized them
connection
  .sync({ force: false })
  .then(() => {
    console.log('\nDatabase synchronized.')
  })
  .catch((e) => {
    console.log(
      `\nDatabase not synchronized.\nError: ${e.parent?.message || e}`
    )
  })

module.exports = connection
