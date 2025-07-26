import { redirect } from "next/navigation";
import React, { FC, ReactNode } from "react";
import { getMeUser } from "@/utilities/getMeUser";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = async ({ children }) => {
  const { user } = await getMeUser();

  console.log(user);

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default Layout;
