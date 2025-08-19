'use server'

// Server Actions pour l'authentification - Next.js 15 pattern
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createSession, destroySession } from './auth'
import { initializeServerApiClient, getServerApiClient } from '@repo/auth/server'

// Types pour les formulaires
export interface SignInData {
  email: string
  password: string
}

export interface SignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
  age?: string
  postalCode?: string
  phoneNumber?: string
}

// État de retour pour les Server Actions
export interface ActionResult {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

// Initialiser le client API serveur une seule fois
let serverApiClientInitialized = false
function ensureServerApiClient() {
  if (!serverApiClientInitialized) {
    initializeServerApiClient({
      baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
      timeout: 10000
    })
    serverApiClientInitialized = true
  }
}

// Server Action - Connexion
export async function signInAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    ensureServerApiClient()
    const apiClient = getServerApiClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validation basique
    if (!email || !password) {
      return {
        success: false,
        error: 'Email et mot de passe requis',
        fieldErrors: {
          email: !email ? 'Email requis' : '',
          password: !password ? 'Mot de passe requis' : ''
        }
      }
    }

    // Appel API
    const response = await apiClient.signIn({ email, password })

    // Créer la session
    await createSession({
      id: response.id.toString(),
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email || email,
      role: response.role,
      companyId: response.companyId?.toString(),
      isProfileComplete: response.isProfileComplete
    })

    // Revalider les pages qui utilisent la session
    revalidatePath('/', 'layout')

  } catch (error: unknown) {
    console.error('Erreur de connexion:', error)
    
    let errorMessage = 'Erreur lors de la connexion'
    if (error instanceof Error) {
      if (error.message?.includes('User not found')) {
        errorMessage = 'Aucun compte trouvé avec cette adresse email'
      } else if (error.message?.includes('Unauthorized')) {
        errorMessage = 'Email ou mot de passe incorrect'
      }
    }

    return {
      success: false,
      error: errorMessage
    }
  }

  // Redirection après succès
  redirect('/dashboard')
}

// Server Action - Inscription
export async function signUpAction(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  try {
    ensureServerApiClient()
    const apiClient = getServerApiClient()

    const signUpData: SignUpData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      age: formData.get('age') as string || undefined,
      postalCode: formData.get('postalCode') as string || undefined,
      phoneNumber: formData.get('phoneNumber') as string || undefined,
    }

    // Validation basique
    if (!signUpData.firstName || !signUpData.lastName || !signUpData.email || !signUpData.password) {
      return {
        success: false,
        error: 'Tous les champs obligatoires doivent être remplis',
        fieldErrors: {
          firstName: !signUpData.firstName ? 'Prénom requis' : '',
          lastName: !signUpData.lastName ? 'Nom requis' : '',
          email: !signUpData.email ? 'Email requis' : '',
          password: !signUpData.password ? 'Mot de passe requis' : ''
        }
      }
    }

    // Appel API
    const response = await apiClient.signUp(signUpData)

    // Créer la session
    await createSession({
      id: response.id.toString(),
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email || signUpData.email,
      role: response.role,
      companyId: response.companyId?.toString(),
      isProfileComplete: response.isProfileComplete
    })

    // Revalider les pages qui utilisent la session
    revalidatePath('/', 'layout')

  } catch (error: unknown) {
    console.error('Erreur d\'inscription:', error)
    
    let errorMessage = 'Erreur lors de l\'inscription'
    if (error && typeof error === 'object' && 'validation' in error) {
      return {
        success: false,
        error: 'Erreurs de validation',
        fieldErrors: (error as any).validation
      }
    }

    return {
      success: false,
      error: errorMessage
    }
  }

  // Redirection après succès
  redirect('/dashboard')
}

// Server Action - Déconnexion
export async function signOutAction(): Promise<void> {
  await destroySession()
  revalidatePath('/', 'layout')
  redirect('/')
}