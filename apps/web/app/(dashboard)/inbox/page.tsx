"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Mail, Sparkles, Clock, AlertCircle, Zap } from "lucide-react";
import { trpc } from "../../../trpc/client";

export default function InboxPage() {
  const { data: emails = [], isLoading } = trpc.gmail.getInbox.useQuery();

  const highCount = emails.filter((email) => email.priority === "high").length;
  const actionCount = emails.filter((email) => email.suggestedCommand !== "Review").length;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          Inbox Intelligence
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white">AICI Inbox</h1>
        <p className="mt-2 text-slate-400">
          AI extracts summaries, priorities, and suggested commands from real Gmail messages.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              Total Emails
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{emails.length}</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{highCount}</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Suggested Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">{actionCount}</CardContent>
        </Card>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Processed Inbox Intelligence</CardTitle>
          <p className="text-sm text-slate-400">
            Real messages converted into structured AI command items.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLoading && (
            <p className="text-sm text-slate-400">Loading inbox intelligence...</p>
          )}

          {!isLoading && emails.length === 0 && (
            <p className="text-sm text-slate-400">No emails found.</p>
          )}

          {emails.map((email) => (
            <div
              key={email.id}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{email.subject}</p>
                  <p className="mt-1 truncate text-sm text-slate-400">{email.from}</p>
                </div>

                <Badge
                  className={
                    email.priority === "high"
                      ? "shrink-0 bg-red-500/10 text-red-400"
                      : email.priority === "medium"
                        ? "shrink-0 bg-yellow-500/10 text-yellow-400"
                        : "shrink-0 bg-purple-500/10 text-purple-400"
                  }
                >
                  {email.priority.toUpperCase()} • {email.priorityScore}
                </Badge>
              </div>

              <p className="mt-4 line-clamp-2 text-sm text-slate-300">
                {email.summary}
              </p>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Priority Reason
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {email.priorityReason}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <Badge className="bg-cyan-500/10 text-cyan-300">
                  <Zap className="mr-1 h-3 w-3" />
                  {email.suggestedCommand}
                </Badge>

                <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-4 w-4" />
                  {new Date(email.receivedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}