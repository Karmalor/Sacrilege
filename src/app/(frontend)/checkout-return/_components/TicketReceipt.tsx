"use client";

import { TicketType } from "@/payload-types";
import React, { useEffect } from "react";

interface TicketReceiptProps {
  checkoutSuccess: string | null;
  purchasedTicketType: TicketType | null;
  qty?: number | null;
}

const TicketReceipt = ({ purchasedTicketType, qty }: TicketReceiptProps) => {
  return (
    <div className="flex w-full h-full">
      <div className="max-w-[350px] h-full flex flex-col mx-auto my-24">
        <h2 className="font-bold text-2xl mb-4">
          Thank you so much for your order!
        </h2>
        <h2>
          You will receive a receipt for your payment in your email. Your name &
          the number of reserved seats has been added to our list. We can&apos;t
          wait to see you at the show!
        </h2>
        <div className="flex justify-between mt-4">
          <h2>{qty}x</h2>
          <h2>{purchasedTicketType?.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default TicketReceipt;
