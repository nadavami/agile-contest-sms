const _ = require('lodash')

class Participants {
  constructor () {
    this._participants = []
  }

  async add (phone) {
    if (!_.isString(phone)) {
      throw new Error('Invalid entry')
    }
    this._participants.push(phone)
  }

  async list () {
    return [...this._participants]
  }

  async winner () {
    let winner = _.sample(this._participants)
    _.remove(this._participants, participant => participant === winner)
    return winner
  }
}

module.exports = Participants
