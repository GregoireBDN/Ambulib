import type { NextPage } from "next";
import { getSession } from "@/lib/session";
import { Role } from "@/lib/type";

// Import des composants accessibles
import AccessibleHeroSection from "@/components/landing/AccessibleHeroSection";
import ClientDashboard from "@/components/dashboards/ClientDashboard";
import Dashboard from "@/components/dashboard/Dashboard";

const Home: NextPage = async () => {
  const session = await getSession();
  const isAuthenticated = !!session?.user;
  const userRole = session?.user?.role;

  // Landing page accessible pour utilisateurs non connectés
  if (!isAuthenticated) {
    return <AccessibleHeroSection />;
  }

  // Dashboard spécialisé pour les clients (personnes âgées/handicapées)
  if (userRole === Role.USER) {
    return (
      <ClientDashboard 
        userRole={userRole} 
        userName={session.user.firstName || "Utilisateur"}
      />
    );
  }

  // Dashboard standard pour les autres rôles (ADMIN, FLEET_MANAGER, DRIVER)
  return <Dashboard userRole={userRole as Role} />;
};

export default Home;
