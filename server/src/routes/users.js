const express = require('express')
const {
  createUser,
  getUsers,
  getUserById,
  getUserProfile,
  getUsersStatus,
  getUsersPerformance,
  updateUser,
  deleteUser,
  // deleteAllUsers,
} = require('../controllers/UserController')

const routes = express.Router()

routes.post('/', createUser)
routes.get('/', getUsers)
routes.get('/:id', getUserById)
routes.post('/profile', getUserProfile)
routes.get('/performance', getUsersPerformance)
routes.post('/status', getUsersStatus)
routes.post('/', getUsers)
routes.put('/:id', updateUser)
routes.delete('/:id', deleteUser)
// routes.delete('/deleteAll', deleteAllUsers)

module.exports = routes
