import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"
import { FormComponent } from '@/components'
import {Logo, Background} from "@/assets/images"

export const Route = createFileRoute('/')({
  component: () => <LoginPage />,
})

export default function LoginPage(){
  return (
    <section className="flex h-screen overflow-y-hidden gap-4">
      <div className="flex justify-center relative w-3/4">
        <img src={Logo} alt="" className="w-32 absolute top-10 left-10" />
        <FormComponent />        
      </div>
      <div className="w-full bg-slate-100">
        <img src={Background} alt="" className="h-[100%] object-cover" />
      </div>
    </section>
  );
}
