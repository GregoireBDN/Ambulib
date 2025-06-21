import { Role } from "@/lib/type";

interface DashboardHeaderProps {
  userRole: Role;
}

const DashboardHeader = ({ userRole }: DashboardHeaderProps) => {
  const getWelcomeMessage = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "Gérez votre plateforme et supervisez toutes les activités.";
      case Role.DRIVER:
        return "Gérez vos ambulances et vos réservations.";
      case Role.USER:
        return "Trouvez et réservez rapidement le transport médical dont vous avez besoin.";
      default:
        return "Bienvenue sur Ambulib.";
    }
  };

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        Bienvenue sur Ambulib
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        {getWelcomeMessage(userRole)}
      </p>
    </div>
  );
};

export default DashboardHeader;
