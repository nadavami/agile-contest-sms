const _ = require('lodash')
const Twilio = require('twilio')

class Messaging {
  constructor () {
    this._twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_KEY)
  }

  async send (to, body) {
    if (!to || !body) {
      throw new Error('Invalid message fields')
    }

    let from = await this._fromNumber()
    let message = {to, from, body}
    return this._twilio.messages.create(message)
  }

  async _fromNumber () {
    let phoneNumbers = await this._twilio.incomingPhoneNumbers.list().then(numbers => _.map(numbers, 'phoneNumber'))
    return _.sample(phoneNumbers)
  }
}

module.exports = Messaging
