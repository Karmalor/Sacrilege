import type {
  Post,
  ArchiveBlock as ArchiveBlockProps,
  Product,
  TicketType,
} from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import RichText from "@/components/RichText";

import { CollectionArchive } from "@/components/CollectionArchive";

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string;
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
  } = props;

  const limit = limitFromProps || 3;

  let tickets: TicketType[] = [];

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise });

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === "object") return category.id;
      else return category;
    });

    const fetchedPosts = await payload.find({
      collection: "ticketTypes",
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    });

    tickets = fetchedPosts.docs;
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((ticket) => {
        if (typeof ticket.value === "object") return ticket.value;
      }) as Post[];

      tickets = filteredSelectedPosts;
    }
  }

  return (
    <div
      className="my-16 mx-8 p-4 border-2 border-white roun rounded-lg"
      id={`block-${id}`}
    >
      {introContent && (
        <div className="container mb-16">
          <RichText
            className="ml-0 max-w-[48rem]"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}

      <CollectionArchive posts={tickets} />
    </div>
  );
};
