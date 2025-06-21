import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  LayoutDashboard,
  Settings,
  Car,
  UserCheck,
  Zap,
  Heart,
} from "lucide-react";
import { Role } from "@/lib/type";

interface QuickActionsSectionProps {
  userRole: Role;
}

const QuickActionsSection = ({ userRole }: QuickActionsSectionProps) => {
  const adminActions = [
    {
      icon: LayoutDashboard,
      title: "Tableau de bord",
      description:
        "Supervisez l'activité de la plateforme et gérez les utilisateurs.",
      buttonText: "Accéder au dashboard",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonVariant: "action-purple" as const,
    },
    {
      icon: UserCheck,
      title: "Gestion des utilisateurs",
      description: "Gérez les comptes utilisateurs et les permissions.",
      buttonText: "Gérer les utilisateurs",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonVariant: "action-primary" as const,
    },
    {
      icon: Settings,
      title: "Paramètres",
      description: "Configurez les paramètres de la plateforme.",
      buttonText: "Configurer",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      buttonVariant: "action-success" as const,
    },
  ];

  const driverActions = [
    {
      icon: Car,
      title: "Gérer mes ambulances",
      description: "Ajoutez et gérez votre flotte d'ambulances.",
      buttonText: "Gérer la flotte",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonVariant: "action-primary" as const,
    },
    {
      icon: Zap,
      title: "Réservations",
      description: "Consultez et gérez vos réservations en cours.",
      buttonText: "Voir les réservations",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      buttonVariant: "action-success" as const,
    },
    {
      icon: Settings,
      title: "Paramètres",
      description: "Configurez votre profil et vos préférences.",
      buttonText: "Configurer",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonVariant: "action-purple" as const,
    },
  ];

  const userActions = [
    {
      icon: Car,
      title: "Réserver une ambulance",
      description: "Trouvez et réservez rapidement une ambulance.",
      buttonText: "Réserver maintenant",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonVariant: "action-primary" as const,
    },
    {
      icon: Heart,
      title: "Mes réservations",
      description: "Consultez l'historique de vos réservations.",
      buttonText: "Voir mes réservations",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      buttonVariant: "action-success" as const,
    },
    {
      icon: Settings,
      title: "Mon profil",
      description: "Gérez vos informations personnelles et préférences.",
      buttonText: "Modifier le profil",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonVariant: "action-purple" as const,
    },
  ];

  const getActions = () => {
    switch (userRole) {
      case Role.ADMIN:
        return adminActions;
      case Role.DRIVER:
        return driverActions;
      case Role.USER:
        return userActions;
      default:
        return [];
    }
  };

  const actions = getActions();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {actions.map((action, index) => (
        <Card
          key={index}
          className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <CardHeader className="text-center pb-4">
            <div
              className={`mx-auto w-16 h-16 ${action.bgColor} rounded-full flex items-center justify-center mb-4`}
            >
              <action.icon className={`h-8 w-8 ${action.iconColor}`} />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900">
              {action.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">{action.description}</p>
            <Button
              variant={action.buttonVariant}
              size="action"
              className="w-full"
            >
              {action.buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickActionsSection;
