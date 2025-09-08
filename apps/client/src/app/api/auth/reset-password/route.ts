import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: 'Token et nouveau mot de passe requis' },
        { status: 400 }
      )
    }

    // Appeler l'API backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    const response = await fetch(`${backendUrl}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    })

    const result = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { message: result.message || 'Erreur lors de la réinitialisation du mot de passe' },
        { status: response.status }
      )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error)
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}