
export type IncidentSeverity = "Low" | "Medium" | "High";
export type IncidentStatus = "Open" | "In Progress" | "Resolved";

export interface StatusUpdate {
  id: string;
  status: IncidentStatus;
  message: string;
  timestamp: string;
  user: string;
}

export interface RootCauseAnalysis {
  cause: string;
  impact: string;
  resolution: string;
  preventiveMeasures: string;
  createdAt: string;
  updatedBy: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  statusUpdates: StatusUpdate[];
  rca?: RootCauseAnalysis; // Optional RCA field
}
