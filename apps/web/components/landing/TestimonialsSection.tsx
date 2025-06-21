import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Patient",
      content:
        "Ambulib m'a sauvé la vie ! J'ai pu réserver une ambulance en urgence à 3h du matin. L'équipe était professionnelle et rassurante.",
      rating: 5,
      avatar: "MD",
    },
    {
      name: "Dr. Jean Martin",
      role: "Médecin",
      content:
        "En tant que médecin, je recommande Ambulib à mes patients. Le service est fiable et les équipes sont bien formées.",
      rating: 5,
      avatar: "JM",
    },
    {
      name: "Sophie Bernard",
      role: "Famille de patient",
      content:
        "Transport impeccable pour ma mère. Le suivi en temps réel nous a beaucoup rassurés. Je recommande vivement !",
      rating: 5,
      avatar: "SB",
    },
    {
      name: "Pierre Moreau",
      role: "Directeur d'entreprise d'ambulance",
      content:
        "Ambulib nous a permis d'augmenter notre activité de 40%. La plateforme est intuitive et le support client excellent.",
      rating: 5,
      avatar: "PM",
    },
    {
      name: "Claire Leroy",
      role: "Infirmière",
      content:
        "Je travaille avec Ambulib depuis 2 ans. La coordination est parfaite et les délais d'intervention respectés.",
      rating: 5,
      avatar: "CL",
    },
    {
      name: "Thomas Roux",
      role: "Patient régulier",
      content:
        "Je dois me déplacer régulièrement pour mes soins. Ambulib simplifie vraiment mes déplacements. Service de qualité !",
      rating: 5,
      avatar: "TR",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de nos patients, médecins et partenaires
            qui font confiance à Ambulib.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {testimonial.avatar}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-blue-200" />
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
