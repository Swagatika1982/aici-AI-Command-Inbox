import { Search, Bell, RefreshCw, User, X } from "lucide-react";

export default function TopNavbar() {
    return (
        <div className="mb-8 flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold text-white">
                    AICI
                </h2>

                <p className="text-sm text-slate-400">
                    Turn Information Into Action
                </p>
            </div>

            <div className="flex items-center gap-4">

                <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2">
  <Search className="h-4 w-4 text-slate-500" />

  <input
    placeholder="Search commands..."
    className="w-52 bg-transparent text-sm text-slate-300 outline-none placeholder:text-slate-600"
  />

  <button className="text-slate-500 hover:text-slate-300">
    <X className="h-4 w-4" />
  </button>
</div>

                <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 hover:border-cyan-500">
                    Refresh
                </button>
                <button className="rounded-xl border border-slate-800 bg-slate-900 p-3 hover:border-cyan-500">
                    <Bell className="h-4 w-4 text-slate-300" />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                    <User className="h-5 w-5 text-slate-400" />
                </div>
            </div>
        </div>
    );
}