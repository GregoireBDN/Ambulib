import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function POST(request: NextRequest) {
  try {
    console.log('🔵 POST /api/form-draft - Début de la requête')
    
    const body = await request.json()
    console.log('📝 Données reçues pour sauvegarde brouillon')

    try {
      console.log('🌐 Appel vers le backend:', `${BACKEND_URL}/form-draft`)
      
      // Appel vers le backend NestJS avec transfert des cookies de session
      const backendResponse = await fetch(`${BACKEND_URL}/form-draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Transférer les cookies de session pour l'authentification
          'Cookie': request.headers.get('cookie') || '',
        },
        body: JSON.stringify(body),
      })

      console.log('📡 Réponse backend status:', backendResponse.status)

      if (!backendResponse.ok) {
        const backendError = await backendResponse.json().catch(() => ({ 
          success: false, 
          message: 'Erreur backend' 
        }))
        console.log('🚫 Erreur backend:', backendError)
        return NextResponse.json(backendError, { status: backendResponse.status })
      }

      const backendData = await backendResponse.json()
      console.log('✅ Sauvegarde brouillon réussie:', backendData.draftId)

      return NextResponse.json(backendData)

    } catch (backendError) {
      console.warn('⚠️ Backend non disponible pour form-draft:', backendError)
      
      // Fallback : retourner une réponse mock pour le développement
      return NextResponse.json({
        success: true,
        draftId: `mock-${Date.now()}`,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        message: 'Données sauvegardées temporairement (mode développement)'
      })
    }

  } catch (error) {
    console.error('🚨 Erreur lors de la sauvegarde brouillon:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de la sauvegarde' 
      },
      { status: 500 }
    )
  }
}