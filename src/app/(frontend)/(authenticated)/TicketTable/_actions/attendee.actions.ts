"use server";

import { getPayload, Payload } from "payload";
import configPromise from "@payload-config";

export async function UpdateIsCheckedIn(
  ticketId: string,
  isCheckedIn: boolean
) {
  const payload: Payload = await getPayload({ config: await configPromise });

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
