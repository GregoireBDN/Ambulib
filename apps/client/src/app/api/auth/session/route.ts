import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

// Route Handler pour récupérer la session utilisateur
export async function GET() {
  try {
    const session = await getSession()
    
    if (!session) {
      // Ne pas retourner 401, mais plutôt 200 avec user: null
      // car l'absence de session n'est pas une erreur
      return NextResponse.json({ user: null })
    }
    
    return NextResponse.json({ 
      user: session.user,
      expires: session.expires 
    })
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' }, 
      { status: 500 }
    )
  }
}