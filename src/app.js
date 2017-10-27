const express = require('express')
const MessagingResponse = require('twilio').twiml.MessagingResponse
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

  let response = new MessagingResponse()
  response.message('Thank you for registering!')

  res.setHeader('content-type', 'text/xml')
  res.end(response.toString())
})

app.use('/api/participants', (req, res) => {
  res.json(participants.list)
})

app.use('/api/winner', (req, res) => {
  res.json(participants.winner)
})

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
