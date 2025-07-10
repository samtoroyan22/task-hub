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
import { DashboardPages } from "@/config/dashboard-pages";
import { authStore } from "@/stores/auth.store";
import { AuthSchema } from "@/zod-schemes/auth.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Eye } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  type: "login" | "register" | "forgot-password" | "reset-password";
}

export const AuthForm = observer(({ type }: Props) => {
  const isLogin = type === "login";
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof AuthSchema>>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof AuthSchema>) => {
    authStore.login();
    form.reset();
    if (authStore.isLoggedIn) {
      toast.success(
        isLogin ? "Logged in successfully" : "Registered successfully"
      );
      router.replace(DashboardPages.DASHBOARD);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-10 bg-white dark:bg-gray-900 rounded-2xl shadow-accent">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {isLogin ? "Login" : "Register"}
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Пароль
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter password"
                        type={showPassword ? "text" : "password"}
                        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-800 text-gray-900"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
                      >
                        {showPassword ? (
                          <Eye className="h-5 w-5 opacity-60" />
                        ) : (
                          <EyeOff className="h-5 w-5 opacity-60" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[0.99]"
            >
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
});
