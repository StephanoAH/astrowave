import { MissionSidebar } from "@/components/mission/MissionSidebar";

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <MissionSidebar />
      <div className="relative flex-1 overflow-auto bg-gradient-to-br from-[#030508] via-[#0a0e1a] to-[#050810] p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 starfield opacity-20" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
