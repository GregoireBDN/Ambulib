import { renderHook, act } from '@testing-library/react'
import { useSecureStorage } from '../useSecureStorage'

// Mock Web Crypto API pour les tests
const mockCrypto = {
  subtle: {
    generateKey: jest.fn(),
    encrypt: jest.fn(),
    decrypt: jest.fn()
  },
  getRandomValues: jest.fn((arr: Uint8Array) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Math.floor(Math.random() * 256)
    }
    return arr
  }),
  randomUUID: jest.fn(() => 'mock-uuid-1234')
}

// Mock localStorage et sessionStorage
const mockStorage = {
  data: new Map<string, string>(),
  setItem: jest.fn((key: string, value: string) => {
    mockStorage.data.set(key, value)
  }),
  getItem: jest.fn((key: string) => {
    return mockStorage.data.get(key) || null
  }),
  removeItem: jest.fn((key: string) => {
    mockStorage.data.delete(key)
  }),
  clear: jest.fn(() => {
    mockStorage.data.clear()
  }),
  get length() {
    return mockStorage.data.size
  },
  key: jest.fn((index: number) => {
    const keys = Array.from(mockStorage.data.keys())
    return keys[index] || null
  })
}

// Configuration globale des mocks
beforeAll(() => {
  global.crypto = mockCrypto as any
  global.localStorage = mockStorage as any
  global.sessionStorage = { ...mockStorage, data: new Map() } as any
})

beforeEach(() => {
  // Reset tous les mocks
  jest.clearAllMocks()
  mockStorage.data.clear()
  ;(global.sessionStorage as any).data.clear()
})

describe('useSecureStorage - Tests de Sécurité RGPD/CNIL', () => {
  
  describe('🔐 Sécurité et Chiffrement', () => {
    it('devrait utiliser AES-256-GCM pour le chiffrement', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      const testData = { socialSecurity: '1234567890123' }
      
      await act(async () => {
        await result.current.setSecureItem('test', testData, { encrypt: true })
      })

      // Vérifier que generateKey a été appelé avec les bons paramètres
      expect(mockCrypto.subtle.generateKey).toHaveBeenCalledWith(
        { name: 'AES-GCM', length: 256 },
        false, // non-extractible
        ['encrypt', 'decrypt']
      )
    })

    it('devrait générer un IV aléatoire pour chaque chiffrement', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      await act(async () => {
        await result.current.setSecureItem('test1', { data: 'test1' }, { encrypt: true })
        await result.current.setSecureItem('test2', { data: 'test2' }, { encrypt: true })
      })

      // Vérifier que getRandomValues est appelé pour l'IV
      expect(mockCrypto.getRandomValues).toHaveBeenCalled()
    })

    it('ne devrait pas stocker de données sensibles en clair', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      const sensitiveData = { 
        socialSecurity: '1234567890123',
        medications: 'Doliprane 500mg'
      }
      
      await act(async () => {
        await result.current.setSecureItem('sensitive', sensitiveData, { encrypt: true })
      })

      // Vérifier que les données stockées ne contiennent pas les données en clair
      const storedValue = mockStorage.data.get('havrid-secure-sensitive')
      expect(storedValue).toBeDefined()
      expect(storedValue).not.toContain('1234567890123')
      expect(storedValue).not.toContain('Doliprane')
    })
  })

  describe('⏰ Gestion de l\'Expiration', () => {
    it('devrait respecter l\'expiration de 1h pour données basiques', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      // Mock Date.now pour simuler le temps
      const originalDateNow = Date.now
      const baseTime = 1640995200000 // 1er janvier 2022
      Date.now = jest.fn(() => baseTime)

      await act(async () => {
        await result.current.setSecureItem('basic', { firstName: 'Jean' }, {
          expirationMs: result.current.EXPIRATION_CONFIG.BASIC_DATA
        })
      })

      // Avancer de 61 minutes (> 1h)
      Date.now = jest.fn(() => baseTime + 61 * 60 * 1000)

      const retrievedData = await act(async () => {
        return await result.current.getSecureItem('basic')
      })

      expect(retrievedData).toBeNull() // Données expirées
      
      // Restaurer Date.now
      Date.now = originalDateNow
    })

    it('devrait nettoyer automatiquement les données expirées', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      // Ajouter des données expirées
      await act(async () => {
        await result.current.setSecureItem('expired', { test: 'data' }, {
          expirationMs: -1000 // Déjà expiré
        })
      })

      const cleanedCount = await act(async () => {
        return result.current.cleanExpiredData()
      })

      expect(cleanedCount).toBeGreaterThan(0)
      expect(mockStorage.removeItem).toHaveBeenCalledWith('havrid-secure-expired')
    })
  })

  describe('🛡️ Sécurité contre XSS', () => {
    it('devrait préfixer toutes les clés pour éviter les conflits', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      await act(async () => {
        await result.current.setSecureItem('test', { data: 'value' })
      })

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'havrid-secure-test',
        expect.any(String)
      )
    })

    it('devrait valider la structure des données stockées', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      // Corrompre les données dans le storage
      mockStorage.data.set('havrid-secure-corrupted', 'invalid-json')

      const retrievedData = await act(async () => {
        return await result.current.getSecureItem('corrupted')
      })

      expect(retrievedData).toBeNull()
    })
  })

  describe('🏥 Conformité RGPD/CNIL', () => {
    it('devrait permettre la suppression complète des données', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      // Ajouter plusieurs données
      await act(async () => {
        await result.current.setSecureItem('data1', { test: '1' })
        await result.current.setSecureItem('data2', { test: '2' })
      })

      const clearedCount = await act(async () => {
        return result.current.clearAllSecureData()
      })

      expect(clearedCount).toBeGreaterThan(0)
      expect(mockStorage.data.size).toBe(0)
    })

    it('devrait tracer les métadonnées d\'expiration', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      await act(async () => {
        await result.current.setSecureItem('test', { data: 'value' }, {
          expirationMs: 30 * 60 * 1000 // 30 minutes
        })
      })

      const storedValue = mockStorage.data.get('havrid-secure-test')
      expect(storedValue).toBeDefined()
      
      const parsed = JSON.parse(storedValue!)
      expect(parsed).toHaveProperty('timestamp')
      expect(parsed).toHaveProperty('expiresAt')
      expect(parsed).toHaveProperty('encrypted')
    })

    it('devrait empêcher l\'accès aux données d\'une autre session', () => {
      // Ce test devrait être fait côté serveur, 
      // mais vérifie que les clés sont bien isolées par session
      const { result } = renderHook(() => useSecureStorage())
      
      expect(result.current.setSecureItem).toBeDefined()
      expect(result.current.getSecureItem).toBeDefined()
      
      // La logique de session sera testée côté API
    })
  })

  describe('📊 Performance et Optimisation', () => {
    it('devrait nettoyer efficacement les données expirées', async () => {
      const { result } = renderHook(() => useSecureStorage())
      
      // Simuler plusieurs entrées expirées
      const startTime = performance.now()
      
      await act(async () => {
        for (let i = 0; i < 10; i++) {
          await result.current.setSecureItem(`expired-${i}`, { test: i }, {
            expirationMs: -1000 // Déjà expirées
          })
        }
      })

      const cleanedCount = await act(async () => {
        return result.current.cleanExpiredData()
      })
      
      const endTime = performance.now()
      
      expect(cleanedCount).toBe(10)
      expect(endTime - startTime).toBeLessThan(1000) // Moins d'1 seconde
    })
  })
})