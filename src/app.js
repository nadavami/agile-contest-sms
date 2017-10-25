const express = require('express')
const bodyParser = require('body-parser')
const Participants = require('./participants')

let app = express()
let participants = new Participants()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/incoming', (req, res) => {
  let participant = {
    id: req.body.MessageSid,
    phone: req.body.From,
    message: req.body.Body
  }
  console.log('Incoming Message', JSON.stringify(participant))
  participants.add(participant)
  res.send('Thank you for registering!')
})

app.use('/api/participants', (req, res) => {
  res.json(participants.list)
})

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
