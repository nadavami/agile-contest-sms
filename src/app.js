const express = require('express')
const bodyParser = require('body-parser')
let app = express()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/incoming', (req, res) => {
  console.log('incoming body', req.body)
  res.send()
})

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
