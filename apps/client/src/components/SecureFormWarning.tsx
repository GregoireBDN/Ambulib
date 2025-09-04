import React from 'react'
import { AlertTriangle, Clock, Shield } from 'lucide-react'
import { Card, CardContent } from '@repo/ui'

interface SecureFormWarningProps {
  lastSaved?: Date | null
  timeToExpiry?: number | null
  onExtendSession?: () => void
}

/**
 * Composant d'avertissement pour le stockage sécurisé des données
 * Informe l'utilisateur sur l'expiration et la sécurité
 */
export function SecureFormWarning({
  lastSaved,
  timeToExpiry,
  onExtendSession
}: SecureFormWarningProps) {
  
  // Convertir le temps restant en minutes
  const minutesLeft = timeToExpiry ? Math.floor(timeToExpiry / (1000 * 60)) : null
  
  // Déterminer l'état d'alerte
  const isWarning = minutesLeft !== null && minutesLeft <= 10 && minutesLeft > 0
  const isExpired = minutesLeft !== null && minutesLeft <= 0
  const isSecure = minutesLeft === null || minutesLeft > 10

  if (isExpired) {
    return (
      <Card className="border-red-500 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-800 mb-2">
                Session expirée
              </h4>
              <p className="text-red-700 text-sm mb-3">
                Vos données médicales ont été automatiquement supprimées pour votre sécurité.
                Vous devrez les ressaisir.
              </p>
              <div className="bg-red-100 rounded p-3">
                <p className="text-red-800 text-xs">
                  🔒 <strong>Protection RGPD :</strong> Les données médicales sont supprimées automatiquement
                  après 30 minutes d'inactivité pour respecter la réglementation française.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isWarning) {
    return (
      <Card className="border-yellow-500 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Session bientôt expirée
              </h4>
              <p className="text-yellow-700 text-sm mb-3">
                Vos données médicales seront supprimées dans <strong>{minutesLeft} minute{minutesLeft !== 1 ? 's' : ''}</strong>.
              </p>
              {onExtendSession && (
                <button
                  onClick={onExtendSession}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Prolonger la session
                </button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isSecure && lastSaved) {
    return (
      <Card className="border-green-500 bg-green-50">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <div className="flex-1">
              <p className="text-green-800 text-sm">
                <strong>Données sécurisées</strong> - Dernière sauvegarde : {lastSaved.toLocaleTimeString('fr-FR')}
              </p>
              <p className="text-green-700 text-xs">
                🔒 Stockage conforme RGPD avec chiffrement et expiration automatique
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return null
}