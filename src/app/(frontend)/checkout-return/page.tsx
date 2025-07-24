import React from "react";
import Stripe from "stripe";
import TicketReceipt from "./_components/TicketReceipt";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { TicketType } from "@/payload-types";
import { notFound } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
});

const CheckoutReturnPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>;
}) => {
  const payload = await getPayload({ config: configPromise });

  const { session_id } = await searchParams;

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items.data.price.product"],
  });

  const products = await checkoutSession;

  const qty = products.line_items?.data[0].quantity;

  let purchasedTicketType: TicketType | null = null;

  try {
    purchasedTicketType = await payload.findByID({
      collection: "ticketTypes",
      // @ts-ignore
      id: products.line_items?.data[0].price?.product.metadata.ticketId,
    });

    if (!purchasedTicketType) {
      notFound();
    }

    // continue rendering...
  } catch (error) {
    notFound(); // or show a custom error component
  }

  return (
    <div>
      {checkoutSession.status && (
        <TicketReceipt
          checkoutSuccess={checkoutSession.status}
          purchasedTicketType={purchasedTicketType}
          qty={qty}
        />
      )}
    </div>
  );
};

export default CheckoutReturnPage;
