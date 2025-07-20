import type {
  Post,
  TicketType,
  TicketSelector as TicketSelectorBlockProps,
} from "@/payload-types";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import RichText from "@/components/RichText";

import { CollectionArchive } from "@/components/CollectionArchive";
import { TicketArchive } from "@/components/TicketArchive";
import { Button } from "@/components/ui/button";

export const TicketSelectorBlock: React.FC<
  TicketSelectorBlockProps & {
    id?: string;
  }
> = async (props) => {
  // const { id, introContent, populateBy } = props;

  // let products: TicketType[] = [];

  // if (populateBy === "collection") {
  //   const payload = await getPayload({ config: configPromise });

  //   const fetchedPosts = await payload.find({
  //     collection: "ticketTypes",
  //     depth: 1,
  //   });

  //   products = fetchedPosts.docs;
  // }

  return (
    <div
      className="my-16"
      // id={`block-${id}`}
    >
      {/* {introContent && (
        <div className="container mb-16">
          <RichText
            className="ml-0 max-w-[48rem]"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )} */}
      <Button>Buy Tickets</Button>{" "}
    </div>
  );
};
