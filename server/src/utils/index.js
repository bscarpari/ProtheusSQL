const { dialect, host } = require('../config/db')
const Sequelize = require('sequelize')
const path = require('path')
const fs = require('fs')
const connection = require('../database')

const userConnection = async (id, username) => {
  const userDatabase = `${username}`
  const userUsername = `${username}`
  const password = '123'

  /* 
    1) text => (protheusSQL)
    2) base64 => (cHJvdGhldXNTUUw=)
    3) sha256 => (b5d77d389f743cb9f589c0761f057b2e2bc8c01a2005a62f6ab1734d06ad7cf8)
  */
  const connection = new Sequelize(
    userDatabase,
    userUsername,
    password,
    {
      dialect,
      host,
      define: {
        timestamps: true,
      },
      query: {
        raw: true,
      },
      logging: true,
    }
  )

  try {
    await connection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  return connection
}

const closeConnection = async (connection) => {
  await connection.close()
}

const createDirectoryIfNotExists = async (username) => {
  const directoryPath = path.join('./src/user_files', username);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

const createUserDatabase = async (dbName, username, role) => {
  const password = '123'; // TODO: futuramente é a senha do usuário (bcrypt)

  // 1. Cria seu usuário
  await connection.query(`CREATE USER ${dbName} WITH PASSWORD '${password}'`);

  // 2. Cria a base de dados do usuário na base de dados
  await connection.query(`CREATE DATABASE ${dbName} OWNER ${dbName}`);

  // 3. Concede permissões para o usuário
  await connection.query(`GRANT ALL PRIVILEGES ON DATABASE ${dbName} TO ${dbName}`);

  // Dá permissões máximas de administrador ao usuário com role 'admin'
  if (role === 'admin') {
    console.log('Permissões de administrador concedidas')
    await connection.query(`ALTER USER ${dbName} WITH SUPERUSER`)
    await connection.query(`GRANT CONNECT ON DATABASE ${dbName} TO ${dbName}`);
    await connection.query(`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ${dbName}`);
    await connection.query(`GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ${dbName}`);
    await connection.query(`GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO ${dbName}`);
    await connection.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO ${dbName}`);
    await connection.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO ${dbName}`);
    await connection.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON FUNCTIONS TO ${dbName}`);
  }

  // Dá permissões limitadas ao usuário voluntário
  if (role === 'voluntario') {
    console.log('Permissões de voluntário concedidas')
    await connection.query(`GRANT CONNECT ON DATABASE ${dbName} TO ${dbName}`);
    await connection.query(`GRANT USAGE ON SCHEMA public TO ${dbName}`);
    await connection.query(`GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${dbName}`);
    await connection.query(`GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${dbName}`);
    await connection.query(`GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO ${dbName}`);
    await connection.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${dbName}`);
    await connection.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO ${dbName}`);
    await connection.query(`ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ${dbName}`);
    await connection.query(`GRANT SELECT ON DATABASE protheus TO ${dbName}`);
  }

  // 6. Cria o diretório do usuário
  await createDirectoryIfNotExists(username);

  await connection.close()
}

module.exports = {
  userConnection,
  closeConnection,
  createDirectoryIfNotExists,
  createUserDatabase
}