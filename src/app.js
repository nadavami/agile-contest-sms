const express = require('express')
let app = express()

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
