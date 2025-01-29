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
import { supabase } from "@/backend/client";

import { toast, useToast } from "@/hooks/use-toast";
import { Button, Skeleton, Badge, Toaster } from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
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
import { ToastAction } from "@radix-ui/react-toast";
import { AddUserDialog } from "../AddUserDialog";
import { formatPrice } from "@/hooks/format-price";

export type User = {
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  status: string;
  date_created: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "balance",
    header: "Account Balance",
    cell: ({ row }) => <div>{formatPrice(row.getValue("balance"))}</div>,
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
    cell: ({ row }) => (
      <div>
        {row.getValue("payment_type") === "incoming" ? (
          <p className="px-6 p-2 rounded-full bg-green-200/5 text-green-300 w-max capitalize font-semibold">
            {row.getValue("payment_type")}
          </p>
        ) : (
          <p className="px-6 p-2 rounded-full bg-orange-200/5 text-orange-300 w-max capitalize font-semibold">
            {row.getValue("payment_type")}
          </p>
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Transaction Amount",
    cell: ({ row }) => (
      <div>
        {row.getValue("amount") === null ? (
          <p className="text-zinc-600">N/A</p>
        ) : (
          formatPrice(row.getValue("amount"))
        )}
      </div>
    ),
  },
  {
    accessorKey: "order_id",
    header: "Order ID",
    cell: ({ row }) => (
      <div>
        {row.getValue("order_id") === null ? (
          <p className="text-zinc-600">N/A</p>
        ) : (
          row.getValue("order_id")
        )}
      </div>
    ),
  },
  {
    accessorKey: "employee_id",
    header: "Employee ID",
    cell: ({ row }) => (
      <div>
        {row.getValue("employee_id") === null ? (
          <p className="text-zinc-600">N/A</p>
        ) : (
          row.getValue("employee_id")
        )}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
  },
];

export function FinancesTable(data) {
  const { toast } = useToast();
  const filteredData = data.data;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [filterStatus, setFilterStatus] = React.useState("all");

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
    <div className="w-full grid">
      <Toaster />
      <div className="flex items-center py-4 px-6 ">
        <section className="ml-auto flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filter Payment Type:{" "}
                {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["incoming", "outgoing"].map((payment_type) => (
                <DropdownMenuItem
                  key={payment_type}
                  onClick={() => {
                    setFilterStatus(payment_type);
                    table
                      .getColumn("payment_type")
                      ?.setFilterValue(status === "all" ? "" : payment_type);
                    console.log("Current filter status:", payment_type); // Debug log
                    console.log(
                      "Table filter value:",
                      table.getColumn("payment_type")?.getFilterValue()
                    ); // Debug log
                  }}
                >
                  {payment_type.charAt(0).toUpperCase() + payment_type.slice(1)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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
        </section>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 px-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
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

export function TableComponent(data) {
  const filteredData = data.data;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [filterStatus, setFilterStatus] = React.useState("all");

  const toggleFilterStatus = () => {
    const nextStatus = {
      all: "active",
      active: "inactive",
      inactive: "banned",
      banned: "all",
    };
    const newStatus = nextStatus[filterStatus];
    setFilterStatus(newStatus);
    table
      .getColumn("status")
      ?.setFilterValue(newStatus === "all" ? "" : newStatus);
  };
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
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
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
  );
}
