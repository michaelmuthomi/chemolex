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
          title: "Feedback",
          url: "/feedback",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      items: [
        {
          title: "Reports",
          url: "/reports",
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
      <SidebarHeader className="px-4 pt-4 !bg-[#121212]">
        <SidebarMenu className="h-max">
          <img src={Logo} alt="Chemolex" className="w-96 h-16 object-cover" />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="!bg-[#121212] text-white">
        <SidebarGroup>
          <SidebarMenu className="grid gap-2">
            {data.navMain.map((item) => (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel className="uppercase text-neutral-600">{item.title}</SidebarGroupLabel>
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
      <button className="flex p-6 gap-2 !bg-[#121212]" onClick={handle_logout}>
        <p className="text-sm">Log out</p>
      </button>
    </Sidebar>
  );
}
