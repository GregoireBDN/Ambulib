import { signupSchema, signinSchema, validateFormData } from './validation'

describe('Validation Schemas', () => {
  describe('signupSchema', () => {
    it('should validate correct signup data', () => {
      const validData = {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        password: 'MotDePasse123!',
        age: '65',
        phoneNumber: '+33123456789'
      }

      const result = validateFormData(signupSchema, validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('jean.dupont@example.com')
        expect(result.data.firstName).toBe('Jean')
      }
    })

    it('should reject invalid email', () => {
      const invalidData = {
        firstName: 'Jean',
        lastName: 'Dupont', 
        email: 'email-invalide',
        password: 'MotDePasse123!'
      }

      const result = validateFormData(signupSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.email).toContain('Veuillez saisir une adresse email valide')
      }
    })

    it('should reject weak password', () => {
      const invalidData = {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@example.com',
        password: '123'
      }

      const result = validateFormData(signupSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.password).toBeDefined()
        expect(result.errors.password.length).toBeGreaterThan(0)
      }
    })

    it('should reject password without uppercase letter', () => {
      const invalidData = {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@example.com',
        password: 'motdepasse123!' // pas de majuscule
      }

      const result = validateFormData(signupSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.password).toContain('Le mot de passe doit contenir au moins une majuscule')
      }
    })

    it('should validate optional fields correctly', () => {
      const dataWithOptionals = {
        firstName: 'Marie',
        lastName: 'Martin',
        email: 'marie@example.com',
        password: 'MotDePasse456!',
        age: '70',
        phoneNumber: '+33987654321',
        postalCode: '75001'
      }

      const result = validateFormData(signupSchema, dataWithOptionals)
      expect(result.success).toBe(true)
    })

    it('should reject invalid age', () => {
      const invalidData = {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@example.com', 
        password: 'MotDePasse123!',
        age: '200' // âge invalide
      }

      const result = validateFormData(signupSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.age).toContain('L\'âge doit être un nombre valide entre 0 et 150')
      }
    })

    it('should reject invalid postal code', () => {
      const invalidData = {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean@example.com',
        password: 'MotDePasse123!',
        postalCode: '123' // code postal trop court
      }

      const result = validateFormData(signupSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.postalCode).toContain('Le code postal doit contenir 5 chiffres')
      }
    })
  })

  describe('signinSchema', () => {
    it('should validate correct signin data', () => {
      const validData = {
        email: 'jean.dupont@example.com',
        password: 'MotDePasse123!'
      }

      const result = validateFormData(signinSchema, validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('jean.dupont@example.com')
      }
    })

    it('should reject empty password', () => {
      const invalidData = {
        email: 'jean@example.com',
        password: ''
      }

      const result = validateFormData(signinSchema, invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.errors.password).toContain('Le mot de passe est requis')
      }
    })

    it('should normalize email to lowercase', () => {
      const data = {
        email: 'JEAN.DUPONT@EXAMPLE.COM',
        password: 'MotDePasse123!'
      }

      const result = validateFormData(signinSchema, data)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.email).toBe('jean.dupont@example.com')
      }
    })
  })
})