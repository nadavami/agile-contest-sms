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
    let randomIndex = Math.floor(Math.random() * this._participants.length)
    let winner = this._participants[randomIndex]
    this._removeWinnerFromList(randomIndex)
    return winner
  }

  _removeWinnerFromList (winnerIndex) {
    this._participants.splice(winnerIndex, 1)
  }
}

module.exports = Participants
