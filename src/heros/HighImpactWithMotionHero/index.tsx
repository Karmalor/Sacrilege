"use client";
import { useHeaderTheme } from "@/providers/HeaderTheme";
import React, { useEffect } from "react";

import type { Page } from "@/payload-types";

import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";
import RichText from "@/components/RichText";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export const HighImpactWithMotionHero: React.FC<Page["hero"]> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme();

  useEffect(() => {
    setHeaderTheme("dark");
  });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(30% 80%, 72% 10%, 90% 90%, 80% 100%)",
      borderRadius: "60% 100% 100% 100%",
      autoAlpha: 0.3,
      // Force GPU acceleration to avoid layout shifts
      force3D: true,
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      autoAlpha: 1,
      fillOpacity: 0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom 0%+=100px",
        scrub: true,
      },
    });
  });

  return (
    <div
      className="h-dvh overflow-x-hidden flex items-center justify-center text-red"
      data-theme="dark"
    >
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div className="max-w-[36.5rem] md:text-center">
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
      <div
        className="absolute inset-0 w-full h-full will-change-[clip-path,border-radius]"
        id="video-frame"
      >
        {media && typeof media === "object" && (
          <div>
            <Media
              fill
              imgClassName="-z-10 object-cover"
              priority
              resource={media}
            />
            <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
          </div>
        )}
      </div>
    </div>
  );
};
