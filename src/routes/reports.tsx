import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Sidebar, Header } from '@/components'
import { Button } from '@/components/ui'
import { fetchReports } from '@/api'
import { useEffect, useState } from 'react'
import { ReportsTable } from '@/components/tables/Reports'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

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
  useEffect(() => {
    fetchReports().then((data) => {
      const filteredFeedback = data.filter(
        (item) => item.users.role === "customer"
      );
      setReports(filteredFeedback);
    })
  }, [])
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Reports" />
      </section>
      <section className="px-6 pt-4 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">Reports</h1>
          <p className="font-light text-zinc-600">
            View reports of all the Customers in the database.
          </p>
        </div>
      </section>
      {Reports.length === 0 ? (
        <section className="px-6 pt-4 grid gap-10">
          <h1>No Customer reports yet</h1>
        </section>
      ) : (
        <ReportsTable data={Reports} />
      )
      }
    </div>
  )
}
