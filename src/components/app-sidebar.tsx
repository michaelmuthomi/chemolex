import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { Logo } from "@/assets/images";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Users",
      url: "#",
      items: [
        {
          title: "Customers",
          url: "/customers",
        },
        {
          title: "Employees",
          url: "/staff",
        },
      ],
    },
    {
      title: "Feedback",
      url: "#",
      items: [
        {
          title: "Customer",
          url: "/feedback",
        },
        {
          title: "Employees",
          url: "/employeeFeedback",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      items: [
        {
          title: "Finance",
          url: "/financerecords",
        },
        {
          title: "Orders",
          url: "/orders",
        },
        {
          title: "Dispatches",
          url: "/dispatches",
        },
        {
          title: "Repairs",
          url: "/repairs",
        },
      ],
    },
    {
      title: "Company",
      url: "#",
      items: [
        {
          title: "About Us",
          url: "/aboutus",
        },
        {
          title: "Products",
          url: "/products",
        },
      ],
    },
  ],
};

import { supabase } from "@/backend/client";
async function handle_logout() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error logging out:", error.message);
  window.location.href = "/";
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="px-2 pt-4">
        <SidebarMenu>
          <img src={Logo} alt="REFNET" className="w-32" />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-8">
        <SidebarGroup>
          <SidebarMenu className="grid gap-2">
            {data.navMain.map((item) => (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <button className="flex p-6 gap-2" onClick={handle_logout}>
        <p className="text-sm">Log out</p>
      </button>
    </Sidebar>
  );
}
