import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header } from "@/components";
import { Button } from "@/components/ui";
import { fetchStaff } from "@/api";
import { useEffect, useState } from "react";
import { StaffTable } from "@/components/tables/Staff";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const Route = createFileRoute("/aboutus")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AboutUs />
      </main>
    </SidebarProvider>
  ),
});

function AboutUs() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchStaff().then((data) => setUsers(data));
  }, []);
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Employees" />
      </section>
      <section className="px-6 pt-4 grid gap-10">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold text-neutral-300">About Us</h1>
          <p className="font-light text-zinc-400 w-1/2">
            REFNET AIR CONDITIONING (E.A) LTD has been involved in air
            conditioning works in Kenya and its neighboring countries like
            Tanzania, Uganda & Rwanda. We provide quality and timely services,
            making us a trusted name in the industry.
          </p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold text-neutral-300">Our Mission</h2>
          <p className="font-light text-zinc-400">
            To work closely with clients while emphasizing time and quality of
            service delivery.
          </p>
        </div>
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold text-neutral-300">Our Services</h2>
          <ul className="list-disc pl-5 font-light text-zinc-400">
            <li>Installation Services</li>
            <li>Repair and Maintenance Services</li>
            <li>Mechanical Ventilation</li>
            <li>Cold Room Services</li>
          </ul>
          <p className="font-light text-zinc-400">
            A list of all the employees in the database, view and manage their
            status.
          </p>
        </div>
      </section>
    </div>
  );
}

