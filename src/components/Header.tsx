import * as React from "react"
import { BreadcrumbComponent } from "@/components"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlignVerticalDistributeStart,
  HomeIcon,
  SearchIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Ceo } from "@/assets/images"
import { Button } from "./ui";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

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
      ],
    },
  ],
};

export function Header({ location = "" }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div className="flex justify-between items-center w-full">
      <BreadcrumbComponent location={location} />
      <div className="flex gap-2">
        <div
          className="w-14 h-14 p-2 rounded-full bg-neutral-900 hover:bg-zinc-100 dark:bg-zinc-200 flex items-center justify-center"
          onClick={() => window.location.replace('dashboard')}
        >
          <HomeIcon size={24} color={"#000000"} />
        </div>
        <div className="flex items-center gap-4 h-14 px-4 bg-neutral-900 dark:bg-zinc-200 rounded-full">
          <div
            className="flex gap-2 items-center w-72 pr-4"
            onClick={() => setOpen((open) => !open)}
          >
            <SearchIcon size={18} color={"#000000"} />
            <p className="text-base text-muted-foreground">Search</p>
            <span className="text-xs ml-auto">⌘ K</span>
          </div>
          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {data.navMain.map((group) => (
                <CommandGroup key={group.title} heading={group.title}>
                  {group.items.map((item) => (
                    <CommandItem key={item.title}>
                      <Link to={item.url} className="flex-1">
                        {item.title}
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
              <CommandSeparator />
            </CommandList>
          </CommandDialog>
        </div>
      </div>
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
