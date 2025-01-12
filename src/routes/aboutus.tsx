import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Sidebar, Header } from "@/components";
import { Button } from "@/components/ui";
import { fetchStaff } from "@/api";
import { useEffect, useState } from "react";
import { StaffTable } from "@/components/tables/Staff";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import {Banner, Logo} from '@/assets/images'
import { CogIcon, Dam, LoaderPinwheel } from "lucide-react";

export const Route = createFileRoute("/aboutus")({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AboutUs />
      </main>
    </SidebarProvider>
  ),
});

function AboutUs() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchStaff().then((data) => setUsers(data));
  }, []);
  return (
    <div className="flex flex-col w-full">
      <section className="flex gap-2 items-center sticky px-4 top-0 bg-background py-4 z-10 border-b-[1px]">
        <SidebarTrigger />
        <Header location="About Us" />
      </section>
      <section className="px-6 pt-4 grid gap-10">
        <div className="grid gap-2">
          <h1 className="text-4xl font-bold w-2/3 pt-10 text-neutral-300">
            Elevating Comfort: Your Trusted Partner in Air Conditioning
            Solutions Across East Africa
          </h1>
          <div className="flex gap-4 px-4 py-6">
            <div className="w-14 h-[2px] bg-neutral-600 mt-2"> </div>
            <p className="font-light leading-loose text-xl text-neutral-500 w-3/4">
              At RefNet Air Conditioning, we pride ourselves on being a leading
              provider of innovative refrigeration and air conditioning
              solutions in East Africa. With years of industry experience, our
              dedicated team of professionals is committed to delivering
              high-quality services tailored to meet the unique needs of our
              clients.
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <h1 className="text-4xl font-bold w-2/3 pt-10 text-neutral-300">
            Comprehensive Solutions for Your Comfort Needs
          </h1>
        </div>
        <img
          src={Banner}
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
        <section className="grid grid-cols-3 gap-2">
          <div className="flex gap-4">
            <section className="bg-blue-100 w-max h-max p-2 mt-[6px] rounded-full">
              <Dam size={30} color={"#000"} />
            </section>
            <div>
              <h3 className="text-xl font-medium text-neutral-300">
                Installation
              </h3>
              <h3 className="text-xl font-light  text-neutral-400">
                Our installation process is thorough and efficient, minimizing
                disruption to your daily routine.
              </h3>
            </div>
          </div>
          <div className="flex gap-4">
            <section className="bg-blue-100 w-max h-max p-2 mt-[6px] rounded-full">
              <CogIcon size={30} color={"#000"} />
            </section>
            <div>
              <h3 className="text-xl font-medium text-neutral-300">Repair</h3>
              <h3 className="text-xl font-light text-neutral-400">
                We provide comprehensive repair services to ensure your systems
                are running smoothly.
              </h3>
            </div>
          </div>
          <div className="flex gap-4">
            <section className="bg-blue-100 w-max h-max p-2 mt-[6px] rounded-full">
              <LoaderPinwheel size={30} color={"#000"} />
            </section>
            <div>
              <h3 className="text-xl font-medium text-neutral-300">
                Mechanical Ventilation
              </h3>
              <h3 className="text-xl font-light text-neutral-400">
                Our mechanical ventilation solutions enhance air quality and
                comfort in your space.
              </h3>
            </div>
          </div>
        </section>
      </section>
      <footer className="px-4 py-4 mt-20 border-t-[1px] flex justify-between">
        <div className="flex items-center gap-2">
          <img src={Logo} alt="" className="w-14" />
          <p className="text-muted">&copy; 2024</p>
        </div>
        <div className="flex gap-4">
          <p className="text-sm text-muted py-2">
            Refnet - More than promises delivering proven excellence
          </p>
        </div>
      </footer>
    </div>
  );
}

