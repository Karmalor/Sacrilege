"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { cookies } from "next/headers";
import { User } from "@/payload-types";

interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  success: boolean;
  error?: string;
}

type SignUpResult = {
  exp?: number;
  token?: string;
  user?: User;
};

export async function signUp({
  email,
  password,
  firstName,
  lastName,
}: SignUpParams): Promise<SignUpResponse> {
  const payload = await getPayload({ config });

  try {
    await payload.create({
      collection: "users",
      data: {
        firstName,
        lastName,
        email,
        password,
      },
    });

    const result: SignUpResult = await payload.login({
      collection: "users",
      data: {
        email,
        password,
      },
    });

    if (result.token) {
      const cookieStore = await cookies();
      cookieStore.set({
        name: "payload-token",
        value: result.token,
        httpOnly: true,
        path: "/",
      });
      return { success: true };
    } else {
      return { success: false, error: "Login failed" };
    }
  } catch (error) {
    return { success: false, error: "Sign Up failed" };
  }
}
