"use client"

import { useState, useEffect } from "react"

interface ClientOnlyWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  timeout?: number
}

export default function ClientOnlyWrapper({ 
  children, 
  fallback = (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    </div>
  ),
  timeout = 5000
}: ClientOnlyWrapperProps) {
  const [isClient, setIsClient] = useState(false)
  const [hasTimedOut, setHasTimedOut] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Safety timeout to prevent infinite loading
    const timer = setTimeout(() => {
      setHasTimedOut(true)
    }, timeout)

    return () => clearTimeout(timer)
  }, [timeout])

  if (!isClient && !hasTimedOut) {
    return <>{fallback}</>
  }

  return <>{children}</>
}