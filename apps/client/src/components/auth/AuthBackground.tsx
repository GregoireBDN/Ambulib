interface AuthBackgroundProps {
  children: React.ReactNode
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {children}
    </div>
  )
}