import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import {
  ChartComponent,
  Resizable,
  Sidebar,
  Header,
  BestSeller,
} from "@/components";
import { CardComponent } from "@/components";
import { Button } from "@/components/ui";
import {
  fetchUsers,
  fetchOrders,
  fetchLoginStatus,
  fetchFeedback,
  fetchReports,
} from "@/api";
import { Card } from "@/components/ui/card";
import { TableComponent } from "@/components/tables/Users";
import { cn } from "@/lib/utils";
import { Logo } from "@/assets/images";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Skeleton } from "@/components/ui";
import {
  Flag,
  icons,
  MessageCircleDashed,
  User2Icon,
  Users,
} from "lucide-react";
import { description } from "@/components/ChartComponent";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AdminDashboard />
      </main>
    </SidebarProvider>
  ),
});

function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  fetchLoginStatus().then(() => {
    setIsLoggedIn(true);
  });

  if (!isLoggedIn) {
    return (
      <div className="px-6 pt-4 grid gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  return (
    <>
      <MainSection />
    </>
  );
}

async function updateTotalUsers() {
  const user_count = await fetchUsers();
  console.log(user_count.length);
  return user_count.length;
}

async function updateTotalOrders() {
  const user_count = await fetchOrders();
  console.log(user_count.length);
  return user_count.length;
}

async function updateTotalFeedback() {
  const feedback_count = await fetchFeedback();
  console.log(feedback_count.length);
  return feedback_count.length;
}

async function updateTotalReports() {
  const report_count = await fetchReports();
  console.log(report_count.length);
  return report_count.length;
}

async function fetchUsersWithLimit() {
  return fetchUsers().then((users) => users.slice(0, 4));
}

const CardData = [
  {
    icon: <User2Icon size={20} color="black" />,
    title: "Total Customer",
    statistic: 0,
    moreDetails: "Detailed user statistics can be found here.",
  },
  {
    icon: <Users size={20} color="black" />,
    title: "Total Employees",
    statistic: 0,
    moreDetails: "Detailed performance metrics are available here.",
  },
  {
    icon: <MessageCircleDashed size={20} color="black" />,
    title: "Total Feedback",
    statistic: 0,
    moreDetails: "Detailed performance metrics are available here.",
  },
  {
    icon: <Flag size={20} color="black" />,
    title: "Total Reports",
    statistic: 0,
    moreDetails: "Detailed performance metrics are available here.",
  },
];

function MainSection() {
  const [cardData, setCardData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    setCardData(CardData);
    updateTotalUsers().then((totalUsers) => {
      CardData[0].statistic = totalUsers;
      setCardData([...CardData]);
    });
    updateTotalOrders().then((totalOrders) => {
      CardData[1].statistic = totalOrders;
      setCardData([...CardData]);
    });
    updateTotalFeedback().then((totalFeedback) => {
      CardData[2].statistic = totalFeedback;
      setCardData([...CardData]);
    });
    updateTotalReports().then((totalReports) => {
      CardData[3].statistic = totalReports;
      setCardData([...CardData]);
    });
    fetchUsersWithLimit().then((limitedUsers) => {
      setUsers(limitedUsers);
    });
  }, []);
  return (
    <div className="flex flex-col gap-4 pt-4 w-full">
      <section className="flex gap-2 items-center px-6 sticky top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header />
      </section>
      <section className="px-6">
        <div className="mt-8">
          <h1 className="text-xl font-bold leading-9">Dashboard</h1>
        </div>
        <section className="flex gap-10">
          {CardData.map((card, index) => (
            <div className="w-1/3">
              {cardData.length > 0 ? (
                <CardComponent
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  statistic={card.statistic}
                  moreDetails={card.moreDetails}
                  percentage={10}
                />
              ) : (
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </section>
      <div className="pb-2 pt-4 ">
        <hr />
      </div>
      <section className="px-4 grid gap-6">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-200">
              Manage Users
            </h2>
            <p className={"text-sm text-muted-foreground py-2"}>
              To perform more funtions, head to the users page
            </p>
          </div>
          <Link to="/users">
            <Button
              className="text-slate-500 text-sm font-medium"
              variant="outline"
            >
              Users Page &rarr;
            </Button>
          </Link>
        </div>
        <TableComponent data={users} />
      </section>
      <div className="pt-6">
        <hr />
      </div>
      <section>
        <BestSeller />
      </section>
      <div className="pt-4">
        <hr />
      </div>
      <section className="px-4 pb-4 flex justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="" className="w-14" />
          <p className="text-muted">&copy; 2024</p>
        </div>
        <div className="flex gap-4">
          <p className="text-sm text-muted py-2">
            Refnet - More than promises delivering proven excellence
          </p>
        </div>
      </section>
    </div>
  );
}
