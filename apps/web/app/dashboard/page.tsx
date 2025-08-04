import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Role } from "@/lib/type";
import ClientDashboard from "@/components/dashboards/ClientDashboard";
import Dashboard from "@/components/dashboard/Dashboard";

/**
 * Page dashboard accessible avec redirection selon le rôle utilisateur
 * Utilise des interfaces spécialisées pour chaque type d'utilisateur
 */
export default async function DashboardPage(): Promise<React.JSX.Element> {
  const session = await getSession();
  
  // Redirection si non connecté
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const userRole = session.user.role as Role;
  const userName = session.user.firstName || "Utilisateur";

  // Dashboard spécialisé pour les clients (personnes âgées/handicapées)
  if (userRole === Role.USER) {
    return (
      <ClientDashboard 
        userRole={userRole} 
        userName={userName}
      />
    );
  }

  // Dashboard standard pour les autres rôles (ADMIN, FLEET_MANAGER, DRIVER)
  return <Dashboard userRole={userRole} />;
}
