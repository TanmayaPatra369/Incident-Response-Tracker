
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import IncidentForm from "@/components/incidents/IncidentForm";
import { useIncidents } from "@/contexts/IncidentContext";

const EditIncident = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIncident, updateIncident } = useIncidents();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incident = getIncident(id as string);

  useEffect(() => {
    if (!incident) {
      navigate("/404");
    }
  }, [incident, navigate]);

  const handleSubmit = async (data: any) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const tags = data.tags ? data.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean) : [];

      await updateIncident(id, {
        title: data.title,
        description: data.description,
        severity: data.severity,
        status: data.status,
        tags,
      });

      navigate(`/incidents/${id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update incident");
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!incident) {
    return null;
  }

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
        <h1 className="text-2xl font-bold tracking-tight">Edit Incident</h1>
        <p className="text-muted-foreground">
          Update the incident details and status
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="max-w-2xl">
        <IncidentForm 
          onSubmit={handleSubmit} 
          defaultValues={incident}
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  );
};

export default EditIncident;
