"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/actions/auth";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Memproses..." : "Masuk"}
    </Button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    return await login(formData);
  }, null);

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src="/logo.png" alt="Logo" className="w-24" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Masuk ke dashboard untuk mengelola sistem
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-border/40">
          
          {state?.error && (
            <div className="mb-4 p-3 bg-destructive/15 border border-destructive/30 rounded-md text-destructive text-sm">
              {state.error}
            </div>
          )}

          <form className="space-y-6" action={formAction}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                  Ingat saya
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Lupa password?
                </a>
              </div>
            </div>

            <div>
              <SubmitButton />
            </div>
          </form>
          
          <div className="mt-6 text-center">
             <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
              &larr; Kembali ke Halaman Utama
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
