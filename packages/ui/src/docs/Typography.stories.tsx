import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: () => (
        <div className="p-8 max-w-6xl mx-auto">
          <TypographyDocPage />
        </div>
      ),
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const HeadingDemo: React.FC<{
  level: string
  size: string
  weight: string
  usage: string
  children: React.ReactNode
}> = ({ level, size, weight, usage, children }) => (
  <div className="mb-8">
    <div className="flex items-baseline gap-4 mb-2">
      <div className={`${size} ${weight} text-foreground`}>
        {children}
      </div>
      <code className="text-sm text-muted-foreground font-mono">
        {size.replace('text-', '')} / {weight}
      </code>
    </div>
    <p className="text-sm text-muted-foreground ml-0">
      Usage : {usage}
    </p>
  </div>
)

const TypographyDocPage = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-4xl font-bold mb-4 text-primary-700">
        ✍️ Système Typographique
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Hiérarchie et échelles optimisées pour l'accessibilité médicale et la lisibilité senior
      </p>
    </div>

    <div className="p-6 bg-primary-50 border border-primary-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-primary-700">🎯 Objectifs Typographiques</h3>
      <ul className="space-y-2 text-sm text-primary-800">
        <li className="flex items-start gap-2">
          <span className="text-primary-600">•</span>
          <span><strong>Lisibilité senior</strong> : Tailles généreuses et contrastes élevés</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary-600">•</span>
          <span><strong>Hiérarchie claire</strong> : h1 → h6 avec ratios harmoniques</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary-600">•</span>
          <span><strong>Accessibilité</strong> : Espacement optimisé pour la lecture</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary-600">•</span>
          <span><strong>Contexte médical</strong> : Sérieux professionnel et confiance</span>
        </li>
      </ul>
    </div>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">📏 Échelle Typographique</h2>
      
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-primary-700">Titres (Headings)</h3>
        
        <HeadingDemo
          level="H1"
          size="text-5xl"
          weight="font-bold"
          usage="Page d'accueil, écrans principaux. Réservé aux éléments les plus importants."
        >
          H1 - Titre Principal
        </HeadingDemo>

        <HeadingDemo
          level="H2"
          size="text-4xl"
          weight="font-semibold"
          usage="Sections principales, titres de cartes importantes, modales."
        >
          H2 - Titre Section
        </HeadingDemo>

        <HeadingDemo
          level="H3"
          size="text-3xl"
          weight="font-semibold"
          usage="Sous-sections, titres de formulaires, groupes d'informations."
        >
          H3 - Sous-titre
        </HeadingDemo>

        <HeadingDemo
          level="H4"
          size="text-2xl"
          weight="font-semibold"
          usage="Titres de contenu, cartes standard, listes importantes."
        >
          H4 - Titre Contenu
        </HeadingDemo>

        <HeadingDemo
          level="H5"
          size="text-xl"
          weight="font-medium"
          usage="Détails importants, labels de formulaires, informations patient."
        >
          H5 - Titre Détail
        </HeadingDemo>

        <HeadingDemo
          level="H6"
          size="text-lg"
          weight="font-medium"
          usage="Sous-détails, labels secondaires, métadonnées."
        >
          H6 - Titre Minimal
        </HeadingDemo>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-6 text-primary-700">Corps de Texte (Body Text)</h3>
        
        <div className="space-y-6">
          <div>
            <div className="text-base leading-relaxed text-foreground mb-2">
              <strong>Texte Principal</strong> - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation.
            </div>
            <code className="text-sm text-muted-foreground font-mono">
              16px / text-base / font-normal / leading-relaxed
            </code>
            <p className="text-sm text-muted-foreground mt-1">
              Usage : Contenu principal, descriptions, texte de lecture.
            </p>
          </div>

          <div>
            <div className="text-lg leading-loose text-foreground mb-2">
              <strong>Texte Large</strong> - Spécialement conçu pour les seniors et personnes avec 
              difficultés visuelles. Taille augmentée et interlignage généreux.
            </div>
            <code className="text-sm text-muted-foreground font-mono">
              18px / text-lg / font-normal / leading-loose
            </code>
            <p className="text-sm text-muted-foreground mt-1">
              Usage : Interface client senior, informations importantes, instructions.
            </p>
          </div>

          <div>
            <div className="text-sm leading-normal text-muted-foreground mb-2">
              <strong>Texte Secondaire</strong> - Informations complémentaires, métadonnées, 
              descriptions d'aide et tooltips.
            </div>
            <code className="text-sm text-muted-foreground font-mono">
              14px / text-sm / font-normal / text-muted-foreground
            </code>
            <p className="text-sm text-muted-foreground mt-1">
              Usage : Aide contextuelle, timestamps, informations secondaires.
            </p>
          </div>

          <div>
            <div className="text-xs leading-tight text-muted-foreground font-mono mb-2">
              <strong>Code et Données</strong> - 1234567890 • ABC-DEF-GHI • patient@email.com
            </div>
            <code className="text-sm text-muted-foreground font-mono">
              12px / text-xs / font-mono / text-muted-foreground
            </code>
            <p className="text-sm text-muted-foreground mt-1">
              Usage : Numéros de sécurité sociale, codes patient, données techniques.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">🏥 Exemples Contextuels Médicaux</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Interface Patient Senior</h3>
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl text-foreground">
              Votre Prochain Rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg leading-loose">
              <strong>Hôpital Saint-Louis</strong><br />
              Service de Cardiologie
            </div>
            <div className="text-base leading-relaxed">
              <strong>Date :</strong> Mercredi 25 Octobre 2024<br />
              <strong>Heure :</strong> 14h30<br />
              <strong>Durée :</strong> 1 heure environ
            </div>
            <div className="text-sm text-muted-foreground">
              L'ambulance arrivera 30 minutes avant votre rendez-vous.
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Interface Professionnelle</h3>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">
              Planning Ambulance AMB-001
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-base leading-relaxed">
              <strong>Patient :</strong> Marie Dupont
            </div>
            <div className="text-sm text-muted-foreground font-mono">
              N° Sécu : 2 85 03 75 123 456 78
            </div>
            <div className="text-sm leading-normal space-y-1">
              <div><strong>Départ :</strong> 14h00 - 123 Rue de la Paix, 75001 Paris</div>
              <div><strong>Arrivée :</strong> 14h30 - Hôpital Saint-Louis</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Messages d'Urgence</h3>
        <div className="p-6 bg-error-50 border border-error-200 rounded-lg">
          <div className="text-xl font-semibold text-error-700 mb-2">
            🚨 ALERTE MÉDICALE
          </div>
          <div className="text-base leading-relaxed text-error-700 mb-4">
            Intervention d'urgence requise immédiatement.
            L'ambulance la plus proche a été mobilisée.
          </div>
          <div className="text-sm text-error-600">
            Temps d'arrivée estimé : 8 minutes
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">📱 Responsive et Accessibilité</h2>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Adaptation Mobile</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Mobile ({'<'} 768px)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>H1 :</strong> 2.5rem → 2rem</p>
              <p><strong>H2 :</strong> 2rem → 1.75rem</p>
              <p><strong>Body :</strong> 1rem → 1.125rem</p>
              <p><strong>Touch targets :</strong> 44px min</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tablet (768px+)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Tailles standard</strong></p>
              <p><strong>Interlignage :</strong> +10%</p>
              <p><strong>Espacement :</strong> Généreux</p>
              <p><strong>Confortable lecture</strong></p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Desktop (1024px+)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Tailles maximales</strong></p>
              <p><strong>Hiérarchie complète</strong></p>
              <p><strong>Densité optimisée</strong></p>
              <p><strong>Multi-colonnes</strong></p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-primary-700">Supports d'Accessibilité</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-success-200 bg-success-50">
            <CardHeader>
              <CardTitle className="text-success-700 flex items-center gap-2">
                ✅ Bonnes Pratiques
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-success-800 space-y-2">
              <ul className="space-y-1 pl-4">
                <li>• Hiérarchie sémantique h1→h6</li>
                <li>• Contraste minimum 4.5:1</li>
                <li>• Taille minimum 16px</li>
                <li>• Interlignage généreux (1.5+)</li>
                <li>• Pas de justification complète</li>
                <li>• Longueur de ligne {'<'} 75 caractères</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="border-error-200 bg-error-50">
            <CardHeader>
              <CardTitle className="text-error-700 flex items-center gap-2">
                ❌ À Éviter
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-error-800 space-y-2">
              <ul className="space-y-1 pl-4">
                <li>• Texte {'<'} 14px (sauf code/legal)</li>
                <li>• Contraste insuffisant</li>
                <li>• Hiérarchie non-sémantique</li>
                <li>• Interlignage trop serré</li>
                <li>• CAPS LOCK excessif</li>
                <li>• Fonts fantaisistes</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <section className="space-y-6">
      <h2 className="text-3xl font-semibold text-foreground">💻 Implémentation CSS</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-4 text-primary-700">Classes Tailwind</h3>
          <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-success-400">/* Titres */</span>
              </div>
              <div>
                <span className="text-primary-400">.h1</span> {`{ `}<span className="text-warning-400">@apply text-5xl font-bold leading-tight;</span> {`}`}
              </div>
              <div>
                <span className="text-primary-400">.h2</span> {`{ `}<span className="text-warning-400">@apply text-4xl font-semibold leading-snug;</span> {`}`}
              </div>
              <div>
                <span className="text-primary-400">.h3</span> {`{ `}<span className="text-warning-400">@apply text-3xl font-semibold leading-snug;</span> {`}`}
              </div>
              <div className="mt-4">
                <span className="text-success-400">/* Corps de texte */</span>
              </div>
              <div>
                <span className="text-primary-400">.text-body</span> {`{ `}<span className="text-warning-400">@apply text-base leading-relaxed;</span> {`}`}
              </div>
              <div>
                <span className="text-primary-400">.text-large</span> {`{ `}<span className="text-warning-400">@apply text-lg leading-loose;</span> {`}`} <span className="text-neutral-400">/* Interface senior */</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4 text-primary-700">Composants React</h3>
          <div className="bg-neutral-900 text-neutral-100 p-4 rounded-lg font-mono text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-success-400">// Composant de titre accessible</span>
              </div>
              <div>
                <span className="text-warning-400">export function</span> <span className="text-primary-400">Heading</span>({`{ `}<span className="text-neutral-300">level = 1, children, className</span>{` }`}) {`{`}
              </div>
              <div className="ml-4">
                <span className="text-warning-400">const</span> <span className="text-neutral-300">Component</span> = <span className="text-green-400">`h$</span><span className="text-yellow-300">{`{level}`}</span><span className="text-green-400">`</span>;
              </div>
              <div className="ml-4">
                <span className="text-warning-400">const</span> <span className="text-neutral-300">sizeClasses</span> = {`{`}
              </div>
              <div className="ml-8">
                <span className="text-yellow-300">1</span>: <span className="text-green-400">'text-5xl font-bold'</span>,
              </div>
              <div className="ml-8">
                <span className="text-yellow-300">2</span>: <span className="text-green-400">'text-4xl font-semibold'</span>
              </div>
              <div className="ml-4">
                {`};`}
              </div>
              <div className="ml-4">
                <span className="text-warning-400">return</span> <span className="text-primary-400">{'<'}Component</span> <span className="text-neutral-300">className</span>={`{`}<span className="text-primary-400">cn</span>(<span className="text-neutral-300">sizeClasses[level]</span>){`}`}<span className="text-primary-400">{'>'}</span>
              </div>
              <div>
                {`}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="mt-12 p-6 bg-muted rounded-lg text-center">
      <h3 className="text-xl font-semibold mb-2">
        ✍️ Typographie Accessible
      </h3>
      <p className="text-sm text-muted-foreground">
        Hiérarchie sémantique • Lisibilité optimisée • WCAG 2.1 AA • Interface senior-friendly
      </p>
    </div>
  </div>
)

export const Typography: Story = {
  render: () => <TypographyDocPage />,
  parameters: {
    layout: 'fullscreen',
  },
}