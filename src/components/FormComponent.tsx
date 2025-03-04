"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster, Button } from "@/components/ui";
import { FormSchema } from "@/schema";
import { onSubmit } from "@/auth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { timeEnd } from "console";

export function FormComponent() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      await onSubmit(data);
      toast({ title: "Success", description: "Logged in successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Login failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-max h-full grid justify-center text-white">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-max space-y-10"
        >
          <div>
            <h1 className="text-4xl font-bold leading-none py-0">
              Chemolex Admin
            </h1>
            <p className="text-[#909090]">
              Welcome back, fill in your details below to continue
            </p>
          </div>
          <section className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      {...field}
                      className="h-11 px-5 !border-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                      className="h-11 px-5  !border-zinc-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full h-11 bg-[#1f8e36] hover:bg-white text-black"
              disabled={loading}
            >
              {loading ? "Logging In" : "Login and continue"}
            </Button>
          </section>
        </form>
      </Form>
    </div>
  );
}