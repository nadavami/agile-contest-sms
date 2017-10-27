class Participants {
  constructor () {
    this._participants = []
  }

  add (participant) {
    if (typeof participant.phone === 'undefined' || typeof participant.message === 'undefined' || typeof participant.id === 'undefined') {
      console.log('Invalid participant fields: ')
      console.log(participant)
      return false
    }
    this._participants.push(participant)
    return true
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
