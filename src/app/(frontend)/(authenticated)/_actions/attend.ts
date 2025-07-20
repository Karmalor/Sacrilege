"use server";

import configPromise from "@payload-config";

import { getPayload } from "payload";
import { getUser } from "./getUser";
import { randomUUID } from "crypto";

export async function attend(ticketTypeId: number, paymentIntentId: string) {
  const payload = await getPayload({ config: configPromise });

  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  // const createdTicket = await payload.create({
  //   collection: 'tickets',
  //   data: {
  //     ticketType: ticketTypeId,
  //     paymentIntent: paymentIntentId,
  //     paid: false,
  //     attendee: user.id,
  //   },
  // })

  const pendingTicket = {
    id: Math.random(),
    uuid: randomUUID() as string,
    ticketType: ticketTypeId,
    paymentIntent: paymentIntentId,
    paid: false,
    attendee: user.id,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
  };

  return pendingTicket;
}

export async function deleteTicket(ticketId: string) {
  const payload = await getPayload({ config: configPromise });
  await payload.delete({
    collection: "tickets",
    id: ticketId,
  });
}
