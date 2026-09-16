require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000
app.use(cors())

app.use(express.json())
app.get('/api/health', (request, response) => {
  response.status(200).json({
    message: 'Server is running',
  })
})
// Starts the backend server on the selected port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})