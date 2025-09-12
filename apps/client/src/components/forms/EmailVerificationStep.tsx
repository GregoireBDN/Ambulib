"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Button, Input, Label } from '@repo/ui'
import type { FormData } from '@/types/inscription'

interface EmailVerificationStepProps {
  formData: FormData
  errors: Record<string, string>
  onFieldChange: (field: keyof FormData, value: unknown) => void
  onVerificationComplete: () => void
  onGoToEmailStep: (step: number) => void
}

const EmailVerificationStep: React.FC<EmailVerificationStepProps> = ({
  formData,
  errors,
  onFieldChange,
  onVerificationComplete,
  onGoToEmailStep
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState('')
  const [verificationError, setVerificationError] = useState('')

  // Démarrer le countdown quand un code est envoyé
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  // Fonction pour envoyer le code de vérification
  const handleSendVerificationCode = useCallback(async () => {
    if (!formData.email) {
      setVerificationError('Veuillez saisir votre adresse email')
      return
    }

    setIsSendingCode(true)
    setVerificationError('')
    setVerificationMessage('')

    try {
      const response = await fetch('/api/auth/send-verification-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setVerificationError('Un code a déjà été envoyé. Veuillez attendre 60 secondes avant de demander un nouveau code.')
        } else {
          setVerificationError(result.message || 'Erreur lors de l\'envoi du code')
        }
        return
      }

      setVerificationSent(true)
      setCountdown(60) // 60 secondes de cooldown
      setVerificationMessage('Code de vérification envoyé avec succès ! Vérifiez votre boîte mail.')
      
      // Focus sur le champ de vérification après un délai
      setTimeout(() => {
        const codeInput = document.getElementById('verificationCode')
        codeInput?.focus()
      }, 100)

    } catch (error) {
      console.error('Erreur réseau:', error)
      setVerificationError('Problème de connexion. Vérifiez votre connexion internet.')
    } finally {
      setIsSendingCode(false)
    }
  }, [formData.email])

  // Fonction pour vérifier le code
  const handleVerifyCode = useCallback(async () => {
    if (!formData.verificationCode || formData.verificationCode.length !== 6) {
      setVerificationError('Veuillez saisir le code à 6 chiffres reçu par email')
      return
    }

    setIsLoading(true)
    setVerificationError('')
    setVerificationMessage('')

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          code: formData.verificationCode,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setVerificationError(result.message || 'Code de vérification incorrect')
        return
      }

      if (result.verified) {
        onFieldChange('emailVerified', true)
        setVerificationMessage('Email vérifié avec succès ! ✅')
        
        // Attendre un peu pour montrer le message de succès, puis passer à l'étape suivante
        setTimeout(() => {
          onVerificationComplete()
        }, 1500)
      } else {
        setVerificationError('Code de vérification incorrect')
      }

    } catch (error) {
      console.error('Erreur réseau:', error)
      setVerificationError('Problème de connexion. Vérifiez votre connexion internet.')
    } finally {
      setIsLoading(false)
    }
  }, [formData.email, formData.verificationCode, onFieldChange, onVerificationComplete])

  // Envoyer automatiquement le code quand on arrive sur cette étape
  useEffect(() => {
    if (formData.email && !verificationSent && !formData.emailVerified) {
      handleSendVerificationCode()
    }
  }, [formData.email, verificationSent, formData.emailVerified, handleSendVerificationCode])

  // Gestion de la saisie du code avec auto-focus et validation
  const handleCodeChange = (value: string) => {
    // Nettoyer le code (ne garder que les chiffres)
    const cleanCode = value.replace(/\D/g, '').slice(0, 6)
    
    console.log('EmailVerificationStep: Code saisi:', value, '-> Nettoyé:', cleanCode)
    
    onFieldChange('verificationCode', cleanCode)
    
    // Effacer les erreurs pendant la saisie
    if (verificationError) {
      setVerificationError('')
    }
  }

  return (
    <div className="space-y-8" data-step="verification">
      {formData.emailVerified ? (
        // Affichage quand l'email est déjà vérifié
        <div className="text-center space-y-6">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-700">
            Email vérifié avec succès !
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-lg text-green-800 mb-2">
              <strong>Votre adresse email a été confirmée</strong>
            </p>
            <p className="text-green-700">
              {formData.email}
            </p>
            <p className="text-sm text-green-600 mt-4">
              Vous pouvez maintenant passer à l'étape suivante.
            </p>
          </div>
          
          <Button
            type="button"
            onClick={() => onVerificationComplete()}
            className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
          >
            Continuer vers les informations médicales →
          </Button>
        </div>
      ) : (
        // Affichage normal pour la vérification
        <>
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">📧</div>
            <h2 className="text-2xl font-bold text-foreground">
              Vérification de votre email
            </h2>
            <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <p className="mb-3">
                Nous avons envoyé un code de vérification à <strong>{formData.email}</strong>. 
                Veuillez saisir le code reçu pour continuer.
              </p>
              <p className="text-sm">
                Adresse email incorrecte ? 
                <Button
                  type="button"
                  variant="link"
                  onClick={() => onGoToEmailStep(2)}
                  className="h-auto p-0 text-sm font-medium text-blue-600 hover:text-blue-700 underline ml-1"
                >
                  Modifier mon adresse email
                </Button>
              </p>
            </div>
          </div>

          {/* Message de succès ou d'erreur */}
          {verificationMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-green-500 text-xl">✅</div>
                <p className="text-green-800 font-medium">{verificationMessage}</p>
              </div>
            </div>
          )}

          {verificationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="text-red-500 text-xl">⚠️</div>
                <p className="text-red-800">{verificationError}</p>
              </div>
            </div>
          )}

          {/* Formulaire de vérification */}
          <div className="max-w-md mx-auto space-y-6">
            <div className="space-y-2">
              <Label htmlFor="verificationCode" className="text-base font-semibold">
                Code de vérification
              </Label>
              <Input
                id="verificationCode"
                name="verificationCode"
                type="tel"
                inputMode="numeric"
                placeholder="123456"
                value={formData.verificationCode || ''}
                onChange={(e) => handleCodeChange(e.target.value)}
                className={`h-16 text-2xl text-center font-mono tracking-widest ${
                  errors.verificationCode ? 'border-red-500' : ''
                }`}
                maxLength={6}
                pattern="[0-9]{6}"
                aria-describedby={
                  errors.verificationCode 
                    ? "verificationCode-error" 
                    : "verificationCode-help"
                }
                disabled={isLoading}
                title="Saisissez uniquement des chiffres (0-9)"
              />
              <p 
                id="verificationCode-help"
                className="text-sm text-muted-foreground text-center"
              >
                Saisissez uniquement les 6 chiffres (0-9) reçus par email
              </p>
              {errors.verificationCode && (
                <p id="verificationCode-error" className="text-red-600 text-sm font-medium">
                  {errors.verificationCode}
                </p>
              )}
            </div>

            {/* Bouton de vérification */}
            <Button
              type="button"
              onClick={handleVerifyCode}
              disabled={isLoading || !formData.verificationCode || formData.verificationCode.length !== 6}
              className="w-full h-14 text-lg"
            >
              {isLoading ? 'Vérification...' : 'Vérifier le code'}
            </Button>
          </div>
        </>
      )}

      {/* Instructions et actions - uniquement si email pas encore vérifié */}
      {!formData.emailVerified && (
        <>
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-base">Instructions :</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Le code est valide pendant 10 minutes</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Vérifiez votre dossier spam si vous ne recevez pas l'email</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Vous avez 3 tentatives maximum</span>
              </li>
            </ul>

            {/* Renvoyer le code */}
            <div className="pt-4 border-t">
              {countdown > 0 ? (
                <p className="text-sm text-muted-foreground text-center">
                  Vous pourrez demander un nouveau code dans {countdown} seconde{countdown > 1 ? 's' : ''}
                </p>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-3">
                    Vous n'avez pas reçu le code ?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSendVerificationCode}
                    disabled={isSendingCode}
                    className="h-12"
                  >
                    {isSendingCode ? 'Envoi...' : 'Renvoyer le code'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Problème avec la vérification ? 
              <br />
              <strong>Contactez notre support : 01 23 45 67 89</strong>
            </p>
          </div>
        </>
      )}

      {/* Section d'aide pour l'état "déjà vérifié" */}
      {formData.emailVerified && (
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Besoin d'aide ? 
            <br />
            <strong>Support HavRid : 01 23 45 67 89</strong>
          </p>
        </div>
      )}
    </div>
  )
}

export default EmailVerificationStep