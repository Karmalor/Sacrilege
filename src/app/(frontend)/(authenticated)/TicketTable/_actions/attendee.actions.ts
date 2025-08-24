"use server";

import { getPayload, Payload } from "payload";
import configPromise from "@payload-config";

const payload: Payload = await getPayload({ config: await configPromise });

export async function fetchAttendees() {
  const attendees = await payload.find({
    collection: "tickets",
    limit: 1000,
    sort: "lastName",
  });

  // console.log("attendee", attendees.docs[0]);

  return attendees.docs;
}

export async function UpdateIsCheckedIn(
  ticketId: string,
  isCheckedIn: boolean
) {
  try {
    const result = await payload.findByID({
      collection: "tickets",
      id: ticketId,
    });

    await payload.update({
      collection: "tickets",
      id: ticketId,
      data: {
        isCheckedIn: !result?.isCheckedIn,
      },
    });

    return !result?.isCheckedIn;
  } catch (error) {
    return new Response("Error checking in", { status: 500 });
  }
}
