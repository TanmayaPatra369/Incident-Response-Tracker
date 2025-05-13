
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Incident } from "@/types/incident";

interface StatusDistributionProps {
  incidents: Incident[];
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const StatusDistribution = ({ incidents }: StatusDistributionProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const statusCounts = {
      "Open": 0,
      "In Progress": 0,
      "Resolved": 0,
    };

    incidents.forEach((incident) => {
      if (incident.status in statusCounts) {
        statusCounts[incident.status as keyof typeof statusCounts]++;
      }
    });

    const data: ChartData[] = [
      { name: "Open", value: statusCounts["Open"], color: "#ef4444" },
      { name: "In Progress", value: statusCounts["In Progress"], color: "#f97316" },
      { name: "Resolved", value: statusCounts["Resolved"], color: "#22c55e" },
    ];

    // Filter out zero values
    setChartData(data.filter(item => item.value > 0));
  }, [incidents]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} incidents`, "Count"]}
                  contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              No incident data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusDistribution;
