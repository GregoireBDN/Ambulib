import { Users, MapPin, Star, Clock } from "lucide-react";

const StatsSection = (): React.JSX.Element => {
  const stats = [
    {
      icon: Users,
      value: "50,000+",
      label: "Patients transportés",
      description: "Depuis notre lancement",
    },
    {
      icon: MapPin,
      value: "200+",
      label: "Villes couvertes",
      description: "Partout en France",
    },
    {
      icon: Star,
      value: "4.9/5",
      label: "Note moyenne",
      description: "Basée sur 10,000+ avis",
    },
    {
      icon: Clock,
      value: "< 15 min",
      label: "Temps d'arrivée moyen",
      description: "En zone urbaine",
    },
  ];

  return (
    <section className="py-20 bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ambulib en chiffres
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Découvrez l&apos;impact d&apos;Ambulib sur le transport médical en France.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="mx-auto w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-300">
                <stat.icon className="h-10 w-10 text-white" />
              </div>
              <div className="text-white">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-blue-100 text-sm">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
