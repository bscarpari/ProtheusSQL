const express = require('express')
const {
  createSession,
  deleteSession,
} = require('../controllers/SessionController')

const routes = express.Router()

routes.post('/', createSession)
routes.delete('/:id', deleteSession)

module.exports = routes
