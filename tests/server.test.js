/* eslint-env jest */
const Server = require('../src/server')
const request = require('request-promise-native')

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

describe('Test server', () => {
  beforeEach(() => {
    jest.resetModules()
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

  test('Can receive external payload on /api/incoming', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    let response = sendIncomingMessage(server.port)

    await expect(response).resolves.toHaveProperty('statusCode', 200)
    await expect(response).resolves.toHaveProperty('headers.content-type', 'text/xml')
    await expect(response).resolves.toHaveProperty('body', expect.stringMatching(/<Response><Message>Thank you for registering!<\/Message><\/Response>/))
  })

  test('Can receive list of participants on /api/participants', async () => {
    process.env.PORT = 0
    let server = new Server()
    server.start()

    await sendIncomingMessage(server.port)

    let response = request.get(`http://localhost:${server.port}/api/participants`).then(data => JSON.parse(data))
    let participant = [{
      id: 'SMe37a97021a8df7632857a298b0a3e343',
      phone: '+1NPANXXXXXX',
      message: 'A Message!'
    }]
    await expect(response).resolves.toEqual(expect.arrayContaining(participant))
  })
})
