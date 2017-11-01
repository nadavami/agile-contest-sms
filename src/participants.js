const _ = require('lodash')

class Participants {
  constructor () {
    this._participants = []
  }

  async add (participant) {
    if (!participant.phone || !participant.message || !participant.id) {
      throw new Error('Invalid participant')
    }
    this._participants.push(participant)
  }

  get list () {
    return [...this._participants]
  }

  get winner () {
    let winner = _.sample(this._participants)
    _.remove(this._participants, winner)
    return winner
  }
}

module.exports = Participants
