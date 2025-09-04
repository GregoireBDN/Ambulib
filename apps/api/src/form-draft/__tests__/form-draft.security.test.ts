import { Test, TestingModule } from '@nestjs/testing'
import { FormDraftService } from '../form-draft.service'
import { SensitiveFormDataDto } from '../dto/form-draft.dto'

describe('FormDraftService - Tests de Sécurité CNIL/RGPD', () => {
  let service: FormDraftService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDraftService],
    }).compile()

    service = module.get<FormDraftService>(FormDraftService)
  })

  describe('🔒 Isolation par Session', () => {
    it('ne devrait pas permettre l\'accès aux données d\'une autre session', async () => {
      const sessionA = 'session-a-123'
      const sessionB = 'session-b-456'
      
      const sensitiveData: SensitiveFormDataDto = {
        socialSecurity: '1234567890123',
        emergencyContact: {
          firstName: 'Jean',
          lastName: 'Dupont',
          phone: '0123456789',
          relation: 'époux'
        }
      }

      // Sauvegarder avec session A
      const { draftId } = await service.saveDraft(sessionA, sensitiveData)

      // Tenter de récupérer avec session B
      const result = await service.getDraft(draftId, sessionB)

      expect(result).toBeNull() // Accès refusé
    })

    it('devrait permettre l\'accès avec la bonne session', async () => {
      const sessionId = 'valid-session-123'
      
      const sensitiveData: SensitiveFormDataDto = {
        allergies: 'Pénicilline, arachides',
        medications: 'Doliprane 500mg 3x/jour',
        emergencyContact: {
          firstName: 'Marie',
          lastName: 'Martin',
          phone: '0123456789',
          relation: 'fille'
        }
      }

      const { draftId } = await service.saveDraft(sessionId, sensitiveData)
      const result = await service.getDraft(draftId, sessionId)

      expect(result).toEqual(sensitiveData)
    })
  })

  describe('⏰ Expiration Automatique (30 minutes)', () => {
    it('devrait supprimer automatiquement les données expirées', async () => {
      const sessionId = 'test-session'
      const sensitiveData: SensitiveFormDataDto = {
        socialSecurity: '1234567890123',
        emergencyContact: {
          firstName: 'Test',
          lastName: 'User',
          phone: '0123456789',
          relation: 'test'
        }
      }

      // Mock Date pour simuler expiration
      const originalDate = Date
      const mockDate = jest.fn()
      
      // Sauvegarder maintenant
      global.Date = jest.fn(() => new originalDate(2024, 0, 1, 10, 0, 0)) as any
      global.Date.now = jest.fn(() => new originalDate(2024, 0, 1, 10, 0, 0).getTime())
      
      const { draftId } = await service.saveDraft(sessionId, sensitiveData)

      // Avancer de 31 minutes (> 30 min d'expiration)
      global.Date = jest.fn(() => new originalDate(2024, 0, 1, 10, 31, 0)) as any
      global.Date.now = jest.fn(() => new originalDate(2024, 0, 1, 10, 31, 0).getTime())

      const result = await service.getDraft(draftId, sessionId)

      expect(result).toBeNull() // Données automatiquement supprimées
      
      // Restaurer Date
      global.Date = originalDate
    })

    it('devrait nettoyer les anciens brouillons d\'une même session', async () => {
      const sessionId = 'cleanup-session'
      
      const data1: SensitiveFormDataDto = {
        allergies: 'Test 1',
        emergencyContact: {
          firstName: 'Test1',
          lastName: 'User1',
          phone: '0123456789',
          relation: 'test'
        }
      }
      
      const data2: SensitiveFormDataDto = {
        allergies: 'Test 2',
        emergencyContact: {
          firstName: 'Test2',
          lastName: 'User2',
          phone: '0123456789',
          relation: 'test'
        }
      }

      // Sauvegarder deux brouillons pour la même session
      const { draftId: draft1 } = await service.saveDraft(sessionId, data1)
      const { draftId: draft2 } = await service.saveDraft(sessionId, data2)

      // Le premier brouillon devrait être nettoyé automatiquement
      const result1 = await service.getDraft(draft1, sessionId)
      const result2 = await service.getDraft(draft2, sessionId)

      expect(result1).toBeNull() // Ancien brouillon supprimé
      expect(result2).toEqual(data2) // Nouveau brouillon disponible
    })
  })

  describe('🔐 Génération d\'IDs Sécurisés', () => {
    it('devrait générer des IDs uniques et imprévisibles', async () => {
      const sessionId = 'unique-test-session'
      const testData: SensitiveFormDataDto = {
        emergencyContact: {
          firstName: 'Test',
          lastName: 'User',
          phone: '0123456789',
          relation: 'test'
        }
      }

      // Générer plusieurs IDs
      const draft1 = await service.saveDraft(sessionId + '1', testData)
      const draft2 = await service.saveDraft(sessionId + '2', testData)
      const draft3 = await service.saveDraft(sessionId + '3', testData)

      // Vérifier l'unicité
      const ids = [draft1.draftId, draft2.draftId, draft3.draftId]
      const uniqueIds = new Set(ids)
      
      expect(uniqueIds.size).toBe(3) // Tous différents
      
      // Vérifier le format sécurisé
      ids.forEach(id => {
        expect(id).toMatch(/^draft_[a-f0-9-]{36}$/) // Format UUID
      })
    })
  })

  describe('📈 Monitoring et Statistiques', () => {
    it('devrait fournir des statistiques de monitoring', async () => {
      const sessionId = 'stats-session'
      const testData: SensitiveFormDataDto = {
        emergencyContact: {
          firstName: 'Stats',
          lastName: 'Test',
          phone: '0123456789',
          relation: 'test'
        }
      }

      // Ajouter quelques brouillons
      await service.saveDraft(sessionId + '1', testData)
      await service.saveDraft(sessionId + '2', testData)

      const stats = service.getStats()

      expect(stats.total).toBeGreaterThanOrEqual(2)
      expect(stats.expired).toBeGreaterThanOrEqual(0)
      expect(typeof stats.total).toBe('number')
      expect(typeof stats.expired).toBe('number')
    })
  })
})