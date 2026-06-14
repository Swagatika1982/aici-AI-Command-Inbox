"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Checkbox } from "../../../components/ui/checkbox";
import { trpc } from "../../../trpc/client";



import {
  Mail,
  CalendarDays,
  CheckCircle2,
  Wallet,
  CheckSquare,
  ArrowRight,
} from "lucide-react";


// const emails = [
//   { from: "Montessori Center", subject: "Parent Teacher Meeting Tomorrow", tag: "School", time: "2h ago" },
//   { from: "Sarah Johnson", subject: "Project Update & Next Steps", tag: "Work", time: "5h ago" },
//   { from: "ICICI Bank", subject: "Your Credit Card Bill is Ready", tag: "Finance", time: "Yesterday" },
//   { from: "Law Office of Sharma", subject: "Hearing Date Confirmed", tag: "Legal", time: "Yesterday" },
// ];
export default function DashboardPage() {


  const { data: emails = [] } = trpc.gmail.getInbox.useQuery();

  // console.log("gmail data", data);
  // console.log("gmail error", error);

  const { data: events = [], isLoading: eventsLoading } =
    trpc.calendar.getUpcoming.useQuery();

  const tasks = [
    { title: "Reply to Montessori Center", priority: "High", due: "Today" },
    { title: "Submit project proposal", priority: "Medium", due: "Today" },
    { title: "Pay electricity bill", priority: "High", due: "Tomorrow" },
    { title: "Follow up with Attorney", priority: "Medium", due: "Jun 16" },
  ];


  return (
    <div className="space-y-8">



      {/*  --------------------------Header section-------Good Morning */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-400">
            AICI Command Center
          </p>

          <h1 className="mt-2 text-5xl font-bold tracking-tight text-white">
            Good Morning, Swagatika
          </h1>

          <p className="mt-2 text-slate-400">
            Here&apos;s what needs your attention today.
          </p>
        </div>
      </div>

      {/* -------------------------- Morning Brief Section------- */}
      <Card className="relative overflow-hidden border-slate-800 bg-slate-900/80 text-white shadow-2xl">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />

        <CardHeader className="relative">
          <CardTitle className="text-white">Morning Brief</CardTitle>
          <p className="text-sm text-slate-400">
            AI-generated overview of your highest priority items.
          </p>
        </CardHeader>

        <CardContent className="relative">
          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                value: "3",
                label: "Important Emails",
                note: "2 unread",
                icon: Mail,
                color: "text-blue-400",
              },
              {
                value: "2",
                label: "Meetings Today",
                note: "Next at 11:00 AM",
                icon: CalendarDays,
                color: "text-purple-400",
              },
              {
                value: "4",
                label: "Pending Tasks",
                note: "2 due today",
                icon: CheckCircle2,
                color: "text-green-400",
              },
              {
                value: "1",
                label: "Payment Due",
                note: "Due tomorrow",
                icon: Wallet,
                color: "text-yellow-400",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950 to-[#071326]/60 p-5"
                >
                  <div className="mb-3">
                    <Icon className={`h-6 w-6 ${item.color}`} />
                  </div>

                  <p className="text-3xl font-bold text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-slate-300">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8" />



      {/* -------------------------- Email Cards Section------- */}
      <div className="grid grid-cols-3 gap-6">
        {/* -------------------------- Important Email Cards ------- */}
        <Card className="border-slate-800 bg-slate-900 text-white transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              Important Emails
            </CardTitle>
            <Button
              size="sm"
              variant="ghost"
              className="text-slate-400 hover:text-cyan-300"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {emails.map((email) => {
              const avatarClass =
                email.priority === "School"
                  ? "bg-blue-500/20 text-blue-300"
                  : email.priority === "Work"
                    ? "bg-green-500/20 text-green-300"
                    : email.priority === "Finance"
                      ? "bg-yellow-500/20 text-yellow-200"
                      : "bg-purple-500/20 text-purple-300";

              return (
                <div key={email.subject} className="border-b border-slate-800 pb-4">
                  <div className="flex gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${avatarClass}`}
                    >
                      {email.from.replace(/"/g, "").trim().charAt(0)}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-semibold">{email.from}</p>
                        <span className="text-xs text-slate-400">{email.receivedAt}</span>
                      </div>

                      <p className="text-sm text-slate-300">{email.subject}</p>

                      <Badge className="mt-2 bg-blue-600">{email.priority}</Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
        {/* -------------------------- Today's schedule Section------- */}
        <Card className="border-slate-800 bg-slate-900 text-white transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-purple-400" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {events.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-xs text-slate-500">
                    {new Date(item.startTime).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        {/* -------------------------- Pending Actions Section------- */}
        <Card className="border-slate-800 bg-slate-900 text-white transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.08)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-green-400" />
              Pending Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {tasks.map((task) => (
              <div key={task.title} className="flex items-start gap-3 border-b border-slate-800 pb-3">
                <Checkbox />
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-slate-400">{task.due}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-1 text-xs font-semibold ${task.priority === "High"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-yellow-500/10 text-yellow-400"
                    }`}
                >
                  {task.priority}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>



      {/* -------------------------- Suggested Commands Section------- */}
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle className="text-white">Suggested Commands</CardTitle>
          <p className="text-sm text-slate-400">
            Quick AI prompts to help you process today faster.
          </p>
        </CardHeader>

        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            "Prepare me for today",
            "Show school emails",
            "What needs my attention?",
            "Summarize unread emails",
            "Show my meetings today",
            "Create tasks from unread emails",
          ].map((cmd) => (
            <Button
              key={cmd}
              variant="outline"
              className="min-h-20 justify-start whitespace-normal rounded-2xl border-slate-800 bg-slate-950/60 px-5 py-4 text-left text-sm text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              {cmd}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div >
  );
}

function Stat({ title, value, subtitle }: { title: string; value: string; subtitle: string }) {
  return (
    <div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm">{title}</p>
      <p className="text-xs text-slate-400">{subtitle}</p>
    </div>
  );
}