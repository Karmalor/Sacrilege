import { NextResponse } from "next/server";
import { getPayload } from "payload";
import Stripe from "stripe";
import configPromise from "@payload-config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
});

export const config = {
  api: {
    bodyParser: false,
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
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== "paid") {
        return NextResponse.json(
          { error: "Session not paid" },
          { status: 400 }
        );
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
        {
          expand: ["data.price.product"],
        }
      );

      for (const lineItem of lineItems.data) {
        const product = lineItem.price?.product as Stripe.Product;
        const ticketType = product?.metadata?.ticketId;

        for (let i = 0; i < (lineItem.quantity ?? 1); i++) {
          await payload.create({
            collection: "tickets",
            data: {
              user: session.customer_details?.email ?? "",
              firstName: session.custom_fields?.[0]?.text?.value ?? "",
              lastName: session.custom_fields?.[1]?.text?.value ?? "",
              ticketType,
              paymentIntent: session.payment_intent?.toString() ?? "",
              checkoutSession: session.id ?? "",
              paid: true,
              isCheckedIn: false,
            },
          });
        }
      }
    } catch (err) {
      console.error("Error handling checkout.session.completed:", err);
      return NextResponse.json({ error: "Processing error" }, { status: 400 });
    }
  }
  // if (event.type === "checkout.session.completed") {
  //   console.log("Event Suceeded", event.type);
  //   const session = event.data as Stripe.CheckoutSessionCompletedEvent.Data;

  //   if (session.object.payment_status !== "paid") {
  //     console.log("Session not paid");
  //     // return;
  //   }

  //   const lineItems = await stripe.checkout.sessions.listLineItems(
  //     session.object.id,
  //     { expand: ["data.price.product"] }
  //   );

  //   if (!lineItems) {
  //     console.log("No line items");
  //     // return;
  //   }

  //   console.log("lineItems", lineItems);

  //   lineItems.data.map(async (lineItem) => {
  //     for (let i = 0; i < (lineItem.quantity || 1); i++) {
  //       try {
  //         await payload.create({
  //           collection: "tickets",
  //           data: {
  //             user: session.object.customer_details?.email as string,
  //             firstName: session.object.custom_fields[0].text?.value,
  //             lastName: session.object.custom_fields[1].text?.value,
  //             // @ts-ignore
  //             ticketType: lineItem.price?.product.metadata.ticketId as string,
  //             paymentIntent: session.object.payment_intent?.toString(),
  //             checkoutSession: session.object.id,
  //             paid: true,
  //             isCheckedIn: false,
  //           },
  //         });
  //       } catch (error) {
  //         console.error("Error adding ticket", error);
  //       }
  //     }
  //   });
  // }

  return NextResponse.json({ recieve: true });
}
