const _ = require('lodash')
const Redis = require('ioredis')

class Participants {
  constructor () {
    this._redis = new Redis(this._redisCredentials)
  }

  async add (phone) {
    if (!_.isString(phone)) {
      throw new Error('Invalid entry')
    }
    return this._redis.sadd('participants', phone)
  }

  async list () {
    return this._redis.smembers('participants')
  }

  async winner () {
    let participants = await this.list()
    let winner = _.sample(participants)
    if (winner) {
      await this._redis.srem('participants', winner)
    }
    return winner
  }

  get _redisCredentials () {
    let bluemixServices = JSON.parse(process.env.VCAP_SERVICES)
    let redisSettings = _.find(bluemixServices.rediscloud, ['name', 'redis-cloud-agile'])
    let credentials = {
      host: redisSettings.credentials.hostname,
      port: redisSettings.credentials.port,
      password: redisSettings.credentials.password
    }
    return credentials
  }
}

module.exports = Participants
