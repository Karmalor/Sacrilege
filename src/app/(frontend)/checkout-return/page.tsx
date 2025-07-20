import { getPayload } from "payload";
import React from "react";
import configPromise from "@payload-config";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe((process.env.STRIPE_SECRET_KEY as string) || "", {
  apiVersion: "2022-08-01",
});
const CheckoutReturnPage = async ({
  searchParams,
  request,
}: {
  searchParams: Promise<any>;
  request: Request;
}) => {
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
  const lineItems = await stripe.checkout.sessions.listLineItems(
    "cs_test_a1enSAC01IA3Ps2vL32mNoWKMCNmmfUGTeEeHXI5tLCvyFNGsdG2UNA7mr"
  );

  const { session_id } = await searchParams;

  console.log("session_id", session_id);

  return (
    <div className="mt-24 mx-16">
      <h3>Poopee</h3>
    </div>
  );
};

export default CheckoutReturnPage;
