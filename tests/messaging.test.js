/* eslint-env jest */
const Messaging = require('../src/messaging')

jest.mock('twilio')

describe('Test messaging', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('Can send message with to and body', async () => {
    let messaging = new Messaging()
    let mockSentMessage = messaging.send('+1NPANXXXXX1', 'This is a message')

    await expect(mockSentMessage).resolves.toHaveProperty('to', '+1NPANXXXXX1')
    await expect(mockSentMessage).resolves.toHaveProperty('from', '+1NPANXXXXXX')
    await expect(mockSentMessage).resolves.toHaveProperty('body', 'This is a message')
  })

  test('Throws error if missing a to or body', async () => {
    let messaging = new Messaging()
    let mockSentMessageNoTo = messaging.send(undefined, 'This is a message')
    let mockSentMessageNoBody = messaging.send('+1NPANXXXXX1', undefined)
    let mockSentMessageNoParams = messaging.send()

    await expect(mockSentMessageNoTo).rejects.toBeInstanceOf(Error)
    await expect(mockSentMessageNoBody).rejects.toBeInstanceOf(Error)
    await expect(mockSentMessageNoParams).rejects.toBeInstanceOf(Error)
  })
})
