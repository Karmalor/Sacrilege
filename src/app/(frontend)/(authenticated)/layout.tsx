import { redirect } from "next/navigation";
import React, { FC, ReactNode } from "react";
import { getMeUser } from "@/utilities/getMeUser";
import { getUser } from "./_actions/getUser";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const user = await getUser();

  console.log(user);

  if (!user) {
    redirect("/admin");
  }

  return <>{children}</>;
};

export default Layout;
