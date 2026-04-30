import { cn } from "@/lib/cn";

export function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.12] bg-slate-950/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
