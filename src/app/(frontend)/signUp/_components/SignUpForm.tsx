"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent, ReactElement } from "react";
import Link from "next/link";
import SubmitButton from "@/components/Frontend/SubmitButton";
import { signUp, SignUpResponse } from "../_actions/signUp";
import { Input } from "@/components/ui/input";

export default function SignupForm(): ReactElement {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsPending(true);
    setError(null); // Reset error state

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsPending(false);
      return;
    }

    const result: SignUpResponse = await signUp({
      email,
      password,
      firstName,
      lastName,
    });
    setIsPending(false);

    if (result.success) {
      // Redirect manually after successful login
      router.push("/");
    } else {
      // Display the error message
      setError(result.error || "Login failed");
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Sign Up</div>
      <div className="w-full px-4 sm:mx-auto sm:max-w-sm">
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">First Name</label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full textInput border-white"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Last Name</label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full textInput border-white"
                  required
                />
              </div>
            </div>
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              className="w-full textInput border-white"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              className="w-full textInput border-white"
              required
            />
          </div>

          <div className="flex flex-col gap-2 mb-8">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="w-full textInput border-white"
              required
            />
          </div>

          {error && <div className="text-red-500">{error}</div>}

          <SubmitButton loading={isPending} label="Sign Up" />
        </form>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-headBlue-500 hover:text-headBlue-400"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
