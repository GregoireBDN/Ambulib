"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

interface AuthProviderWrapperProps {
  children: React.ReactNode
}

// Dynamic import du AuthProvider sans SSR
const DynamicAuthProvider = dynamic(
  () => import("@/contexts/AuthContext").then(mod => ({ default: mod.AuthProvider })), 
  { ssr: false }
)

export default function AuthProviderWrapper({ children }: AuthProviderWrapperProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show loading only briefly during initial client hydration
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Initialisation...</p>
        </div>
      </div>
    )
  }

  // Always provide the AuthProvider context once client-side
  return (
    <DynamicAuthProvider>
      {children}
    </DynamicAuthProvider>
  )
}