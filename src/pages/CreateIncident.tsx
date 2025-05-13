
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import IncidentForm from "@/components/incidents/IncidentForm";
import { useIncidents } from "@/contexts/IncidentContext";
import { useAuth } from "@/contexts/AuthContext";

const CreateIncident = () => {
  const navigate = useNavigate();
  const { createIncident } = useIncidents();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const tags = data.tags ? data.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean) : [];

      const incident = await createIncident({
        title: data.title,
        description: data.description,
        severity: data.severity,
        status: data.status,
        tags,
      });

      navigate(`/incidents/${incident.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create incident");
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create New Incident</h1>
        <p className="text-muted-foreground">
          Report a new incident to track and resolve
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-2xl">
        <IncidentForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default CreateIncident;
