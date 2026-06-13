import { api } from "~/trpc/server";

export default async function Home() {
  const { status } = await api.health.getHealth.query();
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <section className="max-w-3xl text-center">
        <div className="mb-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
          Server Status: {status}
        </div>

        <h1 className="text-6xl font-bold tracking-tight">
          AICI
        </h1>

        <p className="mt-4 text-2xl text-slate-300">
          AI Command Inbox
        </p>

        <p className="mt-6 text-lg text-slate-400">
          Turn Information Into Action
        </p>
      </section>
    </main>
  );
}
