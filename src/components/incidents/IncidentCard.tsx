
import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Incident } from "@/types/incident";
import { formatDate, formatTime } from "@/lib/date-utils";

interface IncidentCardProps {
  incident: Incident;
}

const IncidentCard = ({ incident }: IncidentCardProps) => {
  return (
    <Link to={`/incidents/${incident.id}`}>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{incident.title}</CardTitle>
            <Badge
              className={cn(
                "rounded-md",
                `severity-${incident.severity.toLowerCase()}`
              )}
            >
              {incident.severity}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{incident.description}</p>
          <Badge
            variant="outline"
            className={cn(
              "rounded-md",
              `status-${incident.status.toLowerCase().replace(' ', '-')}`
            )}
          >
            {incident.status}
          </Badge>
        </CardContent>
        <CardFooter className="pt-2 text-xs text-gray-500 flex flex-wrap gap-3">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(new Date(incident.createdAt))}
          </div>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(new Date(incident.createdAt))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default IncidentCard;
