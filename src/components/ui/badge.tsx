import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm bg-ink/90 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-cream",
        className,
      )}
      {...props}
    />
  );
}
