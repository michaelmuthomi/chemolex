"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { fetchUser, fetchProduct } from "@/api";

import { Button, Skeleton } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import formatDate from "@/lib/formatDate";
import { formatPrice } from "@/hooks/format-price";

export type User = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  image: string;
  date_created: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => <div>{formatPrice(row.getValue("total_amount"))}</div>,
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("payment_method").replace("_", " ")}
      </div>
    ),
  },
  {
    accessorKey: "payment_status",
    header: "Payment Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("payment_status") === "completed" ? (
          <p className="px-6 p-2 rounded-full bg-green-200/5 text-green-300 w-max capitalize font-semibold">
            {row.getValue("payment_status")}
          </p>
        ) : (
          <p className="px-6 p-2 rounded-full bg-orange-200/5 text-orange-300 w-max capitalize font-semibold">
            {row.getValue("payment_status")}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Order Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("status") === "completed" ? (
          <p className="px-6 p-2 rounded-full bg-green-200/5 text-green-300 w-max capitalize font-semibold">
            {row.getValue("status")}
          </p>
        ) : (
          <p className="px-6 p-2 rounded-full bg-orange-200/5 text-orange-300 w-max capitalize font-semibold">
            {row.getValue("status")}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "dispatch_status",
    header: "Dispatch Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("dispatch_status") === "dispatched" ? (
          <p className="px-6 p-2 rounded-full bg-green-200/5 text-green-300 w-max capitalize font-semibold">
            {row.getValue("dispatch_status")}
          </p>
        ) : (
          <p className="px-6 p-2 rounded-full bg-orange-200/5 text-orange-300 w-max capitalize font-semibold">
            {row.getValue("dispatch_status")}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "finance_approval",
    header: "Finance Approval",
    cell: ({ row }) => (
      <div>
        {row.getValue("finance_approval") === "approved" ? (
          <p className="px-6 p-2 rounded-full bg-green-200/5 text-green-300 w-max capitalize font-semibold">
            {row.getValue("finance_approval")}
          </p>
        ) : (
          <p className="px-6 p-2 rounded-full bg-orange-200/5 text-orange-300 w-max capitalize font-semibold">
            {row.getValue("finance_approval")}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "order_date",
    header: "Order Created",
    cell: ({ row }) => {
      return <div>{formatDate(row.getValue("order_date"))}</div>;
    },
  },
];

export function OrdersTable(data) {
  const filteredData = data.data;
  console.log(filteredData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full grid gap-10 overflow-auto">
      <div className="flex items-center pt-4 px-6 border-t-[1px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md px-2">
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="grid gap-2">
                    <Skeleton className="h-8" />
                    <Skeleton className="h-8" />
                    <Skeleton className="h-8" />
                    <Skeleton className="h-8" />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
