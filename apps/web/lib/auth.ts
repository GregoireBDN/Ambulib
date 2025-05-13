"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "./constants";
import { FormState, LoginFormSchema, SignupFormSchema } from "./type";
import { createSession } from "./session";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      values: {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
      },
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    return redirect("/auth/signin");
  } else {
    return {
      message:
        response.status === 409
          ? "User already exists"
          : "User created successfully",
    };
  }
}

export async function signIn(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  console.log("Starting signIn function");

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error);
    return {
      error: validatedFields.error.flatten().fieldErrors,
      values: {
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
      },
    };
  }

  try {
    console.log("Sending request to backend");
    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    console.log("Response status:", response.status);
    const result = await response.json();
    console.log("Response data:", result);

    if (response.ok) {
      await createSession({
        user: {
          id: result.id,
          email: validatedFields.data.email,
          name: result.name,
        },
      });
      return {
        success: true,
        redirect: "/",
      };
    } else {
      return {
        message:
          response.status === 401 ? "Invalid credentials" : response.statusText,
        values: {
          email: formData.get("email")?.toString() || "",
          password: "",
        },
      };
    }
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      message: "An error occurred during sign in",
      values: {
        email: formData.get("email")?.toString() || "",
        password: "",
      },
    };
  }
}
