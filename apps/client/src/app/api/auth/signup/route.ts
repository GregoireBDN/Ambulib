import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

// Simple ID generator pour les nouveaux utilisateurs (fallback)
function generateUserId(): string {
  return Date.now().toString()
}

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 POST /api/auth/signup - Début de la requête')
    
    const userData = await request.json()
    const { email, password, firstName, lastName, phone, birthDate, socialSecurity } = userData

    console.log('📧 Email reçu:', email)

    if (!email || !password || !firstName || !lastName) {
      console.log('❌ Données manquantes')
      return NextResponse.json(
        { error: 'Email, mot de passe, prénom et nom sont requis' },
        { status: 400 }
      )
    }

    // Validation simple de l'email
    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // Validation du mot de passe
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      )
    }

    // Validation du caractère spécial
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    if (!specialCharRegex.test(password)) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)' },
        { status: 400 }
      )
    }

    try {
      console.log('🌐 Tentative de création de compte via backend:', `${BACKEND_URL}/auth/signup`)
      
      // Appel vers le backend NestJS
      const backendResponse = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          phone,
          birthDate,
          socialSecurity,
          role: 'CLIENT'
        }),
      })

      console.log('📡 Réponse backend status:', backendResponse.status)

      if (!backendResponse.ok) {
        const backendError = await backendResponse.json().catch(() => ({ message: 'Erreur backend' }))
        console.log('🚫 Erreur backend:', backendError)
        return NextResponse.json(
          { error: backendError.message || 'Erreur lors de la création du compte' },
          { status: backendResponse.status }
        )
      }

      const backendData = await backendResponse.json()
      console.log('✅ Création de compte backend réussie pour:', backendData.user?.email)

      // Créer la session locale avec les données du backend
      await createSession(backendData.user)

      return NextResponse.json({
        user: backendData.user,
        message: 'Compte créé avec succès'
      })

    } catch (backendError) {
      console.warn('⚠️  Backend non disponible, fallback vers mock:', backendError)
      
      // Fallback vers création mock si le backend n'est pas disponible
      const newUser = {
        id: generateUserId(),
        email,
        firstName,
        lastName,
        role: 'CLIENT',
        phone,
        birthDate,
        socialSecurity,
        isProfileComplete: true
      }

      // Créer la session locale
      await createSession(newUser)

      console.log('✅ Création de compte mock réussie pour:', newUser.email)
      return NextResponse.json({
        user: newUser,
        message: 'Compte créé avec succès (mode développement)'
      })
    }

  } catch (error) {
    console.error('🚨 Erreur lors de l\'inscription:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la création du compte' },
      { status: 500 }
    )
  }
}