const express = require('express')
const routes = express.Router()
const {
    createPost,
    createComment,
    getAllPosts,
    getPostById,
    getPostByCategory,
    updatePost,
    updateComment,
    deletePost,
    deleteComment
} = require('../controllers/ForumController.js')

routes.get('/', getAllPosts)
routes.get('/:id', getPostById)
routes.get('/:category', getPostByCategory)
routes.post('/new_post', createPost)
routes.post('/new_comment/:id', createComment)
routes.put('/:id', updatePost)
routes.put('/:id/:commentId', updateComment)
routes.delete('/:id/', deletePost)
routes.delete('/:id/:commentId', deleteComment)

module.exports = routes
