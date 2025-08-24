import { columns } from "./columns";

import { getPayload } from "payload";
import config from "@payload-config";
import { DataTable } from "./data-table";
import { fetchAttendees } from "./_actions/attendee.actions";
import { Ticket } from "@/payload-types";
import { Pagination } from "@/components/Pagination";
import { PageRange } from "@/components/PageRange";

export default async function TicketTablePage() {
  const payload = await getPayload({ config });

  const attendeeses = await payload.find({
    collection: "tickets",
    limit: 10,
  });

  const attendees: Ticket[] = await fetchAttendees();

  return (
    <>
      <div className="mx-4 pb-10 md:pr-4">
        <h1 className="font-bold mb-4 mt-4 md:mt-0">
          Total Attendees: {attendees.length}
        </h1>

        {/* <div className="container mb-8">
          <PageRange
            collection="posts"
            currentPage={attendeeses.page}
            limit={10}
            totalDocs={attendeeses.totalDocs}
          />
        </div> */}

        <DataTable columns={columns} data={attendees} />

        {/* <div className="container">
          {attendeeses.totalPages > 1 && attendeeses.page && (
            <Pagination
              page={attendeeses.page}
              totalPages={attendeeses.totalPages}
            />
          )}
        </div> */}
      </div>
    </>
  );
}
