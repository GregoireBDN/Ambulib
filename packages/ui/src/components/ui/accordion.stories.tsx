import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'
import { Card, CardContent } from './card'

const meta = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant accordéon accessible pour FAQ et sections dépliables, optimisé pour l\'interface médicale.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
      description: 'Permet d\'ouvrir un ou plusieurs éléments simultanément',
    },
    collapsible: {
      control: 'boolean',
      description: 'Permet de refermer l\'élément ouvert (type single uniquement)',
    },
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Comment réserver une ambulance ?</AccordionTrigger>
          <AccordionContent>
            Vous pouvez réserver une ambulance en appelant notre numéro d'urgence ou via notre application mobile. 
            Nos équipes sont disponibles 24h/24 et 7j/7 pour répondre à vos besoins de transport médicalisé.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Quels documents apporter ?</AccordionTrigger>
          <AccordionContent>
            Munissez-vous de votre carte d'identité, carte vitale, et de votre ordonnance médicale si vous en avez une. 
            Pour les urgences, ces documents peuvent être apportés ultérieurement.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Quelle est la prise en charge ?</AccordionTrigger>
          <AccordionContent>
            Le transport en ambulance est pris en charge par la Sécurité Sociale sur prescription médicale. 
            Notre équipe administrative vous aide dans toutes vos démarches.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  args: {
    type: 'multiple',
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Informations médicales</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <p><strong>Allergies :</strong> Pénicilline, Latex</p>
              <p><strong>Groupe sanguin :</strong> O+</p>
              <p><strong>Personne à contacter :</strong> Jean Dupont - 06 12 34 56 78</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Médicaments actuels</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-1 text-sm">
              <p>• Doliprane 500mg - 3 fois par jour</p>
              <p>• Kardégic 75mg - 1 fois par jour</p>
              <p>• Atenolol 50mg - 1 fois le matin</p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Dernières interventions</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>15/10/2024</span>
                <span>Transport Hôpital Saint-Louis</span>
              </div>
              <div className="flex justify-between">
                <span>08/10/2024</span>
                <span>Consultation cardiologie</span>
              </div>
              <div className="flex justify-between">
                <span>01/10/2024</span>
                <span>Analyse sanguine</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const MedicalFAQ: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-primary-700">
          🏥 Questions fréquentes - Services d'ambulance
        </h3>
        <Accordion {...args}>
          <AccordionItem value="urgence">
            <AccordionTrigger className="text-left">
              🚨 Que faire en cas d'urgence vitale ?
            </AccordionTrigger>
            <AccordionContent>
              <div className="bg-error-50 border border-error-200 p-4 rounded-md">
                <p className="text-error-700 font-medium mb-2">Action immédiate requise :</p>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Appelez le 15 (SAMU) ou le 112 (urgences européennes)</li>
                  <li>Restez calme et parlez clairement</li>
                  <li>Donnez votre adresse exacte</li>
                  <li>Décrivez les symptômes observés</li>
                  <li>Ne raccrochez pas jusqu'à autorisation</li>
                </ol>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="transport">
            <AccordionTrigger>
              🚑 Comment fonctionne le transport médicalisé ?
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm">
                <p>Notre service de transport médicalisé comprend :</p>
                <ul className="space-y-1 list-disc list-inside ml-2">
                  <li><strong>Équipe qualifiée :</strong> Médecin urgentiste + Infirmier</li>
                  <li><strong>Matériel médical :</strong> Défibrillateur, respirateur, médicaments d'urgence</li>
                  <li><strong>Communication :</strong> Liaison radio avec les hôpitaux</li>
                  <li><strong>Confort patient :</strong> Brancard ergonomique, système de chauffage</li>
                </ul>
                <div className="bg-primary-50 border border-primary-200 p-3 rounded-md">
                  <p className="text-primary-700"><strong>Temps d'intervention moyen :</strong> 8-12 minutes en zone urbaine</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="costs">
            <AccordionTrigger>
              💰 Tarifs et prise en charge
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-success-700 mb-2">✓ Pris en charge à 100%</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Urgences vitales (SAMU)</li>
                      <li>Transport sur prescription médicale</li>
                      <li>Patients en ALD (Affection Longue Durée)</li>
                      <li>Accidents du travail</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-warning-700 mb-2">⚠️ Participation financière</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Transport de convenance : 25€-45€</li>
                      <li>Dépassement kilométrique possible</li>
                      <li>Devis gratuit sur demande</li>
                    </ul>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="senior">
            <AccordionTrigger>
              👴 Services spécialisés seniors
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 text-sm">
                <div className="bg-neutral-50 border border-neutral-200 p-4 rounded-md">
                  <h4 className="font-medium mb-2">🤝 Accompagnement personnalisé</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Aide à la mobilité (fauteuil roulant, déambulateur)</li>
                    <li>Accompagnement jusqu'à la salle d'attente</li>
                    <li>Communication avec l'équipe soignante</li>
                    <li>Respect du rythme et des besoins spécifiques</li>
                    <li>Équipe formée à la gérontologie</li>
                  </ul>
                </div>
                <p className="text-primary-600">
                  <strong>Service disponible 7j/7</strong> avec personnel spécialement formé pour l'accompagnement des personnes âgées.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  ),
}

export const PatientInfo: Story = {
  args: {
    type: 'single',
    collapsible: true,
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <h3 className="text-lg font-semibold mb-3 text-foreground">
        👤 Dossier Patient : Marie Dupont
      </h3>
      <Accordion {...args}>
        <AccordionItem value="identity">
          <AccordionTrigger>Informations personnelles</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Date de naissance :</span>
                <span>15/03/1946 (78 ans)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Adresse :</span>
                <span className="text-right">15 Avenue de la République<br />75011 Paris</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Téléphone :</span>
                <span className="font-mono">06 12 34 56 78</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Contact urgence :</span>
                <span>Jean Dupont (fils)<br />06 98 76 54 32</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="medical">
          <AccordionTrigger className="text-warning-700">
            ⚠️ Informations médicales importantes
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="bg-error-50 border border-error-200 p-3 rounded-md">
                <h4 className="font-medium text-error-700 mb-1">🚨 Allergies</h4>
                <ul className="text-sm text-error-700 list-disc list-inside">
                  <li>Pénicilline (réaction sévère)</li>
                  <li>Latex (urticaire)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">💊 Traitements actuels</h4>
                <ul className="text-sm space-y-1">
                  <li>• Doliprane 500mg - 3×/jour</li>
                  <li>• Kardégic 75mg - 1×/jour</li>
                  <li>• Atenolol 50mg - matin</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">🩺 Pathologies</h4>
                <p className="text-sm text-muted-foreground">
                  Hypertension artérielle, Fibrillation auriculaire
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="history">
          <AccordionTrigger>Historique des transports</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                <span>15/10/2024</span>
                <span className="text-right">
                  Consultation cardiologie<br />
                  <span className="text-success-600 text-xs">✓ Terminé</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                <span>08/10/2024</span>
                <span className="text-right">
                  Analyses sanguines<br />
                  <span className="text-success-600 text-xs">✓ Terminé</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>01/10/2024</span>
                <span className="text-right">
                  Urgences - Malaise<br />
                  <span className="text-success-600 text-xs">✓ Terminé</span>
                </span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}