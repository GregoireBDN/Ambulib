import { z } from "zod";

export type FormState =
  | {
      error?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        age?: string[];
        phoneNumber?: string[];
        address?: string[];
        city?: string[];
        postalCode?: string[];
      };
      message?: string;
      values?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
        age?: string;
        phoneNumber?: string;
        address?: string;
        city?: string;
        postalCode?: string;
      };
      success?: boolean;
      redirect?: string;
    }
  | undefined;

export const SignupFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "Le prénom doit contenir au moins 2 caractères.",
    })
    .trim(),
  lastName: z
    .string()
    .min(2, {
      message: "Le nom doit contenir au moins 2 caractères.",
    })
    .trim(),
  email: z
    .string()
    .email({ message: "Veuillez entrer un email valide." })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[a-zA-Z]/, {
      message: "Le mot de passe doit contenir au moins une lettre.",
    })
    .regex(/[0-9]/, {
      message: "Le mot de passe doit contenir au moins un chiffre.",
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Le mot de passe doit contenir au moins un caractère spécial.",
    })
    .trim(),
  age: z
    .string()
    .refine((val) => !val || (Number(val) >= 0 && Number(val) <= 120), {
      message: "L'âge doit être compris entre 0 et 120 ans.",
    }),
  phoneNumber: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, {
    message: "Veuillez entrer un numéro de téléphone français valide.",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit contenir au moins 5 caractères.",
  }),
  city: z.string().min(2, {
    message: "La ville doit contenir au moins 2 caractères.",
  }),
  postalCode: z.string().regex(/^[0-9]{5}$/, {
    message: "Le code postal doit contenir 5 chiffres.",
  }),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Veuillez entrer un email valide." }),
  password: z.string().min(1, {
    message: "Le mot de passe ne peut pas être vide.",
  }),
});

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  USER = "USER",
}
