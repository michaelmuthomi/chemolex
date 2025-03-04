import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
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
  Flag,
  HandCoins,
  MessageCircleDashed,
  PenBox,
  PiggyBank,
  SwatchBook,
  User2Icon,
  Users,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/orders")({
  component: () => (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full">
        <ViewOrderRecords />
      </main>
    </SidebarProvider>
  ),
});

const CardData = [
  {
    icon: <Wallet size={20} color="black" />,
    title: "Total Amount",
    statistic: 0,
    moreDetails: "The total amount of all orders.",
  },
  {
    icon: <CheckCheck size={20} color="black" />,
    title: "Total Completed Payments",
    statistic: 0,
    moreDetails: "The total number of completed orders.",
  },
  {
    icon: <BoxIcon size={20} color="black" />,
    title: "Total Delivered Orders",
    statistic: 0,
    moreDetails: "The total number of orders that have been delivered.",
  },
  {
    icon: <PenBox size={20} color="black" />,
    title: "Total Pending Deliveries",
    statistic: 0,
    moreDetails: "The total number of orders that are still pending.",
  },
];

function ViewOrderRecords() {
  const [orders, setOrders] = useState([]);
  const [cardData, setCardData] = useState(CardData);

  useEffect(() => {
    fetchOrders().then((data) => {
      setOrders(data);

      // Calculate total amounts and order statuses
      const totalAmount = data.reduce(
        (acc, record) => acc + record.total_amount,
        0
      );
      const totalCompletedOrders = data.filter(
        (record) => record.payment_status === "completed"
      ).length;
      const totalDeliveredOrders = data.filter(
        (record) => record.dispatch_status === "dispatched"
      ).length;
      const totalPendingOrders = data.filter(
        (record) => record.delivery_status !== "completed"
      ).length;

      // Update card statistics
      setCardData((prevCardData) =>
        prevCardData.map((card, index) => {
          if (index === 0) {
            return { ...card, statistic: totalAmount }; // Total Amount
          } else if (index === 1) {
            return { ...card, statistic: totalCompletedOrders }; // Total Completed Orders
          } else if (index === 2) {
            return { ...card, statistic: totalDeliveredOrders }; // Total Delivered Orders
          } else if (index === 3) {
            return { ...card, statistic: totalPendingOrders }; // Total Pending Orders
          }
          return card; // Unchanged cards
        })
      );
    });
    console.log("Finance Data: ", orders);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Orders" />
      </section>
      <section className="px-6 pt-8 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">Order Records</h1>
          <p className="font-medium text-zinc-600">
            A list of all the orders in the database.
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
      <OrdersTable data={orders} />
    </div>
  );
}
