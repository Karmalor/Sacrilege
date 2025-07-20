import { ContentWithMedia as ContentWithMediaBlockProps } from "@/payload-types";
import Image from "next/image";
import React from "react";

import RichText from "@/components/RichText";
import { Button } from "@/components/ui/button";
import { CollectionArchive } from "@/components/CollectionArchive";
import TicketSelectorButton from "./components/TicketSelectorButton";

export const ContentWithMediaBlock: React.FC<
  ContentWithMediaBlockProps
> = async (props) => {
  const { richText, selectedDocs, ctaButtonLabel } = props;

  return (
    <>
      <div className="container">
        <div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
          <div className="max-w-[48rem] flex items-center">
            {richText && (
              <RichText className="mb-0" data={richText} enableGutter={false} />
            )}
          </div>
          <div className="flex flex-col gap-8">
            {/* {(links || []).map(({ link }, i) => {
                  return <CMSLink key={i} size="lg" {...link} />
                })} */}
            <TicketSelectorButton
              ticketsOptions={selectedDocs}
              buttonLabel={ctaButtonLabel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentWithMediaBlock;
