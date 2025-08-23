import { columns } from "./columns";

import { getPayload } from "payload";
import config from "@payload-config";
import { DataTable } from "./data-table";

export default async function TicketTablePage() {
  const payload = await getPayload({ config });

  const attendees = await payload.find({
    collection: "tickets",
    limit: 100,
  });

  return (
    <>
      <div className="mx-4 pb-10 md:pr-4">
        <h1 className="font-bold mb-4 mt-4 md:mt-0">
          Total Attendees: {attendees.docs.length}
        </h1>
        <DataTable columns={columns} data={attendees.docs} />
      </div>
    </>
  );
}
