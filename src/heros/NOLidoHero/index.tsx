"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { Suspense, useEffect } from "react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";
import Image from "next/image";

// import svg from '../../../public/media/NOLido Logo v1 1.svg'

export const NOLidoHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
  // logo,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  console.log("media", media);

  return (
    <div
      className="h-dvh w-dvw overflow-x-hidden flex items-center justify-center text-red"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 absolute flex items-center justify-center">
        <div className="max-w-[36.5rem] text-center">
          {richText && (
            <RichText className="mb-6" data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="select-none">
        {media && typeof media === "object" && (
          <>
            <div className="-z-30 absolute pointer-events-none left-0 bottom-0 bg-[#0F0A3A] overflow-x-hidden" />
            <div className="h-[100dvh] aspect-video md:h-[100dvh] max-h-[100dvh] absolute top-0 left-1/2 -translate-x-1/2 overflow-x-hidden object-cover">
              <Media
                fill
                videoClassName="object-cover absolute left-0 top-0"
                imgClassName="-z-20 object-cover opacity-30"
                priority
                resource={media}
              />
            </div>
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </>
        )}
      </div>
      {/* <div className="min-h-[80vh] select-none">
        {logo && typeof media === 'object' && (
          <>
            <Media
              fill
              imgClassName="max-w-[90vw] mx-auto opacity-100 mt-48 drop-shadow-[8px_6px_0_rgba(15,10,58,.75)]"
              priority
              resource={logo}
            />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </>
        )}
      </div> */}
    </div>
  );
};
