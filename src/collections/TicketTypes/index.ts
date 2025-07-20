import type { CollectionConfig } from "payload";

export const TicketTypes: CollectionConfig = {
  slug: "ticketTypes",
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
      name: "showcase",
      label: "Showcase",
      type: "relationship",
      relationTo: "showcases",
      required: true,
    },
    {
      name: "image",
      label: "Image",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
  ],
};
