// Service API pour l'autocomplétion d'adresses françaises
// Utilise l'API Adresse Gouvernementale officielle (gratuite)
/* global fetch */

import * as React from "react"

export interface AddressFeature {
  id: string
  label: string
  street: string
  postalCode: string
  city: string
  coordinates: [number, number]
  properties: {
    id: string
    label: string
    name: string
    postcode: string
    city: string
  }
}

export interface AddressAPIResponse {
  features: Array<{
    properties: {
      id: string
      label: string
      name: string
      postcode: string
      city: string
    }
    geometry: {
      coordinates: [number, number]
    }
  }>
}

/**
 * Recherche d'adresses françaises via l'API officielle
 * @param query - Texte de recherche (minimum 3 caractères)
 * @param limit - Nombre maximum de résultats (défaut: 5)
 * @returns Promise<AddressFeature[]>
 */
export const searchAddresses = async (
  query: string,
  limit: number = 5
): Promise<AddressFeature[]> => {
  // Validation de base
  if (!query || query.length < 3) {
    return []
  }

  // Nettoyage de la requête
  const cleanQuery = query.trim()

  try {
    // Appel à l'API Adresse Gouvernementale officielle
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(cleanQuery)}&limit=${limit}&autocomplete=1`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      console.warn(`API Adresse Error: ${response.status} - Retour à la saisie manuelle`)
      // Retourner tableau vide plutôt que throw pour éviter de casser l'interface
      return []
    }

    const data: AddressAPIResponse = await response.json()

    // Transformation des données pour notre interface
    return data.features.map(feature => ({
      id: feature.properties.id,
      label: feature.properties.label,
      street: feature.properties.name || feature.properties.label.split(',')[0],
      postalCode: feature.properties.postcode,
      city: feature.properties.city,
      coordinates: feature.geometry.coordinates,
      properties: feature.properties
    }))

  } catch (error) {
    console.error('Erreur lors de la recherche d\'adresses:', error)
    
    // En cas d'erreur réseau, retourner un tableau vide
    // plutôt que de faire planter le composant
    return []
  }
}

/**
 * Hook de debouncing pour limiter les appels API
 * @param value - Valeur à debouncer
 * @param delay - Délai en millisecondes (défaut: 300ms)
 */
export const useDebounce = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}