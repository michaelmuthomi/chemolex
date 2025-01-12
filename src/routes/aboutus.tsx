import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header } from "@/components";
import { Button } from "@/components/ui";
import { fetchStaff } from "@/api";
import { useEffect, useState } from "react";
import { StaffTable } from "@/components/tables/Staff";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {Banner} from '@/assets/images'

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
        <Header location="About Us" />
      </section>
      <section className="px-6 pt-4 grid gap-10">
        <div className="grid gap-2">
          <h1 className="text-4xl font-bold w-2/3 pt-10 text-neutral-300">
            Elevating Comfort: Your Trusted Partner in Air Conditioning
            Solutions Across East Africa
          </h1>
          <div className="flex gap-4 px-4 py-6">
            <div className="w-14 h-[2px] bg-neutral-600 mt-2"> </div>
            <p className="font-light leading-loose text-xl text-neutral-500 w-3/4">
              At RefNet Air Conditioning, we pride ourselves on being a leading
              provider of innovative refrigeration and air conditioning
              solutions in East Africa. With years of industry experience, our
              dedicated team of professionals is committed to delivering
              high-quality services tailored to meet the unique needs of our
              clients.
            </p>
          </div>
        </div>
        <img src={Banner} alt="" className="w-full h-full object-cover rounded-md" />
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold text-neutral-300">Trusted by</h2>
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

