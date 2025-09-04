import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { AddressCombobox } from "./address-combobox";
import { Label } from "./label";
import type { AddressFeature } from "../../utils/address-api";

const meta: Meta<typeof AddressCombobox> = {
  title: "UI/AddressCombobox",
  component: AddressCombobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Composant d'autocomplétion d'adresses utilisant l'API gouvernementale française. Basé sur le pattern Combobox avec recherche en temps réel et sélection persistante."
      }
    }
  },
  tags: ["autodocs"],
  argTypes: {
    onAddressSelect: {
      description: "Callback appelé lors de la sélection d'une adresse",
      action: "address-selected"
    },
    placeholder: {
      description: "Texte d'invite affiché quand aucune adresse n'est sélectionnée",
      control: "text"
    },
    searchLimit: {
      description: "Nombre maximum de résultats de recherche",
      control: { type: "number", min: 1, max: 10 }
    },
    debounceDelay: {
      description: "Délai en millisecondes avant de déclencher la recherche",
      control: { type: "number", min: 100, max: 1000, step: 100 }
    },
    disabled: {
      description: "Désactive le composant",
      control: "boolean"
    },
    required: {
      description: "Marque le champ comme obligatoire",
      control: "boolean"
    },
    error: {
      description: "Message d'erreur à afficher",
      control: "text"
    }
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story de base
export const Default: Story = {
  args: {
    placeholder: "Rechercher une adresse française...",
    searchLimit: 5,
    debounceDelay: 300
  },
  parameters: {
    docs: {
      description: {
        story: "Utilisation de base du composant AddressCombobox. Tapez au moins 3 caractères pour voir les suggestions d'adresses."
      }
    }
  }
};

// Story interactive avec affichage de la sélection
export const Interactive: Story = {
  render: (args) => {
    const [selectedAddress, setSelectedAddress] = React.useState<AddressFeature | null>(null);
    
    return (
      <div className="space-y-4 w-[400px]">
        <AddressCombobox
          {...args}
          onAddressSelect={setSelectedAddress}
        />
        
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Adresse sélectionnée :</h3>
          {selectedAddress ? (
            <div className="space-y-1 text-sm">
              <p><strong>Label :</strong> {selectedAddress.label}</p>
              <p><strong>Rue :</strong> {selectedAddress.street}</p>
              <p><strong>Code postal :</strong> {selectedAddress.postalCode}</p>
              <p><strong>Ville :</strong> {selectedAddress.city}</p>
              <p><strong>Coordonnées :</strong> {selectedAddress.coordinates.join(', ')}</p>
              <p><strong>ID :</strong> {selectedAddress.id}</p>
            </div>
          ) : (
            <p className="text-muted-foreground">Aucune adresse sélectionnée</p>
          )}
        </div>
      </div>
    );
  },
  args: {
    placeholder: "Rechercher une adresse française...",
    searchLimit: 5,
    debounceDelay: 300
  },
  parameters: {
    docs: {
      description: {
        story: "Story interactive pour tester la sélection d'adresse avec affichage des détails. La sélection persiste visuellement et fonctionnellement."
      }
    }
  }
};

// Story avec label
export const WithLabel: Story = {
  render: () => {
    const [selectedAddress, setSelectedAddress] = React.useState<AddressFeature | null>(null);
    
    return (
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="address-input">Adresse de livraison</Label>
        <AddressCombobox
          id="address-input"
          placeholder="Ex: 15 Rue Rivoli, Paris"
          onAddressSelect={setSelectedAddress}
        />
        <p className="text-xs text-muted-foreground">
          Adresse complète avec numéro de rue
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Utilisation du composant avec un label associé. Tapez votre adresse pour voir l'autocomplétion en action."
      }
    }
  }
};

// Story avec état d'erreur
export const WithError: Story = {
  render: () => {
    const [selectedAddress, setSelectedAddress] = React.useState<AddressFeature | null>(null);
    const [error, setError] = React.useState("Veuillez sélectionner une adresse valide dans la liste");
    
    const handleAddressSelect = (address: AddressFeature | null) => {
      setSelectedAddress(address);
      if (address) {
        setError("");
      } else {
        setError("Veuillez sélectionner une adresse valide dans la liste");
      }
    };
    
    return (
      <div className="w-[400px] space-y-4">
        <AddressCombobox
          placeholder="Rechercher une adresse..."
          error={error}
          onAddressSelect={handleAddressSelect}
        />
        <p className="text-sm text-muted-foreground">
          État d'erreur avec message personnalisé
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Composant en état d'erreur avec message d'erreur personnalisé."
      }
    }
  }
};

