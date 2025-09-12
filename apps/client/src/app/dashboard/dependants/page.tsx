"use client"

import ProtectedLayout from "@/components/ProtectedLayout"

export default function DependantsPage() {
  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Personnes à charge
        </h1>
        <p className="text-lg text-muted-foreground">
          Gérez les informations et trajets de vos proches et personnes à charge.
        </p>
      </main>
    </ProtectedLayout>
  )
}