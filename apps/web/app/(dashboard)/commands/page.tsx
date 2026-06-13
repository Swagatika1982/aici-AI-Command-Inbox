import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Zap, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const commands = [
  {
    title: "Reply to Montessori Center",
    source: "Parent Teacher Meeting email",
    status: "Pending",
    priority: "High",
    due: "Today",
  },
  {
    title: "Create calendar reminder for hearing date",
    source: "Legal email",
    status: "Pending",
    priority: "Medium",
    due: "Jun 16",
  },
  {
    title: "Pay credit card bill",
    source: "Bank notification",
    status: "Pending",
    priority: "High",
    due: "Tomorrow",
  },
  {
    title: "Summarize project update",
    source: "Work email",
    status: "Completed",
    priority: "Low",
    due: "Done",
  },
];

export default function CommandsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          Command Center
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white">
          Action Queue
        </h1>
        <p className="mt-2 text-slate-400">
          AI-generated tasks extracted from inbox messages and calendar signals.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-cyan-400" />
              Total Commands
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">18</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">7</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">11</CardContent>
        </Card>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Command Queue</CardTitle>
          <p className="text-sm text-slate-400">
            Review, prioritize, and execute AI-created commands.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {commands.map((cmd) => (
            <div
              key={cmd.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{cmd.title}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Source: {cmd.source}
                  </p>
                </div>

                <Badge
                  className={
                    cmd.status === "Completed"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }
                >
                  {cmd.status}
                </Badge>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Badge
                  className={
                    cmd.priority === "High"
                      ? "bg-red-500/10 text-red-400"
                      : cmd.priority === "Medium"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-slate-700 text-slate-300"
                  }
                >
                  {cmd.priority}
                </Badge>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <AlertTriangle className="h-4 w-4" />
                  Due: {cmd.due}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
        Create New Command
      </Button>
    </div>
  );
}