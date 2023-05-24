const express = require('express')
const {
  createTask,
  getTasks,
  getTaskById,
  getTasksByUserId,
  updateTask,
  deleteTask,
} = require('../controllers/TaskController')

const routes = express.Router()

routes.post('/create', createTask)
routes.get('/', getTasks)
routes.get('/:id', getTaskById)
routes.post('/userTasks', getTasksByUserId)
routes.put('/:id', updateTask)
routes.delete('/:id', deleteTask)

module.exports = routes
