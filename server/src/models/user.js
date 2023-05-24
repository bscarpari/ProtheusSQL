const db = require('../database')
const Sequelize = require('sequelize')
const connection = require('../database')
const { createDirectoryIfNotExists, createUserDatabase } = require('../utils')

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM,
    values: ['admin', 'voluntary', 'learner'],
    allowNull: false,
    defaultValue: 'learner',
  },
  picture: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  forumPosition: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  online: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
})

// Create a user database when a new user is created
User.afterCreate(async (user) => {
  const dbName = user.username
  const password = '123' // TODO: futuramente é a senha do usuário (bcrypt)

  const userSetup = async (user) => {
    const folderUserCreated = createDirectoryIfNotExists(user.username)
    if (!folderUserCreated) return

    // 1. Create the user
    await connection.query(`CREATE USER ${dbName} WITH PASSWORD '${password}'`)

    // 2. Create the user's database
    await connection.query(`CREATE DATABASE ${dbName} OWNER ${dbName}`)

    // 3. Configure the user's permissions on the user database
    await client.query(`
      DO $$
      DECLARE
        username text := '${dbName}';
        dbname text := '${dbName}';
        databases text[];
      BEGIN
        EXECUTE format('GRANT ALL PRIVILEGES ON DATABASE %I TO %I', dbname, username);

        databases := (ARRAY(SELECT datname FROM pg_database WHERE datname != dbname));

        FOREACH dbname IN ARRAY databases
        LOOP
          EXECUTE format('REVOKE ALL ON DATABASE %I FROM %I', dbname, username);
        END LOOP;
      END $$; 
    `)

    await connection.close()

    // Create a new connection with the user database
    const client = new Sequelize(dbName, dbName, password, {
      host: 'localhost',
      dialect: 'postgres',
    })

    // Connect to the database and authenticate the user
    await client.authenticate()

    console.log(`${user.username} connected to their database`)
    await client.close()
  }

  try {
    await userSetup(user)
  } catch (error) {
    console.error(error.message || error)
  }
})

User.afterSync(async () => {
  /* Create user databases for all users that don't have one yet 
      1) Execute only once when the server is started
      2) delete postgresql roles and users before executing:
      SELECT rolname FROM pg_roles;
  */

  console.log('Creating missing user databases...')
  const users = await User.findAll()
  filterUsers = users.filter((user) => user.role !== 'learner')

  for (const user of filterUsers) {
    const { id, username, role } = user.dataValues
    const dbName = `${username}`

    try {
      // Verify if user database already exists
      const result = await connection.query(`
        SELECT 1
        FROM pg_database
        WHERE datname = '${dbName}'
      `)

      if (result.rowCount > 0)
        return console.log(
          `Database for user ${id} (${username}) already exists`
        )

      // Create user database
      await createUserDatabase(dbName, username, role)
    } catch (error) {
      console.error(error.message || error)
    }
  }
})

module.exports = User
