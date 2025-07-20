import type { FieldHook } from "payload";
import type { User } from "@/payload-types";

export const protectRoles: FieldHook<{ id: string } & User> = ({
  req,
  data,
}) => {
  const isAdmin = req.user?.roles?.includes("admin");

  if (!isAdmin) {
    return ["User"];
  }

  const userRoles = new Set(data?.roles || []);
  userRoles.add("user");

  return [...userRoles?.values()];
};
