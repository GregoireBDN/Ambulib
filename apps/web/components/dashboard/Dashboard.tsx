import { Role } from "@/lib/type";
import DashboardHeader from "./DashboardHeader";
import QuickActionsSection from "./QuickActionsSection";
import HelpSection from "./HelpSection";

interface DashboardProps {
  userRole: Role;
}

const Dashboard = ({ userRole }: DashboardProps): React.JSX.Element => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DashboardHeader userRole={userRole} />
        <QuickActionsSection userRole={userRole} />
        <HelpSection />
      </div>
    </div>
  );
};

export default Dashboard;
