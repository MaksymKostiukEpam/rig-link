import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants = {
  primary: cn(
    "border border-primary/30",
    "bg-primary text-primary-foreground",
    "shadow-sm shadow-primary/10",
    "hover:bg-primary/90",
    "hover:border-primary",
  ),

  secondary: cn(
    "border border-border",
    "bg-card",
    "text-foreground",
    "shadow-sm",
    "hover:bg-muted",
    "hover:border-primary/40",
    "hover:shadow-lg",
  ),

  outline: cn(
    "border border-border",
    "bg-transparent",
    "hover:bg-accent",
    "hover:border-primary/40",
    "hover:shadow-md",
  ),

  ghost: cn("text-foreground", "hover:bg-muted", "hover:text-primary"),

  danger: cn(
    "border border-red-500/30",
    "bg-destructive",
    "text-destructive-foreground",
    "shadow-md shadow-red-500/20",
    "hover:bg-destructive/90",
    "hover:shadow-xl hover:shadow-red-500/30",
  ),
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        "relative overflow-hidden",

        "inline-flex items-center justify-center gap-2",
        "rounded-xl",
        "font-medium",
        "select-none cursor-pointer",

        // Better animation
        "transform-gpu",
        "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",

        // Hover
        "hover:-translate-y-0.5",
        "hover:scale-[1.015]",

        // Click
        "active:scale-[0.985]",
        "active:translate-y-0",

        // Focus
        "outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-primary/40",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-background",

        // Disabled
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",

        // Glow overlay
        "before:absolute before:inset-0 before:rounded-[inherit]",
        "before:bg-white/0 before:transition-all before:duration-500",
        "before:ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:before:bg-white/5",

        // Nice moving highlight
        "after:absolute after:inset-0 after:rounded-[inherit]",
        "after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
        "after:-translate-x-full",
        "after:transition-transform after:duration-700",
        "after:ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:after:translate-x-full",

        sizes[size],
        variants[variant],
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      )}

      {children}
    </button>
  ),
);

Button.displayName = "Button";

export default Button;
