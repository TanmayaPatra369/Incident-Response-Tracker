import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";
import { Incident, StatusUpdate, RootCauseAnalysis } from "@/types/incident";
import { mockIncidents } from "@/data/mock-incidents";

interface IncidentContextType {
  incidents: Incident[];
  loading: boolean;
  createIncident: (incident: Omit<Incident, "id" | "createdAt" | "updatedAt" | "statusUpdates" | "rca">) => Promise<Incident>;
  updateIncident: (id: string, incident: Partial<Incident>) => Promise<Incident>;
  deleteIncident: (id: string) => Promise<void>;
  getIncident: (id: string) => Incident | undefined;
  addStatusUpdate: (incidentId: string, update: Omit<StatusUpdate, "id" | "timestamp">) => Promise<void>;
  addRCA: (incidentId: string, rca: Omit<RootCauseAnalysis, "createdAt">) => Promise<void>;
}

const IncidentContext = createContext<IncidentContextType | null>(null);

export function useIncidents() {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error("useIncidents must be used within an IncidentProvider");
  }
  return context;
}

interface IncidentProviderProps {
  children: ReactNode;
}

export function IncidentProvider({ children }: IncidentProviderProps) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved incidents in localStorage or use mock data
    const savedIncidents = localStorage.getItem("incidents");
    if (savedIncidents) {
      setIncidents(JSON.parse(savedIncidents));
    } else {
      setIncidents(mockIncidents);
      localStorage.setItem("incidents", JSON.stringify(mockIncidents));
    }
    setLoading(false);
  }, []);

  // Save incidents to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("incidents", JSON.stringify(incidents));
    }
  }, [incidents, loading]);

  const createIncident = async (
    incidentData: Omit<Incident, "id" | "createdAt" | "updatedAt" | "statusUpdates" | "rca">
  ): Promise<Incident> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const now = new Date().toISOString();
      const newIncident: Incident = {
        id: Date.now().toString(),
        ...incidentData,
        tags: incidentData.tags ? incidentData.tags.map(tag => tag.trim()) : [],
        createdAt: now,
        updatedAt: now,
        statusUpdates: [
          {
            id: "1",
            status: incidentData.status,
            message: `Incident created with status: ${incidentData.status}`,
            timestamp: now,
            user: "System",
          },
        ],
      };

      setIncidents((prev) => [newIncident, ...prev]);
      
      toast({
        title: "Incident created",
        description: "New incident has been created successfully",
      });

      return newIncident;
    } catch (error) {
      console.error("Create incident error:", error);
      toast({
        variant: "destructive",
        title: "Failed to create incident",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  const updateIncident = async (
    id: string,
    incidentData: Partial<Incident>
  ): Promise<Incident> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const incidentIndex = incidents.findIndex((inc) => inc.id === id);
      if (incidentIndex === -1) {
        throw new Error("Incident not found");
      }

      const updatedIncident = {
        ...incidents[incidentIndex],
        ...incidentData,
        updatedAt: new Date().toISOString(),
        tags: incidentData.tags || incidents[incidentIndex].tags,
      };

      const newIncidents = [...incidents];
      newIncidents[incidentIndex] = updatedIncident;
      setIncidents(newIncidents);

      toast({
        title: "Incident updated",
        description: "The incident has been updated successfully",
      });

      return updatedIncident;
    } catch (error) {
      console.error("Update incident error:", error);
      toast({
        variant: "destructive",
        title: "Failed to update incident",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  const deleteIncident = async (id: string): Promise<void> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      setIncidents((prev) => prev.filter((incident) => incident.id !== id));
      
      toast({
        title: "Incident deleted",
        description: "The incident has been deleted successfully",
      });
    } catch (error) {
      console.error("Delete incident error:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete incident",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  const getIncident = (id: string): Incident | undefined => {
    return incidents.find((incident) => incident.id === id);
  };

  const addStatusUpdate = async (
    incidentId: string,
    update: Omit<StatusUpdate, "id" | "timestamp">
  ): Promise<void> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const incidentIndex = incidents.findIndex((inc) => inc.id === incidentId);
      if (incidentIndex === -1) {
        throw new Error("Incident not found");
      }

      const now = new Date().toISOString();
      const newStatusUpdate: StatusUpdate = {
        id: Date.now().toString(),
        ...update,
        timestamp: now,
      };

      const updatedIncident = {
        ...incidents[incidentIndex],
        status: update.status,
        updatedAt: now,
        statusUpdates: [
          newStatusUpdate,
          ...incidents[incidentIndex].statusUpdates,
        ],
      };

      const newIncidents = [...incidents];
      newIncidents[incidentIndex] = updatedIncident;
      setIncidents(newIncidents);

      toast({
        title: "Status updated",
        description: "The incident status has been updated",
      });
    } catch (error) {
      console.error("Add status update error:", error);
      toast({
        variant: "destructive",
        title: "Failed to update status",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  const addRCA = async (
    incidentId: string,
    rca: Omit<RootCauseAnalysis, "createdAt">
  ): Promise<void> => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      const incidentIndex = incidents.findIndex((inc) => inc.id === incidentId);
      if (incidentIndex === -1) {
        throw new Error("Incident not found");
      }

      const now = new Date().toISOString();
      const newRCA: RootCauseAnalysis = {
        ...rca,
        createdAt: now,
      };

      const updatedIncident = {
        ...incidents[incidentIndex],
        rca: newRCA,
        updatedAt: now,
      };

      const newIncidents = [...incidents];
      newIncidents[incidentIndex] = updatedIncident;
      setIncidents(newIncidents);

      toast({
        title: "RCA added",
        description: "Root cause analysis has been added to the incident",
      });
    } catch (error) {
      console.error("Add RCA error:", error);
      toast({
        variant: "destructive",
        title: "Failed to add RCA",
        description: error instanceof Error ? error.message : "An error occurred",
      });
      throw error;
    }
  };

  const value = {
    incidents,
    loading,
    createIncident,
    updateIncident,
    deleteIncident,
    getIncident,
    addStatusUpdate,
    addRCA,
  };

  return <IncidentContext.Provider value={value}>{children}</IncidentContext.Provider>;
}
