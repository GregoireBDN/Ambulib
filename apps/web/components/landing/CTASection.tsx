import { Button } from "@repo/ui";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { ClientIcon } from "@/components/accessible/ClientIcon";
import Link from "next/link";

const CTASection = (): React.JSX.Element => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à simplifier vos transports médicaux ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Rejoignez des milliers d&apos;utilisateurs qui font déjà confiance à
            Ambulib pour leurs déplacements médicaux. Créez votre compte
            gratuitement et commencez dès aujourd&apos;hui.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="cta-white" size="cta" asChild>
              <Link href="/auth/signup">
                Commencer maintenant
                <ClientIcon icon={ArrowRight} className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="cta-outline-white" size="cta" asChild>
              <Link href="/auth/signin">Se connecter</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <ClientIcon icon={Phone} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Support 24/7
              </h3>
              <p className="text-blue-100">
                Notre équipe est disponible 24h/24 et 7j/7 pour vous
                accompagner.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center mb-4">
                <ClientIcon icon={Mail} className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Contactez-nous
              </h3>
              <p className="text-blue-100">
                Une question ? Notre équipe est là pour vous répondre
                rapidement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
