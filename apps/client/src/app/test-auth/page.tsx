"use client"

import { useState } from "react"
import { Button, Input, Label } from "@repo/ui"

export default function TestAuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, setResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const testAuth = async () => {
    setIsLoading(true)
    setResult("🔄 Test en cours...")
    
    try {
      console.log("🧪 Test direct de l'API d'authentification")
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      console.log("📡 Status:", response.status, response.statusText)
      console.log("📡 Headers:", Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        const errorData = await response.json()
        console.log("❌ Erreur:", errorData)
        setResult(`❌ Erreur ${response.status}: ${errorData.error || 'Erreur inconnue'}`)
        return
      }

      const userData = await response.json()
      console.log("✅ Succès:", userData)
      setResult(`✅ Connexion réussie pour ${userData.user.firstName} ${userData.user.lastName}`)

    } catch (error) {
      console.error("🚨 Erreur réseau:", error)
      setResult(`🚨 Erreur réseau: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testWithMockData = () => {
    setEmail("patient@havrid.fr")
    setPassword("password123")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Test d'authentification</h1>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="patient@havrid.fr"
          />
        </div>
        
        <div>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
          />
        </div>
        
        <div className="flex gap-2">
          <Button onClick={testAuth} disabled={isLoading}>
            {isLoading ? "Test..." : "Tester API"}
          </Button>
          <Button onClick={testWithMockData} variant="outline">
            Données test
          </Button>
        </div>
        
        {result && (
          <div className="p-4 border rounded-md bg-muted">
            <pre className="text-sm whitespace-pre-wrap">{result}</pre>
          </div>
        )}
        
        <div className="mt-8 text-sm text-muted-foreground">
          <h3 className="font-medium">Comptes de test disponibles:</h3>
          <ul className="mt-2 space-y-1">
            <li>📧 patient@havrid.fr / 🔑 password123</li>
            <li>📧 test@test.fr / 🔑 test123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}