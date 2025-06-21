import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Shield, CreditCard, Users, Star } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Clock,
      title: "Réservation 24/7",
      description:
        "Réservez votre ambulance à tout moment, jour et nuit, en quelques clics.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MapPin,
      title: "Géolocalisation précise",
      description:
        "Trouvez l'ambulance la plus proche et suivez son trajet en temps réel.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Shield,
      title: "Sécurité garantie",
      description:
        "Tous nos partenaires sont certifiés et nos véhicules respectent les normes de sécurité.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: CreditCard,
      title: "Paiement sécurisé",
      description:
        "Paiement en ligne sécurisé avec transparence totale sur les tarifs.",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: Users,
      title: "Équipes qualifiées",
      description:
        "Des professionnels de santé expérimentés pour votre sécurité.",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      icon: Star,
      title: "Service premium",
      description:
        "Un service client disponible 24h/24 pour répondre à tous vos besoins.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Ambulib ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avantages qui font d'Ambulib la solution de référence
            pour le transport médical.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`mx-auto w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
