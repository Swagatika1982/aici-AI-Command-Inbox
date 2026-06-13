import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import {
  Settings,
  Mail,
  CalendarDays,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const integrations = [
  {
    name: "Gmail",
    description: "Read incoming emails and extract commands.",
    status: "Demo Connected",
    icon: Mail,
  },
  {
    name: "Google Calendar",
    description: "Detect meetings and suggest calendar actions.",
    status: "Demo Connected",
    icon: CalendarDays,
  },
  {
    name: "AI Command Engine",
    description: "Summarize messages and classify priority.",
    status: "Active",
    icon: Sparkles,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-wider text-cyan-400">
          Settings
        </p>
        <h1 className="mt-2 text-5xl font-bold text-white">
          Workspace Control
        </h1>
        <p className="mt-2 text-slate-400">
          Manage AICI integrations, preferences, and demo configuration.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-slate-800 bg-slate-900 text-white lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-cyan-400" />
              Integrations
            </CardTitle>
            <p className="text-sm text-slate-400">
              Connected sources used by AI Command Inbox.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {integrations.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-300">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <p className="text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <Badge className="bg-green-500/10 text-green-400">
                    {item.status}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              Demo Mode
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-slate-400">
            <p>
              AICI is currently using simulated inbox, command, and analytics
              data for the hackathon demo.
            </p>

            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="font-medium text-white">Environment</p>
              <p className="mt-1">Local Development</p>
            </div>

            <Button className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              Connect Real Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
