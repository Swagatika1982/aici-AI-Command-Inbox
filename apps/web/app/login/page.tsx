import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-[#08111f] to-[#050816] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl">
        <div className="flex justify-center">
          <Image
            src="/AICI-Logo-bgClear.png"
            alt="AICI Logo"
            width={220}
            height={90}
            priority
          />
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold">Welcome to AICI</h1>
          <p className="mt-2 text-sm text-slate-400">
            Connect Gmail and Calendar to start turning information into action.
          </p>
        </div>

        <a href="http://localhost:8000/auth/google">
          <Button className="mt-8 h-12 w-full bg-white text-slate-950 hover:bg-slate-200">
            <Mail className="mr-2 h-5 w-5" />
            Continue with Gmail
          </Button>
        </a>

        <p className="mt-6 text-center text-xs text-slate-500">
          By continuing, you connect your Google account for Gmail and Calendar
          workflow automation.
        </p>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}