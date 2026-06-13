import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const priorityData = [
  { label: "High", value: "42%", color: "bg-red-400" },
  { label: "Medium", value: "35%", color: "bg-yellow-400" },
  { label: "Low", value: "23%", color: "bg-green-400" },
];

const weeklyActivity = [
  { day: "Mon", value: "70%" },
  { day: "Tue", value: "55%" },
  { day: "Wed", value: "80%" },
  { day: "Thu", value: "45%" },
  { day: "Fri", value: "65%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          Analytics
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white">
          Productivity Insights
        </h1>
        <p className="mt-2 text-slate-400">
          Track inbox load, command completion, and priority trends.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              Inbox Processed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">48</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">31</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-5 w-5 text-red-400" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">12</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">78%</CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>Weekly Command Activity</CardTitle>
            <p className="text-sm text-slate-400">
              Commands processed across the week.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {weeklyActivity.map((item) => (
              <div key={item.day}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-300">{item.day}</span>
                  <span className="text-slate-500">{item.value}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-cyan-400"
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
            <p className="text-sm text-slate-400">
              AI-classified task urgency.
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            {priorityData.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-slate-300">{item.label}</span>
                </div>

                <Badge className="bg-slate-800 text-slate-300">
                  {item.value}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}