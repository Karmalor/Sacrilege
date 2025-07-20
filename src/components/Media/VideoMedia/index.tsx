"use client";

import { cn } from "src/utilities/cn";
import React, { useEffect, useRef } from "react";

import type { Props as MediaProps } from "../types";

import { getClientSideURL } from "@/utilities/getURL";
import Script from "next/script";

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props;

  const videoRef = useRef<HTMLVideoElement>(null);
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef;
    if (video) {
      video.addEventListener("suspend", () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);

  if (resource && typeof resource === "object") {
    const { filename, url } = resource;

    return (
      <>
        <section id="vid" className="h-[3000px]">
          <div id="holder" className="sticky top-0">
            <video
              autoPlay
              className={`${cn(videoClassName)}`}
              controls={false}
              loop
              muted
              onClick={onClick}
              playsInline
              ref={videoRef}
            >
              <source src={`${getClientSideURL()}${url}`} />
            </video>
          </div>
        </section>

        <Script src="scrubbing.js" />
      </>
    );
  }

  return null;
};
