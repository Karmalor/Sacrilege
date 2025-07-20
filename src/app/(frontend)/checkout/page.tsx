import { notFound } from "next/navigation";
import React from "react";
import { CheckoutForm } from "./_components/CheckoutForm";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { TicketType } from "@/payload-types";

export async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const payload = await getPayload({ config: configPromise });

  const { qty, ticketId } = await searchParams;

  console.log("ticketType", ticketId);
  console.log("qty", qty);

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
        },
      },
      quantity: quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
    },
  ];

  return (
    <div>
      <div className="max-w-screen-lg mx-auto my-8 mt-24">
        <CheckoutForm
          productsArray={productArray.length > 0 ? (productArray as []) : []}
          // appFee={50}
        />
      </div>
    </div>
  );
}

export default CheckoutPage;
