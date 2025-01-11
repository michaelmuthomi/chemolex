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
    <div className="w-max h-full grid justify-center ">
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-max space-y-6"
        >
          <h1 className="text-4xl font-bold leading-10">Sign-In</h1>
          <p>Welcome back, fill in your details below to continue</p>
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
                    className="h-11 px-5"
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
                    className="h-11 px-5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? "Logging In" : "Login and continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}