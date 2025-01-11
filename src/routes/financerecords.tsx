import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header, CardComponent } from "@/components";
import { Button } from "@/components/ui";
import { fetchCustomers } from "@/api";
import { useEffect, useState } from "react";
import { CustomersTable } from "@/components/tables/Customers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { FinancesTable } from "@/components/tables/Finances";
import { fetchFinances } from "@/api/fetchFinances";
import { Flag, HandCoins, MessageCircleDashed, PiggyBank, SwatchBook, User2Icon, Users, Wallet } from "lucide-react";

export const Route = createFileRoute("/financerecords")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <ViewFinancialRecords />
      </main>
    </SidebarProvider>
  ),
});

const CardData = [
  {
    icon: <Wallet size={20} color="black" />,
    title: "Account Balance",
    statistic: 0,
    moreDetails: "Detailed user statistics can be found here.",
  },
  {
    icon: <PiggyBank size={20} color="black" />,
    title: "Incoming Payments",
    statistic: 0,
    moreDetails: "Detailed performance metrics are available here.",
  },
  {
    icon: <HandCoins size={20} color="black" />,
    title: "Outgoing Payments",
    statistic: 0,
    moreDetails: "Detailed performance metrics are available here.",
  },
  {
    icon: <SwatchBook size={20} color="black" />,
    title: "Total Reports",
    statistic: 0,
    moreDetails: "Detailed performance metrics are available here.",
  },
];

function ViewFinancialRecords() {
  const [finances, setFinances] = useState([]);
  const [cardData, setCardData] = useState(CardData);

  useEffect(() => {
    fetchFinances().then((data) => {
      setFinances(data);

      // Get the last row's balance for Account Balance
      const lastBalance = data.length > 0 ? data[data.length - 1].balance : 0;
      // Calculate total incoming payments
      const totalIncomingPayments = data.reduce(
        (acc, record) =>
          acc + (record.payment_type === "incoming" ? record.amount || 0 : 0),
        0
      );
      // Calculate total outgoing payments
      const totalOutgoingPayments = data.reduce(
        (acc, record) =>
          acc + (record.payment_type === "outgoing" ? record.amount || 0 : 0),
        0
      );
      // Count the number of rows for Total Reports
      const totalReports = data.length;

      // Update card statistics
      setCardData((prevCardData) =>
        prevCardData.map((card, index) => {
          if (index === 0) {
            return { ...card, statistic: lastBalance }; // Account Balance from last row
          } else if (index === 1) {
            return { ...card, statistic: totalIncomingPayments }; // Incoming Payments
          } else if (index === 2) {
            return {
              ...card,
              statistic:
                totalOutgoingPayments === 0 ? "N/A" : totalOutgoingPayments,
            }; // Outgoing Payments
          } else if (index === 3) {
            return { ...card, statistic: totalReports }; // Total Reports count
          }
          return card; // Unchanged cards
        })
      );
    });
    console.log("Finance Data: ", finances);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Finances" />
      </section>
      <section className="px-6 pt-8 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">
            Financial Records
          </h1>
          <p className="font-medium text-zinc-600">
            A list of all the purchases in the database.
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
      <FinancesTable data={finances} />
    </div>
  );
}
