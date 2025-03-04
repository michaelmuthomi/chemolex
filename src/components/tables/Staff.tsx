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
    accessorKey: "name",
    header: "User Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.original.role}</div>,
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "phonenumber",
    header: "Phone Number",
    cell: ({ row }) => <div>{row.original.phonenumber}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>
        {row.getValue("status") === "active" && (
          <Badge
            variant="default"
            className="rounded-full bg-green-500 text-white"
          >
            Active
          </Badge>
        )}
        {row.getValue("status") === "pending" && (
          <Badge
            variant="destructive"
            className="rounded-full bg-yellow-500 text-white"
          >
            pending
          </Badge>
        )}
        {row.getValue("status") === "banned" && (
          <Badge
            variant="destructive"
            className="rounded-full bg-red-500 text-white"
          >
            Banned
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "date_added",
    header: "Date Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date_added"));
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      const handleActivate = async () => {
        // Update the user's status to 'active'
        user.status = "active";
        // Add any additional logic to update the user's status in your backend or state management
        const { data, error } = await supabase
          .from("guardian")
          .update({ status: "active" })
          .eq("guardian_id", user.guardian_id);
        if (error) console.error(error);
        toast({
          style: { backgroundColor: "#005a00", color: "#fff" },
          title: "Success",
          description: "User's status updated succesfully.",
          action: (
            <ToastAction altText="refresh">
              <Button
                variant="outline"
                className="font-sm text-black bg-white"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </ToastAction>
          ),
        });
      };

      const handleDeactivate = async () => {
        // Update the user's status to 'pending'
        user.status = "pending";
        // Add any additional logic to update the user's status in your backend or state management
        const { data, error } = await supabase
          .from("guardian")
          .update({ status: "pending" })
          .eq("guardian_id", user.guardian_id);
        if (error) console.error(error);
        toast({
          style: { backgroundColor: "#005a00", color: "#fff" },
          title: "Success",
          description: "User's status updated succesfully.",
          action: (
            <ToastAction altText="refresh">
              <Button
                variant="outline"
                className="font-sm text-black bg-white"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </ToastAction>
          ),
        });
      };

      const handleBan = async () => {
        // Update the user's status to 'banned'
        user.status = "banned";
        // Add any additional logic to update the user's status in your backend or state management
        const { data, error } = await supabase
          .from("guardian")
          .update({ status: "banned" })
          .eq("guardian_id", user.guardian_id);
        if (error) console.error(error);
        toast({
          style: { backgroundColor: "#005a00", color: "#fff" },
          title: "Success",
          description: "User's status updated succesfully.",
          action: (
            <ToastAction altText="refresh">
              <Button
                variant="outline"
                className="font-sm text-black bg-white"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </ToastAction>
          ),
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleActivate}>
              <Badge
                variant="default"
                className="rounded-full bg-green-900 text-white"
              >
                Activate
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDeactivate}>
              <Badge
                variant="destructive"
                className="rounded-full bg-yellow-500 text-white"
              >
                Inactivate
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleBan}>
              <Badge variant="destructive" className="rounded-full">
                Ban User
              </Badge>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function StaffTable(data) {
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
      <div className="flex items-center py-4 px-6 border-t-[1px]">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <section className="ml-auto flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Filter Status:{" "}
                {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["all", "active / pending", "banned"].map((status) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    if (status === "active / pending") {
                      table.getColumn("status")?.setFilterValue("active");
                    } else {
                      table
                        .getColumn("status")
                        ?.setFilterValue(status === "all" ? "" : status);
                    }
                    console.log("Current filter status:", status); // Debug log
                    console.log(
                      "Table filter value:",
                      table.getColumn("status")?.getFilterValue()
                    ); // Debug log
                  }}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
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
      active: "pending",
      pending: "banned",
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