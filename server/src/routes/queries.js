const express = require('express')
const routes = express.Router()

const {
  executeQuery,
  getUserSchema,
  getUserQueryHistory,
} = require('../controllers/QueryController')

routes.post('/query', executeQuery)
routes.get('/schema', getUserSchema)
routes.get('/history', getUserQueryHistory)

module.exports = routes
