"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { trpc } from "../../../trpc/client";

export default function AnalyticsPage() {
  const { data: emails = [], isLoading } = trpc.gmail.getInbox.useQuery();

  const totalEmails = emails.length;
  const highCount = emails.filter((email) => email.priority === "high").length;
  const mediumCount = emails.filter((email) => email.priority === "medium").length;
  const lowCount = emails.filter((email) => email.priority === "low").length;

  const commands = emails.filter((email) => email.suggestedCommand !== "Review");
  const commandCount = commands.length;

  const createEventCount = emails.filter(
    (email) => email.suggestedCommand === "Create Event",
  ).length;

  const replyCount = emails.filter(
    (email) => email.suggestedCommand === "Reply",
  ).length;

  const trackPaymentCount = emails.filter(
    (email) => email.suggestedCommand === "Track Payment",
  ).length;

  const archiveCount = emails.filter(
    (email) => email.suggestedCommand === "Archive",
  ).length;

  const actionRate =
    totalEmails > 0 ? Math.round((commandCount / totalEmails) * 100) : 0;

  const priorityData = [
    {
      label: "High",
      count: highCount,
      value: totalEmails > 0 ? `${Math.round((highCount / totalEmails) * 100)}%` : "0%",
      color: "bg-red-400",
    },
    {
      label: "Medium",
      count: mediumCount,
      value: totalEmails > 0 ? `${Math.round((mediumCount / totalEmails) * 100)}%` : "0%",
      color: "bg-yellow-400",
    },
    {
      label: "Low",
      count: lowCount,
      value: totalEmails > 0 ? `${Math.round((lowCount / totalEmails) * 100)}%` : "0%",
      color: "bg-purple-400",
    },
  ];

  const commandBreakdown = [
    { label: "Create Event", count: createEventCount },
    { label: "Reply", count: replyCount },
    { label: "Track Payment", count: trackPaymentCount },
    { label: "Archive", count: archiveCount },
  ];

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
          Real-time insights from Gmail priority scoring and generated commands.
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
          <CardContent className="text-4xl font-bold">
            {isLoading ? "..." : totalEmails}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Commands
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {isLoading ? "..." : commandCount}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-5 w-5 text-red-400" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {isLoading ? "..." : highCount}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Action Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">
            {isLoading ? "..." : `${actionRate}%`}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>Command Breakdown</CardTitle>
            <p className="text-sm text-slate-400">
              Suggested commands generated from your inbox.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {commandBreakdown.map((item) => {
              const width =
                commandCount > 0 ? `${Math.round((item.count / commandCount) * 100)}%` : "0%";

              return (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="text-slate-500">{item.count}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-800">
                    <div
                      className="h-3 rounded-full bg-cyan-400"
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>Priority Distribution</CardTitle>
            <p className="text-sm text-slate-400">
              AI-classified urgency across real Gmail messages.
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
                  {item.count} / {item.value}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}