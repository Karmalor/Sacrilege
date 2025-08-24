"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
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
import { cn } from "@/utilities/cn";
import { fetchAttendees } from "./_actions/attendee.actions";
import { Input } from "@/components/ui/input";
import { LucideX } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [tableData, setTableData] = useState<TData[]>(data);
  const [globalFilter, setGlobalFilter] = useState<any>([]);

  const table = useReactTable({
    data: tableData,
    columns,

    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString", // built-in filter function

    state: {
      sorting,
      columnFilters,
      globalFilter,
    },

    onGlobalFilterChange: setGlobalFilter,

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
        pageSize: 1000,
        pageIndex: 0, // starting page
      },
    },
  });

  // async function loadPreviousPage() {
  //   const newData = await fetchAttendees();
  //   setTableData(newData);
  //   table.previousPage();
  // }

  // async function loadNextPage() {
  //   const newData = await fetchAttendees();
  //   setTableData(newData);
  //   table.nextPage();
  // }

  const handleSearch = useDebouncedCallback((value: string) => {
    table.setGlobalFilter(value || "");
  }, 100);

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="flex justify-between">
        <div>{/* <h1>Pages</h1> */}</div>
      </div>

      {/* <div className="flex-1 text-sm text-muted-foreground mx-10 items-start justify-center">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex gap-2">
        <Input
          placeholder="Search guest..."
          // value={globalFilter ?? ""}
          // value=""
          // onChange={(event) => {
          //   table.getColumn("lastName")?.setFilterValue(event.target.value);
          //   console.log("search changed", columnFilters);
          // }}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm border-gray-500"
        />
        <button
          onClick={() => {
            setGlobalFilter([]);
          }}
        >
          <LucideX />
        </button>
      </div>

      {/* <GlobalDataSearch table={table} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} /> */}

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
      {/* <div className="flex flex-col justify-center items-center mt-4">
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
      </div> */}
    </div>
  );
}
