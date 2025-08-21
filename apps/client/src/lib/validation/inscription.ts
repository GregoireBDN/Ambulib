import { z } from "zod"

// Schémas de base
const AddressSchema = z.object({
  street: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
  postalCode: z.string().regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres"),
  city: z.string().min(2, "Le nom de la ville doit contenir au moins 2 caractères")
})

const EmergencyContactSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone français requis"),
  relation: z.string().min(2, "Précisez le lien de parenté")
})

// Schéma Étape 1 : Identité & Contact
export const Step1Schema = z.object({
  firstName: z.string()
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .max(50, "Le prénom ne peut pas dépasser 50 caractères"),
  lastName: z.string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères"),
  birthDate: z.string()
    .min(1, "La date de naissance est requise")
    .refine((date: string) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 16 && age <= 120
    }, "L'âge doit être entre 16 et 120 ans"),
  phone: z.string()
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone français requis"),
  address: AddressSchema
})

// Schéma Étape 2 : Compte & Sécurité
export const Step2Schema = z.object({
  email: z.string()
    .email("Adresse email valide requise")
    .min(1, "L'email est requis"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmPassword: z.string()
    .min(1, "La confirmation du mot de passe est requise")
}).refine((data: any) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
})

// Schéma Étape 3 : Informations Médicales (optionnelles)
export const Step3Schema = z.object({
  socialSecurity: z.string()
    .regex(/^\d{15}$/, "Le numéro de sécurité sociale doit contenir 15 chiffres")
    .optional()
    .or(z.literal("")),
  allergies: z.string()
    .max(500, "La description des allergies ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),
  medications: z.string()
    .max(500, "La liste des médicaments ne peut pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),
  mobility: z.enum(['none', 'wheelchair', 'walker', 'cane', 'other'])
    .optional()
    .or(z.literal("")),
  mobilityDetails: z.string()
    .max(200, "Les détails de mobilité ne peuvent pas dépasser 200 caractères")
    .optional()
    .or(z.literal("")),
  doctorName: z.string()
    .max(100, "Le nom du médecin ne peut pas dépasser 100 caractères")
    .optional()
    .or(z.literal("")),
  doctorPhone: z.string()
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, "Numéro de téléphone français requis")
    .optional()
    .or(z.literal(""))
})

// Schéma Étape 4 : Contact d'Urgence & Finalisation
export const Step4Schema = z.object({
  emergencyContact: EmergencyContactSchema,
  acceptTerms: z.boolean()
    .refine((val: boolean) => val === true, "Vous devez accepter les conditions d'utilisation")
})

// Schémas de base sans les effets pour la fusion
const Step2BaseSchema = z.object({
  email: z.string()
    .email("Adresse email valide requise")
    .min(1, "L'email est requis"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Le mot de passe doit contenir au moins un caractère spécial"),
  confirmPassword: z.string()
    .min(1, "La confirmation du mot de passe est requise")
})

// Schéma complet du formulaire
export const FullFormSchema = Step1Schema
  .merge(Step2BaseSchema)
  .merge(Step3Schema)
  .merge(Step4Schema)
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"]
  })

// Export des types inférés
export type Step1Data = z.infer<typeof Step1Schema>
export type Step2Data = z.infer<typeof Step2Schema>
export type Step3Data = z.infer<typeof Step3Schema>
export type Step4Data = z.infer<typeof Step4Schema>
export type FullFormData = z.infer<typeof FullFormSchema>

// Fonction utilitaire pour valider une étape spécifique
export const validateStep = (step: number, data: any) => {
  switch (step) {
    case 1:
      return Step1Schema.safeParse(data)
    case 2:
      return Step2Schema.safeParse(data)
    case 3:
      return Step3Schema.safeParse(data)
    case 4:
      return Step4Schema.safeParse(data)
    default:
      throw new Error(`Étape invalide: ${step}`)
  }
}