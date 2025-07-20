import { Payload } from 'payload'

interface paidUserInterface {
  collection: 'users' | 'attendees' | undefined
  userId: string | undefined
  payload: Payload
  id: string
}

export async function paidUser({ collection, userId, payload, id }: paidUserInterface) {
  if (collection === 'users') {
    return true
  } else {
    const tickets = await payload.find({
      collection: 'tickets',
      where: {
        attendee: { equals: userId },
        ticket: { equals: id },
        paid: { equals: true },
      },
    })

    return tickets.docs.length > 0
  }
}
