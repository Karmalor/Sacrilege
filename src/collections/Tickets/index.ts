import admin from "@/access/admin";
import { anyone } from "@/access/anyone";
import user from "@/access/user";
import { CollectionConfig } from "payload";

export const Tickets: CollectionConfig = {
  slug: "tickets",
  access: {
    read: user,
    create: anyone,
    update: anyone,
    delete: admin,

    // read: ({ req: { user } }) => {
    //   // return { user: { equals: user?.id } }
    //   return Boolean(user);
    // },
    // create: ({ req: { user }, data }) => {
    //   if (user?.collection === "users") {
    //     return true;
    //     // } else if (
    //     //   user?.collection === "users" &&
    //     //   data?.user === user?.id
    //     // ) {
    //     //   return true;
    //   } else {
    //     return false;
    //   }
    // },
    // update: ({ req: { user } }) => {
    //   return { user: { equals: user?.id } };
    // },
    // delete: ({ req: { user } }) => {
    //   return { user: { equals: user?.id } };
    // },
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
      required: true,
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: false,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
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
      name: "checkoutSession",
      label: "Checkout Session ID",
      type: "text",
    },
    {
      name: "paid",
      label: "Paid",
      type: "checkbox",
    },
    {
      name: "isCheckedIn",
      label: "Is Checked In",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
