"use client";

import React, { useState } from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Eye, EyeOff, BarChart3, Table, TrendingUp } from "lucide-react";
import { LargeButton } from "./LargeButton";
import { SeniorCard } from "./SeniorCard";

/**
 * AccessibleChart - Composant graphique accessible avec alternatives
 * Optimisé pour les personnes âgées et handicapées
 * 
 * Fonctionnalités d'accessibilité :
 * - Alternative textuelle complète
 * - Navigation clavier
 * - Couleurs distinctes + patterns
 * - Descriptions ARIA
 * - Mode tableau de données
 * - Résumé en langage naturel
 */

interface DataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface AccessibleChartProps {
  /** Données du graphique */
  data: DataPoint[];
  /** Type de graphique */
  type: "line" | "bar" | "pie";
  /** Titre du graphique */
  title: string;
  /** Description du graphique */
  description?: string;
  /** Clé des données pour l'axe X */
  xDataKey?: string;
  /** Clé des données pour l'axe Y */
  yDataKey?: string;
  /** Couleur principale */
  color?: string;
  /** Hauteur du graphique */
  height?: number;
  /** Unité des valeurs (€, %, personnes, etc.) */
  unit?: string;
  /** Générateur de résumé personnalisé */
  summaryGenerator?: (data: DataPoint[]) => string;
}

// Couleurs accessibles avec bon contraste
const ACCESSIBLE_COLORS = [
  "#1f77b4", // Bleu
  "#ff7f0e", // Orange
  "#2ca02c", // Vert
  "#d62728", // Rouge
  "#9467bd", // Violet
  "#8c564b", // Marron
  "#e377c2", // Rose
  "#7f7f7f", // Gris
];

const AccessibleChart = ({
  data,
  type,
  title,
  description,
  xDataKey = "name",
  yDataKey = "value", 
  color = ACCESSIBLE_COLORS[0],
  height = 300,
  unit = "",
  summaryGenerator,
}: AccessibleChartProps) => {
  const [showTable, setShowTable] = useState(false);
  const [showSummary, setShowSummary] = useState(true);

  // Génération automatique du résumé
  const generateSummary = (): string => {
    if (summaryGenerator) {
      return summaryGenerator(data);
    }

    if (!data.length) return "Aucune donnée disponible.";

    const values = data.map(d => d[yDataKey] as number);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const maxItem = data.find(d => d[yDataKey] === max);
    const minItem = data.find(d => d[yDataKey] === min);

    switch (type) {
      case "line":
        return `Ce graphique linéaire montre l'évolution de ${data.length} points de données. La valeur moyenne est de ${average.toFixed(1)} ${unit}. Le point le plus élevé est "${maxItem?.name}" avec ${max} ${unit}, et le plus bas est "${minItem?.name}" avec ${min} ${unit}.`;
      
      case "bar":
        return `Ce graphique en barres compare ${data.length} éléments. La valeur totale est de ${total.toFixed(1)} ${unit}. "${maxItem?.name}" a la valeur la plus élevée (${max} ${unit}), tandis que "${minItem?.name}" a la plus faible (${min} ${unit}).`;
      
      case "pie": {
        const percentage = ((max / total) * 100).toFixed(1);
        return `Ce graphique circulaire répartit ${data.length} catégories pour un total de ${total.toFixed(1)} ${unit}. "${maxItem?.name}" représente la plus grande part avec ${percentage}% (${max} ${unit}).`;
      }
      
      default:
        return `Données présentées : ${data.length} éléments, total de ${total.toFixed(1)} ${unit}.`;
    }
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 60 },
    };

    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey={xDataKey}
                tick={{ fontSize: 14, fill: "#374151" }}
                tickLine={{ stroke: "#6b7280" }}
              />
              <YAxis 
                tick={{ fontSize: 14, fill: "#374151" }}
                tickLine={{ stroke: "#6b7280" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#f9fafb", 
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px"
                }}
              />
              <Legend wrapperStyle={{ fontSize: "16px", paddingTop: "20px" }} />
              <Line 
                type="monotone" 
                dataKey={yDataKey}
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: color, strokeWidth: 2 }}
                name={`${yDataKey} (${unit})`}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey={xDataKey}
                tick={{ fontSize: 14, fill: "#374151" }}
                tickLine={{ stroke: "#6b7280" }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                tick={{ fontSize: 14, fill: "#374151" }}
                tickLine={{ stroke: "#6b7280" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#f9fafb", 
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px"
                }}
              />
              <Legend wrapperStyle={{ fontSize: "16px", paddingTop: "20px" }} />
              <Bar 
                dataKey={yDataKey}
                fill={color}
                name={`${yDataKey} (${unit})`}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={height}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={yDataKey}
                fontSize={14}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={ACCESSIBLE_COLORS[index % ACCESSIBLE_COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "#f9fafb", 
                  border: "2px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px"
                }}
              />
              <Legend wrapperStyle={{ fontSize: "16px", paddingTop: "20px" }} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return <div>Type de graphique non supporté</div>;
    }
  };

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-2 border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-2 border-gray-300 px-4 py-3 text-lg font-semibold text-gray-900">
              {xDataKey}
            </th>
            <th className="border-2 border-gray-300 px-4 py-3 text-lg font-semibold text-gray-900">
              {yDataKey} {unit && `(${unit})`}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border-2 border-gray-300 px-4 py-3 text-lg text-gray-900">
                {item[xDataKey]}
              </td>
              <td className="border-2 border-gray-300 px-4 py-3 text-lg text-gray-900">
                {item[yDataKey]} {unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <SeniorCard
      title={title}
      description={description}
      size="large"
      icon={BarChart3}
    >
      {/* Contrôles d'accessibilité */}
      <div className="flex flex-wrap gap-3 mb-6">
        <LargeButton
          variant={showTable ? "secondary" : "primary"}
          size="default"
          onClick={() => setShowTable(!showTable)}
          ariaLabel={showTable ? "Afficher le graphique" : "Afficher le tableau de données"}
        >
          {showTable ? (
            <>
              <BarChart3 className="h-5 w-5" aria-hidden="true" />
              Graphique
            </>
          ) : (
            <>
              <Table className="h-5 w-5" aria-hidden="true" />
              Tableau
            </>
          )}
        </LargeButton>

        <LargeButton
          variant="outline"
          size="default"
          onClick={() => setShowSummary(!showSummary)}
          ariaLabel={showSummary ? "Masquer le résumé" : "Afficher le résumé"}
        >
          {showSummary ? (
            <>
              <EyeOff className="h-5 w-5" aria-hidden="true" />
              Masquer résumé
            </>
          ) : (
            <>
              <Eye className="h-5 w-5" aria-hidden="true" />
              Voir résumé
            </>
          )}
        </LargeButton>
      </div>

      {/* Résumé textuel */}
      {showSummary && (
        <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-6 w-6 text-blue-600 shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h4 className="text-lg font-semibold text-blue-900 mb-2">
                Résumé des données
              </h4>
              <p className="text-blue-800 leading-relaxed text-lg">
                {generateSummary()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Graphique ou tableau */}
      <div 
        role="img"
        aria-label={`${title}. ${generateSummary()}`}
        className="w-full"
      >
        {showTable ? renderTable() : renderChart()}
      </div>

      {/* Aide contextuelle */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <p className="text-gray-600 text-center">
          {showTable 
            ? "Conseil : Utilisez les boutons ci-dessus pour revenir au graphique ou voir le résumé"
            : "Conseil : Cliquez sur 'Tableau' pour voir les données sous forme de tableau accessible"
          }
        </p>
      </div>
    </SeniorCard>
  );
};

export default AccessibleChart;