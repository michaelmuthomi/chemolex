import * as React from "react"
import { Logo } from "@/assets/images";
import { Button, Icon } from "@/components/ui";
import { sidebarIconsData } from "@/data";
import { Link } from "@tanstack/react-router";

export function Sidebar({trigger}) {
  return (
    <SheetComponent
      trigger={trigger}
      content={
        <div className="flex flex-col gap-10 h-full">
          <img src={Logo} alt="REFNET" className="w-32" />
          <section className="flex flex-col gap-4 h-full">
            <p className="w-10 text-gray-400 font-normal text-xs">Home</p>
            <div className="grid gap-6">
              {sidebarIconsData.map((iconData, index) => (
                <SidebarLinks
                  key={index}
                  linkTo={iconData.location}
                  iconSrc={iconData.src}
                  text={iconData.text}
                />
              ))}
            </div>
          </section>
        </div>
      }
    />
  );
}

export function SidebarLinks({ linkTo, iconSrc, text }) {
  return (
    <Link to={`/${linkTo}`} className="flex items-center gap-2">
      <div className="w-5 flex">
        <Icon src={iconSrc} />
      </div>
      <p className="font-normal">{text}</p>
    </Link>
  );
}

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function SheetComponent({ content, trigger }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="left" className="w-max pr-20">
        {content}
      </SheetContent>
    </Sheet>
  );
}
