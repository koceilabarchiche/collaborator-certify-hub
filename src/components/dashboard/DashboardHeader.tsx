
import { StatCard } from "./StatCard";
import { 
  User, 
  Award, 
  AlertTriangle, 
  CheckCheck
} from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Consultez et gérez les certifications de vos collaborateurs
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Collaborateurs"
          value="5"
          icon={User}
          trend={{ value: 20, isPositive: true }}
          subtitle="Total des collaborateurs"
        />
        <StatCard
          title="Certifications"
          value="11"
          icon={Award}
          variant="primary"
          trend={{ value: 15, isPositive: true }}
          subtitle="Certifications actives"
        />
        <StatCard
          title="À renouveler"
          value="1"
          icon={AlertTriangle}
          variant="warning"
          subtitle="Expirent dans 30 jours"
        />
        <StatCard
          title="Expirées"
          value="2"
          icon={CheckCheck}
          variant="danger"
          subtitle="Nécessitent une action"
        />
      </div>
    </div>
  );
}
