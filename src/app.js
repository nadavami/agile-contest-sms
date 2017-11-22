const express = require('express')
const bodyParser = require('body-parser')
const Participants = require('./participants')
const Messaging = require('./messaging')
const hash = require('hasha')

let app = express()
let participants = new Participants()
let messaging = new Messaging()

app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/incoming', (req, res) => {
  let participant = req.body.From
  let responseText = 'Thank you for registering!'
  Promise.all([participants.add(participant), messaging.send(participant, responseText)])
    .then(() => {
      console.log('Incoming Message', hash(participant))
    })
    .catch(e => console.error(e))
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
  messaging.send(winner, responseText)
  return res.json(winner)
})

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
