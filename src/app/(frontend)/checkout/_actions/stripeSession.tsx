"use server";

import { Stripe } from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY as string;

// const connectedAccount = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID as string;

const stripe = new Stripe(apiKey, {});

interface NewSessionOptions {
  // priceId: string;

  productsArray: [];
  // appFee: number;
}

export const postStripeSession = async ({
  // priceId,

  productsArray,
  // appFee,
}: NewSessionOptions) => {
  const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout-return?session_id={CHECKOUT_SESSION_ID}`;

  const session = await stripe.checkout.sessions.create(
    {
      ui_mode: "embedded",
      // line_items: productsArray,

      automatic_tax: {
        enabled: false,
      },
      mode: "payment",
      payment_intent_data: {
        // application_fee_amount: appFee,
      },
      metadata: {
        // appFee,
        // user: user?.primaryEmailAddress?.emailAddress as string,
        // user: "karmalor@gmail.com",
        // upgradeId: upgradeId || "",
      },
      return_url: returnUrl,
      allow_promotion_codes: true,

      custom_fields: [
        {
          key: "firstName",
          label: {
            type: "custom",
            custom: `Ticketholder's First Name`,
          },

          type: "text",
        },
        {
          key: "lastName",
          label: {
            type: "custom",
            custom: `Ticketholder's Last Name`,
          },
          type: "text",
        },
        {
          key: "source",
          label: {
            type: "custom",
            custom: `How did you hear about us`,
          },
          type: "text",
          optional: true,
        },
      ],
    }
    // {
    //   stripeAccount: connectedAccount,
    // }
  );

  if (!session.client_secret)
    throw new Error("Error initiating Stripe session");

  return {
    clientSecret: session.client_secret,
  };
};
