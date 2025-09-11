import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard - Ambulib",
    default: "Dashboard - Ambulib"
  },
  description: "Espace personnel patient - Gestion de vos trajets médicaux",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      {children}
    </>
  )
}