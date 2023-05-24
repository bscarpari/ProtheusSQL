const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { validationResult } = require('express-validator')

/**
 * Cria um novo usuário
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 * @returns {Object} - usuário criado
 */
const register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array().at(0).msg })

    const { email } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) return res.status(409).send({ message: 'Usuário já existe' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    })

    if (newUser)
      return res.status(201).send({ message: 'Usuário criado com sucesso' })

    if (!newUser)
      return res.status(400).send({ message: 'Erro ao criar usuário' })

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.status(200).send({ token })
  } catch (error) {
    res.status(500).send({ message: error.message || error })
  }
}

/**
 * Faz o login do usuário
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 * @returns {Object} - usuário e token
 */
const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array().at(0).msg })

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
    const { id, username, role } = user

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Não há usuário cadastrado com este e-mail ' })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password)

    if (!isPasswordValid)
      return res.status(401).send({ message: 'Senha ou e-mail inválido' })

    const token = jwt.sign({ id, role, username }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    const userOnline = User.update({ online: true }, { where: { id } })

    if (!userOnline)
      return res.status(400).send({ message: 'Erro ao logar usuário' })

    res.status(200).send({ token })
  } catch (error) {
    res.status(500).send({ message: error.message || error })
  }
}

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const userId = payload.id

    const [updated] = await User.update(
      { online: false },
      { where: { id: userId } }
    )
    if (!updated)
      return res.status(400).send({ message: 'Erro ao deslogar usuário' })

    if (payload.exp < Date.now() / 1000)
      return res.status(401).send({ message: 'Token expirado' })

    res.status(200).send({ message: 'Usuário deslogado' })
  } catch (error) {
    res.status(500).send({ message: error.message || error })
  }
}

/**
 * Envia um e-mail para o usuário com um link para redefinir a senha
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 * @returns {Object} - mensagem de sucesso ou erro
 */
const sendResetEmail = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array().at(0).msg })

    const { email } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res
        .status(404)
        .send({ message: 'Não há usuário cadastrado com este e-mail' })
    }

    const secret = process.env.JWT_SECRET + user.password

    const resetToken = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '15m',
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        accessToken: 'nmtdwzppijoynzvm',
        user: process.env.EMAIL_HOST,
        pass: process.env.PASSWORD_HOST,
      },
    })

    const encodedToken = Buffer.from(resetToken).toString('base64')
    const encodedUrl = encodeURIComponent(encodedToken)
    const resetUrl = `http://localhost:81/resetPassword/${user.id}/${encodedUrl}`

    const mailOptions = {
      from: process.env.EMAIL_HOST,
      to: email,
      subject: 'Redefina sua senha - Protheus SQL',
      html: `
      <h3>Olá, ${user.username}</h3>

      <p>Para redefinir sua senha, acesse este link: ${resetUrl}</p
      
      <p>Este link expira em <b>15 minutos<b/></p>

      <h3>Se você não solicitou a redefinição de sua senha, ignore este e-mail!</h3>
      `,
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) res.status(500).send({ message: error.message })
      else {
        res
          .status(200)
          .send({ message: `E-mail enviado para: ${info.response}` })
      }
    })
  } catch (error) {
    res.status(500).send({ message: error.message || error })
  }
}

/**
 * Redefine a senha do usuário
 * @param {Object} req - solicitação HTTP
 * @param {Object} res - resposta HTTP
 * @returns {Object} - mensagem de sucesso ou erro
 * @returns {Object} - usuário e token
 */
const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(400).json({ message: errors.array().at(0).msg })

    const { id, token, password } = req.body

    const user = await User.findByPk(id)
    if (!user)
      return res.status(404).send({ message: 'Usuário não encontrado' })

    const decodedToken = Buffer.from(token, 'base64').toString('ascii')
    const secret = process.env.JWT_SECRET + user.password
    const payload = jwt.verify(decodedToken, secret)

    if (payload.id !== user.id || payload.email !== user.email)
      return res.status(401).send({ message: 'Token inválido' })

    if (payload.exp < Date.now() / 1000)
      return res.status(401).send({ message: 'Token expirado' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = await User.update(
      { password: hashedPassword },
      { where: { email: user.email } }
    )

    if (!updatedUser)
      return res.status(500).send({ message: 'Erro ao atualizar a senha' })

    res.status(200).send({ message: 'Senha alterada com sucesso' })
  } catch (error) {
    res.status(500).send({ message: error.message || error })
  }
}

module.exports = {
  register,
  login,
  sendResetEmail,
  resetPassword,
  logout,
}
