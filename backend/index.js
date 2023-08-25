const express = require('express')
const cors =require('cors')
const connectToMongo = require('./db')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/auth',require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
connectToMongo();
