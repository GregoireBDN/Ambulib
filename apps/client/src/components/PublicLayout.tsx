"use client"

interface PublicLayoutProps {
  children: React.ReactNode
}

/**
 * Layout public qui n'utilise pas d'authentification
 * Utilisé pour les pages accessibles à tous (landing page, auth pages)
 */
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  )
}