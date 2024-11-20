import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import * as React from "react";
import { Logo } from "@/assets/images";
import { Button } from "@/components/ui";
import { sidebarIconsData } from "@/data";
import { Link } from "@tanstack/react-router";
import { MdHomeFilled } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbReportSearch } from "react-icons/tb";
import { VscFeedback } from "react-icons/vsc";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <div className="flex flex-col gap-10 h-full p-6">
          <img src={Logo} alt="REFNET" className="w-32" />
          <section className="flex flex-col gap-4 h-full">
            <p className="text-gray-700 font-normal text-sm uppercase">Home</p>
            <div className="grid gap-6">
              <SidebarLinks
                linkTo="/dashboard"
                icon={<MdHomeFilled />}
                text="Dashboard"
              />
              <p className="text-gray-700 font-normal text-sm uppercase">
                USERS
              </p>
              <SidebarLinks
                linkTo="/customers"
                icon={<FaUsers />}
                text="Customers"
              />
              <SidebarLinks linkTo="/staff" icon={<FaUsers />} text="Employees" />
              <p className="text-gray-700 font-normal text-sm uppercase">
                Others
              </p>
              <SidebarLinks
                linkTo="/products"
                icon={<AiFillProduct />}
                text="Products"
              />
              <SidebarLinks
                linkTo="/reports"
                icon={<TbReportSearch />}
                text="Reports"
              />
              <SidebarLinks
                linkTo="/feedback"
                icon={<VscFeedback />}
                text="Feedback"
              />
            </div>
          </section>
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export function SidebarLinks({ linkTo, icon, text }) {
  return (
    <Link to={`/${linkTo}`} className="flex items-center gap-2">
      <div className="w-5 flex">
        {icon}
      </div>
      <p className="font-normal">{text}</p>
    </Link>
  );
}