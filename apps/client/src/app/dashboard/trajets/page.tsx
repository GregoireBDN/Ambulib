"use client"

import ProtectedLayout from "@/components/ProtectedLayout"

export default function TrajetsPage() {
  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Planifier vos trajets
        </h1>
        <p className="text-lg text-muted-foreground">
          Planifiez vos prochains transports médicaux en renseignant vos besoins et préférences.
        </p>
      </main>
    </ProtectedLayout>
  )
}