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

  get winner () {
    var id = Math.floor(Math.random() * this._participants.length)
    var winner = this._participants[id]
    this._participants.splice(id, 1)
    return winner
  }
}

module.exports = Participants
