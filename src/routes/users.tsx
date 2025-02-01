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
    <SidebarProvider defaultOpen={false}>
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
        <Header location="Mentees" />
      </section>
      <section className="px-6 pt-4 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">Mentees</h1>
          <p className="font-light text-zinc-600">
            A list of all the Mentees in the database, view and manage their status.
          </p>
        </div>
      </section>
      <UsersTable data={users} />
    </div>
  );
}
