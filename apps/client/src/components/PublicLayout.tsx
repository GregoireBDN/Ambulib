"use client"

interface PublicLayoutProps {
  children: React.ReactNode
}

/**
 * Layout public qui n'utilise pas d'authentification
 * Utilisé pour les pages accessibles à tous (landing page, auth pages)
 * Optimisé pour l'accessibilité WCAG 2.1 AA
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Aller au contenu principal
      </a>
      
      <header role="banner" className="sr-only">
        <h1>HavRid - Service de transport médical</h1>
      </header>
      
      <main id="main-content" role="main">
        {children}
      </main>
    </div>
  )
}