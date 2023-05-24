// Auth
const authRouter = require('./auth')

// Users
const usersRouter = require('./users')

// Tasks
const tasksRouter = require('./tasks')

// Queries
const queriesRouter = require('./queries')

// Files
const filesRouter = require('./files')

// Blog
const forumRouter = require('./forum')

module.exports = {
  authRouter,
  usersRouter,
  tasksRouter,
  queriesRouter,
  filesRouter,
  forumRouter
}
  