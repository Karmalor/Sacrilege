"use client";

// import { SignedIn } from "@clerk/nextjs";
import React from "react";
import SideNav from "./_components/sideNav";
import { Toaster } from "sonner";

function PerformersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="my-24">
      <div className="md:w-64 md:fixed">
        <SideNav />
      </div>
      <div className="md:ml-64">
        {children} <Toaster />
      </div>
    </div>
  );
}

export default PerformersLayout;
