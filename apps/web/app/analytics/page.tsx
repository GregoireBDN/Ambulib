import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AccessibleChart from "@/components/accessible/AccessibleChart";

/**
 * Page d'analytiques avec graphiques accessibles
 * Démontre l'utilisation des graphiques Recharts avec alternatives textuelles
 */

// Données de démonstration
const monthlyBookingsData = [
  { name: "Janvier", value: 45 },
  { name: "Février", value: 52 },
  { name: "Mars", value: 38 },
  { name: "Avril", value: 61 },
  { name: "Mai", value: 48 },
  { name: "Juin", value: 55 },
];

const serviceTypesData = [
  { name: "Rendez-vous médical", value: 156 },
  { name: "Urgence", value: 23 },
  { name: "Transport dialyse", value: 89 },
  { name: "Kinésithérapie", value: 67 },
  { name: "Examens médicaux", value: 134 },
];

const satisfactionData = [
  { name: "Très satisfait", value: 78 },
  { name: "Satisfait", value: 18 },
  { name: "Neutre", value: 3 },
  { name: "Insatisfait", value: 1 },
];

export default async function AnalyticsPage(): Promise<React.JSX.Element> {
  const session = await getSession();
  
  // Redirection si non connecté
  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Statistiques Accessibles
          </h1>
          <p className="text-xl text-gray-600">
            Graphiques avec alternatives textuelles et navigation clavier
          </p>
        </div>

        {/* Grille des graphiques */}
        <div className="space-y-8">
          {/* Graphique linéaire - Évolution mensuelle */}
          <AccessibleChart
            data={monthlyBookingsData}
            type="line"
            title="Évolution des réservations par mois"
            description="Suivi de l'activité mensuelle sur les 6 derniers mois"
            xDataKey="name"
            yDataKey="value"
            unit="réservations"
            height={400}
            summaryGenerator={(data) => {
              const total = data.reduce((sum, item) => sum + item.value, 0);
              const average = Math.round(total / data.length);
              const lastValue = data[data.length - 1]?.value ?? 0;
              const firstValue = data[0]?.value ?? 0;
              const trend = lastValue > firstValue ? "croissante" : "décroissante";
              return `Sur les 6 derniers mois, nous avons traité ${total} réservations au total, soit une moyenne de ${average} par mois. La tendance est ${trend}.`;
            }}
          />

          {/* Graphique en barres - Types de services */}
          <AccessibleChart
            data={serviceTypesData}
            type="bar"
            title="Répartition par type de service"
            description="Distribution des différents types de transports médicaux"
            xDataKey="name"
            yDataKey="value"
            unit="transports"
            height={400}
            summaryGenerator={(data) => {
              const total = data.reduce((sum, item) => sum + item.value, 0);
              const mostPopular = data.reduce((max, item) => item.value > max.value ? item : max);
              return `Sur ${total} transports, "${mostPopular.name}" est le service le plus demandé avec ${mostPopular.value} transports (${Math.round((mostPopular.value / total) * 100)}% du total).`;
            }}
          />

          {/* Graphique circulaire - Satisfaction client */}
          <AccessibleChart
            data={satisfactionData}
            type="pie"
            title="Satisfaction des clients"
            description="Répartition des niveaux de satisfaction des utilisateurs"
            xDataKey="name"
            yDataKey="value"
            unit="%"
            height={400}
            summaryGenerator={(data) => {
              const satisfied = data.filter(item => 
                item.name.includes("satisfait") && !item.name.includes("Insatisfait")
              ).reduce((sum, item) => sum + item.value, 0);
              return `${satisfied}% de nos clients sont satisfaits ou très satisfaits de nos services. Seuls ${data.find(item => item.name === "Insatisfait")?.value || 0}% expriment une insatisfaction.`;
            }}
          />
        </div>

        {/* Aide et explications */}
        <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Comment utiliser ces graphiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Navigation accessible
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Utilisez Tab pour naviguer entre les boutons</li>
                <li>• Cliquez &quot;Tableau&quot; pour voir les données</li>
                <li>• Le résumé explique les points clés</li>
                <li>• Tous les graphiques sont lisibles par les lecteurs d&apos;écran</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Alternatives disponibles
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Vue tableau avec bordures contrastées</li>
                <li>• Résumé textuel en langage naturel</li>
                <li>• Couleurs distinctes + descriptions</li>
                <li>• Navigation clavier complète</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}