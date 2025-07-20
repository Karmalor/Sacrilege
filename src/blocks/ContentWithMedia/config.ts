import type { Block } from "payload";

import {
  defaultEditorFeatures,
  FixedToolbarFeature,
  HeadingFeature,
  HTMLConverterFeature,
  InlineToolbarFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";

export const ContentWithMedia: Block = {
  slug: "contentWithMedia",
  interfaceName: "ContentWithMedia",
  fields: [
    {
      name: "richText",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
      label: false,
    },
    // {
    //   name: "image",
    //   type: "upload",
    //   relationTo: "media",
    // },
    {
      name: "ctaButtonLabel",
      type: "text",
      label: "Call To Action Button Label",
    },
    {
      name: "selectedDocs",
      type: "relationship",
      // admin: {
      //   condition: (_, siblingData) => siblingData.populateBy === "selection",
      // },
      hasMany: true,
      label: "Selection",
      relationTo: ["ticketTypes"],
    },

    // {
    //   name: "ticketOption1",
    //   type: "relationship",
    //   relationTo: "ticketTypes",
    //   hasMany: true,
    //   label: { singular: "Ticket Option", plural: "Ticket Options" },
    // },
    // {
    //   name: "populateBy",
    //   type: "select",
    //   defaultValue: "collection",
    //   options: [
    //     {
    //       label: "Collection",
    //       value: "collection",
    //     },
    //     {
    //       label: "Individual Selection",
    //       value: "selection",
    //     },
    //   ],
    // },
    // {
    //   name: "relationTo",
    //   type: "select",
    //   admin: {
    //     condition: (_, siblingData) => siblingData.populateBy === "collection",
    //   },
    //   defaultValue: "ticketTypes",
    //   label: "Collections To Show",
    //   options: [
    //     {
    //       label: "Posts",
    //       value: "posts",
    //     },
    //     {
    //       label: "Ticket Types",
    //       value: "ticketTypes",
    //     },
    //   ],
    // },
    // {
    //   name: "categories",
    //   type: "relationship",
    //   admin: {
    //     condition: (_, siblingData) => siblingData.populateBy === "collection",
    //   },
    //   hasMany: true,
    //   label: "Categories To Show",
    //   relationTo: "categories",
    // },
    // {
    //   name: "limit",
    //   type: "number",
    //   admin: {
    //     condition: (_, siblingData) => siblingData.populateBy === "collection",
    //     step: 1,
    //   },
    //   defaultValue: 10,
    //   label: "Limit",
    // },
  ],
  labels: {
    plural: "Contents with Media Blocks",
    singular: "Contents with Media Block",
  },
};
