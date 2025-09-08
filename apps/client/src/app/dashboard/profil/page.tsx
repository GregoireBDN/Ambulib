"use client"

import ProtectedLayout from "@/components/ProtectedLayout"

export default function ProfilPage() {
  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Mon profil
        </h1>
        <p className="text-lg text-muted-foreground">
          Modifiez vos informations personnelles et paramètres de compte.
        </p>
      </main>
    </ProtectedLayout>
  )
}