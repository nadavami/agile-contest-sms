const _ = require('lodash')

class Participants {
  constructor () {
    this._participants = {}
  }

  async add (participant) {
    if (!participant.phone || !participant.message || !participant.id) {
      throw new Error('Invalid participant')
    }
    this._participants[participant.phone] = participant
  }

  get list () {
    return {...this._participants}
  }

  get winner () {
    let winnerID = _.sample(Object.keys(this._participants))
    let winner = this._participants[winnerID]
    delete this._participants[winnerID]
    return winner
  }
}

module.exports = Participants
