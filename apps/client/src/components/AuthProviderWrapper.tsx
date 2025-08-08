"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

interface AuthProviderWrapperProps {
  children: React.ReactNode
}

// Dynamic import du AuthProvider complet sans SSR
const DynamicAuthProvider = dynamic(
  () => import("@/contexts/AuthContext").then(mod => ({ default: mod.AuthProvider })), 
  { ssr: false }
)

function AuthLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="text-muted-foreground">Initialisation de votre session...</p>
      </div>
    </div>
  )
}

export default function AuthProviderWrapper({ children }: AuthProviderWrapperProps) {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <DynamicAuthProvider>
        {children}
      </DynamicAuthProvider>
    </Suspense>
  )
}