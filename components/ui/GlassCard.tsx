import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  interactive?: boolean;
  glowColor?: "orange" | "blue" | "cyan" | "none";
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, elevated = false, interactive = false, glowColor = "none", children, ...props }, ref) => {
    const glowClasses = {
      none: "",
      orange: "hover:border-brand-orange/40 hover:shadow-glow-orange",
      blue: "hover:border-blue-500/40 hover:shadow-glow-blue",
      cyan: "hover:border-cyan-500/40 hover:shadow-glow-cyan",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl relative overflow-hidden",
          elevated ? "glass-panel-elevated" : "glass-panel",
          interactive && "glass-card-interactive cursor-pointer",
          glowClasses[glowColor],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
