/* eslint-env jest */
class Twilio {
  get incomingPhoneNumbers () {
    return {
      list: async () => {
        return [
          { phoneNumber: '+1NPANXXXXXX' }
        ]
      }
    }
  }

  get messages () {
    return {
      create: async message => {
        process.emit('twilioMessage', message)
        return message
      }
    }
  }
}

module.exports = Twilio
