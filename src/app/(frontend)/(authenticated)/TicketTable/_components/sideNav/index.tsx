import { LibraryBig, LineChart, PartyPopper } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
// import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Guest List",
      icon: LibraryBig,
      path: "/TicketTable",
    },
    // {
    //   id: 2,
    //   name: "Post Calendar",
    //   icon: PartyPopper,
    //   path: "/PostCalendar",
    // },
    // {
    //   id: 3,
    //   name: "Post Uploader",
    //   icon: LineChart,
    //   path: "/PostUploader",
    // },
  ];

  const path = usePathname();

  return (
    <div className="mx-4 shadow-sm border border-white bg-background rounded-lg">
      <div className="p-5">
        {menuList.map((menu, index) => (
          <Link
            href={menu.path}
            key={index}
            className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-black hover:scale-105 transition-all ease-in-out rounded-lg cursor-pointer  
              ${path == menu.path ? "bg-primary text-black" : "text-white"}
          `}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
