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
})
