import { Injectable, Logger } from '@nestjs/common'
import { SensitiveFormDataDto } from './dto/form-draft.dto'

// Interface pour les brouillons stockés en mémoire (sécurisé)
interface FormDraft {
  id: string
  data: SensitiveFormDataDto
  sessionId: string
  createdAt: Date
  expiresAt: Date
}

@Injectable()
export class FormDraftService {
  private readonly logger = new Logger(FormDraftService.name)
  
  // Stockage en mémoire sécurisé (expire automatiquement)
  private readonly drafts = new Map<string, FormDraft>()
  
  // Configuration d'expiration pour données médicales (30 minutes)
  private readonly EXPIRATION_MS = 30 * 60 * 1000
  
  constructor() {
    // Nettoyer automatiquement les brouillons expirés toutes les 5 minutes
    setInterval(() => this.cleanExpiredDrafts(), 5 * 60 * 1000)
  }

  /**
   * Sauvegarder des données sensibles temporairement
   * Conforme CNIL/RGPD - stockage temporaire sécurisé
   */
  async saveDraft(
    sessionId: string, 
    sensitiveData: SensitiveFormDataDto
  ): Promise<{ draftId: string; expiresAt: Date }> {
    // Nettoyer les anciens brouillons de cette session
    this.cleanDraftsBySession(sessionId)
    
    const draftId = this.generateSecureDraftId()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + this.EXPIRATION_MS)

    const draft: FormDraft = {
      id: draftId,
      data: sensitiveData,
      sessionId,
      createdAt: now,
      expiresAt
    }

    this.drafts.set(draftId, draft)
    
    this.logger.log(`Brouillon sauvegardé: ${draftId} (expire: ${expiresAt.toISOString()})`)
    
    return { draftId, expiresAt }
  }

  /**
   * Récupérer un brouillon de données sensibles
   */
  async getDraft(
    draftId: string, 
    sessionId: string
  ): Promise<SensitiveFormDataDto | null> {
    const draft = this.drafts.get(draftId)
    
    if (!draft) {
      return null
    }

    // Vérifier l'expiration
    if (new Date() > draft.expiresAt) {
      this.drafts.delete(draftId)
      this.logger.warn(`Brouillon expiré supprimé: ${draftId}`)
      return null
    }

    // Vérifier que la session correspond (sécurité)
    if (draft.sessionId !== sessionId) {
      this.logger.warn(`Tentative d'accès non autorisé au brouillon: ${draftId}`)
      return null
    }

    return draft.data
  }

  /**
   * Supprimer un brouillon spécifique
   */
  async deleteDraft(draftId: string, sessionId: string): Promise<boolean> {
    const draft = this.drafts.get(draftId)
    
    if (!draft || draft.sessionId !== sessionId) {
      return false
    }

    this.drafts.delete(draftId)
    this.logger.log(`Brouillon supprimé: ${draftId}`)
    return true
  }

  /**
   * Nettoyer les brouillons expirés (maintenance automatique)
   */
  private cleanExpiredDrafts(): void {
    const now = new Date()
    let cleanedCount = 0

    for (const [draftId, draft] of this.drafts.entries()) {
      if (now > draft.expiresAt) {
        this.drafts.delete(draftId)
        cleanedCount++
      }
    }

    if (cleanedCount > 0) {
      this.logger.log(`Nettoyage automatique: ${cleanedCount} brouillons expirés supprimés`)
    }
  }

  /**
   * Nettoyer tous les brouillons d'une session spécifique
   */
  private cleanDraftsBySession(sessionId: string): void {
    let cleanedCount = 0

    for (const [draftId, draft] of this.drafts.entries()) {
      if (draft.sessionId === sessionId) {
        this.drafts.delete(draftId)
        cleanedCount++
      }
    }

    if (cleanedCount > 0) {
      this.logger.log(`Session ${sessionId}: ${cleanedCount} anciens brouillons supprimés`)
    }
  }

  /**
   * Générer un ID de brouillon sécurisé et unique
   */
  private generateSecureDraftId(): string {
    // Utiliser crypto.randomUUID() pour ID sécurisé
    return `draft_${crypto.randomUUID()}`
  }

  /**
   * Obtenir des statistiques sur les brouillons (pour monitoring)
   */
  getStats(): { total: number; expired: number } {
    const now = new Date()
    let expired = 0

    for (const draft of this.drafts.values()) {
      if (now > draft.expiresAt) {
        expired++
      }
    }

    return {
      total: this.drafts.size,
      expired
    }
  }
}