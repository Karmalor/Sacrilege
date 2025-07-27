// import { link } from '@/src/payload/fields/link';

import { link } from "@/fields/link";
import type { Block } from "payload";

export const FeatureListConfig: Block = {
  slug: "featureListConfig",
  interfaceName: "FeatureListType",
  fields: [
    {
      type: "collapsible",
      label: "Text Content",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: "eyebrow",
          label: "Eyebrow",
          type: "text",
          localized: true,
        },
        {
          name: "title",
          label: "Title",
          type: "text",
          localized: true,
        },
        {
          name: "subtitle",
          label: "Subtitle",
          type: "text",
          localized: true,
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Primary CTA (Optional)",
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          // required: false,
          overrides: {
            name: "ctaPrimary",
            label: "Primary CTA (Optional)",
          },
        }),
      ],
    },
    {
      type: "collapsible",
      label: "Secondary CTA (Optional)",
      admin: {
        initCollapsed: true,
      },
      fields: [
        link({
          // required: false,
          overrides: {
            name: "ctaSecondary",
            label: "Secondary CTA (Optional)",
          },
        }),
      ],
    },
    {
      name: "features",
      type: "array",
      label: "Features",
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: "image",
          label: "Image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "title",
          type: "text",
          label: "Title",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Description",
          localized: true,
        },
      ],
    },
    {
      type: "collapsible",
      label: "Layout",
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "textPlacement",
              label: "Text Placement",
              type: "select",
              options: [
                { label: "Top", value: "top" },
                { label: "Bottom", value: "bottom" },
              ],
              defaultValue: "top",
              admin: {
                width: "50%",
                description: "Select if text is on the top or the bottom.",
              },
            },
            {
              name: "textAlignment",
              label: "Text Alignment",
              type: "select",
              options: [
                { label: "Start", value: "start" },
                { label: "Center", value: "center" },
                { label: "End", value: "end" },
              ],
              defaultValue: "start",
              admin: {
                width: "50%",
                description:
                  "Align text within its column (left, center, or right).",
              },
            },
          ],
        },
      ],
    },
  ],
};
