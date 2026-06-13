import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Mail, Sparkles, Clock, AlertCircle } from "lucide-react";

const inboxItems = [
  {
    from: "Montessori Center",
    title: "Parent Teacher Meeting Tomorrow",
    summary: "Meeting scheduled tomorrow. Reply confirmation needed.",
    priority: "High",
    category: "School",
    time: "2h ago",
  },
  {
    from: "ICICI Bank",
    title: "Credit Card Bill Ready",
    summary: "Payment due soon. Suggested action: create payment reminder.",
    priority: "High",
    category: "Finance",
    time: "Yesterday",
  },
  {
    from: "Law Office of Sharma",
    title: "Hearing Date Confirmed",
    summary: "Legal date confirmed. Save this in calendar.",
    priority: "Medium",
    category: "Legal",
    time: "Yesterday",
  },
];

export default function InboxPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          Inbox Intelligence
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white">
          AICI Inbox
        </h1>
        <p className="mt-2 text-slate-400">
          AI extracts summaries, priorities, and actions from incoming messages.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-cyan-400" />
              Total Items
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">12</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-400" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">4</CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              AI Summaries
            </CardTitle>
          </CardHeader>
          <CardContent className="text-4xl font-bold">9</CardContent>
        </Card>
      </div>

      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Processed Inbox Items</CardTitle>
          <p className="text-sm text-slate-400">
            Messages converted into structured intelligence.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {inboxItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.from}</p>
                </div>

                <Badge
                  className={
                    item.priority === "High"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }
                >
                  {item.priority}
                </Badge>
              </div>

              <p className="mt-4 text-sm text-slate-300">{item.summary}</p>

              <div className="mt-4 flex items-center justify-between">
                <Badge className="bg-blue-500/10 text-blue-400">
                  {item.category}
                </Badge>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="h-4 w-4" />
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
        Process New Inbox Item
      </Button>
    </div>
  );
}