// Types de données pour les appels API - synchronisés avec NestJS DTOs

import { AuthProviderType, Role } from './auth.types'

export interface SignupDto {
  firstName: string
  lastName: string
  email: string
  password: string
  age?: string
  phoneNumber?: string
  address?: string
  city?: string
  postalCode?: string
  authProvider?: AuthProviderType
  isProfileComplete?: boolean
}

export interface SigninDto {
  email: string
  password: string
}

export interface RefreshTokenDto {
  refreshToken: string
}

export interface CompleteProfileDto {
  age?: string
  phoneNumber?: string
  address?: string
  city?: string
  postalCode?: string
}

export interface CreateCompanyUserDto {
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
  phoneNumber?: string
}

// Types de réponses d'erreur de l'API
export interface ApiErrorResponse {
  message: string | string[]
  error: string
  statusCode: number
}

// Types pour les filtres et pagination
export interface PaginationQuery {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'ASC' | 'DESC'
}

// Types pour les opérations sur les entreprises (multi-tenant)
export interface CompanyDto {
  id: number
  name: string
  address?: string
  phoneNumber?: string
  email?: string
  status: 'PENDING' | 'APPROVED' | 'SUSPENDED' | 'REJECTED'
  createdAt: Date
  updatedAt: Date
}

export interface CreateCompanyDto {
  name: string
  address?: string
  phoneNumber?: string
  email?: string
}