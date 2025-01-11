import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header, CardComponent } from "@/components";
import { Button } from "@/components/ui";
import { fetchCustomers } from "@/api";
import { useEffect, useState } from "react";
import { CustomersTable } from "@/components/tables/Customers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { RepairsTable } from "@/components/tables/Repairs";
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
import { fetchRepairs } from "@/api/fetchRepairs";

export const Route = createFileRoute("/repairs")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <RepairRecords />
      </main>
    </SidebarProvider>
  ),
});

const CardData = [
  {
    icon: <Truck size={20} color="black" />,
    title: "Total Assigned Repairs",
    statistic: 0,
    moreDetails: "The total number of assigned repairs.",
  },
  {
    icon: <BoxIcon size={20} color="black" />,
    title: "Total Complete Repairs",
    statistic: 0,
    moreDetails: "The total number of completed repairs.",
  },
];

function RepairRecords() {
  const [repairs, setRepairs] = useState([]);
  const [cardData, setCardData] = useState(CardData);

  useEffect(() => {
    fetchRepairs().then((data) => {
      setRepairs(data);

      // Calculate total assigned and completed repairs
      const totalAssignedRepairs = data.filter(
        (record) => record.status === "assigned"
      ).length; // Total Assigned Repairs
      const totalCompleteRepairs = data.filter(
        (record) => record.completion_status === "complete"
      ).length; // Total Complete Repairs

      // Update card statistics
      setCardData((prevCardData) =>
        prevCardData.map((card, index) => {
          if (index === 0) {
            return { ...card, statistic: totalAssignedRepairs }; // Total Assigned Repairs
          } else if (index === 1) {
            return {
              ...card,
              statistic:
                totalCompleteRepairs === 0 ? "N/A" : totalCompleteRepairs,
            }; // Total Complete Repairs
          } else if (index === 2) {
            return { ...card, statistic: totalPendingDispatches }; // Total Pending Dispatches
          }
          return card; // Unchanged cards
        })
      );
    });
    console.log("Dispatch Data: ", repairs);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Repairs" />
      </section>
      <section className="px-6 pt-8 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">
            Repair Records
          </h1>
          <p className="font-medium text-zinc-600">
            A list of all the repairs in the database.
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
      <RepairsTable data={repairs} />
    </div>
  );
}
