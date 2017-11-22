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
    let participant = '+1NPANXXXXXX'
    participants.add(participant)
    let participantsList = await participants.list()
    await expect(participantsList).toEqual([participant])
  })

  test('Can draw a winner and remove it', async () => {
    process.env.PORT = 0
    let participants = new Participants()
    let participant1 = '+1NPANXXXXXX'
    let participant2 = '+1NPANYYYYYY'

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
    participants.add()
    let participantsList = await participants.list()
    let participantsListLen = Object.keys(participantsList).length
    await expect(participantsListLen).toBe(0)
  })
})
