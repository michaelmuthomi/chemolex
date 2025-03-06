import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Sidebar, Header, CardComponent } from '@/components'
import { Button } from '@/components/ui'
import { fetchReports } from '@/api'
import { useEffect, useState } from 'react'
import { ReportsTable } from '@/components/tables/Reports'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { MessageCircle } from 'lucide-react'

export const Route = createFileRoute("/reports")({
  component: () => (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full">
        <ManageReports />
      </main>
    </SidebarProvider>
  ),
});

function ManageReports() {
  const [Reports, setReports] = useState([])
    const [cardData, setCardData] = useState([]);
  useEffect(() => {
    fetchReports().then((data) => {
      setCardData([
        {
          icon: <MessageCircle size={20} color="black" />,
          title: "Total Reports Logged",
          statistic: data.length,
          moreDetails: "The total amount of all orders.",
        },
      ]);
    });
  }, []);
  useEffect(() => {
    fetchReports().then((data) => {
      setReports(data);
    })
  }, [])
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <Header location="Reports" />
      </section>
      <section className="px-6 pt-10 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">Reports</h1>
          <p className="font-medium text-zinc-600">
            View reports of all the Customers in the database.
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
      {Reports.length === 0 ? (
        <section className="px-6 pt-4 grid gap-10 animate-pulse">
          
        </section>
      ) : (
        <ReportsTable data={Reports} />
      )}
    </div>
  );
}
