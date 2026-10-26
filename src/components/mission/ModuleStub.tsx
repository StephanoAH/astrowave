import { MissionPageHeader } from "./MissionPageHeader";
import { GlassPanel } from "./GlassPanel";

export function ModuleStub({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <MissionPageHeader title={title} description={description} />
      {children ?? (
        <GlassPanel>
          <p className="text-sm text-slate-400">
            This module reports station activity as soon as the pass data is available.
          </p>
        </GlassPanel>
      )}
    </>
  );
}
