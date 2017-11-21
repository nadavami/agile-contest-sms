const _ = require('lodash')

class Participants {
  constructor () {
    this._participants = {}
  }

  async add (entry) {
    if (!entry.phone || !entry.message || !entry.id) {
      throw new Error('Invalid entry')
    }
    this._participants[entry.phone] = entry
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
