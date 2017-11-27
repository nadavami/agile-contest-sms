const express = require('express')
const bodyParser = require('body-parser')
const Participants = require('./participants')
const Messaging = require('./messaging')
const hasha = require('hasha')

let app = express()
let participants = new Participants()
let messaging = new Messaging()

function hash (string) {
  return hasha(string, { algorithm: 'sha256' })
}

app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/incoming', (req, res) => {
  let participant = req.body.From
  let responseText = 'Merci pour votre inscription!\nThank you for registering!'
  Promise.all([participants.add(participant), messaging.send(participant, responseText)])
    .then(() => {
      let participantHash = hash(participant)
      console.log('Incoming Message', participantHash)
      console.log('Reply Sent', participantHash)
    })
    .catch(e => console.error('ERROR:', e.message))
  res.type('text/plain')
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
    let errorMessage = 'No winners left'
    res.status(200)
    console.error('ERROR:', errorMessage)
    return res.end(errorMessage)
  }
  let responseText = 'Congratulations, you won!\nCome pick-up your prize!🏆'
  console.log('Winner selected', hash(winner))
  messaging.send(winner, responseText)
  return res.json(winner)
})

app.use('/api/flushall', async (req, res) => {
  await participants.flushAll()
  return res.send('Entries flushed.')
})

app.use('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = app
