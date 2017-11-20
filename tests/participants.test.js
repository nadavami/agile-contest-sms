/* eslint-env jest */
const Participants = require('../src/participants')

describe('Test participants', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  test('Can create empty', async () => {
    process.env.PORT = 0
    let participants = new Participants()
    let participantsList = participants.list
    await expect(await participantsList).toEqual(expect.arrayContaining([]))
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
    let participantsList = participants.list
    await expect(await participantsList).toEqual(expect.objectContaining({'+1NPANXXXXXX': participant}))
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
    let participantsListLen = Object.keys(participants.list).length
    await expect([participant1, participant2]).toContain(winner)
    await expect(await participantsListLen).toBe(1)
  })
  test('Cannot add an invalid participant', async () => {
    process.env.PORT = 0
    let participants = new Participants()
    let participant1 = {
      id: 'SMe37a97021a8df7632857a298b0a3e343',
      message: 'A Message!'
    }
    participants.add(participant1)
    let participantsListLen = Object.keys(participants.list).length
    await expect(await participantsListLen).toBe(0)
  })
})
