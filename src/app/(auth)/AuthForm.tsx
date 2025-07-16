"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthSchema } from "@/zod-schemes/auth.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signInWithEmail } from "./actions";

export const AuthForm = () => {
  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof AuthSchema>) => {
    signInWithEmail({ email: data.email });
    form.reset();
    toast.success("Link to sign in has been sent to your email");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-10 bg-white dark:bg-gray-900 rounded-2xl shadow-accent">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Sign in with email
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email"
                      type="email"
                      className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-900"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[0.99]"
            >
              Send link
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
