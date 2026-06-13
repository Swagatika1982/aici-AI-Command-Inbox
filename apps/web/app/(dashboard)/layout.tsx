import { AiciSidebar } from "../../components/aici-sidebar";
import  TopNavbar  from "../../components/top-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#08111f] to-[#050816] text-white">

  {/* Main section */}
  <div className="flex">
    <AiciSidebar />

    <main className="flex-1 p-8">
      <TopNavbar />
      {children}
    </main>
  </div>

  {/* Full-width footer */}
 <footer className="border-t border-slate-800 bg-slate-950/60 px-8 py-5">
  <div className="flex items-center justify-between text-sm text-slate-500">
    <span>© 2026 AICI</span>

    <span className="text-cyan-400">
      Turn Information Into Action
    </span>

    <span>Built for Corsair Hackathon</span>
  </div>
</footer>

</div>
  );
}