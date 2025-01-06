import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header } from "@/components";
import { Button } from "@/components/ui";
import { fetchFeedback } from "@/api";
import { useEffect, useState } from "react";
import { FeedbackTable } from "@/components/tables/Feedback";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { fetchEmployeeFeedback } from "@/api/fetchEmployeeFeedback";

export const Route = createFileRoute("/employeeFeedback")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <ManageEmployeeFeedback />
      </main>
    </SidebarProvider>
  ),
});

function ManageEmployeeFeedback() {
  const [Feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchEmployeeFeedback().then((data) => {
      // Filter out feedback where the user role is 'customer'
      const filteredFeedback = data.filter(
        (item) => item.users.role !== "customer"
      );
      setFeedback(filteredFeedback);
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Employee Feedback" />
      </section>
      <section className="px-6 pt-4 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">
            Employee Feedback
          </h1>
          <p className="font-light text-zinc-600">
            View Feedback of all the Employee's in the database.
          </p>
        </div>
      </section>
      <FeedbackTable data={Feedback} />
    </div>
  );
}
