import HeroSection from "./HeroSection";
import AudiencesSection from "./AudiencesSection";
import FeaturesSection from "./FeaturesSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";

const LandingPage = (): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <HeroSection />
      <AudiencesSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
