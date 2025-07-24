"use client";

import { TicketType } from "@/payload-types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

interface CheckoutInterface {
  clientSecret: string;
  ticketType: TicketType;
  ticketId: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string, {
  stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
});

export default function Checkout({
  clientSecret,
  ticketType,
  ticketId,
}: CheckoutInterface) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {/* Payment Form */}
      <PaymentForm ticketId={ticketId} ticketType={ticketType} />
    </Elements>
  );
}
