import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ambulib Admin",
  description: "Interface d'administration pour la gestion complète du système Ambulib",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}