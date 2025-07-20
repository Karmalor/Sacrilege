import type { CollectionConfig } from "payload";

export const Showcases: CollectionConfig = {
  slug: "showcases",
  access: {
    read: ({ req: { user } }) => {
      return Boolean(user);
    },
    create: ({ req: { user } }) => {
      return user?.collection === "users";
    },
    update: ({ req: { user } }) => {
      return user?.collection === "users";
    },
    delete: ({ req: { user } }) => {
      return user?.collection === "users";
    },
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
    },
    {
      name: "image",
      label: "Image",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "venue",
      label: "Venue",
      type: "text",
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "default",
          displayFormat: "",
        },
      },
    },
    {
      name: "startTime",
      label: "Start Time",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "",
        },
      },
    },
    {
      name: "endTime",
      label: "End Time",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "",
        },
      },
    },
    {
      name: "doors",
      label: "Doors",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "timeOnly",
          displayFormat: "",
        },
      },
    },
  ],
};
