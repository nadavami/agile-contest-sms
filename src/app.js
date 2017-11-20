const express = require('express')
const bodyParser = require('body-parser')
const Participants = require('./participants')
const Messaging = require('./messaging')

let app = express()
let participants = new Participants()
let messaging = new Messaging()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/incoming', (req, res) => {
  let participant = {
    id: req.body.MessageSid,
    phone: req.body.From,
    message: req.body.Body
  }
  console.log('Incoming Message', JSON.stringify(participant))
  let responseText = 'Thank you for registering!'
  participants.add(participant).catch(e => console.log(e))
  messaging.send(participant.phone, responseText).catch(e => console.log(e))
  res.status(200)
  res.end()
})

app.use('/api/participants', async (req, res) => {
  let participantsList = await participants.list()
  return res.json(participantsList)
})

app.use('/api/winner', async (req, res) => {
  let winner = await participants.winner()
  if (!winner) {
    res.status(200)
    return res.end('No winners left')
  }
  let responseText = 'Congratulations, you won!\nCome pick-up your prize!🏆'
  messaging.send(winner.phone, responseText)
  return res.json(winner)
})

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
