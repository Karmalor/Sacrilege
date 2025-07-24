"use client";
import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { postStripeSession } from "../_actions/stripeSession";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK as string, {
  stripeAccount: process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string,
});

type CheckoutFormProps = {
  appFee: number;
  productsArray: [];
};

export const CheckoutForm = ({ appFee, productsArray }: CheckoutFormProps) => {
  const fetchClientSecret = useCallback(async () => {
    const stripeResponse = await postStripeSession({
      productsArray,
      appFee,
    });

    return stripeResponse.clientSecret;
  }, [productsArray]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <div className="m-4">
          <EmbeddedCheckout />
        </div>
      </EmbeddedCheckoutProvider>
    </div>
  );
};
