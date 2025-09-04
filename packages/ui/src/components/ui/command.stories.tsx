import type { Meta, StoryObj } from "@storybook/react"
import { Calendar, File, User, Volume2 } from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
  CommandSeparator,
} from "./command"
import { Button } from "./button"
import { useState } from "react"

const meta: Meta<typeof Command> = {
  title: "UI/Command",
  component: Command,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Interface de commande accessible avec recherche rapide. Utilisé pour les palettes de commandes, recherche de patients/ambulances et navigation rapide dans l'interface médicale.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput placeholder="Rechercher une commande..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Planifier course</span>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Nouveau patient</span>
          </CommandItem>
          <CommandItem>
            <Volume2 className="mr-2 h-4 w-4" />
            <span>Appel d'urgence</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions rapides">
          <CommandItem>
            <File className="mr-2 h-4 w-4" />
            <span>Voir les rapports</span>
            <CommandShortcut>Ctrl+R</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const PatientSearch: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-lg">
      <CommandInput placeholder="Rechercher un patient..." />
      <CommandList>
        <CommandEmpty>Aucun patient trouvé.</CommandEmpty>
        <CommandGroup heading="Patients récents">
          <CommandItem>
            <User className="mr-3 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Marie Dupont</span>
              <span className="text-xs text-muted-foreground">ID: P-12345 • 76 ans</span>
            </div>
            <CommandShortcut>⏺ Actif</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <User className="mr-3 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Jean Martin</span>
              <span className="text-xs text-muted-foreground">ID: P-12346 • 62 ans</span>
            </div>
            <CommandShortcut>🟡 En attente</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <User className="mr-3 h-4 w-4" />
            <div className="flex flex-col">
              <span className="font-medium">Sophie Leroy</span>
              <span className="text-xs text-muted-foreground">ID: P-12347 • 84 ans</span>
            </div>
            <CommandShortcut>✅ Terminé</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem className="text-primary">
            <User className="mr-2 h-4 w-4" />
            <span>Créer nouveau patient</span>
            <CommandShortcut>Ctrl+N</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const AmbulanceCommands: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-md">
      <CommandInput placeholder="Commandes ambulance..." />
      <CommandList>
        <CommandEmpty>Aucune commande trouvée.</CommandEmpty>
        <CommandGroup heading="Gestion de flotte">
          <CommandItem>
            <span className="mr-2">🚑</span>
            <span>Statut AMB-001</span>
            <CommandShortcut>F1</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">📍</span>
            <span>Localiser ambulances</span>
            <CommandShortcut>F2</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">🔧</span>
            <span>Maintenance véhicule</span>
            <CommandShortcut>F3</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Interventions">
          <CommandItem>
            <span className="mr-2">🚨</span>
            <span>Nouvelle urgence</span>
            <CommandShortcut>Ctrl+U</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span className="mr-2">📋</span>
            <span>Planning du jour</span>
            <CommandShortcut>Ctrl+P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const DialogCommand: Story = {
  render: () => {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <Button onClick={() => setOpen(true)}>
          Ouvrir palette de commandes
        </Button>
        <CommandDialog 
          open={open} 
          onOpenChange={setOpen}
          title="Palette de commandes HavRid"
          description="Recherchez rapidement des patients, ambulances ou actions"
        >
          <CommandInput placeholder="Tapez une commande ou recherchez..." />
          <CommandList>
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => setOpen(false)}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Planning interventions</span>
                <CommandShortcut>Ctrl+Shift+P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <User className="mr-2 h-4 w-4" />
                <span>Base patients</span>
                <CommandShortcut>Ctrl+Shift+U</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <span className="mr-2">🚑</span>
                <span>Gestion flotte</span>
                <CommandShortcut>Ctrl+Shift+F</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions rapides">
              <CommandItem onSelect={() => setOpen(false)}>
                <span className="mr-2">🚨</span>
                <span>Déclarer urgence</span>
                <CommandShortcut>F9</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <span className="mr-2">📞</span>
                <span>Contact SAMU</span>
                <CommandShortcut>F12</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Recherche">
              <CommandItem onSelect={() => setOpen(false)}>
                <span className="mr-2">🔍</span>
                <span>Recherche patient par nom</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <span className="mr-2">🆔</span>
                <span>Recherche par numéro sécurité sociale</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    )
  },
}

export const MedicalCodeLookup: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md max-w-lg">
      <CommandInput placeholder="Rechercher un code médical..." />
      <CommandList>
        <CommandEmpty>Aucun code médical trouvé.</CommandEmpty>
        <CommandGroup heading="Codes transport">
          <CommandItem>
            <span className="mr-3 font-mono text-sm">T01</span>
            <div className="flex flex-col">
              <span>Transport simple</span>
              <span className="text-xs text-muted-foreground">Patient autonome, pas d'assistance médicale</span>
            </div>
          </CommandItem>
          <CommandItem>
            <span className="mr-3 font-mono text-sm">T02</span>
            <div className="flex flex-col">
              <span>Transport médicalisé</span>
              <span className="text-xs text-muted-foreground">Surveillance médicale requise durant le transport</span>
            </div>
          </CommandItem>
          <CommandItem>
            <span className="mr-3 font-mono text-sm">T03</span>
            <div className="flex flex-col">
              <span>Transport allongé</span>
              <span className="text-xs text-muted-foreground">Patient sur brancard, position allongée obligatoire</span>
            </div>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Codes urgence">
          <CommandItem>
            <span className="mr-3 font-mono text-sm text-red-600">U01</span>
            <div className="flex flex-col">
              <span className="text-red-600">Urgence vitale</span>
              <span className="text-xs text-muted-foreground">Pronostic vital engagé - Priorité absolue</span>
            </div>
          </CommandItem>
          <CommandItem>
            <span className="mr-3 font-mono text-sm text-amber-600">U02</span>
            <div className="flex flex-col">
              <span className="text-amber-600">Urgence relative</span>
              <span className="text-xs text-muted-foreground">Intervention rapide souhaitable</span>
            </div>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}