"use client"

import ProtectedLayout from "@/components/ProtectedLayout"

export default function DocumentsPage() {
  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Mes documents
        </h1>
        <p className="text-lg text-muted-foreground">
          Gérez vos papiers administratifs, carte de mutuelle et bons de transport.
        </p>
      </main>
    </ProtectedLayout>
  )
}