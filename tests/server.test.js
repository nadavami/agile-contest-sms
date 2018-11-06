/* eslint-env jest */
jest.doMock('ioredis', () => require('ioredis-mock'))
process.env.VCAP_SERVICES = '{ "compose-for-redis": [ { "name": "redis-cloud-agile", "credentials": { "uri": "redis://user:pass@127.0.0.1:6379" } } ] }'

const Server = require('../src/server')
const request = require('request-promise-native')

jest.mock('twilio')

function sendIncomingMessage (serverPort) {
  let response = request({
    uri: `http://localhost:${serverPort}/api/incoming`,
    method: 'POST',
    form: {
      From: '+1NPANXXXXXX',
      Body: 'A Message!',
      MessageSid: 'SMe37a97021a8df7632857a298b0a3e343'
    },
    resolveWithFullResponse: true
  }).then(data => data)

  return response
}

function sendInvalidIncomingMessage (serverPort) {
  let response = request({
    uri: `http://localhost:${serverPort}/api/incoming`,
    method: 'POST',
    form: {
      Body: 'A Message!',
      MessageSid: 'SMe37a97021a8df7632857a298b0a3e343'
    },
    resolveWithFullResponse: true
  }).then(data => data)

  return response
}

describe('Test server', () => {
  beforeEach(() => {
    jest.resetModules()
    console.log = jest.fn()
    console.error = jest.fn()
    process.removeAllListeners('twilioMessage')
  })

  test('Can receive / with Hello World', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    let response = request.get(`http://localhost:${server.port}`).then(data => data)
    await expect(response).resolves.toBe('Hello, world!')
  })

  test('Error is thrown when getting port and server is not started', () => {
    process.env.PORT = 0
    let server = new Server()
    let portBeforeStart = () => server.port

    expect(portBeforeStart).toThrowError('Server not started')
  })

  test('Can receive external payload on /api/incoming and return thank you if correct', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    let response = sendIncomingMessage(server.port)
    let messageResponse = new Promise(resolve => {
      process.on('twilioMessage', message => resolve(message))
    })
    await expect(response).resolves.toHaveProperty('statusCode', 200)
    await expect(messageResponse).resolves.toHaveProperty('to', '+1NPANXXXXXX')
    await expect(messageResponse).resolves.toHaveProperty('from', '+1NPANXXXXXX')
    await expect(messageResponse).resolves.toHaveProperty('body', expect.stringMatching(/thank you/i))
    await expect(messageResponse).resolves.toHaveProperty('body', expect.stringMatching(/merci/i))
  })

  test('Can receive external payload on /api/incoming and return error if not correct', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    let response = sendInvalidIncomingMessage(server.port)

    await expect(response).resolves.toHaveProperty('statusCode', 200)
  })

  test('Can receive list of participants on /api/participants', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    await sendIncomingMessage(server.port)

    let response = request.get(`http://localhost:${server.port}/api/participants`).then(data => JSON.parse(data))
    let participant = '+1NPANXXXXXX'
    await expect(response).resolves.toEqual([participant])
  })

  test('Can receive a participant on /api/winner as a winner', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    await sendIncomingMessage(server.port)

    let response = request.get(`http://localhost:${server.port}/api/winner`).then(data => JSON.parse(data))
    let participant = '+1NPANXXXXXX'
    let messageResponse = new Promise(resolve => {
      process.on('twilioMessage', message => resolve(message))
    })

    await expect(response).resolves.toEqual(participant)
    await expect(messageResponse).resolves.toHaveProperty('to', '+1NPANXXXXXX')
    await expect(messageResponse).resolves.toHaveProperty('from', '+1NPANXXXXXX')
    await expect(messageResponse).resolves.toHaveProperty('body', expect.stringMatching(/congratulations/i))

    let responseList = request.get(`http://localhost:${server.port}/api/participants`).then(data => JSON.parse(data))
    await expect(responseList).resolves.toEqual(expect.arrayContaining([]))
  })

  test('Can receive error message when no winenrs left on /api/winner', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    let response = request.get(`http://localhost:${server.port}/api/winner`).then(data => data)
    await expect(response).resolves.toEqual(expect.stringMatching(/no winners/i))
  })

  test('Can flush entries using /api/flushall', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    await sendIncomingMessage(server.port)

    await request.get(`http://localhost:${server.port}/api/flushall`).then(data => data)
    let response = request.get(`http://localhost:${server.port}/api/participants`).then(data => JSON.parse(data))
    await expect(response).resolves.toEqual([])
  })
})
