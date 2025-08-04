import { Button } from "@repo/ui";

const HelpSection = (): React.JSX.Element => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Besoin d'aide ?</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Support client
          </h3>
          <p className="text-gray-600 mb-4">
            Notre équipe est disponible 24h/24 pour vous accompagner.
          </p>
          <Button variant="outline-primary">Contacter le support</Button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Centre d'aide
          </h3>
          <p className="text-gray-600 mb-4">
            Consultez notre base de connaissances et nos tutoriels.
          </p>
          <Button variant="outline-success">Accéder à l'aide</Button>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
