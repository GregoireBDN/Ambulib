"use client"

import ProtectedLayout from "@/components/ProtectedLayout"

export default function HistoriquePage() {
  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Historique des trajets
        </h1>
        <p className="text-lg text-muted-foreground">
          Consultez l'historique de tous vos trajets passés avec leur statut et détails.
        </p>
      </main>
    </ProtectedLayout>
  )
}