import type { Metadata, Viewport } from "next"
import "./globals.css"
import AuthProviderWrapper from "@/components/AuthProviderWrapper"

export const metadata: Metadata = {
  title: {
    template: "%s | Ambulib",
    default: "Ambulib - Services d'ambulance sécurisés"
  },
  description: "Interface client pour les services d'ambulance Ambulib - Transport médical sécurisé et accessible",
  keywords: ["ambulance", "transport médical", "urgence", "accessibilité", "santé"],
  authors: [{ name: "Ambulib" }],
  creator: "Ambulib",
  publisher: "Ambulib",
  robots: {
    index: false, // Interface privée
    follow: false,
  },
  openGraph: {
    title: "Ambulib - Services d'ambulance",
    description: "Interface sécurisée pour vos trajets médicaux",
    type: "website",
    locale: "fr_FR",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Accessibilité - permettre le zoom
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProviderWrapper>
          <div className="relative flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </AuthProviderWrapper>
      </body>
    </html>
  )
}