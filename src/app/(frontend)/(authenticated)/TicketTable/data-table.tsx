"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utilities/cn";
import { fetchAttendees } from "./_actions/attendee.actions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    state: {
      sorting,
    },

    initialState: {
      // columnOrder: [
      //   "select",
      //   "selectAndActions",
      //   "stageName",
      //   "showcase",
      //   "photo",
      // ],
      // columnPinning: {
      //   left: [],
      //   right: [],
      // },
      // sorting: [
      //   {
      //     id: "lastName",
      //     desc: true, // sort by name in descending order by default
      //   },
      // ],
      pagination: {
        pageSize: 25,
      },
    },
  });

  async function loadPreviousPage() {
    await fetchAttendees();
    table.previousPage();
  }

  async function loadNextPage() {
    await fetchAttendees();
    table.nextPage();
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex justify-between">
        <div>{/* <h1>Pages</h1> */}</div>
      </div>
      <div className="flex-1 text-sm text-muted-foreground mx-10 items-start justify-center">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  "active:bg-secondary",
                  row.getValue("tier") === "VIP" && "bg-[#039FC8]"
                  // guest.ticketType.name.includes("Performer") && "bg-[#FF00B2]",
                  // guest.ticketType.name.includes("Weekend") &
                  //   guest.ticketType.name.includes("VIP") && "bg-[#FF9800]",
                  // guest.ticketType.name.includes("Baller") &&
                  //   "bg-[#039FC8] text-[#FFF]"
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-sm">
          page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </h3>
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadPreviousPage}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={loadNextPage}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