// Story avec champ obligatoire
export const Required: Story = {
  render: () => {
    const [selectedAddress, setSelectedAddress] = React.useState<AddressFeature | null>(null);
    
    return (
      <div className="w-[400px] space-y-4">
        <Label htmlFor="required-address">Adresse obligatoire *</Label>
        <AddressCombobox
          id="required-address"
          placeholder="Cette adresse est obligatoire"
          required={true}
          onAddressSelect={setSelectedAddress}
        />
        <p className="text-xs text-muted-foreground">
          Cette adresse doit être renseignée et ne devrait pas être utilisée sans validation côté formulaire.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Composant marqué comme requis avec indication visuelle."
      }
    }
  }
};

// Story désactivée
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Composant désactivé"
  },
  parameters: {
    docs: {
      description: {
        story: "Composant en état désactivé. Aucune interaction n'est possible et aucun callback ne devrait être appelé."
      }
    }
  }
};

// Story avec contexte médical
export const MedicalContext: Story = {
  render: () => {
    const [selectedAddress, setSelectedAddress] = React.useState<AddressFeature | null>(null);
    
    return (
      <div className="w-[500px] space-y-4">
        <div className="border border-primary/20 rounded-lg p-4">
          <h3 className="font-medium text-primary mb-3">🚑 Informations médicale</h3>
          <div className="space-y-3">
            <div>
              <Label htmlFor="pickup-address">Adresse exacte de prise en charge *</Label>
              <AddressCombobox
                id="pickup-address"
                placeholder="Adresse d'urgence précise"
                required={true}
                searchLimit={3}
                onAddressSelect={setSelectedAddress}
              />
            </div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Contexte médical avec terminologie adaptée au secteur ambulancier
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Utilisation dans un contexte médical avec interface et terminologie spécialisées."
      }
    }
  }
};

// Story avec paramètres de recherche personnalisés
export const CustomSearchParams: Story = {
  render: () => {
    const [selectedAddress, setSelectedAddress] = React.useState<AddressFeature | null>(null);
    
    return (
      <div className="w-[400px] space-y-4">
        <Label htmlFor="custom-search">Recherche complète (10 résultats, 100ms délai)</Label>
        <AddressCombobox
          id="custom-search"
          placeholder="Recherche rapide et complète"
          searchLimit={10}
          debounceDelay={100}
          onAddressSelect={setSelectedAddress}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Démonstration avec paramètres de recherche personnalisés : plus de résultats et délai réduit."
      }
    }
  }
};

// Story de démonstration complète
export const Demo: Story = {
  render: () => {
    const [pickupAddress, setPickupAddress] = React.useState<AddressFeature | null>(null);
    const [deliveryAddress, setDeliveryAddress] = React.useState<AddressFeature | null>(null);
    
    return (
      <div className="w-[600px] space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold mb-2">🚑 Réservation Ambulance</h2>
          <p className="text-muted-foreground">
            Démonstration complète avec deux champs d'adresse
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickup">Adresse de départ *</Label>
            <AddressCombobox
              id="pickup"
              placeholder="Tapez l'adresse française..."
              required={true}
              onAddressSelect={setPickupAddress}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="delivery">Adresse d'arrivée *</Label>
            <AddressCombobox
              id="delivery"
              placeholder="Destination..."
              required={true}
              onAddressSelect={setDeliveryAddress}
            />
          </div>
        </div>
        
        {(pickupAddress || deliveryAddress) && (
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-medium">Résumé du trajet :</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-600">📍 Départ :</p>
                <p>{pickupAddress?.label || "Non défini"}</p>
              </div>
              <div>
                <p className="font-medium text-blue-600">🏥 Arrivée :</p>
                <p>{deliveryAddress?.label || "Non défini"}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-xs text-muted-foreground">
          <p>💡 Essayez avec de vraies adresses française pour voir l'autocomplétion en action</p>
          <p>Exemples : "15 rue rivoli paris", "place bellecour lyon", "vieux port marseille"</p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Démonstration complète avec plusieurs champs d'adresse dans un contexte de réservation d'ambulance. Utilise l'API réelle pour l'affichage des résultats."
      }
    }
  }
};