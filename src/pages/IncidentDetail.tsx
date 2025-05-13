
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useIncidents } from "@/contexts/IncidentContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatDateTime, timeAgo } from "@/lib/date-utils";
import { IncidentStatus } from "@/types/incident";

const IncidentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getIncident, deleteIncident, addStatusUpdate } = useIncidents();
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [newStatus, setNewStatus] = useState<IncidentStatus | "">("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incident = getIncident(id as string);

  if (!incident) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Incident Not Found</h2>
        <p className="text-gray-500 mb-6">
          The incident you're looking for doesn't exist or has been deleted.
        </p>
        <Link to="/">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteIncident(incident.id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting incident:", error);
      setIsDeleting(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!newStatus || !statusMessage.trim()) return;

    setIsSubmitting(true);
    try {
      await addStatusUpdate(incident.id, {
        status: newStatus as IncidentStatus,
        message: statusMessage,
        user: user?.displayName || "Anonymous",
      });
      
      setNewStatus("");
      setStatusMessage("");
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{incident.title}</h1>
        <div className="flex space-x-2">
          <Link to={`/incidents/${incident.id}/edit`}>
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  incident and all its associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="prose max-w-none">
              <p>{incident.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {incident.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Status History</h2>
            <div className="space-y-6">
              {incident.statusUpdates.map((update, index) => (
                <div
                  key={update.id}
                  className={cn(
                    "relative pl-6 pb-6",
                    index !== incident.statusUpdates.length - 1 &&
                      "border-l border-gray-200"
                  )}
                >
                  <div className="absolute left-0 top-0 -translate-x-1/2 rounded-full border border-gray-200 bg-white p-1">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        update.status === "Open" && "bg-red-500",
                        update.status === "In Progress" && "bg-orange-500",
                        update.status === "Resolved" && "bg-green-500"
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      className={cn(
                        "rounded-md",
                        `status-${update.status.toLowerCase().replace(" ", "-")}`
                      )}
                    >
                      {update.status}
                    </Badge>
                    <time className="text-sm text-gray-500">
                      {formatDateTime(new Date(update.timestamp))}
                    </time>
                  </div>
                  <p className="mt-2">{update.message}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Updated by {update.user}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Add Status Update</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  New Status
                </label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Update Message
                </label>
                <Textarea
                  placeholder="Describe the current situation or actions taken..."
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button
                onClick={handleStatusUpdate}
                disabled={!newStatus || !statusMessage.trim() || isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Add Update"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Incident Details</h2>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Severity</dt>
                <dd>
                  <Badge
                    className={cn(
                      "mt-1 rounded-md",
                      `severity-${incident.severity.toLowerCase()}`
                    )}
                  >
                    {incident.severity}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd>
                  <Badge
                    className={cn(
                      "mt-1 rounded-md",
                      `status-${incident.status.toLowerCase().replace(" ", "-")}`
                    )}
                  >
                    {incident.status}
                  </Badge>
                </dd>
              </div>
              <Separator />
              <div>
                <dt className="text-sm font-medium text-gray-500">Created</dt>
                <dd className="mt-1 text-sm flex items-center">
                  <Calendar className="mr-1 h-3 w-3" />
                  {formatDateTime(new Date(incident.createdAt))}
                </dd>
                <dd className="mt-1 text-xs text-gray-500">
                  {timeAgo(new Date(incident.createdAt))}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {formatDateTime(new Date(incident.updatedAt))}
                </dd>
                <dd className="mt-1 text-xs text-gray-500">
                  {timeAgo(new Date(incident.updatedAt))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
