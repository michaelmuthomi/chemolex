import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { Logo } from "@/assets/images";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
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
      title: "Others",
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
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="px-2 py-4">
      <SidebarHeader>
        <SidebarMenu>
          <img src={Logo} alt="REFNET" className="w-32" />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-8">
        <SidebarGroup>
          <SidebarMenu className="grid gap-6">
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium text-base">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="gap-2">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url} className=" text-base">
                            {item.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
