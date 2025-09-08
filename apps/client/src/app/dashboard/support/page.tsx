"use client"

import ProtectedLayout from "@/components/ProtectedLayout"

export default function SupportPage() {
  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Support et aide
        </h1>
        <p className="text-lg text-muted-foreground">
          Trouvez de l'aide, consultez la FAQ et contactez notre équipe support.
        </p>
      </main>
    </ProtectedLayout>
  )
}