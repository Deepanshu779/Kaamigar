import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "orange" | "blue" | "emerald" | "amber" | "slate";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className,
  variant = "slate",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    orange: "bg-brand-orange/15 text-brand-orange border-brand-orange/30",
    blue: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    slate: "bg-slate-800/60 text-slate-300 border-slate-700/60",
  };

  const dotColors = {
    orange: "bg-brand-orange",
    blue: "bg-blue-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    slate: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border rounded-full backdrop-blur-sm",
        size === "sm" ? "text-xs px-2.5 py-0.5" : "text-xs px-3 py-1",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
