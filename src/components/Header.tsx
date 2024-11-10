import * as React from "react"
import { BreadcrumbComponent } from "@/components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlignVerticalDistributeStart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Ceo } from "@/assets/images"
import { Button } from "./ui";

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";



export function Header({location = ""}) {
    return (
      <div className="flex justify-between items-center w-full">
        <BreadcrumbComponent location={location} />
        <section className="flex items-center gap-2">
          <NavigationMenuComponent />
          <AvatarDemo />
        </section>
      </div>
    );
}

export function AvatarDemo() {
  return (
    <Avatar className="w-8 h-8">
      <AvatarFallback>A</AvatarFallback>
    </Avatar>
  );
}

"use client";

import {supabase} from "@/backend/client"
async function handle_logout() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Error logging out:", error.message);
  window.location.href = "/";
}


import { cn } from "@/lib/utils";

export function NavigationMenuComponent() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="border-none">
          <NavigationMenuTrigger>Administrator</NavigationMenuTrigger>
          <NavigationMenuContent className="shadow-none bg-zinc-100 ">
            <Button
              onClick={handle_logout}
              className="py-2 px-4 flex items-center gap-2 w-36 font-medium text-sm"
            >
              <span>Logout &#8611;</span>
            </Button>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
