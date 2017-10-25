const express = require('express')
let app = express()

app.use('/api/incoming', (req, res) => {
  console.log('incoming body', req.body)
  res.send('')
})

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
