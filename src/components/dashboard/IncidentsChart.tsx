
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Incident } from "@/types/incident";

interface IncidentsChartProps {
  incidents: Incident[];
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

const IncidentsChart = ({ incidents }: IncidentsChartProps) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const severityCounts = {
      Low: 0,
      Medium: 0,
      High: 0,
    };

    incidents.forEach((incident) => {
      if (incident.severity in severityCounts) {
        severityCounts[incident.severity as keyof typeof severityCounts]++;
      }
    });

    const data: ChartData[] = [
      { name: "Low", value: severityCounts.Low, color: "#22c55e" },
      { name: "Medium", value: severityCounts.Medium, color: "#f97316" },
      { name: "High", value: severityCounts.High, color: "#ef4444" },
    ];

    setChartData(data);
  }, [incidents]);

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Incidents by Severity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip 
                formatter={(value) => [`${value} incidents`, "Count"]}
                labelStyle={{ color: "#111" }}
                contentStyle={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentsChart;
