class Participants {
  constructor () {
    this._participants = []
  }

  add (participant) {
    this._participants.push(participant)
  }

  get list () {
    return [...this._participants]
  }
}

module.exports = Participants
