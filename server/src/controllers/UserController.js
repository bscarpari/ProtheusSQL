const User = require('../models/user')
const UsersPerformance = require('../models/users_performance')
const jwt = require('jsonwebtoken')

/**
 * Cria um novo usuário
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 */
const createUser = async (req, res) => {
  try {
    const { email } = req.body

    const userExists = await User.findOne({ where: { email } })

    if (userExists)
      return res.status(409).send({ message: 'Usuário já existe' })

    const user = await User.create(req.body)

    res.status(201).json(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * Obtêm todos os usuários
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()

    if (!users)
      return res
        .status(404)
        .send({ message: 'Não há nenhum usuário cadastrado' })

    res.json(users)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * Obtêm um usuário pelo ID
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado' })
    }

    return res.json(user)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * Obtêm um usuário pelo seu token de autenticação JWT
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 * @returns {Object} - usuário
 * @throws {Object} - mensagem de erro
 */
const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const userId = payload.id

    User.findByPk(userId)
      .then((user) => {
        res.send(user)
      })
      .catch((error) => {
        res.status(500).send(error.message || 'Erro ao buscar usuário')
        console.log('error: ', error.message)
      })
  } catch (error) {
    res.status(401).send('Inautorizado' || error.message)
    console.log('error: ', error.message)
  }
}

/**
 * Obtêm o desempenho de um usuário pelo seu token de autenticação JWT
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 * @returns {Object} - desempenho do usuário
 * @throws {Object} - mensagem de erro
 */
const getUsersPerformance = async (req, res) => {
  try {
    const token = req.headers.Authorization
    console.log('token: ', token)
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const userId = payload.id

    UsersPerformance.findOne({ where: { userId: userId } })
      .then((userPerformance) => {
        res.send(userPerformance)
      })
      .catch((error) => {
        res.status(500).send(error.message || 'Erro ao buscar usuário')
        console.log('error: ', error.message)
      })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getUsersStatus = async (req, res) => {
  try {
    const onlineUsers = await User.count({ where: { online: true } })
    const offlineUsers = await User.count({ where: { online: false } })

    return res.status(200).json({ online: onlineUsers, offline: offlineUsers })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * Atualiza um usuário pelo ID
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params

    const [updated] = await User.update(req.body, {
      where: { id },
      returning: true,
    })

    if (updated) {
      const user = await User.findByPk(id)
      return res.json(user)
    }

    res.status(404).send({ message: 'Usuário não encontrado' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * Deleta um usuário pelo ID
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await User.destroy({ where: { id } })
    if (deleted) {
      return res.send({ message: 'Usuário deletado' })
    }

    res.status(404).send({ message: 'Usuário não encontrado' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

/**
 * Deleta todos os usuários
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 * @returns {Object} - mensagem de sucesso
 *
 * @todo - ainda não funcionando. terminar DEPOIS!
 * @todo - verificar se é possível deletar todos os usuários
 */
const deleteAllUsers = async (req, res) => {
  try {
    if (confirm('Tem certeza que deseja deletar todos os usuários?')) {
      const deleted = await User.destroy({ where: {} })

      if (deleted)
        return res.send({ message: 'Todos os usuários foram deletados' })
    } else {
      return res.send({ message: 'Nenhum usuário foi deletado' })
    }
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getUserProfile,
  getUsersStatus,
  getUsersPerformance,
  updateUser,
  deleteUser,
  deleteAllUsers,
}
