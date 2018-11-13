const _ = require('lodash')
const Redis = require('ioredis')

class Participants {
  constructor () {
    this._redis = new Redis(this._redisURI, { tls: true })
  }

  async add (phone) {
    if (!_.isString(phone)) {
      throw new Error('Invalid entry')
    }
    let status = await this._redis.sadd('participants', phone)
    if (!status) {
      throw new Error('Failed to add, entry exists')
    }
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

  async flushAll () {
    this._redis.del('participants')
  }

  get _redisURI () {
    let bluemixServices = JSON.parse(process.env.VCAP_SERVICES)
    let redisSettings = _.find(bluemixServices['compose-for-redis'], ['name', 'redis-cloud-agile'])
    return redisSettings.credentials.uri
  }
}

module.exports = Participants
