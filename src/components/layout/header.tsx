import { useEffect, useState } from "react";
import { Menu, SunMedium, Moon } from "lucide-react";
import { useTheme } from "../../hooks/use-theme";

type HeaderProps = {
  onOpenSidebar: () => void;
};

export default function Header({ onOpenSidebar }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="app-header sticky top-0 z-20 border-b border-border bg-background/95 px-6 py-4 backdrop-blur-lg md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h2 className="text-2xl font-semibold text-foreground">
            Dashboard overview
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:bg-muted/80 md:hidden"
            onClick={onOpenSidebar}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <button
            type="button"
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              theme === "light"
                ? "border border-border bg-secondary text-secondary-foreground"
                : "border border-border bg-primary text-primary-foreground"
            }`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {mounted ? (
              <>
                {theme === "light" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <SunMedium className="h-4 w-4" />
                )}
                <span>{theme === "light" ? "Dark" : "Light"}</span>
              </>
            ) : (
              "Toggle"
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
