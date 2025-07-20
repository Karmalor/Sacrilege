import { CollectionConfig } from "payload";

export const Tickets: CollectionConfig = {
  slug: "tickets",
  access: {
    read: ({ req: { user } }) => {
      // return { attendee: { equals: user?.id } }
      return Boolean(user);
    },
    create: ({ req: { user }, data }) => {
      if (user?.collection === "users") {
        return true;
        // } else if (
        //   user?.collection === "users" &&
        //   data?.attendee === user?.id
        // ) {
        //   return true;
      } else {
        return false;
      }
    },
    update: ({ req: { user } }) => {
      return { attendee: { equals: user?.id } };
    },
    delete: ({ req: { user } }) => {
      return { attendee: { equals: user?.id } };
    },
  },
  admin: {
    useAsTitle: "",
  },
  fields: [
    {
      name: "user",
      label: "Attendee",
      type: "email",
      // relationTo: "users",
      required: false,
    },
    {
      name: "ticketType",
      label: "Ticket Type",
      type: "relationship",
      relationTo: "ticketTypes",
      required: true,
    },
    {
      name: "paymentIntent",
      label: "Payment Intent ID",
      type: "text",
    },
    {
      name: "paid",
      label: "Paid",
      type: "checkbox",
    },
  ],
};
