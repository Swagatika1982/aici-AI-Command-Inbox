"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Zap, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { trpc } from "../../../trpc/client";

export default function CommandsPage() {
  const { data: emails = [], isLoading } = trpc.gmail.getInbox.useQuery();

  const commands = emails.filter((email) => email.suggestedCommand !== "Review");
  const highCommands = commands.filter((email) => email.priority === "high");

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          Command Center
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white">Action Queue</h1>
        <p className="mt-2 text-slate-400">
          AI-generated commands extracted from real inbox messages.
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
          <CardContent className="text-4xl font-bold">{commands.length}</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{commands.length}</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              High Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{highCommands.length}</CardContent>
        </Card>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Command Queue</CardTitle>
          <p className="text-sm text-slate-400">
            Review and execute AI-created commands from Gmail.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading && (
            <p className="text-sm text-slate-400">Loading commands...</p>
          )}

          {!isLoading && commands.length === 0 && (
            <p className="text-sm text-slate-400">
              No commands found. Emails marked as Review are not shown here.
            </p>
          )}

          {commands.map((email) => {
            const executeLabel =
              email.suggestedCommand === "Create Event"
                ? "Create Calendar Event"
                : email.suggestedCommand === "Reply"
                  ? "Draft Reply"
                  : email.suggestedCommand === "Track Payment"
                    ? "Create Reminder"
                    : email.suggestedCommand === "Archive"
                      ? "Archive Email"
                      : "Execute";

            return (
              <div
                key={email.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-white">
                      {email.suggestedCommand}: {email.subject}
                    </p>
                    <p className="mt-1 truncate text-sm text-slate-400">
                      Source: {email.from}
                    </p>
                  </div>

                  <Badge className="shrink-0 bg-yellow-500/10 text-yellow-400">
                    Pending
                  </Badge>
                </div>

                <p className="mt-4 line-clamp-2 text-sm text-slate-300">
                  {email.summary}
                </p>

                <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                  <p className="text-xs uppercase tracking-wider text-slate-500">
                    Why this became a command
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {email.priorityReason}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <Badge
                    className={
                      email.priority === "high"
                        ? "bg-red-500/10 text-red-400"
                        : email.priority === "medium"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-purple-500/10 text-purple-400"
                    }
                  >
                    {email.priority.toUpperCase()} • {email.priorityScore}
                  </Badge>

                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <AlertTriangle className="h-4 w-4" />
                    Action: {email.suggestedCommand}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                    {executeLabel}
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                    Snooze
                  </Button>
                  <Button size="sm" variant="ghost" className="text-slate-400">
                    Dismiss
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}