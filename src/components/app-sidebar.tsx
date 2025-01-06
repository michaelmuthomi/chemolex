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
      title: "Analytics",
      url: "#",
      items: [
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Reports",
          url: "/reports",
        },
        {
          title: "Feedback",
          url: "/feedback",
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
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} >
      <SidebarHeader className="px-2 pt-4">
        <SidebarMenu>
          <img src={Logo} alt="REFNET" className="w-32" />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-8">
        <SidebarGroup>
          <SidebarMenu className="grid gap-4">
            {data.navMain.map((item) => (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
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
    </Sidebar>
  );
}
