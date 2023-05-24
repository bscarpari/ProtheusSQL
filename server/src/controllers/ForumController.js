const Forum = require('../models/forum')

const createPost = async (req, res) => {
  try {
    const { username, userId, role, title, description, status, category } =
      req.body

    const post = await Forum.create({
      username,
      userId,
      role,
      title,
      description,
      status,
      category,
      likes: 0,
      replies: [],
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const createComment = async (req, res) => {
  try {
    const { id } = req.params
    const { role, username, userId, comment } = req.body

    const post = await Forum.findOne({ where: { id } })

    if (!post) return res.status(404).send({ message: 'Post não encontrado' })

    post.replies.push({
      id: post.replies.length + 1,
      role: role || 'learner',
      username: username || 'Anônimo',
      userId: userId || null,
      comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const updatedPost = await Forum.update(
      { replies: post.replies },
      { where: { id } }
    )

    if (!updatedPost)
      return res.status(404).send({ message: 'Post não atualizado' })

    res.status(200).json(post)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Forum.findAll()

    if (!posts)
      return res.status(404).send({ message: 'Nenhum post encontrado' })

    res.status(200).send(posts)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getPostById = async (req, res) => {
  try {
    const { id } = req.params

    const post = await Forum.findOne({ where: { id } })
    if (!post) return res.status(404).send({ message: 'Post não encontrado' })

    res.status(200).json(post)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getPostByCategory = async (req, res) => {
  try {
    const { category } = req.params

    const find = await Forum.findAll({ where: { category } })

    if (!find)
      return res
        .status(404)
        .send({ message: 'Nenhum post com esta categoria encontrado' })

    res.status(200).json(find)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const updatePost = async (req, res) => {
  try {
    const { id } = req.params

    const [updated] = await Forum.update(req.body, { where: { id } })

    if (!updated)
      return res
        .status(404)
        .send({ message: 'Não foi possível atualizar o post' })

    const updatedPost = await Forum.findOne({ where: { id } })
    return res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params
    const { comment: receivedComment } = req.body

    const post = await Forum.findOne({ where: { id } })
    if (!post) return res.status(404).send({ message: 'Post não encontrado' })

    const comments = post.replies
    if (!comments)
      return res
        .status(404)
        .send({ message: 'Não há comentários para este post' })

    const comment = post.replies.find(
      (reply) => reply.id === parseInt(commentId)
    )
    if (!comment)
      return res.status(404).send({ message: 'Comentário não encontrado' })
    console.table(comment)

    comment.comment = receivedComment
    comment.updatedAt = new Date()

    const [updated] = await Forum.update(
      { replies: post.replies },
      { where: { id } }
    )

    if (!updated)
      return res
        .status(404)
        .send({ message: 'Não foi possível atualizar o comentário' })

    const updatedPost = await Forum.findOne({ where: { id } })
    return res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const { id } = req.params

    const post = await Forum.findOne({ where: { id } })

    if (!post) return res.status(404).send({ message: 'Post não encontrado' })

    const deletedPost = await Forum.destroy({ where: { id } })

    if (!deletedPost)
      return res
        .status(404)
        .send({ message: 'Não foi possível deletar o post' })

    res.status(200).send({ message: 'Post deletado com sucesso' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params

    const post = await Forum.findOne({ where: { id } })
    if (!post) return res.status(404).send({ message: 'Post não encontrado' })
    if (!post.replies)
      return res
        .status(404)
        .send({ message: 'Não há comentários para este post' })

    post.replies = post.replies.filter(
      (reply) => reply.id !== parseInt(commentId)
    )
    await Forum.update({ replies: post.replies }, { where: { id } })

    res.status(200).send({ message: 'Comentário deletado com sucesso' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  getAllPosts,
  createPost,
  createComment,
  getPostById,
  getPostByCategory,
  updatePost,
  updateComment,
  deletePost,
  deleteComment,
}
