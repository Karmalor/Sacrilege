import type { CollectionConfig } from "payload";

import { authenticated } from "../../access/authenticated";
import { protectRoles } from "./hooks/protectRoles";
import editor from "@/access/editor";
import user from "@/access/user";
import admin from "@/access/admin";
import { checkRole } from "@/access/checkRole";
import { User } from "@/payload-types";
import { anyone } from "@/access/anyone";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: ({ req: { user } }) => checkRole(["admin"], user as User),
    create: anyone,
    delete: admin,
    read: user,
    update: user,
  },
  admin: {
    defaultColumns: ["firstName", "email"],
    useAsTitle: "firstName",
  },
  auth: true,
  fields: [
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    { name: "avatar", type: "upload", relationTo: "media", required: false },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],
      // hooks: {
      //   beforeChange: [protectRoles],
      // },
      access: {
        update: ({ req: { user } }) => checkRole(["admin"], user as User),
      },
    },
  ],
  timestamps: true,
};
