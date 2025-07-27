"use client";

import SubmitButton from "@/components/Frontend/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { ReactElement, useState } from "react";
import { login, LoginResponse } from "../_actions/login";
import Link from "next/link";

const LoginForm = (): ReactElement => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result: LoginResponse = await login({ email, password });

    setIsPending(false);

    if (result.success) {
      router.push("/TicketTable");
    } else {
      setError(result.error || "An error occurred");
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Login</div>
      <div className="w-full px-4 sm:mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <Label>eMail</Label>
              <Input
                id="email"
                type="email"
                name="email"
                className="border-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                className="border-white"
              />
            </div>
          </div>
          {error && <div className="text-red-700">{error}</div>}
          <div className="">
            <SubmitButton loading={isPending} label="Submit" />
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signUp" className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
