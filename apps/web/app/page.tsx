import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, CalendarDays, Sparkles } from "lucide-react";
import { Button } from "../components/ui/button";
import { api } from "~/trpc/server";

export default async function HomePage() {
  const { status } = await api.health.getHealth.query();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-[#08111f] to-[#050816] text-white">
      <nav className="flex items-center justify-between px-10 py-6">
        <Image src="/AICI-Logo-bgClear.png" alt="AICI Logo" width={190} height={70} priority />

        <Link href="/login">
          <Button className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            Login  with Gmail
          </Button>
        </Link>
      </nav>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <p className="mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          Server Status: {status}
        </p>

        <h1 className="max-w-4xl text-6xl font-bold tracking-tight">
          Turn your inbox into an intelligent command center.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          AICI transforms Gmail messages and Google Calendar events into
          summaries, priorities, tasks, and suggested actions.
        </p>

        <div className="mt-10 flex gap-4">
          <Link href="/login">
            <Button className="h-12 bg-cyan-500 px-6 text-slate-950 hover:bg-cyan-400">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline" className="h-12 border-slate-700 bg-slate-900 text-white">
              View Demo
            </Button>
          </Link>
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { title: "Gmail Intelligence", desc: "Summarize emails and detect action items.", icon: Mail },
            { title: "Calendar Workflow", desc: "Convert meeting details into calendar-ready commands.", icon: CalendarDays },
            { title: "AI Commands", desc: "Turn messages into tasks, reminders, and replies.", icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-left">
                <Icon className="h-6 w-6 text-cyan-400" />
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}