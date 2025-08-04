"use server";

import { BACKEND_URL } from "./constants";
import { FormState, LoginFormSchema, SignupFormSchema } from "./type";
import { createSession } from "./session";

/**
 * Sign up a user
 * @param state - The current state of the form
 * @param formData - The form data
 * @returns The state of the form
 */
export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  console.log("Starting signUp function");
  console.log("FormData entries:", Array.from(formData.entries()));

  const validatedFields = SignupFormSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    age: formData.get("age"),
    phoneNumber: formData.get("phoneNumber"),
    address: formData.get("address"),
    city: formData.get("city"),
    postalCode: formData.get("postalCode"),
  });

  console.log("Validation result:", validatedFields);

  if (!validatedFields.success) {
    console.log("Validation failed:", validatedFields.error);
    return {
      error: validatedFields.error.flatten().fieldErrors,
      values: {
        firstName: formData.get("firstName")?.toString() || "",
        lastName: formData.get("lastName")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        age: formData.get("age")?.toString() || "",
        phoneNumber: formData.get("phoneNumber")?.toString() || "",
        address: formData.get("address")?.toString() || "",
        city: formData.get("city")?.toString() || "",
        postalCode: formData.get("postalCode")?.toString() || "",
      },
    };
  }

  try {
    console.log("Sending request to backend at:", `${BACKEND_URL}/auth/signup`);
    console.log("Request payload:", validatedFields.data);

    const response = await fetch(`${BACKEND_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("Error response data:", errorData);
      return {
        message: errorData.message || "Erreur lors de l'inscription",
        values: {
          firstName: formData.get("firstName")?.toString() || "",
          lastName: formData.get("lastName")?.toString() || "",
          email: formData.get("email")?.toString() || "",
          password: formData.get("password")?.toString() || "",
          age: formData.get("age")?.toString() || "",
          phoneNumber: formData.get("phoneNumber")?.toString() || "",
          address: formData.get("address")?.toString() || "",
          city: formData.get("city")?.toString() || "",
          postalCode: formData.get("postalCode")?.toString() || "",
        },
      };
    } else {
      const result = await response.json();
      console.log("Success response data:", result);

      // Connecter automatiquement l'utilisateur après l'inscription
      console.log("Signup successful, creating session...");
      await createSession({
        user: {
          id: result.id,
          email: validatedFields.data.email,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role,
          isProfileComplete: result.isProfileComplete,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
      console.log("Session created successfully");

      return {
        success: true,
        redirect: "/",
      };
    }
  } catch (error) {
    console.error("Error during sign up:", error);
    return {
      message: "An error occurred during sign up",
      values: {
        firstName: formData.get("firstName")?.toString() || "",
        lastName: formData.get("lastName")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        password: formData.get("password")?.toString() || "",
        age: formData.get("age")?.toString() || "",
        phoneNumber: formData.get("phoneNumber")?.toString() || "",
        address: formData.get("address")?.toString() || "",
        city: formData.get("city")?.toString() || "",
        postalCode: formData.get("postalCode")?.toString() || "",
      },
    };
  }
}

/**
 * Sign in a user
 * @param prevState - The previous state of the form
 * @param formData - The form data
 * @returns The state of the form
 */
export async function signIn(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  console.log("Starting signIn function");
  console.log("FormData entries:", Array.from(formData.entries()));

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log("Validation result:", validatedFields);

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
    console.log("Sending request to backend at:", `${BACKEND_URL}/auth/signin`);
    console.log("Request payload:", validatedFields.data);

    const response = await fetch(`${BACKEND_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    const result = await response.json();
    console.log("Response data:", result);

    if (response.ok) {
      console.log("Login successful, creating session...");
      await createSession({
        user: {
          id: result.id,
          email: validatedFields.data.email,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role,
          isProfileComplete: result.isProfileComplete,
        },
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
      console.log("Session created successfully");
      return {
        success: true,
        redirect: "/",
      };
    } else {
      console.log("Login failed with status:", response.status);
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

/**
 * Refresh a user's token
 * @param oldAccessToken - The old access token
 * @returns The new access token
 */
export async function refreshToken(oldAccessToken: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldAccessToken }),
    });
    if (!response.ok) {
      return {
        message: "Failed to refresh token",
      };
    }
    const { accessToken, refreshToken } = await response.json();
    const updateRes = await fetch("localhost:3000/api/auth/update", {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
    });
    if (!updateRes.ok) {
      return {
        message: "Failed to update token",
      };
    }
    return accessToken;
  } catch (error) {
    console.error("Error during refresh token:", error);
    return null;
  }
}
