require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
// PgSQL connection 
const pool = require('./db')
const app = express()
const PORT = 5000
app.use(cors())

app.use(express.json())
// Checks whether the server and database are available
app.get('/api/health', async (request, response) => {
  try {
    const result = await pool.query('SELECT NOW() AS database_time')

    response.status(200).json({
      message: 'Server and database are running',
      databaseTime: result.rows[0].database_time,
    })
  } catch (error) {
    console.error('Database connection failed:', error.message)

    response.status(500).json({
      message: 'Server is running but database connection failed.',
    })
  }
})

app.post('/api/users/register', async (request, response) => {
  const { name, email, password } = request.body

  if (!name || !email || !password) {
    return response.status(400).json({
      message: 'Name, email, and password are required.',
    })
  }

  try {
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return response.status(409).json({
        message: 'An account with this email already exists.',
      })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, passwordHash]
    )

    response.status(201).json({
      message: 'User registered successfully.',
      user: newUser.rows[0],
    })
  } catch (error) {
    console.error('User registration failed:', error.message)

    response.status(500).json({
      message: 'Could not register user.',
    })
  }
})
// Starts the backend server on the selected port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
