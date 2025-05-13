
import { RootCauseAnalysis } from "@/types/incident";
import { formatDateTime } from "@/lib/date-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RCADisplayProps {
  rca: RootCauseAnalysis;
}

const RCADisplay = ({ rca }: RCADisplayProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Root Cause Analysis</CardTitle>
        <div className="text-sm text-muted-foreground">
          Added by {rca.updatedBy} on {formatDateTime(new Date(rca.createdAt))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-1">Root Cause</h3>
          <p className="text-sm whitespace-pre-wrap">{rca.cause}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Impact</h3>
          <p className="text-sm whitespace-pre-wrap">{rca.impact}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Resolution</h3>
          <p className="text-sm whitespace-pre-wrap">{rca.resolution}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Preventive Measures</h3>
          <p className="text-sm whitespace-pre-wrap">{rca.preventiveMeasures}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RCADisplay;
