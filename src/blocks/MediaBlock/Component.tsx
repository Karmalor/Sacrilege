import type { StaticImageData } from "next/image";

import { cn } from "src/utilities/cn";
import React from "react";
import RichText from "@/components/RichText";

import type { MediaBlock as MediaBlockProps } from "@/payload-types";

import { Media } from "../../components/Media";
import Script from "next/script";

// import scrubbing from '../../hooks/scrubbing'

type Props = MediaBlockProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props;

  let caption;
  if (media && typeof media === "object") caption = media.caption;

  // const section = document.querySelector('div.vid')
  // const vid = section?.querySelector('video')

  // vid?.pause()

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            "border border-border rounded-[0.8rem]",
            imgClassName
          )}
          resource={media}
          src={staticImage}
        />
      )}

      {caption && (
        <div
          className={cn(
            "mt-6",
            {
              container: !disableInnerContainer,
            },
            captionClassName
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}

      <Script src="../../hooks/scrubbing" />
    </div>
  );
};
