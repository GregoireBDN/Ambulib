import { NextResponse } from 'next/server'
import { destroySession } from '@/lib/auth'

export async function POST() {
  try {
    // Détruire la session locale
    await destroySession()

    return NextResponse.json({
      message: 'Déconnexion réussie'
    })

  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    return NextResponse.json(
      { error: 'Erreur serveur lors de la déconnexion' },
      { status: 500 }
    )
  }
}