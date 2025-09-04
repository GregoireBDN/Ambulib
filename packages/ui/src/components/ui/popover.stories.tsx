import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f8f9fa" },
        { name: "dark", value: "#343a40" },
      ],
    },
    docs: {
      description: {
        component: "Un popover accessible pour afficher du contenu flottant. Utilisé pour les tooltips complexes, menus contextuels et informations additionnelles dans l'interface médicale.",
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Ouvrir le popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Informations patient</h4>
            <p className="text-sm text-muted-foreground">
              Détails sur l'état de santé et les traitements en cours.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="medication">Médicament</label>
              <input
                id="medication"
                defaultValue="Doliprane 500mg"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="dosage">Dosage</label>
              <input
                id="dosage"
                defaultValue="3x/jour"
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 py-1 text-sm"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const MedicalTooltip: Story = {
  render: () => (
    <div className="flex gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm">
            ⚕️ Allergie
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" side="top">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Allergie connue</h4>
            <p className="text-xs text-muted-foreground">
              Patient allergique à la pénicilline. Vérifier tous les antibiotiques prescrits.
            </p>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="h-7 text-xs">
                Voir détails
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const AmbulanceStatus: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            🚑 AMB-001 <span className="ml-2 h-2 w-2 bg-green-500 rounded-full"></span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72" side="bottom">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Ambulance AMB-001</h4>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Disponible
              </span>
            </div>
            <div className="grid gap-2 text-sm">
              <div className="grid grid-cols-2">
                <span className="text-muted-foreground">Conducteur:</span>
                <span>Dr. Martin Dubois</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-muted-foreground">Position:</span>
                <span>Secteur Nord</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-muted-foreground">Dernière MAJ:</span>
                <span>Il y a 2 min</span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                Localiser
              </Button>
              <Button size="sm" className="flex-1">
                Assigner course
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const PatientInfo: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-auto p-3 justify-start">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                👤
              </div>
              <div className="text-left">
                <p className="font-medium">Marie Dupont</p>
                <p className="text-xs text-muted-foreground">ID: #P-12345</p>
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" side="right">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <h4 className="font-medium">Marie Dupont</h4>
                <p className="text-sm text-muted-foreground">76 ans</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Téléphone:</span>
                <span>06 12 34 56 78</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Urgence:</span>
                <span>06 87 65 43 21</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adresse:</span>
                <span className="text-right">12 rue des Fleurs<br />75001 Paris</span>
              </div>
            </div>
            
            <div className="border-t pt-2">
              <p className="text-xs text-amber-600 mb-2">
                ⚠️ Mobilité réduite - Fauteuil roulant
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Voir dossier
                </Button>
                <Button size="sm" className="flex-1">
                  Planifier course
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
}

export const ContextualHelp: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex items-center gap-2">
        <label htmlFor="medical-code" className="text-sm font-medium">
          Code médical
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
              ❓
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="top">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Codes médicaux usuels</h4>
              <ul className="text-xs space-y-1">
                <li><code>T01</code> - Transport simple</li>
                <li><code>T02</code> - Transport médicalisé</li>
                <li><code>U01</code> - Urgence vitale</li>
                <li><code>U02</code> - Urgence relative</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <input
        id="medical-code"
        className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
        placeholder="Ex: T01"
      />
    </div>
  ),
}