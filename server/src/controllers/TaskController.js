const Task = require('../models/task')
const jwt = require('jsonwebtoken')

const createTask = async (req, res) => {
  try {
    const {
      id,
      uid,
      userId,
      title,
      description,
      priority,
      status,
      finishAt,
      updatedAt,
    } = req.body

    const taskExists = await Task.findOne({ where: { id } })

    if (taskExists)
      return res.status(409).send({ message: 'A tarefa já existe' })

    const task = await Task.create({
      id: null, // TODO: diferente de user, ele exige o id??? Ver o motivo disto.
      uid,
      userId,
      title,
      description,
      priority: priority || 'none',
      status,
      finishAt,
      updatedAt: updatedAt || new Date(),
    })

    res.status(201).send(task)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll()

    if (!tasks)
      return res
        .status(404)
        .send({ message: 'Não há nenhuma tarefa cadastrada' })

    res.send(tasks)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getTasksByUserId = async (req, res) => {
  try {
    const token = req.headers.authorization
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const userId = payload.id

    const tasks = await Task.findAll({ where: { userId } })

    if (!tasks)
      return res
        .status(404)
        .send({ message: 'Não há nenhuma tarefa cadastrada' })

    res.send(tasks)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params
    const task = await Task.findByPk(id)

    if (!task) {
      return res.status(404).send({ message: 'Tarefa não encontrada' })
    }

    res.send(task)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const updateTask = async (req, res) => {
  try {
    const { id } = req.params

    const [updated] = await Task.update(req.body, {
      where: { id },
    })

    if (updated) {
      const updatedTask = await Task.findByPk(id)
      return res.send(updatedTask)
    }

    throw new Error('Tarefa não encontrada')
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await Task.destroy({
      where: { id },
    })
    if (deleted) return res.send({ message: 'Tarefa excluída com sucesso!' })

    throw new Error('Tarefa não encontrada')
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  getTasksByUserId,
  updateTask,
  deleteTask,
}
