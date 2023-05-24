const Session = require('../models/session')

const createSession = async (req, res) => {
  try {
    const { userId } = req.body
    const token = 'tokenExample'
    const expiration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const newSession = await Session.create({ userId, token, expiration })
    return res.status(201).json({ session: newSession })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const deleteSession = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await Session.destroy({
      where: { id },
    })
    if (deleted) {
      return res.status(204).send({ message: 'Sessão deletada com sucesso!' })
    }
    throw new Error('Sessão não encontrada')
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createSession,
  deleteSession,
}
