"use client"

import ProtectedLayout from "@/components/ProtectedLayout"

export default function MedicalPage() {
  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Dossier médical
        </h1>
        <p className="text-lg text-muted-foreground">
          Centralisez vos documents médicaux, ordonnances et informations de santé.
        </p>
      </main>
    </ProtectedLayout>
  )
}