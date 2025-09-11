"use client"

import { Button } from "@repo/ui"
import ProtectedLayout from "@/components/ProtectedLayout"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/trajets" className="block">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-medium">Trajets</span>
              <span className="text-sm text-muted-foreground">Gérer mes trajets</span>
            </Button>
          </Link>

          <Link href="/dashboard/medical" className="block">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-medium">Profil médical</span>
              <span className="text-sm text-muted-foreground">Mes informations médicales</span>
            </Button>
          </Link>

          <Link href="/dashboard/profil" className="block">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-medium">Mon profil</span>
              <span className="text-sm text-muted-foreground">Informations personnelles</span>
            </Button>
          </Link>

          <Link href="/dashboard/historique" className="block">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-medium">Historique</span>
              <span className="text-sm text-muted-foreground">Mes trajets passés</span>
            </Button>
          </Link>

          <Link href="/dashboard/documents" className="block">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-medium">Documents</span>
              <span className="text-sm text-muted-foreground">Mes documents médicaux</span>
            </Button>
          </Link>

          <Link href="/dashboard/dependants" className="block">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-medium">Mes proches</span>
              <span className="text-sm text-muted-foreground">Gérer les dépendants</span>
            </Button>
          </Link>

          <Link href="/dashboard/support" className="block">
            <Button variant="outline" className="w-full h-20 text-left flex flex-col items-start justify-center">
              <span className="font-medium">Support</span>
              <span className="text-sm text-muted-foreground">Centre d'aide</span>
            </Button>
          </Link>
        </div>
      </main>
    </ProtectedLayout>
  )
}