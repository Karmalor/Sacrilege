"use server";

import { Ticket, TicketType } from "@/payload-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import Stripe from "stripe";
// import { attend } from '../../../_actions/attend'

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) || "", {
  stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
});

// export async function createPaymentIntent(ticketType: TicketType, user: Attendee) {
//   const payload = await getPayload({ config: configPromise })

//   if (!user) {
//     throw new Error('User not found')
//   }

//   // Create payment intent
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: ticketType.price * 100,
//     currency: 'usd',
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   })

//   // const existingTicket = await payload.find({
//   //   collection: 'tickets',
//   //   where: {
//   //     ticketType: { equals: ticketType.id },
//   //     attendee: { equals: user.id },
//   //   },
//   // })

//   let ticket: Ticket | null = null

//   ticket = await attend(ticketType.id, paymentIntent.id)
//   await updatePaymentMetadata(paymentIntent.id, ticket, user)

//   return {
//     clientSecret: paymentIntent.client_secret,
//     paymentIntentId: paymentIntent.id,
//     ticketId: ticket.uuid,
//   }
// }

// export async function updatePaymentMetadata(
//   paymentIntentId: string,
//   ticket: Ticket,
//   user: Attendee,
// ) {
//   await stripe.paymentIntents.update(paymentIntentId, {
//     metadata: {
//       ticketId: ticket.uuid,
//       attendee: user.id,
//       ticketType: ticket.ticketType as number,
//     },
//   })
// }
