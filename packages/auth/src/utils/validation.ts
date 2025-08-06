import { z } from 'zod'
import { AuthProviderType, Role } from '../types/auth.types'

// Schémas de validation synchronisés avec l'API NestJS

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'Le prénom doit contenir au moins 2 caractères' })
    .max(50, { message: 'Le prénom ne peut pas dépasser 50 caractères' })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(50, { message: 'Le nom ne peut pas dépasser 50 caractères' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Veuillez saisir une adresse email valide' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    .regex(/[a-zA-Z]/, { message: 'Le mot de passe doit contenir au moins une lettre' })
    .regex(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre' })
    .regex(/[^a-zA-Z0-9]/, { message: 'Le mot de passe doit contenir au moins un caractère spécial' })
    .trim(),
  age: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 150), {
      message: 'L\'âge doit être un nombre valide entre 0 et 150'
    }),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: 'Veuillez saisir un numéro de téléphone valide'
    }),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  postalCode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{5}$/.test(val), {
      message: 'Le code postal doit contenir 5 chiffres'
    }),
  authProvider: z.enum(['CREDENTIALS', 'GOOGLE'] as const).optional(),
  isProfileComplete: z.boolean().optional()
})

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: 'Veuillez saisir une adresse email valide' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Le mot de passe est requis' })
})

export const completeProfileSchema = z.object({
  age: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 150), {
      message: 'L\'âge doit être un nombre valide entre 0 et 150'
    }),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: 'Veuillez saisir un numéro de téléphone valide'
    }),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  postalCode: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{5}$/.test(val), {
      message: 'Le code postal doit contenir 5 chiffres'
    })
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, { message: 'Le refresh token est requis' })
})

// Types inférés des schémas pour TypeScript
export type SignupFormData = z.infer<typeof signupSchema>
export type SigninFormData = z.infer<typeof signinSchema>
export type CompleteProfileFormData = z.infer<typeof completeProfileSchema>
export type RefreshTokenFormData = z.infer<typeof refreshTokenSchema>

// Fonction utilitaire pour valider les données
export function validateFormData<T>(
  schema: z.ZodSchema<T>, 
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string[]> } {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return { success: true, data: result.data }
  }
  
  const errors: Record<string, string[]> = {}
  result.error.errors.forEach((error) => {
    const field = error.path.join('.')
    if (!errors[field]) {
      errors[field] = []
    }
    errors[field].push(error.message)
  })
  
  return { success: false, errors }
}