import { NextResponse } from "next/server";
import { getPayload } from "payload";
import Stripe from "stripe";
import configPromise from "@payload-config";
import { getUser } from "@/app/(frontend)/(authenticated)/_actions/getUser";
import { uuid } from "node_modules/zod/v4/core/regexes.cjs";
import { randomUUID } from "crypto";
import { TicketType } from "@/payload-types";

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) || "", {
  apiVersion: "2022-08-01",
});

export const config = {
  api: {
    bodyParse: false,
  },
};

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    console.log("No Signature");
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawbody = await request.text();

    event = stripe.webhooks.constructEvent(
      rawbody,
      sig,
      (process.env.STRIPE_WEBHOOK_SECRET as string) || ""
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  const payload = await getPayload({ config: configPromise });

  // switch (event.type) {
  if (event.type === "checkout.session.completed") {
    console.log("Event Suceeded", event.type);
    const session = event.data as Stripe.CheckoutSessionCompletedEvent.Data;

    if (session.object.payment_status !== "paid") {
      console.log("Session not paid");
      // return;
    }

    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.object.id
    );

    if (!lineItems) {
      console.log("No line items");
      // return;
    }

    console.log(lineItems);

    lineItems.data.map(async (lineItem) => {
      for (let i = 0; i < (lineItem.quantity || 1); i++) {
        try {
          await payload.create({
            collection: "tickets",
            data: {
              user: session.object.customer_email,
              uuid: randomUUID(),
              ticketType: lineItem.id,
            },
          });
        } catch (error) {
          console.error("Error updating application", error);
        }
      }
    });
  }

  // case "payment_intent.cancelled":
  // case "payment_intent.failed": {
  //   const paymentIntent = event.data.object as Stripe.PaymentIntent;
  //   try {
  //     await payload.delete({
  //       collection: "applicants",
  //       where: {
  //         paymentIntent: {
  //           equals: paymentIntent.id,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error deleting application", error);
  //   }
  // }
  // default:
  //   console.log(`Unhandled event type: ${event.type}`);

  return NextResponse.json({ recieve: true });
}
