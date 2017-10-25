/* eslint-env jest */
const Server = require('../src/server')
const request = require('request-promise-native')

describe('Test server', () => {
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
    let response = request({
      uri: `http://localhost:${server.port}/api/incoming`,
      method: 'POST',
      form: {
        From: '+1514NPANXX',
        Body: 'A Message!',
        MessageSid: 'SMe37a97021a8df7632857a298b0a3e343'
      },
      resolveWithFullResponse: true
    }).then(data => data)

    await expect(response).resolves.toHaveProperty('statusCode', 200)
  })
})
