const _ = require('lodash')
const hash = require('hasha')

class Participants {
  constructor () {
    this._participants = {}
  }

  async add (entry) {
    if (!entry.phone || !entry.message || !entry.id) {
      throw new Error('Invalid entry')
    }
    let participantID = hash(entry.phone, { algorithm: 'sha256' })
    this._participants[participantID] = entry
  }

  async list () {
    return {...this._participants}
  }

  async winner () {
    let winnerID = _.sample(Object.keys(this._participants))
    let winner = this._participants[winnerID]
    delete this._participants[winnerID]
    return winner
  }
}

module.exports = Participants
