import { Input } from "@/components/ui/input";
import { LucideX } from "lucide-react";
import React from "react";

const GlobalDataSearch = ({
  table,
  globalFilter,
  setGlobalFilter,
}: {
  table: any;
  globalFilter: [];
  setGlobalFilter: any;
}) => {
  function clearSearch() {
    setGlobalFilter([]);
  }
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search guest..."
        value={globalFilter ?? ""}
        // value=""
        // onChange={(event) => {
        //   table.getColumn("lastName")?.setFilterValue(event.target.value);
        //   console.log("search changed", columnFilters);
        // }}
        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
        className="max-w-sm border-gray-500"
      />
    </div>
  );
};

export default GlobalDataSearch;
