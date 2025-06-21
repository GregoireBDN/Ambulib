import type { NextPage } from "next";
import { getSession } from "@/lib/session";
import { Role } from "@/lib/type";

// Import des composants modulaires
import LandingPage from "@/components/landing/LandingPage";
import Dashboard from "@/components/dashboard/Dashboard";

const Home: NextPage = async () => {
  const session = await getSession();
  const isAuthenticated = !!session?.user;
  const userRole = session?.user?.role;

  // Landing page pour utilisateurs non connectés
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Dashboard pour utilisateurs connectés
  return <Dashboard userRole={userRole as Role} />;
};

export default Home;
