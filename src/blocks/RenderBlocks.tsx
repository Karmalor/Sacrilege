import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { CustomBlock } from "./CustomBlock/Component";
import { BannerBlock } from "./Banner/Component";
import { CodeBlock } from "./Code/Component";
import { ContentWithMediaBlock } from "./ContentWithMedia/Component";
import { FeatureListComponent } from "./FeatureList/Component";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  customBlock: CustomBlock,
  banner: BannerBlock,
  code: CodeBlock,
  contentWithMedia: ContentWithMediaBlock,
  featureList: FeatureListComponent,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className="my-4" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
