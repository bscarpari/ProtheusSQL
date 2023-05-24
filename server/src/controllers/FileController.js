const File = require('../models/file')
const fs = require('fs')
const path = require('path')

/* 

  Usuários possuem pasta para armazenar arquivos em ./server/src/user_files/${userId}
  a) Essa pasta é criada quando o usuário é criado
  2) Quando um arquivo é enviado, ele é salvo na pasta do usuário

  1. Pegue o id do usuário
  2. Pegue todos os arquivos da pasta do usuário (fs.readdirSync)
  3. Retorne os arquivos em array de objetos
*/

/* Manipular os arquivos com filesystem */
const getUserFiles = async (req, res) => {
  try {
    const userId = req.params.id

    const userFilesDir = `./uploads/${userId}`
    const fileNames = fs.readdirSync(userFilesDir)

    const files = fileNames.map((fileName) => ({
      id: fileName,
      icon: 'fa-solid fa-file',
      label: fileName,
      path: `${userFilesDir}/${fileName}`,
    }))

    res.send(files)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getUserFilePath = (userId, key) =>
  path.resolve(__dirname, '..', 'user_files', userId, key)

const createUserDirectory = (userId) => {
  const userDirectory = path.resolve(__dirname, '..', 'user_files', userId)
  if (!fs.existsSync(userDirectory)) {
    fs.mkdirSync(userDirectory, { recursive: true })
  }
}

const createFile = async (req, res) => {
  try {
    const { originalname: name, size, filename: key } = req.file
    const { userId } = req.params

    createUserDirectory(userId)

    const file = await File.create({ name, size, key, userId })

    res.status(201).json(file)
  } catch (err) {
    res.status(500).json(err)
  }
}

const updateFile = async (req, res) => {
  try {
    const { id } = req.params
    const { originalname: name, size, filename: key } = req.file
    const { userId } = req.params

    createUserDirectory(userId)

    const file = await File.findByPk(id)
    if (!file) return res.status(404).json({ error: 'File not found' })

    await file.update({ name, size, key })
    res.json(file)
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteFile = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.params

    const file = await File.findByPk(id)
    if (!file) return res.status(404).json({ error: 'File not found' })

    const filePath = getUserFilePath(userId, file.key)
    fs.unlinkSync(filePath)

    await file.destroy()
    res.json({ message: 'File deleted successfully' })
  } catch (err) {
    res.status(500).json(err)
  }
}

/* TODO: futuramente CRUD para o Admin manipular BD via interface */
// const createFile = async (req, res) => {
//   try {
//     const { id, userId, filename, size, type, path, data } = req.body

//     const filesExists = await File.findOne({ where: { id } })

//     if (filesExists)
//       return res.status(409).send({ message: 'Arquivo já existe' })

//     const file = await File.create({
//       id,
//       userId,
//       filename,
//       size,
//       type,
//       path,
//       data,
//     })
//     res.status(201).send(file)
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
// }

// const getFiles = async (req, res) => {
//   try {
//     const files = await File.findAll()
//     res.send(files)
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
// }

// const getFileById = async (req, res) => {
//   try {
//     const fileId = req.params.id
//     const file = await File.findByPk(fileId)

//     if (!file) {
//       return res.status(404).send({ message: 'Arquivo não encontrado' })
//     }

//     res.send(file)
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
// }

// const updateFile = async (req, res) => {
//   try {
//     const fileId = req.params.id
//     const [updated] = await File.update(req.body, {
//       where: { id: fileId },
//     })
//     if (updated) {
//       const updatedFile = await File.findByPk(fileId)
//       return res.send(updatedFile)
//     }
//     throw new Error('Arquivo não encontrado')
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
// }

// const deleteFile = async (req, res) => {
//   try {
//     const fileId = req.params.id
//     const deleted = await File.destroy({
//       where: { id: fileId },
//     })
//     if (deleted) {
//       return res.send({ message: 'Arquivo deletado' })
//     }
//     throw new Error('Arquivo não encontrado')
//   } catch (error) {
//     return res.status(500).json({ message: error.message })
//   }
// }

module.exports = {
  createFile,
  getUserFiles,
  updateFile,
  deleteFile,
}
