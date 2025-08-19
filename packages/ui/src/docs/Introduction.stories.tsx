import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

const meta: Meta = {
  title: "Design System/Introduction",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <div className="p-8 max-w-7xl mx-auto">
          <IntroductionDocPage />
        </div>
      ),
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const IntroductionDocPage = () => (
  <div className="space-y-12">
    {/* Hero Section */}
    <section className="text-center space-y-6">
      <div className="flex justify-center items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white text-2xl">
          🏥
        </div>
        <div>
          <h1 className="text-5xl font-bold text-primary-700 leading-tight">
            HavRid Medical UI
          </h1>
          <p className="text-xl text-primary-600 font-medium">Design System</p>
        </div>
      </div>
      
      <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
        Système de design unifié et accessible pour les services d'ambulance et applications de soins médicaux,
        spécialement optimisé pour les <strong>personnes âgées et handicapées</strong>
      </p>

      <div className="flex justify-center gap-4 pt-4">
        <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
          🧩 Explorer les Composants
        </Button>
        <Button size="lg" variant="outline">
          📖 Guide de Démarrage
        </Button>
        <Button size="lg" variant="secondary">
          ♿ Tests d'Accessibilité
        </Button>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 max-w-2xl mx-auto">
        <div className="text-center p-4">
          <div className="text-3xl font-bold text-primary-700">16</div>
          <div className="text-sm text-muted-foreground">Composants shadcn/ui</div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl font-bold text-success-600">100%</div>
          <div className="text-sm text-muted-foreground">WCAG 2.1 AA</div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl font-bold text-warning-600">4.5:1</div>
          <div className="text-sm text-muted-foreground">Contraste minimum</div>
        </div>
        <div className="text-center p-4">
          <div className="text-3xl font-bold text-error-600">24/7</div>
          <div className="text-sm text-muted-foreground">Support médical</div>
        </div>
      </div>
    </section>

    {/* Mission & Values */}
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-foreground">
        🎯 Notre Mission
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary-700">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white">
                ♿
              </div>
              Accessibilité Prioritaire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed mb-4">
              Chaque composant respecte et dépasse les standards WCAG 2.1 Level AA.
              Navigation clavier complète, support lecteurs d'écran, et couleurs scientifiques OKLCH.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">ARIA compliant</Badge>
              <Badge variant="secondary" className="text-xs">Focus visible</Badge>
              <Badge variant="secondary" className="text-xs">Lecteurs d'écran</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-success/30 bg-success/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-success-700">
              <div className="w-10 h-10 bg-success-600 rounded-full flex items-center justify-center text-white">
                🏥
              </div>
              Contexte Médical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed mb-4">
              Conçu spécifiquement pour l'urgence médicale et le transport de patients.
              Interfaces intuitives pour situations critiques et utilisateurs vulnérables.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">Urgences</Badge>
              <Badge variant="secondary" className="text-xs">Patients seniors</Badge>
              <Badge variant="secondary" className="text-xs">Interface simple</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-warning-700">
              <div className="w-10 h-10 bg-warning-600 rounded-full flex items-center justify-center text-white">
                🔬
              </div>
              Scientifiquement Validé
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed mb-4">
              Couleurs OKLCH pour perception uniforme, tests automatisés d'accessibilité,
              et validation par experts en ergonomie médicale.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">Tests automatisés</Badge>
              <Badge variant="secondary" className="text-xs">OKLCH</Badge>
              <Badge variant="secondary" className="text-xs">Validation UX</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Technical Foundation */}
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-foreground">
        🏗️ Fondations Techniques
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary-700 flex items-center gap-2">
              🎨 Design Tokens
            </CardTitle>
            <CardDescription>
              Système de couleurs et tokens unifiés à travers tout l'écosystème HavRid
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary-600">Couleurs OKLCH</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary-600 rounded"></div>
                    <span>Primaire (Bleu médical)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-success-600 rounded"></div>
                    <span>Succès (Vert santé)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-error-600 rounded"></div>
                    <span>Erreur (Rouge urgence)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-warning-600 rounded"></div>
                    <span>Attention (Ambre)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-primary-600">Contraste WCAG</h4>
                <div className="space-y-1 text-sm">
                  <div>✅ Minimum 4.5:1 (AA)</div>
                  <div>✅ Préféré 7:1 (AAA)</div>
                  <div>✅ Support contraste élevé</div>
                  <div>✅ Tests automatisés</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-success-700 flex items-center gap-2">
              ⚡ Stack Technique
            </CardTitle>
            <CardDescription>
              Technologies modernes et robustes pour une expérience optimale
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-success-600">Frontend</h4>
                <div className="space-y-1 text-sm">
                  <div>• React 19 + TypeScript</div>
                  <div>• Tailwind CSS 4.x</div>
                  <div>• Radix UI Primitives</div>
                  <div>• shadcn/ui Components</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-success-600">Outils</h4>
                <div className="space-y-1 text-sm">
                  <div>• Storybook 8.6 + Tests a11y</div>
                  <div>• Jest + Testing Library</div>
                  <div>• Turborepo Monorepo</div>
                  <div>• ESLint + Prettier</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Components Overview */}
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-foreground">
        🧩 Architecture des Composants
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl text-primary-700">
              shadcn/ui Components (16 composants)
            </CardTitle>
            <CardDescription>
              Composants de base avec accessibilité Radix UI native et validation TypeScript stricte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                'Accordion', 'Avatar', 'Badge', 'Breadcrumb',
                'Button', 'Card', 'Dialog', 'Drawer',
                'DropdownMenu', 'Form', 'Input', 'Label',
                'NavigationMenu', 'Table', 'Tooltip'
              ].map(component => (
                <Badge key={component} variant="outline" className="justify-center">
                  {component}
                </Badge>
              ))}
            </div>
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2 text-primary-600">Caractéristiques :</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>✅ Focus ring visible et cohérent</li>
                <li>✅ Support complet navigation clavier</li>
                <li>✅ États disabled, loading, error</li>
                <li>✅ ARIA labels et descriptions</li>
                <li>✅ Tailles tactiles ≥ 44px (WCAG)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-warning-700">
              Composants Spécialisés
            </CardTitle>
            <CardDescription>
              Patterns avancés pour contextes médicaux spécifiques
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-sm">Formulaires Médicaux</h4>
                <p className="text-xs text-muted-foreground">
                  Validation temps réel, masques de saisie, champs sensibles
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-sm">Interfaces d'Urgence</h4>
                <p className="text-xs text-muted-foreground">
                  Boutons haute visibilité, états critiques, feedback immédiat
                </p>
              </div>
              <div className="p-3 border rounded-lg">
                <h4 className="font-semibold text-sm">Accessibilité Avancée</h4>
                <p className="text-xs text-muted-foreground">
                  Seniors, handicaps, lecteurs d'écran optimisés
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Target Users */}
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-foreground">
        👥 Utilisateurs Cibles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-8 space-y-4">
            <Avatar className="w-16 h-16 mx-auto bg-primary-100">
              <AvatarFallback className="text-2xl">👴</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-primary-700">Patients Seniors</h3>
              <p className="text-sm text-muted-foreground">
                Interface simplifiée, boutons larges, contraste élevé, navigation intuitive
              </p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="secondary" className="text-xs">+65 ans</Badge>
              <Badge variant="secondary" className="text-xs">Mobilité réduite</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-8 space-y-4">
            <Avatar className="w-16 h-16 mx-auto bg-error-100">
              <AvatarFallback className="text-2xl">🚑</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-error-700">Ambulanciers</h3>
              <p className="text-sm text-muted-foreground">
                Interface d'urgence, actions rapides, informations critiques visibles
              </p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="secondary" className="text-xs">Urgences</Badge>
              <Badge variant="secondary" className="text-xs">Mobilité</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-8 space-y-4">
            <Avatar className="w-16 h-16 mx-auto bg-success-100">
              <AvatarFallback className="text-2xl">🏥</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-success-700">Personnel Médical</h3>
              <p className="text-sm text-muted-foreground">
                Dossiers patients, planning, gestion des interventions et équipements
              </p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="secondary" className="text-xs">Médecins</Badge>
              <Badge variant="secondary" className="text-xs">Infirmiers</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="p-8 space-y-4">
            <Avatar className="w-16 h-16 mx-auto bg-warning-100">
              <AvatarFallback className="text-2xl">⚙️</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-warning-700">Administrateurs</h3>
              <p className="text-sm text-muted-foreground">
                Gestion système, rapports analytiques, configuration globale
              </p>
            </div>
            <div className="flex flex-wrap gap-1 justify-center">
              <Badge variant="secondary" className="text-xs">IT</Badge>
              <Badge variant="secondary" className="text-xs">Management</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Getting Started */}
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-foreground">
        🚀 Démarrage Rapide
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-primary-700">
              💾 Installation & Configuration
            </CardTitle>
            <CardDescription>
              Intégrez le design system dans votre application HavRid
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-sm space-y-3">
              <div>
                <span className="text-green-400"># Installation du package</span>
              </div>
              <div>
                <span className="text-blue-400">pnpm add</span> @repo/ui
              </div>
              
              <div className="pt-2">
                <span className="text-green-400"># Configuration Tailwind</span>
              </div>
              <div>
                <span className="text-yellow-400">presets:</span> [<span className="text-green-400">require("@repo/ui/tailwind.preset")</span>]
              </div>
              
              <div className="pt-2">
                <span className="text-green-400"># Styles CSS globaux</span>
              </div>
              <div>
                <span className="text-blue-400">@import</span> <span className="text-green-400">"@repo/ui/styles/theme.css"</span>;
              </div>
              <div>
                <span className="text-blue-400">@import</span> <span className="text-green-400">"@repo/ui/styles.css"</span>;
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-success-700">
              🧩 Utilisation des Composants
            </CardTitle>
            <CardDescription>
              Exemple d'implémentation avec validation et accessibilité
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-sm space-y-3">
              <div>
                <span className="text-purple-400">import</span> {`{ Button, Card, Input }`} <span className="text-purple-400">from</span> <span className="text-green-400">"@repo/ui"</span>
              </div>
              
              <div className="pt-2">
                <span className="text-purple-400">function</span> <span className="text-yellow-400">PatientForm</span>() {`{`}
              </div>
              <div className="pl-2">
                <span className="text-purple-400">return</span> (
              </div>
              <div className="pl-4">
                {`<Card>`}
              </div>
              <div className="pl-6">
                {`<Input placeholder="Nom patient" />`}
              </div>
              <div className="pl-6">
                {`<Button>`}Enregistrer{`</Button>`}
              </div>
              <div className="pl-4">
                {`</Card>`}
              </div>
              <div className="pl-2">
                )
              </div>
              <div>
                {`}`}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Documentation Links */}
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-foreground">
        📖 Explorer la Documentation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-primary-200 transition-colors">
              <span className="text-primary-700 text-xl">🌈</span>
            </div>
            <CardTitle className="text-lg">Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Palette OKLCH scientifique, contraste WCAG AA/AAA, couleurs contextuelles médicales
            </p>
            <Button size="sm" variant="outline" className="w-full group-hover:bg-primary-50">
              Voir la palette →
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-success-200 transition-colors">
              <span className="text-success-700 text-xl">📝</span>
            </div>
            <CardTitle className="text-lg">Typography</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Échelles accessibles, hiérarchies claires, lisibilité optimisée pour tous les âges
            </p>
            <Button size="sm" variant="outline" className="w-full group-hover:bg-success-50">
              Styles de texte →
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-warning-200 transition-colors">
              <span className="text-warning-700 text-xl">♿</span>
            </div>
            <CardTitle className="text-lg">Accessibilité</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Guidelines WCAG 2.1 AA, tests automatisés, support lecteurs d'écran complet
            </p>
            <Button size="sm" variant="outline" className="w-full group-hover:bg-warning-50">
              Guide a11y →
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-error-200 transition-colors">
              <span className="text-error-700 text-xl">🎨</span>
            </div>
            <CardTitle className="text-lg">Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Modèles d'interface, formulaires médicaux, workflows d'urgence, bonnes pratiques
            </p>
            <Button size="sm" variant="outline" className="w-full group-hover:bg-error-50">
              Voir patterns →
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>

    {/* Call to Action */}
    <section className="mt-16">
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <CardContent className="p-12 text-center space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-primary-800">
              Prêt à créer des interfaces médicales accessibles ?
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto">
              Explorez nos composants, découvrez les patterns d'interface, et construisez des applications 
              qui respectent les standards les plus élevés d'accessibilité médicale.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="bg-primary-700 hover:bg-primary-800 text-white">
              🧩 Parcourir les Composants
            </Button>
            <Button size="lg" variant="outline" className="border-primary-600 text-primary-700 hover:bg-primary-50">
              📖 Lire la Documentation
            </Button>
            <Button size="lg" variant="secondary" className="bg-white border-primary-300 text-primary-700 hover:bg-primary-50">
              ♿ Tester l'Accessibilité
            </Button>
          </div>

          <div className="pt-8 border-t border-primary-200 space-y-2">
            <div className="flex justify-center items-center gap-4 text-sm text-primary-600">
              <span>✅ 100% Accessible WCAG 2.1 AA</span>
              <span>•</span>
              <span>🔬 Tests Automatisés</span>
              <span>•</span>
              <span>🏥 Validé par Experts Médicaux</span>
            </div>
            <p className="text-xs text-primary-500">
              HavRid Medical UI Design System v1.0 - Conçu pour sauver des vies avec accessibilité et élégance
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  </div>
);

// Story principale pour Storybook
export const Introduction: Story = {
  render: () => <IntroductionDocPage />,
  parameters: {
    layout: "fullscreen",
    docs: {
      page: () => (
        <div className="p-4">
          <IntroductionDocPage />
        </div>
      ),
    },
  },
};