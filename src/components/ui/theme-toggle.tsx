import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/cn";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-11 w-[92px] items-center rounded-xl border border-border/60 bg-card p-1 transition-all duration-200 hover:border-border hover:shadow-lg"
    >
      {/* Sliding pill */}
      <div
        className={cn(
          "absolute top-1 h-9 w-[40px] rounded-lg bg-foreground shadow-lg transition-all duration-300 ease-out",
          "ring-1 ring-white/10",
          isDark ? "left-[47px]" : "left-1",
        )}
      />

      {/* Sun */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <SunMedium
          className={cn(
            "h-4 w-4 transition-all duration-300",
            !isDark
              ? "scale-110 text-background"
              : "scale-100 text-muted-foreground/50",
          )}
        />
      </div>

      {/* Moon */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <Moon
          className={cn(
            "h-4 w-4 transition-all duration-300",
            isDark
              ? "scale-110 text-amber-300"
              : "scale-100 text-muted-foreground/50",
          )}
        />
      </div>
    </button>
  );
}
