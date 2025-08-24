"use client";

import { Ticket } from "@/payload-types";
import { ColumnDef } from "@tanstack/react-table";
import { UpdateIsCheckedIn } from "./_actions/attendee.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { toast } from "sonner";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "isCheckedIn",
    cell: ({ row }) => {
      const isCheckedIn = row.getValue("isCheckedIn") as boolean;
      const ticketId = row.getValue("id") as string;
      const checkedInToast = () => toast("Guest has been checked in");
      const checkedOutToast = () => toast("Guest has been checked out");

      const updateGuest = async () => {
        const guestStatus = await UpdateIsCheckedIn(ticketId, isCheckedIn);

        if (guestStatus == true) {
          checkedInToast();
        } else {
          checkedOutToast();
        }
      };

      return (
        <div className="flex items-center justify-center gap-4">
          <Checkbox
            defaultChecked={isCheckedIn}
            onCheckedChange={async () => updateGuest()}
          />
        </div>
      );
    },
    header: ({ column }) => {
      return <div className="mx-auto flex justify-center">Checked In</div>;
    },
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <p>{row.getValue("lastName")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          eMail
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    // @ts-ignore
    accessorFn: (row) => row.ticketType.title,
    id: "tier",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tier
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "id",
    header: "",
    size: 0,
    cell: () => {
      return null;
    },
  },
];
