import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header } from "@/components";
import { Button } from "@/components/ui";
import { fetchUsers } from "@/api";
import { useEffect, useState } from "react";
import { UsersTable } from "@/components/tables/Users";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createFileRoute("/users")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <ManageUsers />
      </main>
    </SidebarProvider>
  ),
});

function ManageUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, [])
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Users" />
      </section>
      <section className="px-6 pt-24 grid gap-10">
        <div>
          <h1 className="text-5xl font-bold text-neutral-300 leading-[2px]">
            Users
          </h1>
          <p className="font-medium leading-9  w-max px-2 rounded-sm">
            Manage users, activate, deactivate &nbsp;and more
          </p>
        </div>
      </section>
      <UsersTable data={users} />
    </div>
  );
}
