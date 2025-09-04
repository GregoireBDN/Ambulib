import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ draftId: string }> }
) {
  try {
    console.log('🔵 GET /api/form-draft/[draftId] - Début de la requête')
    
    const { draftId } = await params
    console.log('📝 DraftId:', draftId)

    if (!draftId) {
      return NextResponse.json(
        { success: false, message: 'ID de brouillon requis' },
        { status: 400 }
      )
    }

    try {
      console.log('🌐 Appel vers le backend:', `${BACKEND_URL}/form-draft/${draftId}`)
      
      // Appel vers le backend NestJS avec transfert des cookies de session
      const backendResponse = await fetch(`${BACKEND_URL}/form-draft/${draftId}`, {
        method: 'GET',
        headers: {
          // Transférer les cookies de session pour l'authentification
          'Cookie': request.headers.get('cookie') || '',
        },
      })

      console.log('📡 Réponse backend status:', backendResponse.status)

      if (!backendResponse.ok) {
        const backendError = await backendResponse.json().catch(() => ({ 
          success: false, 
          message: 'Brouillon non trouvé ou expiré' 
        }))
        console.log('🚫 Erreur backend:', backendError)
        return NextResponse.json(backendError, { status: backendResponse.status })
      }

      const backendData = await backendResponse.json()
      console.log('✅ Brouillon récupéré avec succès')

      return NextResponse.json(backendData)

    } catch (backendError) {
      console.warn('⚠️ Backend non disponible pour form-draft:', backendError)
      
      // Fallback : retourner une réponse mock pour le développement
      return NextResponse.json({
        success: false,
        message: 'Brouillon non trouvé (mode développement)'
      }, { status: 404 })
    }

  } catch (error) {
    console.error('🚨 Erreur lors de la récupération brouillon:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de la récupération' 
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ draftId: string }> }
) {
  try {
    console.log('🔵 DELETE /api/form-draft/[draftId] - Début de la requête')
    
    const { draftId } = await params
    console.log('🗑️ Suppression DraftId:', draftId)

    if (!draftId) {
      return NextResponse.json(
        { success: false, message: 'ID de brouillon requis' },
        { status: 400 }
      )
    }

    try {
      console.log('🌐 Appel vers le backend:', `${BACKEND_URL}/form-draft/${draftId}`)
      
      // Appel vers le backend NestJS avec transfert des cookies de session
      const backendResponse = await fetch(`${BACKEND_URL}/form-draft/${draftId}`, {
        method: 'DELETE',
        headers: {
          // Transférer les cookies de session pour l'authentification
          'Cookie': request.headers.get('cookie') || '',
        },
      })

      console.log('📡 Réponse backend status:', backendResponse.status)

      // NestJS renvoie 204 No Content pour DELETE réussi
      if (backendResponse.status === 204 || backendResponse.ok) {
        console.log('✅ Brouillon supprimé avec succès')
        return new NextResponse(null, { status: 204 })
      }

      const backendError = await backendResponse.json().catch(() => ({ 
        success: false, 
        message: 'Erreur lors de la suppression' 
      }))
      console.log('🚫 Erreur backend:', backendError)
      return NextResponse.json(backendError, { status: backendResponse.status })

    } catch (backendError) {
      console.warn('⚠️ Backend non disponible pour suppression form-draft:', backendError)
      
      // Fallback : simulation de suppression réussie pour le développement
      console.log('✅ Suppression simulée (mode développement)')
      return new NextResponse(null, { status: 204 })
    }

  } catch (error) {
    console.error('🚨 Erreur lors de la suppression brouillon:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de la suppression' 
      },
      { status: 500 }
    )
  }
}