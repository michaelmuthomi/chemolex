import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header, CardComponent } from "@/components";
import { Button } from "@/components/ui";
import { fetchCustomers } from "@/api";
import { useEffect, useState } from "react";
import { CustomersTable } from "@/components/tables/Customers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { OrdersTable } from "@/components/tables/Orders";
import { fetchOrders } from "@/api/fetchOrders";
import {
  BoxIcon,
  CheckCheck,
  ClockArrowDown,
  Flag,
  HandCoins,
  MessageCircleDashed,
  Package2,
  PenBox,
  PiggyBank,
  SwatchBook,
  Truck,
  User2Icon,
  Users,
  Wallet,
} from "lucide-react";
import { DispatchesTable } from "@/components/tables/Dispatches";
import { fetchDispatches } from "@/api/fetchDispatches";

export const Route = createFileRoute("/dispatches")({
  component: () => (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full">
        <ViewDispatchRecords />
      </main>
    </SidebarProvider>
  ),
});

const CardData = [
  {
    icon: <Truck size={20} color="black" />,
    title: "Total Dispatches",
    statistic: 0,
    moreDetails: "The total number of dispatches.",
  },
  {
    icon: <BoxIcon size={20} color="black" />,
    title: "Total Completed Dispatches",
    statistic: 0,
    moreDetails: "The total number of completed dispatches.",
  },
  {
    icon: <ClockArrowDown size={20} color="black" />,
    title: "Total Pending Dispatches",
    statistic: 0,
    moreDetails: "The total number of pending dispatches.",
  },
];

function ViewDispatchRecords() {
  const [orders, setOrders] = useState([]);
  const [cardData, setCardData] = useState(CardData);

  useEffect(() => {
    fetchDispatches().then((data) => {
      setOrders(data);

      // Calculate total dispatches and statuses
      const totalDispatches = data.length;
      const totalCompletedDispatches = data.filter(
        (record) => record.status === "delivered"
      ).length;
      const totalPendingDispatches = data.filter(
        (record) => record.status === "pending"
      ).length;

      // Update card statistics
      setCardData((prevCardData) =>
        prevCardData.map((card, index) => {
          if (index === 0) {
            return { ...card, statistic: totalDispatches }; // Total Dispatches
          } else if (index === 1) {
            return {
              ...card,
              statistic:
                totalCompletedDispatches === 0
                  ? "N/A"
                  : totalCompletedDispatches,
            }; // Total Completed Dispatches
          } else if (index === 2) {
            return { ...card, statistic: totalPendingDispatches }; // Total Pending Dispatches
          }
          return card; // Unchanged cards
        })
      );
    });
    console.log("Dispatch Data: ", orders);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Dispatch" />
      </section>
      <section className="px-6 pt-8 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">
            Dispatch Records
          </h1>
          <p className="font-medium text-zinc-600">
            A list of all the dispatches in the database.
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
      <DispatchesTable data={orders} />
    </div>
  );
}
