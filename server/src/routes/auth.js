const express = require('express')
const {
  login,
  register,
  sendResetEmail,
  resetPassword,
  logout,
} = require('../controllers/AuthController')
const rules = require('../validations/validator')

const routes = express.Router()

routes.post('/register', rules.register, register)
routes.post('/login', rules.login, login)
routes.get('/logout', logout)
routes.post('/forgotPassword', rules.forgot, sendResetEmail)
routes.post('/resetPassword/:id/:token', rules.reset, resetPassword)

module.exports = routes
