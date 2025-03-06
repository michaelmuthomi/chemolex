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
import { Button, Toaster } from "@/components/ui";
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
import { fetchAllProducts } from "@/api/fetchProducts";
import { fetchCustomers, fetchEmployees } from "@/api/fetchUsers";

export const Route = createFileRoute("/dashboard")({
  component: () => (
    <SidebarProvider defaultOpen={true}>
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
  return feedback_count.length === 0 ? "N/A" : feedback_count.length;
}

async function updateTotalProducts() {
  const product_count = await fetchAllProducts();
  console.log(product_count.length);
  return product_count.length;
}

async function fetchUsersWithLimit() {
  return fetchCustomers().then((users) => users.slice(0, 4));
}

async function fetchEmployeesWithLimit() {
  return fetchEmployees().then((users) => users.slice(0, 4));
}

const CardData = [
  {
    icon: <User2Icon size={20} color="black" />,
    title: "Total Customers",
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
    icon: <MessageCircleDashed size={20} color="black" />,
    title: "Total Reports",
    statistic: 0,
    moreDetails: "Detailed performance metrics are available here.",
  },
];

function MainSection() {
  const [cardData, setCardData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
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
    updateTotalProducts().then((totalProducts) => {
      CardData[3].statistic = totalProducts;
      setCardData([...CardData]);
    });
    fetchUsersWithLimit().then((limitedUsers) => {
      setUsers(limitedUsers);
    });
    fetchEmployeesWithLimit().then((limitedUsers) => {
      setEmployees(limitedUsers);
    });
  }, []);
  return (
    <div className="flex flex-col gap-4 w-full">
      <Toaster />
      <section className="flex gap-2 items-center px-6 sticky top-0 bg-background py-4 z-10 border-b-[1px]">
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
      <section className="px-4 grid gap-6 mt-14">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-200">
              Manage Customers
            </h2>
            <p className={"text-sm text-muted-foreground py-2"}>
              To perform more functions, head to the Customers page
            </p>
          </div>
          <Link to="/customers">
            <Button
              className="text-slate-500 text-sm font-medium"
              variant="outline"
            >
              Customers Page &rarr;
            </Button>
          </Link>
        </div>
        <TableComponent data={users} />
      </section>
      <section className="px-4 grid gap-6 mt-14">
        <div className="flex justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-200">
              Manage Employees
            </h2>
            <p className={"text-sm text-muted-foreground py-2"}>
              To perform more functions, head to the employees page
            </p>
          </div>
          <Link to="/staff">
            <Button
              className="text-slate-500 text-sm font-medium"
              variant="outline"
            >
              Employees Page &rarr;
            </Button>
          </Link>
        </div>
        <TableComponent data={employees} />
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
            Chemolex - More than promises delivering proven excellence
          </p>
        </div>
      </section>
    </div>
  );
}
