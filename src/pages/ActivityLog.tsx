
import { useState } from "react";
import { useIncidents } from "@/contexts/IncidentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Clock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDateTime, timeAgo } from "@/lib/date-utils";
import { StatusUpdate } from "@/types/incident";
import { Link } from "react-router-dom";

type ActivityEvent = {
  id: string;
  incidentId: string;
  incidentTitle: string;
  update: StatusUpdate;
};

const ActivityLog = () => {
  const { incidents } = useIncidents();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  // Get all status updates across all incidents
  const allUpdates: ActivityEvent[] = incidents.flatMap((incident) =>
    incident.statusUpdates.map((update) => ({
      id: `${incident.id}-${update.id}`,
      incidentId: incident.id,
      incidentTitle: incident.title,
      update,
    }))
  );

  // Sort updates by timestamp (newest first)
  const sortedUpdates = [...allUpdates].sort((a, b) =>
    new Date(b.update.timestamp).getTime() - new Date(a.update.timestamp).getTime()
  );

  // Apply filters
  const filteredUpdates = sortedUpdates.filter((event) => {
    const matchesSearch =
      event.incidentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.update.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.update.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || event.update.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Activity Log</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Filter Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, message, or user..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredUpdates.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                {searchTerm || statusFilter
                  ? "No activity matching your filters"
                  : "No activity recorded yet"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredUpdates.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="border-l-4 border-primary p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <Link
                      to={`/incidents/${event.incidentId}`}
                      className="font-semibold hover:underline"
                    >
                      {event.incidentTitle}
                    </Link>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={cn(
                          "rounded-md",
                          `status-${event.update.status.toLowerCase().replace(" ", "-")}`
                        )}
                      >
                        {event.update.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {timeAgo(new Date(event.update.timestamp))}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mb-2">{event.update.message}</p>
                  <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                    <span>Updated by: {event.update.user}</span>
                    <span>{formatDateTime(new Date(event.update.timestamp))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
