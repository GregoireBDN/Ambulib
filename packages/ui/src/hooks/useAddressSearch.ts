import * as React from "react"
import { searchAddresses, useDebounce, type AddressFeature } from "../utils/address-api"
import type { ComboboxItem } from "../components/ui/combobox"

export interface AddressSearchResult {
  addresses: ComboboxItem[]
  addressesData: AddressFeature[]
  isLoading: boolean
  error: string | null
}

/**
 * Hook pour la recherche d'adresses avec transformation en format ComboboxItem
 * @param query - Terme de recherche
 * @param options - Options de configuration
 * @returns Résultats de recherche formatés pour le Combobox
 */
export const useAddressSearch = (
  query: string,
  options: {
    debounceDelay?: number
    limit?: number
  } = {}
): AddressSearchResult => {
  const { debounceDelay = 300, limit = 5 } = options
  
  // États internes
  const [addressesData, setAddressesData] = React.useState<AddressFeature[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  
  // Debounce de la recherche
  const debouncedQuery = useDebounce(query, debounceDelay)
  
  // Recherche d'adresses
  React.useEffect(() => {
    const searchAddressesAsync = async () => {
      // Ne pas rechercher si query trop courte, mais garder les données existantes
      if (debouncedQuery.length < 3) {
        setIsLoading(false)
        setError(null)
        // NE PAS vider addressesData pour préserver la sélection
        return
      }
      
      setIsLoading(true)
      setError(null)
      
      try {
        const results = await searchAddresses(debouncedQuery, limit)
        setAddressesData(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors de la recherche d\'adresses')
        setAddressesData([])
      } finally {
        setIsLoading(false)
      }
    }
    
    searchAddressesAsync()
  }, [debouncedQuery, limit])
  
  // Transformation des données pour le Combobox
  const addresses: ComboboxItem[] = React.useMemo(() => {
    return addressesData.map(address => ({
      value: address.id,
      label: address.label,
      // On peut ajouter des props spécifiques si nécessaire
      disabled: false
    }))
  }, [addressesData])
  
  return {
    addresses,
    addressesData, // Données complètes pour le callback onSelect
    isLoading,
    error
  }
}

/**
 * Utilitaire pour retrouver les données complètes d'une adresse par son ID
 * @param addressId - ID de l'adresse sélectionnée 
 * @param addressesData - Tableau des données d'adresses
 * @returns AddressFeature | null
 */
export const findAddressByValue = (
  addressId: string, 
  addressesData: AddressFeature[]
): AddressFeature | null => {
  return addressesData.find(address => address.id === addressId) || null
}