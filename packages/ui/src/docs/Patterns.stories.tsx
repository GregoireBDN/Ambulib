import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'

const meta: Meta = {
  title: 'Design System/Patterns',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <div className="p-8 max-w-6xl mx-auto">
          <PatternsDocPage />
        </div>
      ),
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const PatternsDocPage = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-4xl font-bold mb-4 text-primary-700">
        🏥 Patterns Médicaux
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Composants et patterns d'interface optimisés pour les services d'ambulance et soins médicaux
      </p>
    </div>

    <div className="p-6 bg-primary-50 border border-primary-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-primary-700">🎯 Patterns Contextuels</h3>
      <p className="text-primary-800">
        Ces patterns sont spécialement conçus pour répondre aux besoins des <strong>patients seniors</strong>, 
        des <strong>gestionnaires de flotte</strong> et des <strong>équipes médicales</strong> dans un contexte 
        d'urgence et de transport médicalisé.
      </p>
    </div>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">🚨 Pattern Urgence</h2>
      
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-error-700">Bouton d'Urgence Principal</h3>
        <div className="space-y-4">
          <div className="flex justify-center">
            <Button 
              size="lg"
              className="bg-error-700 hover:bg-error-800 text-white text-xl font-semibold py-6 px-12 min-h-[80px] min-w-[300px] border-2 border-error-900 shadow-lg animate-pulse"
            >
              🚨 URGENCE MÉDICALE
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground text-center">
            <strong>Spécifications :</strong> 80×300px minimum, contraste 6.89:1, animation pulse subtile
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-error-700">Zone d'Alerte Critique</h3>
        <div className="relative p-8 bg-error-50 border-2 border-error-200 rounded-xl">
          <div className="absolute -top-3 left-4 bg-error-700 text-white px-4 py-1 rounded text-sm font-semibold">
            ALERTE PRIORITÉ 1
          </div>
          
          <div 
            role="alert" 
            aria-live="assertive"
            className="text-2xl font-bold text-error-700 mb-4 mt-4"
          >
            🚑 Intervention d'urgence requise
          </div>
          
          <div className="text-lg text-error-700 leading-relaxed mb-6 space-y-1">
            <div><strong>Patient :</strong> Marie Dupont, 78 ans</div>
            <div><strong>Localisation :</strong> 15 Avenue de la République, Paris 11e</div>
            <div><strong>Symptômes :</strong> Douleur thoracique intense, difficultés respiratoires</div>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <Button 
              size="lg"
              className="bg-error-700 hover:bg-error-800 text-lg min-h-[50px]"
            >
              📞 Contacter SAMU
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-error-700 text-error-700 hover:bg-error-50 text-lg min-h-[50px]"
            >
              🚑 Dispatcher Ambulance
            </Button>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">📋 Pattern Formulaire Médical</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Informations Patient Senior-Friendly</h3>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              👤 Informations Patient
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-8">
              
              <fieldset className="border-2 border-border rounded-lg p-6 bg-muted/30 space-y-6">
                <legend className="px-4 text-lg font-semibold text-primary-700">
                  Identité
                </legend>
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="patient-lastname" className="text-base font-semibold">
                      Nom de famille *
                    </Label>
                    <Input 
                      id="patient-lastname"
                      type="text" 
                      placeholder="Dupont"
                      className="text-lg min-h-[48px]"
                      aria-describedby="lastname-hint"
                      required 
                    />
                    <div id="lastname-hint" className="text-sm text-muted-foreground">
                      Tel qu'il apparaît sur votre pièce d'identité
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-firstname" className="text-base font-semibold">
                      Prénom *
                    </Label>
                    <Input 
                      id="patient-firstname"
                      type="text" 
                      placeholder="Marie"
                      className="text-lg min-h-[48px]"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-birth" className="text-base font-semibold">
                      Date de naissance *
                    </Label>
                    <Input 
                      id="patient-birth"
                      type="date" 
                      className="text-lg min-h-[48px]"
                      aria-describedby="birth-hint"
                      required 
                    />
                    <div id="birth-hint" className="text-sm text-muted-foreground">
                      Format : JJ/MM/AAAA
                    </div>
                  </div>
                </div>
              </fieldset>
              
              <fieldset className="border-2 border-primary-200 rounded-lg p-6 bg-primary-50 space-y-6">
                <legend className="px-4 text-lg font-semibold text-primary-700">
                  Informations Médicales
                </legend>
                
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="patient-medications" className="text-base font-semibold">
                      Médicaments actuels
                    </Label>
                    <Input 
                      id="patient-medications"
                      type="text" 
                      placeholder="Ex: Doliprane 500mg 3x/jour, Kardégic 75mg"
                      className="text-lg min-h-[48px]"
                      aria-describedby="medications-hint"
                    />
                    <div id="medications-hint" className="text-sm text-primary-600">
                      Indiquez tous vos traitements avec le dosage
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="patient-allergies" className="text-base font-semibold">
                      Allergies connues
                    </Label>
                    <Input 
                      id="patient-allergies"
                      type="text" 
                      placeholder="Ex: Pénicilline, Aspirine, Latex"
                      className="text-lg min-h-[48px]"
                      aria-describedby="allergies-hint"
                    />
                    <div id="allergies-hint" className="text-sm text-warning-700">
                      ⚠️ Information critique pour les équipes médicales
                    </div>
                  </div>
                </div>
              </fieldset>
              
              <div className="flex gap-4 justify-end">
                <Button variant="outline" size="lg">
                  Annuler
                </Button>
                <Button size="lg" className="min-h-[50px] text-lg">
                  ✓ Enregistrer les informations
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">📱 Pattern Carte Patient</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Vue Résumé Patient</h3>
        <Card className="max-w-lg">
          <CardHeader className="bg-primary/5">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  Marie Dupont
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  Patient ID: PAT-2024-001234
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-success-100 text-success-700">
                  ✓ Actif
                </Badge>
                <Badge variant="outline" className="border-warning-300 text-warning-700">
                  ⚠️ Allergies
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Âge :</span>
                <span>78 ans (née le 15/03/1946)</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Téléphone :</span>
                <span className="font-mono">06 12 34 56 78</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-medium">Adresse :</span>
                <span className="text-right max-w-[200px]">
                  15 Avenue de la République<br />
                  75011 Paris
                </span>
              </div>
            </div>
            
            <hr className="border-border" />
            
            <div>
              <div className="font-medium mb-2 text-warning-700">
                ⚠️ Allergies importantes :
              </div>
              <div className="text-sm bg-warning-50 p-3 rounded border border-warning-200">
                • Pénicilline (réaction sévère)<br />
                • Latex (urticaire)<br />
                • Aspirine (troubles digestifs)
              </div>
            </div>
            
            <div>
              <div className="font-medium mb-2">
                Médicaments actuels :
              </div>
              <div className="text-sm bg-muted p-3 rounded">
                • Doliprane 500mg - 3x/jour<br />
                • Kardégic 75mg - 1x/jour<br />
                • Atenolol 50mg - 1x/matin
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button size="sm" variant="outline">
                📋 Dossier complet
              </Button>
              <Button size="sm" variant="outline">
                📞 Contacter
              </Button>
              <Button size="sm" className="bg-primary-700">
                🚑 Réserver transport
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">🚗 Pattern Planning Ambulance</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Tableau de Bord Flotte</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              🚑 État de la Flotte - Temps Réel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* Ambulance 1 */}
              <div className="flex justify-between items-center p-4 border-2 border-success-200 rounded-lg bg-success-50">
                <div>
                  <div className="font-semibold text-lg">
                    AMB-001 - Peugeot Boxer
                  </div>
                  <div className="text-sm text-success-700">
                    Équipe : Dr. Martin, Inf. Dubois
                  </div>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-success-700 text-white text-sm px-4 py-2">
                    🟢 Disponible
                  </Badge>
                  <div className="text-xs mt-1">
                    Secteur 11e - Base République
                  </div>
                </div>
                
                <Button size="sm" className="bg-success-700">
                  🎯 Assigner Mission
                </Button>
              </div>
              
              {/* Ambulance 2 */}
              <div className="flex justify-between items-center p-4 border-2 border-warning-300 rounded-lg bg-warning-50">
                <div>
                  <div className="font-semibold text-lg">
                    AMB-002 - Mercedes Sprinter
                  </div>
                  <div className="text-sm text-warning-700">
                    Équipe : Dr. Leroy, Inf. Petit
                  </div>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-warning-700 text-white text-sm px-4 py-2">
                    🟡 En Mission
                  </Badge>
                  <div className="text-xs mt-1">
                    Direction Hôpital Bichat
                  </div>
                </div>
                
                <Button size="sm" variant="outline">
                  📍 Suivre Position
                </Button>
              </div>
              
              {/* Ambulance 3 */}
              <div className="flex justify-between items-center p-4 border-2 border-error-300 rounded-lg bg-error-50">
                <div>
                  <div className="font-semibold text-lg">
                    AMB-003 - Ford Transit
                  </div>
                  <div className="text-sm text-error-700">
                    Équipe : Dr. Moreau, Inf. Bernard
                  </div>
                </div>
                
                <div className="text-center">
                  <Badge className="bg-error-700 text-white text-sm px-4 py-2">
                    🔴 Urgence
                  </Badge>
                  <div className="text-xs mt-1">
                    Code Rouge - ETA 12 min
                  </div>
                </div>
                
                <Button size="sm" className="bg-error-700">
                  🚨 Assistance Requise
                </Button>
              </div>
              
            </div>
            
            <div className="mt-6 flex gap-4 justify-center flex-wrap">
              <Button variant="outline">
                📊 Statistiques Journée
              </Button>
              <Button variant="outline">
                🗺️ Vue Carte Générale
              </Button>
              <Button className="bg-primary-700">
                + Nouvelle Intervention
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">🔔 Pattern Notifications</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Notifications Hiérarchisées</h3>
        <div className="space-y-4 max-w-md">
          
          {/* Urgence Critique */}
          <div className="p-4 bg-error-50 border-2 border-error-300 rounded-lg border-l-[6px] border-l-error-700">
            <div className="flex items-center gap-2 text-base font-semibold text-error-700 mb-2">
              🚨 <span>URGENCE VITALE</span>
              <div className="text-xs bg-error-700 text-white px-2 py-0.5 rounded">
                Il y a 2 min
              </div>
            </div>
            <div className="text-sm text-error-700">
              Arrêt cardiaque confirmé - 15 Rue Oberkampf, Paris 11e
            </div>
          </div>
          
          {/* Alerte Importante */}
          <div className="p-4 bg-warning-50 border border-warning-300 rounded-lg border-l-[4px] border-l-warning-700">
            <div className="flex items-center gap-2 text-sm font-medium text-warning-700 mb-2">
              ⚠️ <span>Retard Ambulance</span>
              <div className="text-xs bg-warning-600 text-white px-2 py-0.5 rounded">
                Il y a 5 min
              </div>
            </div>
            <div className="text-sm text-warning-700">
              AMB-002 retardée de 15 min - Patient informé
            </div>
          </div>
          
          {/* Information */}
          <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg border-l-[3px] border-l-primary-700">
            <div className="flex items-center gap-2 text-sm font-medium text-primary-700 mb-2">
              ℹ️ <span>Nouveau Patient</span>
              <div className="text-xs bg-primary-700 text-white px-2 py-0.5 rounded">
                Il y a 10 min
              </div>
            </div>
            <div className="text-sm text-foreground">
              Jean Martin inscrit - Validation dossier requise
            </div>
          </div>
          
          {/* Succès */}
          <div className="p-4 bg-success-50 border border-success-300 rounded-lg border-l-[3px] border-l-success-700">
            <div className="flex items-center gap-2 text-sm font-medium text-success-700 mb-2">
              ✅ <span>Transport Terminé</span>
              <div className="text-xs bg-success-700 text-white px-2 py-0.5 rounded">
                Il y a 1h
              </div>
            </div>
            <div className="text-sm text-success-700">
              Marie Dupont arrivée à destination - Paiement confirmé
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">🏗️ Guidelines d'Usage</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Composition de Patterns</h3>
        <Card>
          <CardHeader>
            <CardTitle>📝 Règles de Composition</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-6">
            
            <div>
              <h4 className="text-success-700 font-semibold mb-3">✅ Bonnes Pratiques</h4>
              <ul className="space-y-2 pl-4">
                <li>• <strong>Hiérarchie claire :</strong> Urgence → Important → Information → Succès</li>
                <li>• <strong>Codes couleurs cohérents :</strong> Rouge urgence, Orange attention, Bleu info, Vert succès</li>
                <li>• <strong>Tailles proportionnelles :</strong> Plus critique = plus grand et visible</li>
                <li>• <strong>Actions contextuelles :</strong> Boutons adaptés au niveau d'urgence</li>
                <li>• <strong>Feedback immédiat :</strong> Confirmations visuelles et sonores</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-error-700 font-semibold mb-3">❌ À Éviter</h4>
              <ul className="space-y-2 pl-4">
                <li>• <strong>Surcharge visuelle :</strong> Trop d'éléments clignotants ou colorés</li>
                <li>• <strong>Incohérence :</strong> Mélanger les codes couleurs entre contexts</li>
                <li>• <strong>Actions ambiguës :</strong> Boutons sans indication claire du résultat</li>
                <li>• <strong>Timeout inadequat :</strong> Trop court pour seniors, trop long pour urgences</li>
                <li>• <strong>Information critique cachée :</strong> Allergies non visibles immédiatement</li>
              </ul>
            </div>
            
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Adaptations Contextuelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">👥 Interface Patient</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="space-y-1 pl-4">
                <li>• Texte 18px minimum</li>
                <li>• Boutons 60×200px pour urgence</li>
                <li>• Espacement généreux</li>
                <li>• Langage simplifié</li>
                <li>• Confirmation double critique</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🚑 Interface Fleet</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="space-y-1 pl-4">
                <li>• Densité d'information élevée</li>
                <li>• Codes couleurs professionnels</li>
                <li>• Actions rapides (raccourcis)</li>
                <li>• Temps réel prioritaire</li>
                <li>• Multi-fenêtres supporté</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">⚙️ Interface Admin</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <ul className="space-y-1 pl-4">
                <li>• Accès sécurisé renforcé</li>
                <li>• Audit trail visible</li>
                <li>• Confirmations obligatoires</li>
                <li>• Permissions granulaires</li>
                <li>• Journaux d'activité</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <div className="mt-12 p-6 bg-muted rounded-lg text-center">
      <h3 className="text-xl font-semibold mb-2">
        🏥 Patterns Médicaux HavRid
      </h3>
      <p className="text-sm text-muted-foreground">
        Interface contextuelle • Senior-friendly • Gestion d'urgence • Accessibilité médicale
      </p>
    </div>
  </div>
)

export const Patterns: Story = {
  render: () => <PatternsDocPage />,
  parameters: {
    layout: 'fullscreen',
  },
}