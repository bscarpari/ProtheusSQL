const { userConnection, closeConnection } = require('../utils')

const jwt = require('jsonwebtoken')
const Query = require('../models/query')
const { Sequelize } = require('sequelize')

/* 
  1. Recebe do front a query
  2. Executa a query
  3. Se der certo, altera a tabela users_performance, contando 1 acerto e 1 tentativa e retorna o resultado pro front
  4. Se der errado, altera users_performance para 1 erro e 1 tentativa, retorna o erro pro front
*/
const executeQuery = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { id, username } = jwt.verify(token, process.env.JWT_SECRET)
  const db = await userConnection(id, `${username}`)

  try {
    const { query } = req.body
    if (!query) return res.status(400).json({ message: 'No query found' })

    const queryHistory = await Query.findOne({ where: { userId: id } })
    console.log(queryHistory)

    const newHistoryRow = {
      query,
      date: new Date(),
    }

    if (!queryHistory) {
      console.log('creating new query history...')

      const res = await Query.create({
        userId: id,
        history: [newHistoryRow],
      })

      if (!res)
        return res.status(400).json({ message: 'Error creating query history' })
    } else {
      console.log('updating query history...')
      const newHistory = queryHistory.history
      newHistory.push(newHistoryRow)
      await Query.update({ history: newHistory }, { where: { userId: id } })
    }

    db.close()
    const result = await db.query(query, { raw: true })
    return res.status(200).json(result)
  } catch (err) {
    return res.status(400).json(err.message)
  }
}

const getUserSchema = async (req, res) => {
  const token = req.headers.authorization
  const { id, username } = jwt.verify(token, process.env.JWT_SECRET)
  const db = await userConnection(id, `${username}`)

  try {
    const [result] = await db.query(`
      SELECT table_name, 
        array_agg(column_name) AS column_names,
        array_agg(data_type) AS data_types
      FROM information_schema.columns
      WHERE table_schema = 'public'
      GROUP BY table_name
    `)

    if (!result) return res.status(400).json({ message: 'No tables found' })

    const schema = result.map(({ table_name, column_names, data_types }) => ({
      table: table_name,
      columns: column_names
        .replace('{', '')
        .replace('}', '')
        .split(',')
        .map((column) => column.trim()),
      dataTypes: data_types
        .replace('{', '')
        .replace('}', '')
        .split(',')
        .map((type) => type.trim()),
    }))

    if (!schema) return res.status(400).json({ message: 'No schema found' })

    await closeConnection(db)
    return res.status(200).json(schema)
  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: err.message })
  }
}

/* 
  salva as queries que o usuário executou na sessão dele
*/
const getUserQueryHistory = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  const { id } = jwt.verify(token, process.env.JWT_SECRET)

  try {
    const queryHistory = await Query.findOne({ where: { userId: id } })
    console.log(queryHistory)

    if (!queryHistory)
      return res.status(400).json({ message: 'No query history found' })

    return res.status(200).json(queryHistory)
  } catch (err) {
    console.error(err)
    return res.status(400).json({ message: err.message })
  }
}

module.exports = {
  executeQuery,
  getUserSchema,
  getUserQueryHistory,
}
