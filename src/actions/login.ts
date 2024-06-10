"use server";
import { z } from "zod";
import { loginSchema } from "@/validatorSchema";
import { signIn } from "@/auth";
import {
  DEFAULT_USER_LOGIN_REDIRECT,
  DEFAULT_ADMIN_LOGIN_REDIRECT,
} from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user"; // Ensure this path is correct

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const { email, password } = validatedFields.data;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { error: result.error };
    }

    // Fetch the user information to get the role
    const user = await getUserByEmail(email);
    if (!user) {
      return { error: "User not found!" };
    }

    // Determine the redirect URL based on the user's role
    const redirectUrl =
      user.role === "admin"
        ? DEFAULT_ADMIN_LOGIN_REDIRECT
        : DEFAULT_USER_LOGIN_REDIRECT;

    return { success: "Login Success", redirect: redirectUrl };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    return { error: "Something went wrong!" };
  }
};
