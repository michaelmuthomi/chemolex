import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'
import { Sidebar, Header, CardComponent } from "@/components";
import { Button } from '@/components/ui'
import { fetchFeedback } from '@/api'
import { useEffect, useState } from 'react'
import { FeedbackTable } from '@/components/tables/Feedback'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Frown, MessageCircle, Smile, Users } from "lucide-react";

export const Route = createFileRoute('/feedback')({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <ManageFeedback />
      </main>
    </SidebarProvider>
  ),
})

function ManageFeedback() {
  const [Feedback, setFeedback] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchFeedback().then((data) => {
      const filteredFeedback = data.filter(
        (item) => item.users.role === "customer"
      );
      setFeedback(filteredFeedback);
      setCardData([
        {
          icon: <MessageCircle size={20} color="black" />,
          title: "Total Feedback Submissions",
          statistic: filteredFeedback.length,
          moreDetails: "The total amount of all orders.",
        },
        {
          icon: <Smile size={20} color="black" />,
          title: "Good Ratings",
          statistic: filteredFeedback.filter((user) => user.rating > 3).length,
          moreDetails: "Ratings above 3",
        },
        {
          icon: <Frown size={20} color="black" />,
          title: "Bad Ratings",
          statistic: filteredFeedback.filter((user) => user.rating < 3).length,
          moreDetails: "Ratings below 3",
        },
      ]);
    });
  }, []);
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="Feedback" />
      </section>
      <section className="px-6 pt-10 grid gap-10">
        <div>
          <h1 className="text-3xl font-bold text-neutral-300">Feedback</h1>
          <p className="font-medium text-zinc-600">
            View Feedback of all the Customers in the database.
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
      <section className='border-t-[1px] pt-4'>
        <FeedbackTable data={Feedback} />
      </section>
    </div>
  );
}
