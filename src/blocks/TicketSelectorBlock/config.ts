import type { Block } from "payload";

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";

export const TicketSelector: Block = {
  slug: "ticketSelector",
  interfaceName: "TicketSelector",
  fields: [
    {
      name: "introContent",
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
      label: "Intro Content",
    },
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
    //   defaultValue: "ticketType",
    //   label: "Collections To Show",
    //   options: [
    //     {
    //       label: "Ticket Types",
    //       value: "ticketType",
    //     },
    //   ],
    // },
    // {
    //   name: 'categories',
    //   type: 'relationship',
    //   admin: {
    //     condition: (_, siblingData) => siblingData.populateBy === 'collection',
    //   },
    //   hasMany: true,
    //   label: 'Categories To Show',
    //   relationTo: 'categories',
    // },
    // {
    //   name: 'limit',
    //   type: 'number',
    //   admin: {
    //     condition: (_, siblingData) => siblingData.populateBy === 'collection',
    //     step: 1,
    //   },
    //   defaultValue: 10,
    //   label: 'Limit',
    // },
    // {
    //   name: 'selectedDocs',
    //   type: 'relationship',
    //   admin: {
    //     condition: (_, siblingData) => siblingData.populateBy === 'selection',
    //   },
    //   hasMany: true,
    //   label: 'Selection',
    //   relationTo: ['posts'],
    // },
  ],
  labels: {
    plural: "Ticket Selectors",
    singular: "Ticket Selector",
  },
};
