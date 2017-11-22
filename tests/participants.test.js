/* eslint-env jest */
const Participants = require('../src/participants')

describe('Test participants', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('Can create empty', async () => {
    process.env.PORT = 0
    let participants = new Participants()
    let participantsList = await participants.list()
    await expect(participantsList).toEqual(expect.arrayContaining([]))
  })

  test('Can create and add to it', async () => {
    process.env.PORT = 0
    let participants = new Participants()
    let participant = {
      id: 'SMe37a97021a8df7632857a298b0a3e343',
      phone: '+1NPANXXXXXX',
      message: 'A Message!'
    }
    participants.add(participant)
    let participantsList = await participants.list()
    await expect(participantsList).toEqual(expect.objectContaining({'14956983843c57fc152dc52ed09b0178bc222ca8d6aa745eec7440d953c6ec34': participant}))
  })

  test('Can draw a winner and remove it', async () => {
    process.env.PORT = 0
    let participants = new Participants()
    let participant1 = {
      id: 'SMe37a97021a8df7632857a298b0a3e343',
      phone: '+1NPANXXXXXX',
      message: 'A Message!'
    }

    let participant2 = {
      id: 'SMe37a97021a8df712821218b0a3e343',
      phone: '+1NPANYYYYYY',
      message: 'A second Message!'
    }
    participants.add(participant1)
    participants.add(participant2)
    let winner = await participants.winner()
    let participantsList = await participants.list()
    await expect([participant1, participant2]).toContain(winner)
    await expect(Object.keys(participantsList).length).toBe(1)
  })

  test('Cannot add an invalid participant', async () => {
    process.env.PORT = 0
    let participants = new Participants()
    let participant1 = {
      id: 'SMe37a97021a8df7632857a298b0a3e343',
      message: 'A Message!'
    }
    participants.add(participant1)
    let participantsList = await participants.list()
    let participantsListLen = Object.keys(participantsList).length
    await expect(participantsListLen).toBe(0)
  })
})
