import type { Metadata } from "next/types";

import { CollectionArchive } from "@/components/CollectionArchive";
import { PageRange } from "@/components/PageRange";
import { Pagination } from "@/components/Pagination";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { notFound } from "next/navigation";
import { DataTable } from "../../data-table";
import { columns } from "../../columns";

export const revalidate = 600;

type Args = {
  params: Promise<{
    pageNumber: string;
  }>;
};

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise;
  const payload = await getPayload({ config: configPromise });

  const sanitizedPageNumber = Number(pageNumber);

  if (!Number.isInteger(sanitizedPageNumber)) notFound();

  const attendees = await payload.find({
    collection: "tickets",
    depth: 1,
    limit: 10,
    page: sanitizedPageNumber,
  });

  return (
    <>
      <div className="mx-4 pb-10 md:pr-4">
        <h1 className="font-bold mb-4 mt-4 md:mt-0">
          Total Attendees: {attendees.docs.length}
        </h1>

        <PageRange
          collection="tickets"
          currentPage={attendees.page}
          limit={10}
          totalDocs={attendees.totalDocs}
        />

        <DataTable columns={columns} data={attendees.docs} />

        <Pagination page={attendees.page} totalPages={attendees.totalPages} />
      </div>
    </>
  );
}
