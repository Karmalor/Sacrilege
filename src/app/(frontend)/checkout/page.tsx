import { notFound } from "next/navigation";
import React from "react";
import { CheckoutForm } from "./_components/CheckoutForm";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { TicketType } from "@/payload-types";
import { metadata } from "../layout";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<any>;
}) => {
  const payload = await getPayload({ config: configPromise });

  const { qty, ticketId } = await searchParams;

  let ticket: TicketType | null = null;

  try {
    ticket = await payload.findByID({
      collection: "ticketTypes",
      id: ticketId,
    });

    if (!ticket) {
      notFound();
    }

    // continue rendering...
  } catch (error) {
    notFound(); // or show a custom error component
  }

  let quantity = 1;

  const qtyParam = qty;
  if (qtyParam !== null && !isNaN(parseInt(qtyParam))) {
    quantity = parseInt(qtyParam);
  }

  const productArray = [
    {
      price_data: {
        currency: "usd",
        unit_amount: ticket.price * 100,
        product_data: {
          name: ticket.title,
          metadata: { ticketId: ticket.id },
        },
      },

      quantity: quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
    },
  ];

  const amount = ticket.price * quantity;

  const appFee = Math.floor(amount * 0.05);

  return (
    <div>
      <div className="max-w-screen-lg mx-auto my-8 mt-24">
        <CheckoutForm
          productsArray={productArray.length > 0 ? (productArray as []) : []}
          appFee={appFee}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
