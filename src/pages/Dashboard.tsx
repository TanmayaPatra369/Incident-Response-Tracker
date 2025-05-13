
import { useEffect, useState } from "react";
import { Activity, AlertCircle, CheckCircle2, Clock, FileWarning } from "lucide-react";
import { useIncidents } from "@/contexts/IncidentContext";
import { Button } from "@/components/ui/button";
import IncidentsList from "@/components/incidents/IncidentsList";
import StatCard from "@/components/dashboard/StatCard";
import IncidentsChart from "@/components/dashboard/IncidentsChart";
import StatusDistribution from "@/components/dashboard/StatusDistribution";
import { Incident } from "@/types/incident";
import { Link } from "react-router-dom";
import { hoursElapsed } from "@/lib/date-utils";

const Dashboard = () => {
  const { incidents, loading } = useIncidents();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    avgResolutionTime: 0,
  });

  useEffect(() => {
    if (incidents.length > 0) {
      const openIncidents = incidents.filter((inc) => inc.status === "Open");
      const inProgressIncidents = incidents.filter((inc) => inc.status === "In Progress");
      const resolvedIncidents = incidents.filter((inc) => inc.status === "Resolved");
      
      // Calculate average resolution time for resolved incidents
      let totalResolutionTime = 0;
      let resolvedCount = resolvedIncidents.length;
      
      resolvedIncidents.forEach((incident) => {
        const createdAt = new Date(incident.createdAt);
        const resolvedAt = new Date(incident.updatedAt);
        totalResolutionTime += hoursElapsed(createdAt, resolvedAt);
      });
      
      const avgResolutionTime = resolvedCount > 0 
        ? Math.round((totalResolutionTime / resolvedCount) * 10) / 10 
        : 0;
      
      setStats({
        total: incidents.length,
        open: openIncidents.length,
        inProgress: inProgressIncidents.length,
        resolved: resolvedCount,
        avgResolutionTime,
      });
    }
  }, [incidents]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <Link to="/incidents/create">
          <Button>
            <FileWarning className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Incidents" 
          value={stats.total} 
          icon={Activity}
          description="All time incidents" 
        />
        <StatCard 
          title="Open Incidents" 
          value={stats.open} 
          icon={AlertCircle}
          description="Waiting for action"
          className={stats.open > 0 ? "border-red-200" : ""} 
        />
        <StatCard 
          title="In Progress" 
          value={stats.inProgress} 
          icon={Clock}
          description="Currently being addressed" 
        />
        <StatCard 
          title="Resolved" 
          value={stats.resolved} 
          icon={CheckCircle2}
          description="Successfully resolved" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <IncidentsChart incidents={incidents} />
        <StatusDistribution incidents={incidents} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
        <IncidentsList incidents={incidents} />
      </div>
    </div>
  );
};

export default Dashboard;
