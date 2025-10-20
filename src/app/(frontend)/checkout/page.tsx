import { notFound } from "next/navigation";
import React from "react";
import { CheckoutForm } from "./_components/CheckoutForm";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Media, TicketType } from "@/payload-types";
import { metadata } from "../layout";

const CheckoutPage = async ({
  searchParams,
}: {
  searchParams: Promise<any>;
}) => {
  const payload = await getPayload({ config: configPromise });

  const { qty, ticketId } = await searchParams;

  const ticket = await payload.find({
    collection: "ticketTypes",
    depth: 2,
    where: {
      isActive: {
        equals: true,
      },
    },
  });

  let quantity = 1;

  const qtyParam = qty;
  if (qtyParam !== null && !isNaN(parseInt(qtyParam))) {
    quantity = parseInt(qtyParam);
  }

  const ticketForPurchase: any = ticket.docs[0];

  const ticketImage = `https://utfs.io/f/${ticketForPurchase.image?._key}`;

  console.log("image", ticketImage);

  const productArray = [
    {
      price_data: {
        currency: "usd",
        unit_amount: ticket.docs[0].price * 100,
        product_data: {
          name: ticket.docs[0].title,
          images: [ticketImage],
          metadata: { ticketId: ticket.docs[0].id },
        },
      },

      quantity: quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
      },
    },
  ];

  const amount = ticket.docs[0].price * 100 * quantity;

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
