import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 POST /api/auth/signin - Début de la requête')
    
    const { email, password } = await request.json()
    console.log('📧 Email reçu:', email)

    if (!email || !password) {
      console.log('❌ Données manquantes - email:', !!email, 'password:', !!password)
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      )
    }

    try {
      console.log('🌐 Tentative de connexion au backend:', `${BACKEND_URL}/auth/signin`)
      
      // Appel vers le backend NestJS
      const backendResponse = await fetch(`${BACKEND_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('📡 Réponse backend status:', backendResponse.status)

      if (!backendResponse.ok) {
        const backendError = await backendResponse.json().catch(() => ({ message: 'Erreur backend' }))
        console.log('🚫 Erreur backend:', backendError)
        return NextResponse.json(
          { error: backendError.message || 'Identifiants incorrects' },
          { status: backendResponse.status }
        )
      }

      const backendData = await backendResponse.json()
      console.log('✅ Réponse backend réussie pour:', backendData.user?.email)

      // Créer la session locale avec les données du backend
      await createSession(backendData.user)

      return NextResponse.json({
        user: backendData.user,
        message: 'Connexion réussie'
      })

    } catch (backendError) {
      console.warn('⚠️  Backend non disponible, fallback vers mock:', backendError)
      
      // Fallback vers authentification mock si le backend n'est pas disponible
      const MOCK_USERS = [
        {
          id: '1',
          email: 'patient@havrid.fr',
          password: 'password123',
          firstName: 'Marie',
          lastName: 'Dubois',
          role: 'CLIENT',
          phone: '01 23 45 67 89',
          isProfileComplete: true
        },
        {
          id: '2', 
          email: 'test@test.fr',
          password: 'test123',
          firstName: 'Jean',
          lastName: 'Martin',
          role: 'CLIENT',
          phone: '06 12 34 56 78',
          isProfileComplete: true
        }
      ]

      const user = MOCK_USERS.find(u => u.email === email && u.password === password)
      
      if (!user) {
        console.log('🚫 Identifiants incorrects (mock):', email)
        return NextResponse.json(
          { error: 'Identifiants incorrects' },
          { status: 401 }
        )
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: userPassword, ...userWithoutPassword } = user
      
      await createSession(userWithoutPassword)
      
      console.log('✅ Connexion mock réussie pour:', userWithoutPassword.email)
      return NextResponse.json({
        user: userWithoutPassword,
        message: 'Connexion réussie (mode développement)'
      })
    }

  } catch (error) {
    console.error('🚨 Erreur lors de la connexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la connexion' },
      { status: 500 }
    )
  }
}