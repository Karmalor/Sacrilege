import { Banner } from "@payloadcms/ui/elements/Banner";
import React from "react";

import { SeedButton } from "./SeedButton";
import "./index.scss";
import Link from "next/link";

import { getPayload } from "payload";
import config from "@payload-config";

const baseClass = "before-dashboard";

const BeforeDashboard: React.FC = async () => {
  const payload = await getPayload({ config });

  const attendees = await payload.find({
    collection: "tickets",
    limit: 100,
  });

  const todaysTickets = attendees.docs.filter((item: any) => {
    const today = new Date().setHours(0);

    return Date.parse(item.createdAt) >= today;
  });

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner bg-black`}>
        <h4>Welcome to your dashboard!</h4>
      </Banner>
      <h1 className="font-bold mb-4 mt-4 md:mt-0 text-3xl">
        Total Attendees: {attendees.docs.length}
      </h1>

      <h2>Tickets sold today: {todaysTickets.length}</h2>

      <Link href={"/TicketTable"}>View Guestlist</Link>
    </div>
  );
};

export default BeforeDashboard;
