import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"
import { FormComponent } from '@/components'
import {Logo, Background} from "@/assets/images"

export const Route = createFileRoute('/')({
  component: () => <LoginPage />,
})

export default function LoginPage(){
  return (
    <section className="flex h-screen overflow-y-hidden gap-4 bg-black">
      {/* <div className="w-2/3 bg-slate-100">
        <img src={Background} alt="" className="h-[100%] w-full object-cover" />
      </div> */}
      <div className="flex justify-center relative w-full">
        <img src={Logo} alt="" className="w-32 absolute top-10 left-10" />
        <FormComponent />
      </div>
    </section>
  );
}
