import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Sidebar, Header, CardComponent } from "@/components";
import { Button } from "@/components/ui";
import { fetchCustomers } from "@/api";
import { useEffect, useState } from "react";
import { CustomersTable } from "@/components/tables/Customers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { BoxIcon, CheckCheck, PenBox, UserRoundCheck, UserRoundCog, Users, UserX, Wallet } from "lucide-react";

export const Route = createFileRoute('/customers')({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <ManageUsers />
      </main>
    </SidebarProvider>
  ),
})

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchCustomers().then((data) => {
      setUsers(data);
      setCardData([
        {
          icon: <Users size={20} color="black" />,
          title: "Total Customers",
          statistic: data.length,
          moreDetails: "The total amount of all orders.",
        },
        {
          icon: <UserRoundCheck size={20} color="black" />,
          title: "Active users",
          statistic: data.filter((user) => user.status === "active").length,
          moreDetails: "The total number of completed orders.",
        },
        {
          icon: <UserRoundCog size={20} color="black" />,
          title: "Pending approvals",
          statistic: data.filter((user) => user.status === "inactive").length,
          moreDetails: "The total number of orders that have been delivered.",
        },
        {
          icon: <UserX size={20} color="black" />,
          title: "Banned users",
          statistic: data.filter((user) => user.status === "banned").length === 0 ? 'N/A' : data.filter((user) => user.status === "banned").length,
          moreDetails: "The total number of orders that are still pending.",
        },
      ]);
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Customers" />
      </section>
      <section className="px-6 pt-8 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">Customers</h1>
          <p className="font-medium text-zinc-600">
            A list of all the customers in the database, view and manage their
            status.
          </p>
        </div>
      </section>
      <section className="flex pb-6 pt-4">
        {cardData.map((card, index) => (
          <div className="w-1/3" key={index}>
            <CardComponent
              icon={card.icon}
              title={card.title}
              statistic={card.statistic}
              moreDetails={card.moreDetails}
              percentage={10}
            />
          </div>
        ))}
      </section>
      <CustomersTable data={users} />
    </div>
  );
}
