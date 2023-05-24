const path = require('path')
const cors = require('cors')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// load env variables
require('dotenv').config()

// create express app
const app = express()

// middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'temp'),
  })
)

// cors
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  )
  res.header('Access-Control-Allow-Credentials', true)
  next()
})

// import routes
const {
  authRouter,
  usersRouter,
  tasksRouter,
  queriesRouter,
  filesRouter,
  forumRouter
} = require('./src/routes/index')

// routes
app.use('/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/files', filesRouter)
app.use('/api/queries', queriesRouter)
app.use('/api/forum', forumRouter)

const serverStart = () => {
  const port = process.env.BACKEND_PORT || 3000

  try {
    app.listen(port, () => {
      console.log(`\nServer listening on port ${port}\n`)
    })
  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

serverStart()
