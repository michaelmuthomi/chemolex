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
import {useState, useEffect} from "react";

import { toast, useToast } from "@/hooks/use-toast";
import { Button, Skeleton, Badge, Toaster } from "@/components/ui";
import { fetchServices, fetchUser } from "@/api";
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
  report_type: string;
  generate_by: string;
  generate_at: string;
  content: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.getValue("rating");
      const getEmoji = (rating: number) => {
        switch (rating) {
          case 5:
            return "I love it 😁"; // Grinning face
          case 4:
            return "I like it 🙂"; // Slightly smiling face
          case 3:
            return "It's okay 😐"; // Neutral face
          case 2:
            return "I don't like it 😟"; // Worried face
          case 1:
            return "I hate it 😡"; // Angry face
          default:
            return "No rating 🤷‍♂️"; // For ratings not in 1-5
        }
      };

      return (
        <div className="flex items-center">
          <span className="ml-1">{getEmoji(rating)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
    cell: ({ row }) => (
      <div className="max-w-md truncate">{row.getValue("comments")}</div>
    ),
  },
  {
    accessorKey: "feedback_date",
    header: "Feedback Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("feedback_date"));
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
          .from("users")
          .update({ status: "active" })
          .eq("user_id", user.user_id);
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
          .from("users")
          .update({ status: "pending" })
          .eq("user_id", user.user_id);
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
          .from("users")
          .update({ status: "banned" })
          .eq("user_id", user.user_id);
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
                Deactivate
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

export function FeedbackTable(data) {
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
    <div className="w-full grid gap-6">
      <Toaster />
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
