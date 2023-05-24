const express = require('express')
const {
  createFile,
  getUserFiles,
  updateFile,
  deleteFile,
} = require('../controllers/FileController')

const routes = express.Router()

routes.post('/', createFile)
routes.get('/:id', getUserFiles)
routes.put('/:id', updateFile)
routes.delete('/:id', deleteFile)

module.exports = routes
