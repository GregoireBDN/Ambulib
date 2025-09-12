"use client";

import * as React from "react";
import { Check, MapPin, Loader2, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useAddressSearch, findAddressByValue } from "../../hooks/useAddressSearch";
import type { AddressFeature } from "../../utils/address-api";

export interface AddressComboboxProps {
  onAddressSelect: (address: AddressFeature | null) => void;
  placeholder?: string;
  searchLimit?: number;
  debounceDelay?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  required?: boolean;
  error?: string;
  value?: string;
  initialAddressData?: AddressFeature | null;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "true" | "false";
}

export function AddressCombobox({
  onAddressSelect,
  value = "",
  initialAddressData = null,
  placeholder = "Rechercher une adresse...",
  searchLimit = 5,
  debounceDelay = 300,
  disabled = false,
  className,
  id,
  required = false,
  error,
  ...props
}: AddressComboboxProps) {
  // États du composant
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value);
  const [selectedAddressData, setSelectedAddressData] = React.useState<AddressFeature | null>(initialAddressData);
  const [inputValue, setInputValue] = React.useState("");
  
  // References for stable comparison
  const prevValueRef = React.useRef(value);
  const isInitializedRef = React.useRef(false);
  
  
  // Hook de recherche d'adresses
  const { addresses, addressesData, isLoading, error: searchError } = useAddressSearch(
    inputValue,
    { debounceDelay, limit: searchLimit }
  );
  
  // Synchronisation avec la prop value externe (mode contrôlé amélioré)
  // Utilise un pattern similaire à useUpdateEffect pour éviter les rendus initiaux
  React.useEffect(() => {
    // Skip initial render comme useUpdateEffect
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      // Si on a des données initiales et une valeur, les synchroniser
      if (initialAddressData && value) {
        setSelectedValue(value);
        setSelectedAddressData(initialAddressData);
        setInputValue("");
      }
      return;
    }
    
    // Skip si la valeur n'a pas changé (évite les cycles infinis)
    if (prevValueRef.current === value) {
      return;
    }
    
    prevValueRef.current = value;
    
    // Synchroniser uniquement si la valeur externe diffère de l'état interne
    if (value !== selectedValue) {
      setSelectedValue(value);
      
      if (!value) {
        // Valeur vide - réinitialiser complètement
        setSelectedAddressData(null);
        setInputValue("");
      } else {
        // Si on a des données initiales qui correspondent, les utiliser
        if (initialAddressData && (initialAddressData.street === value || initialAddressData.label === value)) {
          setSelectedAddressData(initialAddressData);
          setInputValue("");
        } else {
          // Reconstituer l'objet adresse depuis la valeur string
          const reconstitutedAddress: AddressFeature = {
            id: value,
            label: value,
            street: value,
            postalCode: extractPostalCode(value) || "",
            city: extractCity(value) || "",
            coordinates: [0, 0],
            properties: {
              id: value,
              label: value,
              name: value,
              postcode: extractPostalCode(value) || "",
              city: extractCity(value) || ""
            }
          };
          setSelectedAddressData(reconstitutedAddress);
          setInputValue("");
        }
      }
    }
  }, [value, initialAddressData]); // Supprimé selectedValue et selectedAddressData des dépendances
  
  // Sélection d'adresse
  const handleSelect = (addressId: string) => {
    const currentValue = selectedValue === addressId ? "" : addressId;
    
    setSelectedValue(currentValue);
    setOpen(false);
    
    if (currentValue) {
      const selectedAddress = findAddressByValue(addressId, addressesData);
      
      if (selectedAddress) {
        setSelectedAddressData(selectedAddress);
        // Vider l'input de recherche pour éviter les conflits
        setInputValue("");
        onAddressSelect(selectedAddress);
      }
    } else {
      setSelectedAddressData(null);
      setInputValue("");
      onAddressSelect(null);
    }
  };
  
  // Gestion du changement d'input pour la recherche
  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    
    // Ouvrir automatiquement pour la recherche
    if (newValue.length >= 3 && !open) {
      setOpen(true);
    }
  };
  
  // Classes CSS avec gestion d'erreur
  const buttonClassName = cn(
    "w-full justify-between text-left font-normal h-14 text-lg border-input",
    !selectedAddressData && "text-muted-foreground",
    error && "border-red-500 focus-visible:ring-red-500",
    selectedAddressData && "border-green-500 bg-green-50 text-green-900",
    className
  );
  
  // Fonctions utilitaires pour extraire code postal et ville
  function extractPostalCode(address: string): string | null {
    const match = address.match(/(\d{5})/);
    return match ? match[1] : null;
  }
  
  function extractCity(address: string): string | null {
    // Essayer d'extraire la ville après le code postal
    const match = address.match(/\d{5}\s+([^,]+)/);
    if (match) return match[1].trim();
    
    // Fallback: prendre la partie après la dernière virgule
    const parts = address.split(',');
    if (parts.length > 1) {
      const lastPart = parts[parts.length - 1].trim();
      // Enlever le code postal s'il est présent
      return lastPart.replace(/^\d{5}\s*/, '').trim() || null;
    }
    
    return null;
  }
  
  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={buttonClassName}
            id={id}
            {...props}
          >
            <div className="flex items-center flex-1">
              <MapPin
                className={cn(
                  "mr-2 h-4 w-4 shrink-0",
                  selectedAddressData ? "text-green-600" : "opacity-50"
                )}
              />
              <span className="truncate">
                {selectedAddressData ? selectedAddressData.label : placeholder}
              </span>
            </div>
            <div className="flex items-center ml-2">
              {selectedAddressData && (
                <span className="text-xs text-green-600 font-medium mr-2">
                  ✓ Sélectionnée
                </span>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start" sideOffset={4}>
          <Command shouldFilter={false} className="address-combobox">
            <CommandInput
              placeholder="Tapez votre adresse..."
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandList>
              {isLoading && (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2 text-sm text-muted-foreground">
                    Recherche en cours...
                  </span>
                </div>
              )}
              
              {!isLoading && inputValue.length >= 3 && addresses.length === 0 && (
                <CommandEmpty>
                  {searchError ? "Erreur lors de la recherche" : `Aucune adresse trouvée pour "${inputValue}"`}
                </CommandEmpty>
              )}
              
              {!isLoading && inputValue.length < 3 && (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  Tapez au moins 3 caractères pour rechercher
                </div>
              )}
              
              {!isLoading && addresses.length > 0 && (
                <CommandGroup>
                  {addresses.map((address) => {
                    const addressData = findAddressByValue(address.value, addressesData);
                    return (
                      <CommandItem
                        key={address.value}
                        value={address.value}
                        onSelect={handleSelect}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedValue === address.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {addressData?.street || address.label.split(',')[0]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {addressData?.postalCode} {addressData?.city}
                          </span>
                        </div>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      {/* Message d'erreur */}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      
      {/* Indication si requis */}
      {required && !selectedValue && !error && (
        <p className="mt-1 text-xs text-muted-foreground">
          * Champ obligatoire
        </p>
      )}
    </div>
  );
}