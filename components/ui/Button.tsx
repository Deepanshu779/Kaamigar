import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  glow?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      glow = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-brand-orange to-[#FF550D] text-white hover:from-brand-orangeHover hover:to-[#E04400] shadow-lg shadow-brand-orange/25 border border-white/20",
      secondary:
        "bg-brand-blue text-white hover:bg-blue-600 shadow-lg shadow-blue-500/20 border border-blue-400/30",
      outline:
        "bg-transparent text-slate-200 border border-slate-700/80 hover:bg-slate-800/60 hover:border-slate-500 hover:text-white",
      ghost:
        "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
      glass:
        "bg-white/[0.07] backdrop-blur-md text-white border border-white/15 hover:bg-white/[0.12] hover:border-white/30 shadow-glass",
    };

    const sizeStyles = {
      sm: "text-xs px-3.5 py-2 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
      xl: "text-lg px-8 py-4 gap-3 font-semibold rounded-2xl",
    };

    const glowStyle =
      glow && variant === "primary"
        ? "shadow-glow-orange hover:shadow-[0_0_40px_-5px_rgba(255,107,43,0.7)]"
        : "";

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], glowStyle, className)}
        disabled={disabled}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
